import React from 'react'
import { redirect } from 'next/navigation';

import { assignPendingRole, getUser } from '@/utils/serverActions';

import FirstAdminPendingApprovalCard from '../components/atoms/FirstAdminPendingApprovalCard';
import LeftNav from '../components/layout/LeftNav'
import PendingApprovalCard from '../components/atoms/PendingApprovalCard';
import OnboardingSelectRole from '../components/molecules/OnboardingSelectRole';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getUser();

    const Content = () => {
        if (!!user && user.role_id) {
            if (user.role_id === process.env.ADMIN_ROLE_ID || user.role_id === process.env.PROPERTY_MANAGER_ROLE_ID) {
                return children;
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
        // last resort is user doesn't have a role
        return <OnboardingSelectRole assignPendingRole={async (role) => await assignPendingRole(user, role)} />
    }

    return (
        <div className='dashboard-container'>
            <LeftNav />
            <div className='dashboard-main-container'>
                <Content />
            </div>
        </div>
    )
}

export default DashboardLayout