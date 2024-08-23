import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db/db";
import { invites } from "@/db/schema";
import { getUser } from "@/utils/serverActions";

// GET /api/invites/byId/:id
export const GET = async (request: NextRequest, context: { params: { id: string } }) => {
    try {

        const result = await db.query.invites.findFirst({
            with: { role: true },
            where: eq(invites.id, context.params.id)
        });

        if (result === undefined) {
            return new Response(undefined, { status: 404 });
        }

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to get invite');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}

// DELETE /api/invites/byId/:id
export const DELETE = async (request: NextRequest, context: { params: { id: string } }) => {
    try {
        const user = await getUser();

        if (!user || user.role_id !== process.env.NEXT_PUBLIC_ADMIN_ROLE_ID) {
            return new Response('Unauthorized', { status: 401 });
        }

        const result = await db.delete(invites).where(
            eq(invites.id, context.params.id)
        );

        if (result === undefined) {
            return new Response(undefined, { status: 404 });
        }

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to delete invite');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}