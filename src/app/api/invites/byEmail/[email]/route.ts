import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db/db";
import { getUser } from "@/utils/serverActions";
import { invites } from "@/db/schema";

// GET /api/invites/byEmail/:email
export const GET = async (request: NextRequest, context: { params: { email: string } }) => {
    try {

        const result = await db.query.invites.findFirst({
            with: { role: true },
            where: eq(invites.invited_email, context.params.email)
        });

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to get invites');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}