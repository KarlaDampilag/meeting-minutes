import { NextRequest } from "next/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/db/db";
import { meetings } from "@/db/schema";
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