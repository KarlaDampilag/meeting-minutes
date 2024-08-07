import { NextRequest } from "next/server";
import { and, eq, ne } from "drizzle-orm";

import { db } from "@/db/db";
import { getUser } from "@/utils/serverActions";
import { invites } from "@/db/schema";

// GET /api/company/:id/invites
export const GET = async (request: NextRequest, context: { params: { id: string } }) => {
    try {
        const user = await getUser();

        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const result = await db.query.invites.findMany({
            with: { role: true },
            where: and(
                eq(invites.company_id, context.params.id),
                ne(invites.accepted, true)
            )
        });

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to get invites');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}