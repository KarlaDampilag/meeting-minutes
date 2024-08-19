import React from 'react'
import { redirect } from 'next/navigation';

import { assignPendingRole, getUser } from '@/utils/serverActions';

import FirstAdminPendingApprovalCard from '../components/atoms/FirstAdminPendingApprovalCard';
import LeftNav from '../components/layout/LeftNav'
import PendingApprovalCard from '../components/atoms/PendingApprovalCard';
import OnboardingSelectRole from '../components/molecules/OnboardingSelectRole';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getUser();

    const handleAssignPendingRole = async (role: "First Admin" | "Admin" | "Property Manager") => {
        'use server'
        if (user) {
            return await assignPendingRole(user, role);
        } else {
            console.error('Cannot assign pending role, user not found')
            return false;
        }
    }

    const Content = () => {
        if (!!user && user.role_id) {
            if (user.role_id === process.env.NEXT_PUBLIC_ADMIN_ROLE_ID || user.role_id === process.env.NEXT_PUBLIC_PROPERTY_MANAGER_ROLE_ID) { // admin or property manager
                return children;
            } else if (user.role_id === process.env.PENDING_FIRST_NEXT_PUBLIC_ADMIN_ROLE_ID) { // pending first admin
                if (user.company_id) { // has company in db
                    return <FirstAdminPendingApprovalCard />;
                } else { // no company yet (children will be company-settings page content)
                    return children;
                }
            } else if (user.role_id === process.env.PENDING_NEXT_PUBLIC_ADMIN_ROLE_ID || user.role_id === process.env.PENDING_NEXT_PUBLIC_PROPERTY_MANAGER_ROLE_ID) { // pending admin & pending property manager 
                return <PendingApprovalCard />;
            }
        }
        // last resort is user doesn't have a role
        return <OnboardingSelectRole assignPendingRole={handleAssignPendingRole} />
    }

    return (
        <div className='dashboard-container'>
            <LeftNav />
            <div className='dashboard-main-container'>
                <div className='dashboard-main-inner'>
                    <Content />
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout