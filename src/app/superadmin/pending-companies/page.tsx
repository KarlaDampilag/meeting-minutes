import React from 'react'
import { eq } from 'drizzle-orm'
import { Resend } from 'resend';

import { db } from '@/db/db'
import { companies, users } from '@/db/schema'

import PendingCompaniesTable from '@/app/components/organisms/PendingCompaniesTable'
import { CompanyApprovedEmailTemplate } from '@/app/components/emailTemplates/CompanyApprovedEmailTemplate';

const PendingCompaniesPage = async () => {
    const pendingCompaniesResult = await db.select().from(companies).where(eq(companies.approved, false))
        .leftJoin(users, eq(companies.created_by, users.id));

    const approveCompanyAndUser = async (companyId: string, userId: string): Promise<boolean> => {
        'use server'
        try {
            // Approve the company
            await db.update(companies)
                .set({ approved: true })
                .where(eq(companies.id, companyId))
                .returning();

            // Update the user's role
            await db.update(users)
                .set({ role_id: process.env.ADMIN_ROLE_ID })
                .where(eq(users.id, userId));

            return true;
        } catch (error) {
            console.error('Failed to approve pending company');
            console.error(error);
            return false;
        }
    }

    const sendConfirmationEmail = async (companyName: string, firstName: string, email: string): Promise<boolean> => {
        'use server'
        const resend = new Resend(process.env.RESEND_API_KEY);
        const from = `${process.env.NEXT_PUBLIC_APP_NAME} <${process.env.NEXT_PUBLIC_SENDER_EMAIL}>`
        const to = [email];
        console.log('Sending email...');
        console.log('from', from);
        console.log('to', to);
        const { error } = await resend.emails.send({
            from: from,
            to: to,
            subject: `${process.env.NEXT_PUBLIC_APP_NAME}: Account Approved`,
            react: CompanyApprovedEmailTemplate({ firstName, companyName }),
        });

        if (error) {
            console.error(error);
            return false;
        }
        return true;
    }

    const handleApprove = async (companyId: string, companyName: string, userId: string, firstName: string, email: string): Promise<boolean> => {
        'use server'
        try {
            const success = await approveCompanyAndUser(companyId, userId);
            if (success) {
                const emailSent = await sendConfirmationEmail(companyName, firstName, email);
                if (emailSent) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error('Failed to send email notification about company approval');
            console.error(error);
            return false;
        }
    }

    return (
        <div>
            <h1>Pending Companies</h1>
            <p className='mb-4'>These companies have signed up and are waiting for approval:</p>
            {!!pendingCompaniesResult ? <PendingCompaniesTable companiesData={pendingCompaniesResult} handleApprove={handleApprove} /> : <p>No data found.</p>}
        </div>
    )
}

export default PendingCompaniesPage