import { NextRequest } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/db/db";
import { users } from "@/db/schema";
import { getUser } from "@/utils/serverActions";

// POST /api/users/:id
export const POST = async (request: NextRequest, context: { params: { id: string } }) => {
    try {
        const user = await getUser();

        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const formData = await request.formData();
        const roleId = formData.get("roleId");

        if (!roleId) {
            return new Response("Role id not found", { status: 400 });
        }

        const updateUserResult = await db.update(users).set({ role_id: roleId.toString() }).where(eq(users.id, context.params.id)).returning();

        if (!updateUserResult || updateUserResult.length === 0) {
            return new Response('Update user failed', { status: 500 });
        }

        return new Response(JSON.stringify(updateUserResult[0]), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}