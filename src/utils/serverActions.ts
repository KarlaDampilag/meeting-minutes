import { db } from "@/db/db";
import { User, users } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const getUser = async () => {
    'use server'
    const { userId } = auth();
    if (userId) {
        const user = await db.query.users.findFirst({ where: eq(users.auth_id, userId) });
        return user;
    }
}

export const assignPendingRole = async (user: User | undefined, role: "First Admin" | "Admin" | "Property Manager") => {
    'use server'
    try {
        if (!user) {
            console.error('Will not update user role, user is null');
            return false;
        }
        let roleId;
        if (role === "First Admin") {
            roleId = process.env.PENDING_FIRST_ADMIN_ROLE_ID;
        } else if (role === "Admin") {
            roleId = process.env.PENDING_ADMIN_ROLE_ID
        } else if (role === "Property Manager") {
            roleId = process.env.PENDING_PROPERTY_MANAGER_ROLE_ID;
        }
        const updatedUser = await db.update(users).set({ role_id: roleId }).where(eq(users.auth_id, user.id));
        if (!!updatedUser) {
            return true;
        } else {
            console.error('Failed to update user role');
            return false;
        }
    } catch (error) {
        console.error('Failed to assign pending role');
        console.error(error);
        return false;
    }
}