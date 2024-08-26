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
        <h1>Du wurdest zu {process.env.NEXT_PUBLIC_APP_NAME} eingeladen</h1>
        <p>Du wurdest eingeladen, dem Konto von {companyName}.</p>
        <p>Um die Einladung anzunehmen und {process.env.NEXT_PUBLIC_APP_NAME} zu nutzen, klicke auf diesen Link: <Link href={`${process.env.NEXT_PUBLIC_APP_URL}/sign-up?id=${inviteId}`} className='bg-primary px-4 py-3'>Anmelden</Link></p> 
    </div>
);
