import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fields } = body;

    // Log the received data for debugging
    console.log("Received form data:", fields);

    // Format the email content
    const emailContent = Object.entries(fields)
      .map(([key, value]) => {
        // Remove any field- prefix and capitalize the field name
        const fieldName = key
          .replace(/^field-/, "")
          .replace(/\b\w/g, (l) => l.toUpperCase());
        return `${fieldName}: ${value}`;
      })
      .join("\n\n");

    // Get the sender's email from the form data
    const senderEmail =
      fields.email || fields["field-email"] || "no-email@example.com";

    // Send email
    const result = await resend.emails.send({
      from: "Colorado Springs Hikes <onboarding@resend.dev>", // Use Resend's default sender
      to: process.env.CONTACT_EMAIL || "ojvwebdesign@gmail.com",
      subject: "New Contact Form Submission - Colorado Springs Hikes",
      text: emailContent,
      reply_to: senderEmail,
    });

    // Log the successful send
    console.log("Email sent successfully:", result);

    return NextResponse.json({ success: true });
  } catch (error) {
    // Log the detailed error
    console.error("Error sending email:", error);

    // Return a more detailed error response
    return NextResponse.json(
      {
        error: "Failed to send message",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
