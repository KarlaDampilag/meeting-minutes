
import { NextRequest } from "next/server";

import { getUser } from "@/utils/serverActions";
import { db } from "@/db/db";
import { suppliers } from "@/db/schema";
import { and, eq } from "drizzle-orm";

// GET /api/suppliers/:companyId/:propertyId
export const GET = async (request: NextRequest, context: { params: { companyId: string, propertyId: string} }) => {
    try {
        const user = await getUser();

        if (!user) {
            return new Response('Unauthorized', { status: 401 });
        }

        const result = await db.query.suppliers.findMany({
            where: and(
                eq(suppliers.property_id, context.params.propertyId)
            )
        });

        return new Response(JSON.stringify(result), { status: 200 });
    } catch (error) {
        console.error('Failed to get suppliers');
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}

// POST /api/suppliers/:companyId/:propertyId
export const POST = async (request: NextRequest, context: { params: { companyId: string, propertyId: string } }) => {
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

        const insertResult = await db.insert(suppliers).values({
            name: name.toString(),
            service: service.toString(),
            telephone,
            email,
            property_id: context.params.propertyId
        }).returning();

        if (!insertResult || insertResult.length === 0) {
            return new Response('Add suppler failed', { status: 500 });
        }

        return new Response(JSON.stringify(insertResult[0]), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response('Something went wrong', { status: 500 });
    }
}