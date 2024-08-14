import React from 'react'
import { auth } from "@clerk/nextjs/server"
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';

import { db } from '@/db/db';
import { companies, Company, User, users } from '@/db/schema';

import CompanyDetailsForm from './CompanyDetailsForm'
import FirstAdminPendingApprovalCard from '@/app/components/atoms/FirstAdminPendingApprovalCard';
import Text from '@/app/components/atoms/Text';

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
            if (user.role_id !== process.env.NEXT_PUBLIC_ADMIN_ROLE_ID) {
                throw new Error('Unauthorized');
            }
            const name = formData.get('companyName')?.toString() || "";
            const street = formData.get('street')?.toString() || "";
            const city = formData.get('city')?.toString() || "";
            // const state = formData.get('state')?.toString() || "";
            const zipCode = formData.get('zipCode')?.toString() || "";
            const country = formData.get('country')?.toString() || "";
            const telephone = formData.get('telephone')?.toString() || "";

            let billingStreet, billingCity, billingZipCode, billingCountry, billingTelephone;

            if (billingSameAsAddress) {
                billingStreet = street;
                billingCity = city;
                // billingState = state;
                billingZipCode = zipCode;
                billingCountry = country;
                billingTelephone = telephone;
            } else {
                billingStreet = formData.get('billing-street')?.toString() || "";
                billingCity = formData.get('billing-city')?.toString() || "";
                // billingState = formData.get('billing-state')?.toString() || "";
                billingZipCode = formData.get('billing-zipCode')?.toString() || "";
                billingCountry = formData.get('billing-country')?.toString() || "";
                billingTelephone = formData.get('billing-telephone')?.toString() || "";
            }

            if (!name || !street || !city || !zipCode || !country || !telephone || !billingStreet || !billingCity || !billingZipCode || !billingCountry || !billingTelephone) {
                throw new Error('Cannot create or update company details, required fields are not defined.');
            } else {
                if (!!company && !!company.approved) {
                    const updatedCompanyResult = await db.update(companies)
                        .set({
                            name: name,
                            address: {
                                street: street,
                                city: city,
                                // state: state,
                                zipCode: zipCode,
                                country: country,
                                telephone: telephone
                            },
                            billing_address: {
                                street: billingStreet,
                                city: billingCity,
                                // state: billingState,
                                zipCode: billingZipCode,
                                country: billingCountry,
                                telephone: billingTelephone
                            }
                        })
                        .where(eq(companies.id, company.id))
                        .returning();
                        if (!updatedCompanyResult || updatedCompanyResult.length === 0) {
                            throw new Error('Cannot update company details, failed at db update operation');
                        }
                        return updatedCompanyResult[0];
                } else {
                    const newCompanyResult = await db.insert(companies).values({
                        name: name,
                        address: {
                            street: street,
                            city: city,
                            // state: state,
                            zipCode: zipCode,
                            country: country,
                            telephone: telephone
                        },
                        billing_address: {
                            street: billingStreet,
                            city: billingCity,
                            // state: billingState,
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
                                // state: state,
                                zipCode: zipCode,
                                country: country,
                                telephone: telephone
                            },
                            billing_address: {
                                street: billingStreet,
                                city: billingCity,
                                // state: billingState,
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
                    if (!company || !company.approved) {
                        db.update(users).set({ role_id: process.env.PENDING_FIRST_NEXT_PUBLIC_ADMIN_ROLE_ID, company_id: company.id }).where(eq(users.id, (user as User).id)).returning()
                            .then((userResult) => {
                                return userResult;
                            });
                    } else {
                        return !!company;
                    }
                });
        } catch (error) {
            console.error('Failed to handle company form submit.');
            console.error(error);
        }
    }

    if (company?.approved === false) {
        return <FirstAdminPendingApprovalCard />;
    }

    if (user?.role_id !== process.env.NEXT_PUBLIC_ADMIN_ROLE_ID) {
        redirect('/dashboard');
    }

    return (
        <div className='max-w-3xl mx-auto'>
            <h1 className='mb-6'><Text localeParent='Company Settings' localeKey='Company Details' /></h1>
            {!user?.company_id && <p className='mb-7 font-medium'><Text localeParent='Company Settings' localeKey='companyDetailsFormDescription' /></p>}
            <CompanyDetailsForm onSubmit={handleCompanyFormSubmit} currentCompanyData={company} />
        </div>
    )
}

export default CompanySettingsPage