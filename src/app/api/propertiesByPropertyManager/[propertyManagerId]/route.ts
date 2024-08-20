import { NextRequest } from "next/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/db/db";
import { properties } from "@/db/schema";
import { getUser } from "@/utils/serverActions";

// GET /api/propertiesByPropertyManager/:propertyManagerId
export const GET = async (request: NextRequest, context: { params: { propertyManagerId: string } }) => {
    try {
        const user = await getUser();

        if (!user || !user.company_id) {
            return new Response('Unauthorized', { status: 401 });
        }
        
        const result = await db.query.properties.findMany({
            where: and(
                eq(properties.property_manager_id, context.params.propertyManagerId),
                eq(properties.company_id, user.company_id)
            ),
            with: {
                propertyManager: true
            }
        });

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to get properties');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}