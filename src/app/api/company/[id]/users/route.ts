import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db/db";
import { getUser } from "@/utils/serverActions";
import { users } from "@/db/schema";

// GET /api/company/:id/users
export const GET = async (request: NextRequest, context: { params: { id: string } }) => {
    try {
        const user = await getUser();

        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const result = await db.query.users.findMany({
            with: { company: true, role: true },
            where: eq(users.company_id, context.params.id)
        });

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to get users');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}