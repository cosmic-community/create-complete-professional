'use client';

import { useState } from 'react';
import { FAQ } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Частые <span className="text-accent">вопросы</span>
          </h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <div key={faq.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full p-5 flex items-center justify-between text-left hover:bg-slate-900 transition"
              >
                <span className="font-bold text-white pr-4">{getMetafieldValue(faq.metadata?.question)}</span>
                <span className={`text-accent text-2xl transition transform ${openIdx === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {openIdx === i && (
                <div className="px-5 pb-5 text-slate-300 animate-fade-in">
                  {getMetafieldValue(faq.metadata?.answer)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}