import { NextRequest } from "next/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/db/db";
import { users } from "@/db/schema";

// GET /api/propertyManagers/:companyId
export const GET = async (request: NextRequest, context: { params: { companyId: string } }) => {
    try {
        const result = await db.query.users.findMany({
            where: and(
                eq(users.company_id, context.params.companyId),
                eq(users.role_id, process.env.NEXT_PUBLIC_PROPERTY_MANAGER_ROLE_ID as string)
            )
        });

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to get property managers');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}