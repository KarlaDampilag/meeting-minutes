import React from 'react'

import { assignPendingRole, getUser, saveUserSignature } from '@/utils/serverActions';

import FirstAdminPendingApprovalCard from '../components/atoms/FirstAdminPendingApprovalCard';
import LeftNav from '../components/layout/LeftNav'
import PendingApprovalCard from '../components/atoms/PendingApprovalCard';
import OnboardingSelectRole from '../components/molecules/OnboardingSelectRole';
import SignatureCaptureModal from '../components/organisms/SignatureCaptureModal';

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

    const handleSaveUserSignature = async (dataUrl: string) => {
        'use server'
        if (user) {
            return await saveUserSignature(user.id, dataUrl);
        } else {
            console.error('Cannot save signature, user not found')
            return false;
        }
    }

    const Content = () => {
        if (!!user && user.role_id) {
            if (!user.signature) {
                return <SignatureCaptureModal onSubmit={handleSaveUserSignature} />
            } else if (user.role_id === process.env.NEXT_PUBLIC_ADMIN_ROLE_ID || user.role_id === process.env.NEXT_PUBLIC_PROPERTY_MANAGER_ROLE_ID) { // admin or property manager
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