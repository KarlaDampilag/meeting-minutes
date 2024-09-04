import { NextRequest } from "next/server";
import { and, eq } from "drizzle-orm";
import { DateTime } from "luxon";

import { db } from "@/db/db";
import { agendaItems, meetings } from "@/db/schema";
import { getUser } from "@/utils/serverActions";

// GET /api/meetings/:companyId/:meetingId
export const GET = async (request: NextRequest, context: { params: { companyId: string, meetingId: string } }) => {
    try {
        const user = await getUser();

        if (!user || !user.company_id) {
            return new Response('Unauthorized', { status: 401 });
        }

        const result = await db.query.meetings.findMany({
            where: (
                and(
                    eq(meetings.id, context.params.meetingId)
                )
            ),
            with: {
                property: true,
                agendaItems: true
            }
        });

        if (!result) {
            return new Response('Something went wrong', { status: 500 });
        }

        if (result.length === 0) {
            return new Response('Not found', { status: 404 });
        }

        return new Response(JSON.stringify(result[0]), { status: 200 });
    } catch (error) {
        console.error('Failed to get meeting');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}

// PUT /api/meetings/:companyId/:meetingId
export const PUT = async (request: NextRequest, context: { params: { companyId: string, meetingId: string } }) => {
    try {
        const user = await getUser();

        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const formData = await request.formData();
        const propertyId = formData.get("propertyId");
        const name = formData.get("name");
        const location = formData.get("location");
        const date = formData.get('date')?.toString() || "";
        const hours = formData.get('hours')?.toString() || "";
        const minutes = formData.get('minutes')?.toString() || "";
        const agendaTopics = formData.get('agendaTopics');

        if (!propertyId || !name || !location || !date || !agendaTopics) {
            return new Response("Required fields not found", { status: 400 });
        }

        const utcTimestampStr = DateTime.fromISO(date).toUTC().toISO();
        const utcTimestampDate = new Date(utcTimestampStr as string);

        const result = await db
            .update(meetings)
            .set({
                property_id: propertyId.toString(),
                name: name.toString(),
                location: location.toString(),
                date: utcTimestampDate,
                duration: `${hours || 0}:${minutes || 0}:00` // 'HH:MM:SS'
            })
            .where(eq(meetings.id, context.params.meetingId))
            .returning();

        if (!result || result.length === 0) {
            return new Response('Update meeting agenda failed', { status: 500 });
        }

        // delete existing agenda items
        await db.delete(agendaItems).where(eq(agendaItems.meeting_id, context.params.meetingId)).returning();

        // create the agenda items individually
        const agendaTopicsArr = agendaTopics.toString().split(process.env.NEXT_PUBLIC_ARRAY_STRING_SEPARATOR as string);

        for (let i = 0; i < agendaTopicsArr.length; i++) {
            const agendaItemInsertResult = await db.insert(agendaItems).values({
                meeting_id: result[0].id,
                name: agendaTopicsArr[i]
            }).returning();

            if (!agendaItemInsertResult || agendaItemInsertResult.length === 0) {
                return new Response('Add agenda item failed', { status: 500 });
            }
        }

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to update meeting');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}