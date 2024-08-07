import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db/db";
import { getUser } from "@/utils/serverActions";
import { invites } from "@/db/schema";

// GET /api/invites/byEmail
export const GET = async (request: NextRequest) => {
    try {
        const user = await getUser();

        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const formData = await request.formData();
        const email = formData.get("email");

        if (!email) {
            return new Response("Email not found", { status: 400 });
        }

        const result = await db.query.invites.findFirst({
            with: { role: true },
            where: eq(invites.invited_email, email.toString())
        });

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to get invites');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}