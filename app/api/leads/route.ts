import { NextResponse } from 'next/server';
import { cosmic } from '@/lib/cosmic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, message, work_type, area_m2, estimated_price } = body;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const lead = await cosmic.objects.insertOne({
      type: 'leads',
      title: `${name} - ${work_type || 'Quote Request'}`,
      metadata: {
        name,
        phone,
        email: email || '',
        work_type: work_type || '',
        area_m2: area_m2 || 0,
        estimated_price: estimated_price || 0,
        message: message || '',
        status: 'New',
      },
    });

    return NextResponse.json({ success: true, lead });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json({ error: 'Failed to create lead' }, { status: 500 });
  }
}