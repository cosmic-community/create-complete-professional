import { createBucketClient } from '@cosmicjs/sdk';
import { hasStatus, Service, Project, Material, Equipment, Testimonial, FAQ, Lead, TrackingOrder } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export async function getServices(): Promise<Service[]> {
  try {
    const response = await cosmic.objects.find({ type: 'services' }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    return response.objects as Service[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch services');
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    const response = await cosmic.objects.find({ type: 'projects' }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    return response.objects as Project[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch projects');
  }
}

export async function getMaterials(): Promise<Material[]> {
  try {
    const response = await cosmic.objects.find({ type: 'materials' }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    return response.objects as Material[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch materials');
  }
}

export async function getEquipment(): Promise<Equipment[]> {
  try {
    const response = await cosmic.objects.find({ type: 'equipment' }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    return response.objects as Equipment[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch equipment');
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await cosmic.objects.find({ type: 'testimonials' }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    return response.objects as Testimonial[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch testimonials');
  }
}

export async function getFAQs(): Promise<FAQ[]> {
  try {
    const response = await cosmic.objects.find({ type: 'faqs' }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    const faqs = response.objects as FAQ[];
    return faqs.sort((a, b) => (a.metadata?.order || 0) - (b.metadata?.order || 0));
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch FAQs');
  }
}

export async function getLeads(): Promise<Lead[]> {
  try {
    const response = await cosmic.objects.find({ type: 'leads' }).props(['id', 'title', 'slug', 'metadata', 'created_at']).depth(1);
    const leads = response.objects as Lead[];
    return leads.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch leads');
  }
}

export async function getTrackingOrderById(orderId: string): Promise<TrackingOrder | null> {
  try {
    const response = await cosmic.objects.find({ type: 'tracking-orders', 'metadata.order_id': orderId }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    const orders = response.objects as TrackingOrder[];
    return orders.length > 0 ? (orders[0] as TrackingOrder) : null;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null;
    throw new Error('Failed to fetch tracking order');
  }
}

export async function getTrackingOrders(): Promise<TrackingOrder[]> {
  try {
    const response = await cosmic.objects.find({ type: 'tracking-orders' }).props(['id', 'title', 'slug', 'metadata']).depth(1);
    return response.objects as TrackingOrder[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return [];
    throw new Error('Failed to fetch tracking orders');
  }
}