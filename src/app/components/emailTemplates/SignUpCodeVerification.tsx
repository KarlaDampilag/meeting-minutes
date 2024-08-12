import * as React from 'react';
import { Link } from "@react-email/components";

interface EmailTemplateProps {
    otpCode: string;
}

export const SignUpCodeVerification: React.FC<Readonly<EmailTemplateProps>> = ({
    otpCode
}) => (
    <div>
        <h3>{process.env.NEXT_PUBLIC_APP_NAME}</h3>
        <h2>Bestätigungscode</h2>
        <p>Gib den folgenden Bestätigungscode ein, wenn du dazu aufgefordert wist</p>
        <h1>{otpCode}</h1>
        <p>Um dein Konto zu schützen, gib deinen Code nicht weiter.</p>
    </div>
);
