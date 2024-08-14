import { NextRequest } from "next/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/db/db";
import { owners } from "@/db/schema";
import { getUser } from "@/utils/serverActions";

// PUT /api/propertyOwners/:companyId/:propertyId/:propertyOwnerId
export const PUT = async (request: NextRequest, context: { params: { companyId: string, propertyId: string, propertyOwnerId: string } }) => {
    try {
        const user = await getUser();

        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const formData = await request.formData();
        const firstName = formData.get("firstName");
        const lastName = formData.get("lastName");
        const email = formData.get('email')?.toString() || "";
        const telephone = formData.get('telephone')?.toString() || "";
        const ownershipPercentage = formData.get('ownershipPercentage')?.toString() || "";

        if (!firstName || !lastName) {
            return new Response("Property owner name not found", { status: 400 });
        }

        const result = await db
            .update(owners)
            .set({
                first_name: firstName.toString(),
                last_name: lastName.toString(),
                telephone,
                email,
                ownership_share: ownershipPercentage,
            })
            .where(
                and(
                    eq(owners.property_id, context.params.propertyId),
                    eq(owners.id, context.params.propertyOwnerId)
                )
            )
            .returning();

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to update property owner');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}

// DELETE /api/propertyOwners/:companyId/:propertyId/:propertyOwnerId
export const DELETE = async (request: NextRequest, context: { params: { companyId: string, propertyId: string, propertyOwnerId: string } }) => {
    try {
        const user = await getUser();

        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const result = await db
            .delete(owners)
            .where(
                and(
                    eq(owners.property_id, context.params.propertyId),
                    eq(owners.id, context.params.propertyOwnerId)
                )
            )
            .returning();

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to delete property owner');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}