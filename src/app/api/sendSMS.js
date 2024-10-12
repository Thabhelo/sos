// src/app/api/sendSMS.js
import twilio from 'twilio';

// Use regular environment variables for server-side secrets
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

// Initialize Twilio client
const client = new twilio(accountSid, authToken);

export async function POST(request) {
    if (!accountSid || !authToken || !fromNumber) {
        console.error("Twilio credentials are not properly configured");
        return new Response(JSON.stringify({ error: 'Server configuration error' }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    let to, body;
    try {
        ({ to, body } = await request.json());
    } catch (error) {
        console.error("Error parsing request body:", error);
        return new Response(JSON.stringify({ error: 'Invalid request body' }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    if (!to || !body) {
        return new Response(JSON.stringify({ error: 'Missing required fields' }), { 
            status: 400,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const message = await client.messages.create({
            to,
            from: fromNumber,
            body,
        });
        return new Response(JSON.stringify({ sid: message.sid }), { 
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error("Error sending message:", error.message);
        return new Response(JSON.stringify({ error: 'Failed to send message', details: error.message }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}