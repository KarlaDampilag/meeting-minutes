import React from 'react'
import { eq } from 'drizzle-orm';

import { db } from '@/db/db';
import { User, users, UserWithCompany } from '@/db/schema';

import CompanyDetailsForm from './CompanyDetailsForm'
import FirstAdminPendingApprovalCard from '@/app/components/atoms/FirstAdminPendingApprovalCard';
import Text from '@/app/components/atoms/Text';
import { createOrUpdateCompany, getUserAndCompany } from '@/utils/serverActions';

const CompanySettingsPage = async () => {

    const user = await getUserAndCompany();

    if (!user) {
        return null;
    }

    const handleCompanyFormSubmit = async (userWithCompany: UserWithCompany, formData: FormData, billingSameAsAddress: boolean): Promise<boolean> => {
        'use server'
        try {
            const companyResult = await createOrUpdateCompany(userWithCompany, formData, billingSameAsAddress);

            if (!companyResult) {
                return false;
            } else {
                if (!companyResult.approved) {
                    const userResult = await db.update(users).set({ role_id: process.env.PENDING_FIRST_NEXT_PUBLIC_ADMIN_ROLE_ID, company_id: companyResult.id }).where(eq(users.id, (user as User).id)).returning()
                    return !!userResult;
                } else {
                    return true;
                }
            }
        } catch (error) {
            console.error('Failed to handle company form submit.');
            console.error(error);
            return false;
        }
    }

    if (!!user?.company && user.company.approved === false) {
        return <FirstAdminPendingApprovalCard />;
    }

    return (
        <div className='max-w-3xl mx-auto'>
            <h1 className='mb-6'><Text localeParent='Company Settings' localeKey='Company Details' /></h1>
            {!user?.company_id && <p className='mb-7 font-medium'><Text localeParent='Company Settings' localeKey='companyDetailsFormDescription' /></p>}
            <CompanyDetailsForm userWithCompany={user} onSubmit={handleCompanyFormSubmit} />
        </div>
    )
}

export default CompanySettingsPage