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
        <h1>Congratulations! Your company account on {process.env.NEXT_PUBLIC_APP_NAME} is approved!</h1>
        <p>Hi {firstName},</p>
        <p>We&apos;re excited to welcome you as the Admin for your company, {companyName}. You can now proceed with the following steps:</p>
        <ul className='list-disc ml-6'>
            <li><Link href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/team`}>Invite your team members and assign their roles</Link></li>
            <li><Link href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/properties`}>Manage and update property details</Link></li>
            <li><Link href={`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/company-settings`}>Review and update your company details</Link></li>
        </ul>
        <p>As a new user, your team can enjoy a 7-day free trial to explore all features.</p>
        <p>We&apos;re thrilled to have you on board and look forward to supporting your success!</p>
        <p>Best regards,<br />{process.env.NEXT_PUBLIC_APP_NAME} Team</p>
    </div>
);
