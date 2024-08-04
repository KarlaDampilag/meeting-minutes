import React from 'react'
import { auth } from "@clerk/nextjs/server"

import { db } from '@/db/db';
import { companies, Company, User, users } from '@/db/schema';
import { eq } from 'drizzle-orm';

import CompanyDetailsForm from './CompanyDetailsForm'
import FirstAdminPendingApprovalCard from '@/app/components/atoms/FirstAdminPendingApprovalCard';

const CompanySettingsPage = async () => {
    let user: User | undefined;
    let company: Company | undefined | null;
    const { userId } = auth();

    if (userId) {
        const userResult = await db.select().from(users).where(eq(users.auth_id, userId))
            .leftJoin(companies, eq(users.company_id, companies.id))
            .limit(1);
        if (userResult?.length > 0) {
            user = userResult[0].users;
            company = userResult[0].companies;
        }
    }

    const createOrUpdateCompany = async (formData: FormData, billingSameAsAddress: boolean): Promise<Company> => {
        'use server'
        try {
            if (!user) {
                throw new Error('Cannot create or update company details, logged in user not found.');
            }
            const name = formData.get('companyName');
            const street = formData.get('street');
            const city = formData.get('city');
            const state = formData.get('state');
            const zipCode = formData.get('zipCode');
            const country = formData.get('country');
            const telephone = formData.get('telephone');

            let billingStreet, billingCity, billingState, billingZipCode, billingCountry, billingTelephone;

            if (billingSameAsAddress) {
                billingStreet = street;
                billingCity = city;
                billingState = state;
                billingZipCode = zipCode;
                billingCountry = country;
                billingTelephone = telephone;
            } else {
                billingStreet = formData.get('billing-street');
                billingCity = formData.get('billing-city');
                billingState = formData.get('billing-state');
                billingZipCode = formData.get('billing-zipCode');
                billingCountry = formData.get('billing-country');
                billingTelephone = formData.get('billing-telephone');
            }

            if (!name || !street || !city || !state || !zipCode || !country || !telephone || !billingStreet || !billingCity || !billingState || !billingZipCode || !billingCountry || !billingTelephone) {
                throw new Error('Cannot create or update company details, required fields are not defined.');
            } else {
                const newCompanyResult = await db.insert(companies).values({
                    name: name as string,
                    address: {
                        street: street,
                        city: city,
                        state: state,
                        zipCode: zipCode,
                        country: country,
                        telephone: telephone
                    },
                    billing_address: {
                        street: billingStreet,
                        city: billingCity,
                        state: billingState,
                        zipCode: billingZipCode,
                        country: billingCountry,
                        telephone: billingTelephone
                    },
                    created_by: user.id,
                    approved: false
                }).onConflictDoUpdate({
                    target: companies.created_by,
                    set: {
                        name: name as string,
                        address: {
                            street: street,
                            city: city,
                            state: state,
                            zipCode: zipCode,
                            country: country,
                            telephone: telephone
                        },
                        billing_address: {
                            street: billingStreet,
                            city: billingCity,
                            state: billingState,
                            zipCode: billingZipCode,
                            country: billingCountry,
                            telephone: billingTelephone
                        },
                        created_by: user.id,
                        approved: false
                    },
                }).returning();
                if (!newCompanyResult || newCompanyResult.length === 0) {
                    throw new Error('Cannot create or update company details, failed at db insert operation');
                }
                return newCompanyResult[0];
            }
        } catch (error) {
            console.error(error);
            throw new Error('Cannot create or update company details, something went wrong');
        }
    }

    const handleCompanyFormSubmit = async (formData: FormData, billingSameAsAddress: boolean) => {
        'use server'
        try {
            createOrUpdateCompany(formData, billingSameAsAddress)
                .then((company) => {
                    db.update(users).set({ role_id: process.env.PENDING_FIRST_ADMIN_ROLE_ID, company_id: company.id }).where(eq(users.id, (user as User).id)).returning()
                        .then((userResult) => {
                            return userResult;
                        });
                });
        } catch (error) {
            console.error('Failed to handle company form submit.');
            console.error(error);
        }
    }

    if (company?.approved === false) {
        return <FirstAdminPendingApprovalCard />;
    }

    return (
        <div>
            <h1 className='mb-6'>Company Details</h1>
            {!user?.company_id && <p className='mb-7 font-medium'>Please submit your company details for verification:</p>}
            <CompanyDetailsForm onSubmit={handleCompanyFormSubmit} />
        </div>
    )
}

export default CompanySettingsPage