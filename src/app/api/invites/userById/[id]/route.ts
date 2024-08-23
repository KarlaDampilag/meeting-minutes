import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db/db";
import { invites, users } from "@/db/schema";

// GET /api/invites/userById/:id
export const GET = async (request: NextRequest, context: { params: { id: string } }) => {
    try {

        const invite = await db.query.invites.findFirst({
            where: eq(invites.id, context.params.id)
        });

        if (!invite) {
            return new Response('Invite does not exist', { status: 401 })
        }

        const user = await db.query.users.findFirst({
            where: eq(users.email, invite.invited_email)
        });

        if (user === undefined) {
            return new Response(undefined, { status: 404 });
        }

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.error('Failed to get user');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}