//import type { VercelRequest, VercelResponse } from '@vercel/node'
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    // if (req.method !== 'POST') {
    //     return res.status(405).json({ error: 'Method Not Allowed' });
    // }
    try {
        const body = await req.json();
        const { name, email, message, botField } = body;

        // 1. Security: Honeypot Check
        if (botField) {
            return NextResponse.json({ success: true });
        }

        // 2. Server-Side Validation: Empty Check
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // 3. Server-Side Validation: Type & Length Check
        // if (
        //     typeof name !== 'string' ||
        //     typeof email !== 'string' ||
        //     typeof message !== 'string' ||
        //     message.trim().length < 10
        // ) {
        //     return res.status(400).json(
        //         { error: 'Invalid input data. Message must be at least 10 characters.' }
        //     );
        // }

        // 4. Server-Side Validation: Email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address' },
                { status: 400 }
            );
        }

        if (message.trim().length < 10) {
            return NextResponse.json(
                { error: 'Message must be at least 10 characters' },
                { status: 400 }
            );
        }

        const sanitize = (str: string) => {
            return str
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#039;');
        }

        // 5. Send Email via Resend
        const data = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'tejom697@gmail.com', // Update with actual destination email
            replyTo: email,
            subject: `New message from ${sanitize(name)}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${sanitize(name)}</p>
        <p><strong>Email:</strong> ${sanitize(email)}</p>
        <hr />
        <h3>Message:</h3>
        <p style="white-space: pre-wrap;">${sanitize(message)}</p>
      `,
        });

        if (data.error) {
            console.error('Resend Error:', data.error);
            return NextResponse.json(
                { error: 'Failed to send email. Please try again later.' },
                { status: 500 }
            );
        }

        // 6. Success Response
        return NextResponse.json(
            { success: true },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact Form Error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Simple HTML sanitizer to prevent basic injection in the HTML email body
// function sanitizeHTML(str: string) {
//     return str
//         .replace(/&/g, '&amp;')
//         .replace(/</g, '&lt;')
//         .replace(/>/g, '&gt;')
//         .replace(/"/g, '&quot;')
//         .replace(/'/g, '&#039;');
// }
