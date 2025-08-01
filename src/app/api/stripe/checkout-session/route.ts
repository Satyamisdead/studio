
import { NextResponse, type NextRequest } from 'next/server';
import Stripe from 'stripe';

// Ensure the secret key is set in your environment variables
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not set');
}

// Initialize Stripe with the secret key and a specific API version
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2024-06-20',
});

export async function POST(req: NextRequest) {
    try {
        const { priceId, userId, userEmail } = await req.json();

        // Validate the input
        if (!priceId || !userId || !userEmail) {
            return NextResponse.json({ error: { message: 'Missing required parameters: priceId, userId, or userEmail' }}, { status: 400 });
        }

        const origin = req.headers.get('origin') || 'http://localhost:3000';

        // Create the Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${origin}/profile?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/upgrade`,
            customer_email: userEmail,
            metadata: {
                userId: userId,
            }
        });
        
        return NextResponse.json({ sessionId: session.id });

    } catch (err: any) {
        console.error("Error creating Stripe checkout session:", err);
        return NextResponse.json(
            { error: { message: `An error occurred: ${err.message}` } },
            { status: 500 }
        );
    }
}
