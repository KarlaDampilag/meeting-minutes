
import { NextRequest } from "next/server";

import { db } from "@/db/db";
import { invites, users } from "@/db/schema";
import { eq } from "drizzle-orm";

// POST /api/acceptInvite
export const POST = async (request: NextRequest) => {
    try {
        const formData = await request.formData();
        const inviteId = formData.get("inviteId");

        if (!inviteId) {
            return new Response("Invite id not found", { status: 400 });
        }

        const inviteResult = await db.select().from(invites).where(eq(invites.id, inviteId.toString()));

        if (!inviteResult || inviteResult.length === 0) {
            return new Response('Invite not found', { status: 400 });
        }

        const invite = inviteResult[0];
        const updateUserResult = await db.update(users).set({ company_id: invite.company_id, role_id: invite.role_id }).returning();

        if (!updateUserResult || updateUserResult.length === 0) {
            return new Response('Update user failed', { status: 500 });
        }

        const updateInviteResult = await db.update(invites).set({ accepted: true }).where(eq(invites.id, inviteId.toString())).returning();

        if (!updateInviteResult || updateInviteResult.length === 0) {
            return new Response('Update invite failed', { status: 500 });
        }

        return new Response(JSON.stringify(updateUserResult[0]), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}