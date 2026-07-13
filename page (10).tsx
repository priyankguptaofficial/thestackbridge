// app/api/support-ticket/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendSupportTicket } from "@/lib/email";

function generateTicketId() {
  return `TSB-${Math.floor(1000 + Math.random() * 9000)}`;
}

export async function POST(req: NextRequest) {
  const form = await req.formData();

  const name = form.get("name")?.toString();
  const email = form.get("email")?.toString();
  const phone = form.get("phone")?.toString();
  const callbackTime = form.get("callbackTime")?.toString();
  const issue = form.get("issue")?.toString();
  const attachment = form.get("attachment") as File | null;

  if (!name || !email || !phone || !issue) {
    return NextResponse.json(
      { error: "Name, email, phone, and issue description are required." },
      { status: 400 }
    );
  }

  const ticketId = generateTicketId();

  try {
    if (attachment && attachment.size > 0) {
      console.log(`[support-ticket] attachment received: ${attachment.name} (${attachment.size} bytes)`);
      // To forward the attachment in the email, read attachment.arrayBuffer()
      // and pass it through the `attachments` param on resend.emails.send()
      // in lib/email.ts.
    }

    await sendSupportTicket({
      name,
      email,
      phone,
      callbackTime: callbackTime || "No preference",
      issue,
      ticketId,
    });

    return NextResponse.json({ ok: true, ticketId });
  } catch (err) {
    console.error("[api/support-ticket]", err);
    return NextResponse.json(
      { error: "Something went wrong submitting your ticket. Please try again." },
      { status: 500 }
    );
  }
}
