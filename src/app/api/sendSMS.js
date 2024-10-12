// src/app/api/sendSMS.js
import twilio from 'twilio'; // Import the Twilio client
const accountSid = process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID;
const authToken = process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN;
const fromNumber = process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER;
const client = new twilio(accountSid, authToken);

export async function POST(request) {
    const { to, body } = await request.json(); // Parse the incoming JSON request body

    try {
        const message = await client.messages.create({
            to: to,
            from: fromNumber, // Your Twilio phone number
            body: body,
        });
        return new Response(JSON.stringify({ sid: message.sid }), { status: 200 });
    } catch (error) {
        console.error("Error sending message:", error);
        return new Response(JSON.stringify({ error: 'Failed to send message' }), { status: 500 });
    }
}
