import { NextRequest } from "next/server";
import { DateTime } from 'luxon';

import { db } from "@/db/db";
import { agendaItems, meetings } from "@/db/schema";
import { getUser } from "@/utils/serverActions";

// POST /api/properties/:meetings
export const POST = async (request: NextRequest, context: { params: { companyId: string } }) => {
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
        console.log(utcTimestampDate)

        const insertResult = await db.insert(meetings).values({
            property_id: propertyId.toString(),
            name: name.toString(),
            location: location.toString(),
            date: utcTimestampDate,
            duration: `${hours || 0}:${minutes || 0}:00` // 'HH:MM:SS'
        }).returning();

        if (!insertResult || insertResult.length === 0) {
            return new Response('Add meeting agenda failed', { status: 500 });
        }

        console.log(insertResult[0])

        // create the agenda items individually
        const agendaTopicsArr = agendaTopics.toString().split(',');

        for (let i = 0; i < agendaTopicsArr.length; i++) {
            const agendaItemInsertResult = await db.insert(agendaItems).values({
                meeting_id: insertResult[0].id,
                name: agendaTopicsArr[i]
            }).returning();

            if (!agendaItemInsertResult || agendaItemInsertResult.length === 0) {
                return new Response('Add agenda item failed', { status: 500 });
            }
        }

        return new Response(JSON.stringify(insertResult[0]), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}