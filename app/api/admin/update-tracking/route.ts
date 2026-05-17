import { NextResponse } from 'next/server';
import { cosmic } from '@/lib/cosmic';

export async function POST(request: Request) {
  try {
    const { id, current_stage, notes } = await request.json();
    if (!id) return NextResponse.json({ error: 'id required' }, { status: 400 });

    const metadata: Record<string, any> = {};
    if (current_stage) metadata.current_stage = current_stage;
    if (notes !== undefined) metadata.notes = notes;

    await cosmic.objects.updateOne(id, { metadata });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}