import { NextRequest } from "next/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/db/db";
import { meetings, properties } from "@/db/schema";
import { getUser } from "@/utils/serverActions";

// GET /api/meetings/:companyId/:propertyId
export const GET = async (request: NextRequest, context: { params: { companyId: string, meetingId: string } }) => {
    try {
        const user = await getUser();

        if (!user || !user.company_id) {
            return new Response('Unauthorized', { status: 401 });
        }

        const result = await db.select({
            id: meetings.id,
            name: meetings.name,
            location: meetings.location,
            property_id: meetings.property_id,
            date: meetings.date,
            duration: meetings.duration,
            company_id: properties.company_id,
            property: {
                name: properties.name,
                address: properties.address
            }
        })
        .from(meetings)
        .leftJoin(properties, eq(properties.id, meetings.property_id))
        .where(
            and(
                eq(properties.company_id, context.params.companyId),
                eq(properties.company_id, user.company_id),
            )
        )

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