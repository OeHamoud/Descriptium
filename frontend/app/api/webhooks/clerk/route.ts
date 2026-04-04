import { headers } from "next/headers";
import { Webhook } from "svix";
import { clerkClient } from "@clerk/nextjs/server";

type ClerkWebhookEvent = {
  type: string;
  data?: {
    user_id?: string;
  };
};

export async function POST(req: Request) {
  const payload = await req.text();
  const headerList = await headers();

  const svixId = headerList.get("svix-id");
  const svixTimestamp = headerList.get("svix-timestamp");
  const svixSignature = headerList.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Missing Svix headers", { status: 400 });
  }

  const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
  if (!webhookSecret) {
    return new Response("Webhook secret not set", { status: 500 });
  }

  let event: ClerkWebhookEvent;
  try {
    const wh = new Webhook(webhookSecret);
    event = wh.verify(payload, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ClerkWebhookEvent;
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  if (
    event.type === "subscription.created" ||
    event.type === "subscription.updated"
  ) {
    const userId = event.data?.user_id;
    if (typeof userId === "string") {
      const client = await clerkClient();
      await client.users.updateUser(userId, {
        publicMetadata: { subscription: "creator" },
      });
    }
  }

  return new Response("OK", { status: 200 });
}
