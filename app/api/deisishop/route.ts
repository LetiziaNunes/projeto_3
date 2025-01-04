import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { products } = await req.json();

    if (!products || !Array.isArray(products)) {
      return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
    }

    console.log('Processing purchase for products:', products);

    return NextResponse.json({ success: true, message: 'Purchase completed successfully' });
  } catch (error) {
    console.error('Error processing purchase:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
