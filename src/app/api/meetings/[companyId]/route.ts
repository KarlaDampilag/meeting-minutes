import { NextRequest } from "next/server";
import { and, eq, ilike, or } from "drizzle-orm";

import { db } from "@/db/db";
import { meetings, properties } from "@/db/schema";
import { getUser } from "@/utils/serverActions";


// GET /api/meetings/:companyId
export const GET = async (request: NextRequest, context: { params: { companyId: string } }) => {
    try {
        const user = await getUser();

        if (!user || !user.company_id) {
            return new Response('Unauthorized', { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const searchTerm = searchParams.get('searchTerm');

        let result;

        if (!!searchTerm) {
            result = await db
                .select({
                    id: meetings.id,
                    name: meetings.name,
                    location: meetings.location,
                    property_id: meetings.property_id,
                    date: meetings.date,
                    duration: meetings.duration,
                    company_id: properties.company_id,
                    property: {
                        name: properties.name
                    }
                })
                .from(meetings)
                .leftJoin(properties, eq(properties.id, meetings.property_id))
                .where(
                    and(
                        eq(properties.company_id, context.params.companyId),
                        eq(properties.company_id, user.company_id),
                        or(
                            ilike(meetings.name, `%${searchTerm}%`)
                        )
                    )
                )
        } else {
            result = await db
                .select({
                    id: meetings.id,
                    name: meetings.name,
                    location: meetings.location,
                    property_id: meetings.property_id,
                    date: meetings.date,
                    duration: meetings.duration,
                    company_id: properties.company_id,
                    property: {
                        name: properties.name
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
        }

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to get meetings');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}