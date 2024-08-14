
import { NextRequest } from "next/server";

import { getUser } from "@/utils/serverActions";
import { db } from "@/db/db";
import { owners } from "@/db/schema";
import { and, eq } from "drizzle-orm";

// GET /api/propertyOwners/:companyId/:propertyId
export const GET = async (request: NextRequest, context: { params: { companyId: string, propertyId: string} }) => {
    try {
        const user = await getUser();

        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const result = await db.query.owners.findMany({
            where: and(
                eq(owners.property_id, context.params.propertyId)
            )
        });

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to get property owners');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}

// POST /api/propertyOwners/:companyId/:propertyId
export const POST = async (request: NextRequest, context: { params: { companyId: string, propertyId: string } }) => {
    try {
        const user = await getUser();

        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const formData = await request.formData();
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const telephone = formData.get('telephone')?.toString() || "";
        const email = formData.get('email')?.toString() || "";
        const ownershipPercentage = formData.get('ownershipPercentage')?.toString() || "";

        if (!firstName || !lastName) {
            return new Response("Property owner name not found", { status: 400 });
        }

        const insertResult = await db.insert(owners).values({
            first_name: firstName.toString(),
            last_name: lastName.toString(),
            telephone,
            email,
            ownership_share: ownershipPercentage,
            property_id: context.params.propertyId
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