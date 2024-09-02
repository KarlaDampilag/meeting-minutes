'use server'
import { db } from "@/db/db";
import { companies, Company, User, users, UserWithCompany } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

import cloudinary from "@/config/cloudinary";

export const getUser = async () => {
    const { userId } = auth();
    if (userId) {
        const user = await db.query.users.findFirst({ where: eq(users.auth_id, userId) });
        return user;
    } else {
        return null;
    }
}

export const getUserAndCompany = async () => {
    const { userId } = auth();
    if (userId) {
        const user = await db.query.users.findFirst({
            where: eq(users.auth_id, userId),
            with: {
                company: true
            }
        })
        return user;
    } else {
        return null;
    }
}

export const assignPendingRole = async (user: User | undefined, role: "First Admin" | "Admin" | "Property Manager") => {
    try {
        if (!user) {
            console.error('Will not update user role, user is null');
            return false;
        }
        let roleId;
        if (role === "First Admin") {
            roleId = process.env.PENDING_FIRST_NEXT_PUBLIC_ADMIN_ROLE_ID;
        } else if (role === "Admin") {
            roleId = process.env.PENDING_NEXT_PUBLIC_ADMIN_ROLE_ID
        } else if (role === "Property Manager") {
            roleId = process.env.PENDING_NEXT_PUBLIC_PROPERTY_MANAGER_ROLE_ID;
        }
        const updatedUser = await db.update(users).set({ role_id: roleId }).where(eq(users.id, user.id)).returning();
        if (!!updatedUser) {
            return true;
        } else {
            console.error('Failed to update user role');
            return false;
        }
    } catch (error) {
        console.error('Failed to assign pending role');
        console.error(error);
        return false;
    }
}

export const createOrUpdateCompany = async (userWithCompany: UserWithCompany, formData: FormData, billingSameAsAddress: boolean): Promise<Company> => {
    'use server'
    try {
        if (!userWithCompany || !userWithCompany.role_id) {
            throw new Error('Cannot create or update company details, logged in user not found.');
        }
        if (![process.env.NEXT_PUBLIC_ADMIN_ROLE_ID, process.env.PENDING_FIRST_NEXT_PUBLIC_ADMIN_ROLE_ID].includes(userWithCompany.role_id)) {
            throw new Error('Unauthorized');
        }
        const name = formData.get('companyName')?.toString() || "";
        const street = formData.get('street')?.toString() || "";
        const city = formData.get('city')?.toString() || "";
        const zipCode = formData.get('zipCode')?.toString() || "";
        const country = formData.get('country')?.toString() || "";
        const telephone = formData.get('telephone')?.toString() || "";
        const website = formData.get('website')?.toString() || "";
        const email = formData.get('email')?.toString() || "";
        const image = formData.get('logo') as File;
        let logoUrl = null;

        if (image) {
            // upload image to Cloudinary
            if (image) {
                const imageBuffer = await image.arrayBuffer();
                const imageArray = Array.from(new Uint8Array(imageBuffer));
                const imageData = Buffer.from(imageArray);

                // convert image data to base64
                const imageBase64 = imageData.toString('base64');
                const uploadResult = await cloudinary.uploader.upload(
                    `data:image/png;base64,${imageBase64}`,
                    {
                        folder: 'easy-protokoll'
                    }
                );
                logoUrl = await uploadResult.secure_url;
            }
        }

        let billingStreet, billingCity, billingZipCode, billingCountry, billingTelephone;

        if (billingSameAsAddress) {
            billingStreet = street;
            billingCity = city;
            billingZipCode = zipCode;
            billingCountry = country;
            billingTelephone = telephone;
        } else {
            billingStreet = formData.get('billing-street')?.toString() || "";
            billingCity = formData.get('billing-city')?.toString() || "";
            billingZipCode = formData.get('billing-zipCode')?.toString() || "";
            billingCountry = formData.get('billing-country')?.toString() || "";
            billingTelephone = formData.get('billing-telephone')?.toString() || "";
        }

        if (!name || !street || !city || !zipCode || !country || !telephone || !billingStreet || !billingCity || !billingZipCode || !billingCountry || !billingTelephone) {
            throw new Error('Cannot create or update company details, required fields are not defined.');
        } else {
            if (!!userWithCompany.company_id && userWithCompany.company?.approved === true) {
                let updatedCompanyResult;
                if (image) {
                    updatedCompanyResult = await db.update(companies)
                        .set({
                            name: name,
                            address: {
                                street: street,
                                city: city,
                                zipCode: zipCode,
                                country: country,
                                telephone: telephone
                            },
                            billing_address: {
                                street: billingStreet,
                                city: billingCity,
                                zipCode: billingZipCode,
                                country: billingCountry,
                                telephone: billingTelephone
                            },
                            logo: logoUrl,
                            website,
                            email
                        })
                        .where(eq(companies.id, userWithCompany.company_id))
                        .returning();
                } else {
                    updatedCompanyResult = await db.update(companies)
                        .set({
                            name: name,
                            address: {
                                street: street,
                                city: city,
                                zipCode: zipCode,
                                country: country,
                                telephone: telephone
                            },
                            billing_address: {
                                street: billingStreet,
                                city: billingCity,
                                zipCode: billingZipCode,
                                country: billingCountry,
                                telephone: billingTelephone
                            },
                            website,
                            email
                        })
                        .where(eq(companies.id, userWithCompany.company_id))
                        .returning();
                }

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
                        zipCode: zipCode,
                        country: country,
                        telephone: telephone
                    },
                    billing_address: {
                        street: billingStreet,
                        city: billingCity,
                        zipCode: billingZipCode,
                        country: billingCountry,
                        telephone: billingTelephone
                    },
                    logo: logoUrl,
                    created_by: userWithCompany.id,
                    approved: false,
                    website,
                    email
                }).onConflictDoUpdate({
                    target: companies.created_by,
                    set: {
                        name: name as string,
                        address: {
                            street: street,
                            city: city,
                            zipCode: zipCode,
                            country: country,
                            telephone: telephone
                        },
                        billing_address: {
                            street: billingStreet,
                            city: billingCity,
                            zipCode: billingZipCode,
                            country: billingCountry,
                            telephone: billingTelephone
                        },
                        created_by: userWithCompany.id,
                        approved: false,
                        website,
                        email
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

