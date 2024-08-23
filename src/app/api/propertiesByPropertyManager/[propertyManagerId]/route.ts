import { NextRequest } from "next/server";
import { and, eq, ilike, or } from "drizzle-orm";

import { db } from "@/db/db";
import { properties, users } from "@/db/schema";
import { getUser } from "@/utils/serverActions";

// GET /api/propertiesByPropertyManager/:propertyManagerId
export const GET = async (request: NextRequest, context: { params: { propertyManagerId: string } }) => {
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
                    id: properties.id,
                    name: properties.name,
                    address: properties.address,
                    company_id: properties.company_id,
                    property_manager_id: properties.property_manager_id,
                    propertyManager: users
                })
                .from(properties)
                .leftJoin(users, eq(properties.property_manager_id, users.id))
                .where(
                    and(
                        eq(properties.property_manager_id, context.params.propertyManagerId),
                        eq(properties.company_id, user.company_id),
                        or(
                            ilike(properties.name, `%${searchTerm}%`)
                        )
                    )
                )
        } else {
            result = await db.query.properties.findMany({
                where: and(
                    eq(properties.property_manager_id, context.params.propertyManagerId),
                    eq(properties.company_id, user.company_id)
                ),
                with: {
                    propertyManager: true
                }
            });
        }

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to get properties');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}