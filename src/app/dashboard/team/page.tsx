import React from 'react'
import { Resend } from 'resend'
import { redirect } from 'next/navigation'

import { db } from '@/db/db'
import { Invite, invites } from '@/db/schema'
import { getUserAndCompany } from '@/utils/serverActions'
import { UserInviteEmailTemplate } from '@/app/components/emailTemplates/UserInviteEmailTemplate'

import InvitedTable from './InvitedTable'
import InviteTeamMemberForm from '@/app/components/molecules/InviteTeamMemberForm'
import TeamTable from './TeamTable'

const TeamPage = async () => {
    const userWithCompany = await getUserAndCompany();

    const createNewInvite = async (email: string, roleId: string): Promise<Invite> => {
        'use server'
        try {
            if (!!userWithCompany && userWithCompany.company_id) {
                const newInviteResult = await db.insert(invites).values({
                    company_id: userWithCompany.company_id,
                    invitor_id: userWithCompany.id,
                    invited_email: email,
                    role_id: roleId
                }).returning();
                if (!newInviteResult || newInviteResult.length === 0) {
                    throw new Error('Cannot create new invite, failed at db insert operation');
                }
                return newInviteResult[0];
            } else {
                throw new Error('Cannot create new invite, logged in user or its company not found.');
            }
        } catch (error) {
            console.error(error);
            throw new Error('Cannot create or update company details, something went wrong');
        }
    }

    const sendInviteEmail = async (inviteId: string, companyName: string, invitedEmail: string): Promise<boolean> => {
        'use server'
        const resend = new Resend(process.env.RESEND_API_KEY);
        const from = `${process.env.NEXT_PUBLIC_APP_NAME} <${process.env.NEXT_PUBLIC_SENDER_EMAIL}>`
        const to = [invitedEmail];
        console.log('Sending email...');
        console.log('from', from);
        console.log('to', to);
        const { error } = await resend.emails.send({
            from: from,
            to: to,
            subject: `${process.env.NEXT_PUBLIC_APP_NAME}: You've Been Invited`,
            react: UserInviteEmailTemplate({ inviteId, companyName,  }),
        });

        if (error) {
            console.error(error);
            return false;
        }
        return true;
    }

    const handleSendInvite = async (email: string, roleId: string) => {
        'use server'
        try {
            const newInvite = await createNewInvite(email, roleId);
            if (newInvite) {
                const emailSent = await sendInviteEmail(newInvite.id, userWithCompany?.company?.name as string, newInvite.invited_email);
                if (emailSent) {
                    return true;
                }
            }
            return false;
        } catch (error) {
            console.error('Failed to send email notification about user invite');
            console.error(error);
            return false;
        }
    }

    if (userWithCompany?.role_id !== process.env.NEXT_PUBLIC_ADMIN_ROLE_ID) {
        redirect('/dashboard');
    }

    return (
        <div>
            <InviteTeamMemberForm onSubmit={handleSendInvite} />
            <TeamTable user={userWithCompany} />
            <InvitedTable user={userWithCompany} />
        </div>
    )
}

export default TeamPage