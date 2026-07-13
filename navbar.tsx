// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { sendConsultationLead } from "@/lib/email";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, company, message, planInterest } = body ?? {};

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  try {
    await sendConsultationLead({ name, email, phone, company, message, planInterest });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contact]", err);
    return NextResponse.json(
      { error: "Something went wrong sending your message. Please try again." },
      { status: 500 }
    );
  }
}
