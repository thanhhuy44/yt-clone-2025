import { db } from '@/db'
import { users } from '@/db/schema'
import { UserJSON } from '@clerk/nextjs/server'
import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { eq } from 'drizzle-orm'

export async function POST(req: Request) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const evt = await verifyWebhook(req as any)

    // Do something with payload
    // For this guide, log payload to console
    const { id , first_name, last_name, image_url, } = evt.data as UserJSON
    const eventType = evt.type

    switch (eventType) {
        case "user.created":
            await db.insert(users).values({
                clerkId:id,
                name: `${first_name} ${last_name}`,
                imageUrl: image_url
            })
            break;
        case "user.deleted":
            if(!id){
                return new Response('Missing user id!', { status: 400 })
            }
            await db.delete(users).where(eq(users.clerkId, id))
            break;
        case "user.updated":
            await db.update(users).set({
                name: `${first_name} ${last_name}`,
                imageUrl: image_url
            }).where(eq(users.clerkId, id))
            break;
        default:
            break;
        }
     

    console.log(`Received webhook with ID ${id} and event type of ${eventType}`)
    console.log('Webhook payload:', evt.data)

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error verifying webhook', { status: 400 })
  }
}