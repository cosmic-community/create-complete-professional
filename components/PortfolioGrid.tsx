'use client';

import { useState } from 'react';
import { Project } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string>('all');

  if (!projects || projects.length === 0) {
    return (
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">Портфолио</h2>
          <p className="text-slate-400">Проекты будут добавлены в ближайшее время</p>
        </div>
      </section>
    );
  }

  const categories = Array.from(new Set(projects.map(p => getMetafieldValue(p.metadata?.category)).filter(Boolean)));

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => getMetafieldValue(p.metadata?.category) === filter);

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Наше <span className="text-accent">портфолио</span>
          </h2>
          <p className="text-slate-400 text-lg">847 успешно завершенных проектов</p>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <button
              onClick={() => setFilter('all')}
              className={`px-5 py-2 rounded-full font-semibold transition ${filter === 'all' ? 'bg-accent text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
            >
              Все ({projects.length})
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2 rounded-full font-semibold transition ${filter === cat ? 'bg-accent text-slate-950' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <div key={project.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden hover:border-accent/50 transition group">
              {project.metadata?.image && (
                <div className="aspect-video overflow-hidden bg-slate-800">
                  <img
                    src={`${project.metadata.image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
                    alt={getMetafieldValue(project.metadata?.title) || project.title}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
              )}
              <div className="p-5">
                {project.metadata?.category && (
                  <div className="text-accent text-xs uppercase font-bold mb-2">{getMetafieldValue(project.metadata.category)}</div>
                )}
                <h3 className="font-bold text-white text-lg mb-2">{getMetafieldValue(project.metadata?.title) || project.title}</h3>
                {project.metadata?.location && (
                  <p className="text-slate-400 text-sm mb-3">📍 {getMetafieldValue(project.metadata.location)}</p>
                )}
                {project.metadata?.area_m2 && (
                  <div className="flex items-center gap-2 text-accent font-bold">
                    <span className="text-2xl">{new Intl.NumberFormat('ru-RU').format(project.metadata.area_m2)}</span>
                    <span className="text-sm">м²</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}