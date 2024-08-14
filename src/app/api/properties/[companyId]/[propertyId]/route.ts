import { NextRequest } from "next/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/db/db";
import { properties } from "@/db/schema";
import { getUser } from "@/utils/serverActions";

// GET /api/properties/:companyId/:propertyId
export const GET = async (request: NextRequest, context: { params: { companyId: string, propertyId: string } }) => {
    try {
        const user = await getUser();

        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const result = await db.query.properties.findFirst({
            where: and(
                eq(properties.company_id, context.params.companyId),
                eq(properties.id, context.params.propertyId)
            ),
            with: {
                propertyManager: true
            }
        });

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to get property');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}

// PUT /api/properties/:companyId/:propertyId
export const PUT = async (request: NextRequest, context: { params: { companyId: string, propertyId: string } }) => {
    try {
        const user = await getUser();

        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const formData = await request.formData();
        const name = formData.get("propertyName");
        const propertyManagerId = formData.get("propertyManagerId");
        const street = formData.get('street')?.toString() || "";
        const city = formData.get('city')?.toString() || "";
        const zipCode = formData.get('zipCode')?.toString() || "";
        const country = formData.get('country')?.toString() || "";
        const telephone = formData.get('telephone')?.toString() || "";

        if (!name || !propertyManagerId) {
            return new Response("Property name or property manager not found", { status: 400 });
        }

        const result = await db
            .update(properties)
            .set({
                name: name.toString(),
                property_manager_id: propertyManagerId.toString(),
                address: {
                    street: street,
                    city: city,
                    zipCode: zipCode,
                    country: country,
                    telephone: telephone
                }
            })
            .where(
                and(
                    eq(properties.company_id, context.params.companyId),
                    eq(properties.id, context.params.propertyId)
                )
            )
            .returning();

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to update property');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}