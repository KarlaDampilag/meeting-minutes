import { NextRequest } from "next/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/db/db";
import { properties } from "@/db/schema";
import { getUser } from "@/utils/serverActions";

// GET /api/properties/:companyId
export const GET = async (request: NextRequest, context: { params: { companyId: string } }) => {
    try {
        const user = await getUser();

        if (!user || !user.company_id) {
            return new Response('Unauthorized', { status: 401 });
        }
        
        const result = await db.query.properties.findMany({
            where: and(
                eq(properties.company_id, context.params.companyId),
                eq(properties.company_id, user.company_id)
            ),
            with: {
                propertyManager: true
            }
        });

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to get properties');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}

// POST /api/properties/:companyId
export const POST = async (request: NextRequest, context: { params: { companyId: string } }) => {
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

        const insertResult = await db.insert(properties).values({
            name: name.toString(),
            company_id: context.params.companyId,
            property_manager_id: propertyManagerId.toString(),
            address: {
                street: street,
                city: city,
                zipCode: zipCode,
                country: country,
                telephone: telephone
            }
        }).returning();

        if (!insertResult || insertResult.length === 0) {
            return new Response('Add property failed', { status: 500 });
        }

        return new Response(JSON.stringify(insertResult[0]), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}