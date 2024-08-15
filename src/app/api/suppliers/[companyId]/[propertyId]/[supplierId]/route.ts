import { NextRequest } from "next/server";
import { and, eq } from "drizzle-orm";

import { db } from "@/db/db";
import { suppliers } from "@/db/schema";
import { getUser } from "@/utils/serverActions";

// PUT /api/suppliers/:companyId/:propertyId/:supplierId
export const PUT = async (request: NextRequest, context: { params: { companyId: string, propertyId: string, supplierId: string } }) => {
    try {
        const user = await getUser();

        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const formData = await request.formData();
        const name = formData.get("name");
        const service = formData.get("service");
        const telephone = formData.get('telephone')?.toString() || "";
        const email = formData.get('email')?.toString() || "";

        if (!name || !service) {
            return new Response("Supplier name or service not found", { status: 400 });
        }

        const result = await db
            .update(suppliers)
            .set({
                name: name.toString(),
                service: service.toString(),
                telephone,
                email,
            })
            .where(
                and(
                    eq(suppliers.property_id, context.params.propertyId),
                    eq(suppliers.id, context.params.supplierId)
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

// DELETE /api/suppliers/:companyId/:propertyId/:supplierId
export const DELETE = async (request: NextRequest, context: { params: { companyId: string, propertyId: string, supplierId: string } }) => {
    try {
        const user = await getUser();

        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const result = await db
            .delete(suppliers)
            .where(
                and(
                    eq(suppliers.property_id, context.params.propertyId),
                    eq(suppliers.id, context.params.supplierId)
                )
            )
            .returning();

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to delete supplier');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}