import React from 'react'
import { auth } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation';

import { db } from '@/db/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';

import FirstAdminPendingApprovalCard from '../components/atoms/FirstAdminPendingApprovalCard';
import OnboardingSelectRole from '../components/molecules/OnboardingSelectRole';
import PendingApprovalCard from '../components/atoms/PendingApprovalCard';

const DashboardPage = async () => {
    const { userId } = auth();

    const assignPendingRole = async (role: "First Admin" | "Admin" | "Property Manager") => {
        'use server'
        try {
            if (!userId) {
                console.error('Will not update user role, user auth id is null');
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
            const updatedUser = await db.update(users).set({ role_id: roleId }).where(eq(users.auth_id, userId));
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

    if (userId) {
        const user = await db.query.users.findFirst({ where: eq(users.auth_id, userId) });
        if (!!user && user.role_id) {
            if (user.role_id === process.env.ADMIN_ROLE_ID || user.role_id === process.env.PROPERTY_MANAGER_ROLE_ID) {
                return <p>Dashboard here soon</p>
            } else if (user.role_id === process.env.PENDING_FIRST_ADMIN_ROLE_ID) {
                if (user.company_id) {
                    return <FirstAdminPendingApprovalCard />;
                } else {
                    redirect('/dashboard/company-settings');
                }
            } else if (user.role_id === process.env.PENDING_ADMIN_ROLE_ID || user.role_id === process.env.PENDING_PROPERTY_MANAGER_ROLE_ID) {
                return <PendingApprovalCard />;
            }
        }
    }

    // last resort is user doesn't have a role
    return <OnboardingSelectRole assignPendingRole={assignPendingRole} />
}

export default DashboardPage