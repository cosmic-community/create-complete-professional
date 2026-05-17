import { NextResponse } from 'next/server';
import { getTrackingOrderById } from '@/lib/cosmic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json({ error: 'orderId required' }, { status: 400 });
    }

    const order = await getTrackingOrderById(orderId);
    return NextResponse.json({ order });
  } catch (error) {
    console.error('Tracking error:', error);
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}