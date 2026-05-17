export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface Service extends CosmicObject {
  type: 'services';
  metadata: {
    name?: string;
    service_type?: string;
    price_per_m2?: number;
    description?: string;
    image?: { url: string; imgix_url: string };
    icon?: string;
  };
}

export interface Project extends CosmicObject {
  type: 'projects';
  metadata: {
    title?: string;
    image?: { url: string; imgix_url: string };
    area_m2?: number;
    category?: string;
    location?: string;
    completion_date?: string;
    description?: string;
    gallery?: Array<{ url: string; imgix_url: string }>;
  };
}

export interface Material extends CosmicObject {
  type: 'materials';
  metadata: {
    name?: string;
    image?: { url: string; imgix_url: string };
    price?: number;
    unit?: string;
    description?: string;
    in_stock?: boolean;
  };
}

export interface Equipment extends CosmicObject {
  type: 'equipment';
  metadata: {
    name?: string;
    image?: { url: string; imgix_url: string };
    category?: string;
    specifications?: string;
    quantity?: number;
  };
}

export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    client_name?: string;
    position?: string;
    company?: string;
    photo?: { url: string; imgix_url: string };
    review?: string;
    project_size?: string;
    rating?: number;
  };
}

export interface FAQ extends CosmicObject {
  type: 'faqs';
  metadata: {
    question?: string;
    answer?: string;
    order?: number;
  };
}

export interface Lead extends CosmicObject {
  type: 'leads';
  metadata: {
    name?: string;
    phone?: string;
    email?: string;
    work_type?: string;
    area_m2?: number;
    estimated_price?: number;
    message?: string;
    status?: string;
  };
}

export interface TrackingOrder extends CosmicObject {
  type: 'tracking-orders';
  metadata: {
    order_id?: string;
    client_name?: string;
    project_title?: string;
    current_stage?: string;
    area_m2?: number;
    start_date?: string;
    expected_completion?: string;
    notes?: string;
  };
}

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}