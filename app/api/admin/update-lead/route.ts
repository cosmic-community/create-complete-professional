import { NextResponse } from 'next/server';
import { cosmic } from '@/lib/cosmic';

export async function POST(request: Request) {
  try {
    const { id, status } = await request.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    await cosmic.objects.updateOne(id, { metadata: { status } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update lead error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}