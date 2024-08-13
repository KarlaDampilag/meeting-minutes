'use server'
import { db } from "@/db/db";
import { companies, User, users } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const getUser = async () => {
    const { userId } = auth();
    if (userId) {
        const user = await db.query.users.findFirst({ where: eq(users.auth_id, userId) });
        return user;
    } else {
        return null;
    }
}

export const getUserAndCompany = async () => {
    const { userId } = auth();
    if (userId) {
        const user = await db.query.users.findFirst({
            where: eq(users.auth_id, userId),
            with: {
                company: true
            }
        })
        return user;
    } else {
        return null;
    }
}

export const assignPendingRole = async (user: User | undefined, role: "First Admin" | "Admin" | "Property Manager") => {
    try {
        if (!user) {
            console.error('Will not update user role, user is null');
            return false;
        }
        let roleId;
        if (role === "First Admin") {
            roleId = process.env.PENDING_FIRST_NEXT_PUBLIC_ADMIN_ROLE_ID;
        } else if (role === "Admin") {
            roleId = process.env.PENDING_NEXT_PUBLIC_ADMIN_ROLE_ID
        } else if (role === "Property Manager") {
            roleId = process.env.PENDING_NEXT_PUBLIC_PROPERTY_MANAGER_ROLE_ID;
        }
        const updatedUser = await db.update(users).set({ role_id: roleId }).where(eq(users.id, user.id)).returning();
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