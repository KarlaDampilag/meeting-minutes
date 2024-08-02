import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { UserJSON, WebhookEvent } from '@clerk/nextjs/server'
import { db } from '@/db/db'
import { users } from '@/db/schema'

export async function POST(req: Request) {
    try {

        // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
        const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

        if (!WEBHOOK_SECRET) {
            throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
        }

        // Get the headers
        const headerPayload = headers();
        const svix_id = headerPayload.get("svix-id");
        const svix_timestamp = headerPayload.get("svix-timestamp");
        const svix_signature = headerPayload.get("svix-signature");

        // If there are no headers, error out
        if (!svix_id || !svix_timestamp || !svix_signature) {
            return new Response('Error occured -- no svix headers', {
                status: 400
            })
        }

        // Get the body
        const payload = await req.json()
        const body = JSON.stringify(payload);

        // Create a new Svix instance with your secret.
        const wh = new Webhook(WEBHOOK_SECRET);

        let evt: WebhookEvent

        // Verify the payload with the headers
        try {
            evt = wh.verify(body, {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            }) as WebhookEvent
        } catch (err) {
            console.error('Error verifying webhook:', err);
            return new Response('Error occured', {
                status: 400
            })
        }

        // Do something with the payload
        // For this guide, you simply log the payload to the console
        const { id, first_name, last_name, email_addresses, primary_email_address_id, image_url } = evt.data as UserJSON;
        const eventType = evt.type;
        console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
        console.log('Webhook body:', body)

        const primaryEmailAddressId = primary_email_address_id;
        const emailAddressItem = email_addresses.find(item => item.id === primaryEmailAddressId);

        if (evt.type === 'user.updated') {
            console.log('userId:', id)
            const newUser = await db.insert(users).values({
                auth_id: id,
                first_name: first_name,
                last_name: last_name,
                email: emailAddressItem?.email_address || '',
                image_url: data.image_url
            }).onConflictDoUpdate({
                target: users.auth_id,
                set: {
                    first_name: first_name || '',
                    last_name: last_name || '',
                    email: emailAddressItem?.email_address || '',
                    image_url: image_url
                },
            });;
            console.log('User upserted: ', newUser);
        }

        return new Response('Webhook user.created successfully processed. New user inserted in db.', { status: 200 })
    } catch (e) {
        console.error(e);
        throw new Response('An error has occurred', { status: 500 });
    }
}