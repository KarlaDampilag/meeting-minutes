import * as React from 'react';
import { Link } from "@react-email/components";

interface EmailTemplateProps {
    firstName: string;
    companyName: string;
}

export const CompanyApprovedEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    companyName
}) => (
    <div>
        <h1>Glückwunsch! Dein Firmenkonto bei {process.env.NEXT_PUBLIC_APP_NAME} wurde aktiviert!</h1>
        <p>Hallo {firstName}</p>
        <p>Wir freuen uns dich als Admin deiner {companyName}, auf {process.env.NEXT_PUBLIC_APP_NAME} willkommen zu heissen.</p>
        <p>Du kannst nun mit den folgenden Schritten fortfahren:</p>
        <ul className='list-disc ml-6'>
            <li><Link href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/team`}>Teammitglieder einladen und ihnen Rollen zuweisen</Link></li>
            <li><Link href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/properties`}>Liegenschaften eröffnen und verwalten</Link></li>
            <li><Link href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/company-settings`}>Deine Firmendaten aktualisieren</Link></li>
        </ul>
        <p>Als neuer Benutzer können du und dein Team Easy Protokoll vollumfänglich während 7 Tagen kostenlos nutzen.</p>
        <p>Wir freuen uns, dass du Easy Protokoll nutzt und unterstützen dich gerne bei der Anwendung.</p>
        <p>Beste Grüsse,<br />Dein {process.env.NEXT_PUBLIC_APP_NAME} Team</p>
    </div>
);
