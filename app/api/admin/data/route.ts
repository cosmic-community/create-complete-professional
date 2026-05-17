import { NextResponse } from 'next/server';
import { getLeads, getTrackingOrders, getProjects, getMaterials } from '@/lib/cosmic';

export async function GET() {
  try {
    const [leads, tracking, projects, materials] = await Promise.all([
      getLeads(),
      getTrackingOrders(),
      getProjects(),
      getMaterials(),
    ]);
    return NextResponse.json({ leads, tracking, projects, materials });
  } catch (error) {
    console.error('Admin data error:', error);
    return NextResponse.json({ leads: [], tracking: [], projects: [], materials: [] });
  }
}