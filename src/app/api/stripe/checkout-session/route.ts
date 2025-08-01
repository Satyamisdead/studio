
import { NextResponse, type NextRequest } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe with the secret key from environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-06-20', // Use a specific API version
});

export async function POST(req: NextRequest) {
    try {
        // Get the priceId, userId, and userEmail from the request body.
        const { priceId, userId, userEmail } = await req.json();

        // Validate the input
        if (!priceId || !userId || !userEmail) {
            return new NextResponse('Missing required parameters: priceId, userId, or userEmail', { status: 400 });
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
            mode: 'subscription', // or 'payment' for one-time purchases
            success_url: `${origin}/profile?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/upgrade`,
            customer_email: userEmail, // Pre-fill the email address
            metadata: {
                // Store your internal user ID for webhook reconciliation
                userId: userId,
            }
        });
        
        // Return the REAL session ID to the frontend.
        return NextResponse.json({ sessionId: session.id });

    } catch (err: any) {
        console.error("Error creating Stripe checkout session:", err);
        return new NextResponse(
            `An error occurred: ${err.message}`,
            { status: 500 }
        );
    }
}