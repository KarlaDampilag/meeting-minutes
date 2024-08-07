import * as React from 'react';
import { Link } from "@react-email/components";

interface EmailTemplateProps {
    inviteId: string;
    companyName: string;
}

export const UserInviteEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    inviteId,
    companyName,
}) => (
    <div>
        <h1>You&apos;ve been invited to {process.env.NEXT_PUBLIC_APP_NAME}</h1>
        <p>You&apos;ve been invited to join as a member of {companyName}&apos;s account on {process.env.NEXT_PUBLIC_APP_NAME}.</p>
        <p>To accept this invitation and start using {process.env.NEXT_PUBLIC_APP_NAME}, click on this link:</p> <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/accept-invite?id=${inviteId}`} className='bg-primary px-4 py-3'>Sign up</Link>
    </div>
);
