'use client';

import { useState } from 'react';
import { Testimonial } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

export default function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [current, setCurrent] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const next = () => setCurrent((current + 1) % testimonials.length);
  const prev = () => setCurrent((current - 1 + testimonials.length) % testimonials.length);

  const testimonial = testimonials[current];
  if (!testimonial) return null;

  const rating = testimonial.metadata?.rating || 5;

  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Отзывы <span className="text-accent">клиентов</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-8 md:p-12 relative">
          <div className="flex items-center gap-1 mb-6 justify-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`text-2xl ${i < rating ? 'text-accent' : 'text-slate-700'}`}>★</span>
            ))}
          </div>

          <blockquote className="text-xl text-slate-200 text-center mb-8 italic">
            "{getMetafieldValue(testimonial.metadata?.review)}"
          </blockquote>

          <div className="flex items-center gap-4 justify-center">
            {testimonial.metadata?.photo && (
              <img
                src={`${testimonial.metadata.photo.imgix_url}?w=150&h=150&fit=crop&auto=format,compress`}
                alt={getMetafieldValue(testimonial.metadata?.client_name) || ''}
                width={75}
                height={75}
                className="w-16 h-16 rounded-full object-cover border-2 border-accent"
              />
            )}
            <div className="text-left">
              <div className="font-bold text-white">{getMetafieldValue(testimonial.metadata?.client_name)}</div>
              <div className="text-slate-400 text-sm">
                {getMetafieldValue(testimonial.metadata?.position)}
                {testimonial.metadata?.company && `, ${getMetafieldValue(testimonial.metadata.company)}`}
              </div>
              {testimonial.metadata?.project_size && (
                <div className="text-accent text-xs mt-1">Объект: {getMetafieldValue(testimonial.metadata.project_size)}</div>
              )}
            </div>
          </div>

          {testimonials.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800 hover:bg-accent hover:text-slate-950 flex items-center justify-center transition">‹</button>
              <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800 hover:bg-accent hover:text-slate-950 flex items-center justify-center transition">›</button>
            </>
          )}

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition ${i === current ? 'bg-accent w-8' : 'bg-slate-700'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}