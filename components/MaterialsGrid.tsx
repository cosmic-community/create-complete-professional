import Link from 'next/link';
import { Material } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

export default function MaterialsGrid({ materials }: { materials: Material[] }) {
  if (!materials || materials.length === 0) {
    return (
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">Материалы</h2>
          <p className="text-slate-400">Материалы будут добавлены в ближайшее время</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Логистика <span className="text-accent">материалов</span>
          </h2>
          <p className="text-slate-400 text-lg">Собственная доставка щебня, песка, торфа и грунта</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {materials.slice(0, 10).map(material => (
            <div key={material.id} className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden hover:border-accent/50 transition group">
              {material.metadata?.image && (
                <div className="aspect-square overflow-hidden bg-slate-800">
                  <img
                    src={`${material.metadata.image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
                    alt={getMetafieldValue(material.metadata?.name) || material.title}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-bold text-white mb-2">{getMetafieldValue(material.metadata?.name) || material.title}</h3>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-2xl font-extrabold text-accent">{material.metadata?.price || 0}₽</span>
                  <span className="text-slate-500 text-sm">/{getMetafieldValue(material.metadata?.unit) || 'т'}</span>
                </div>
                {material.metadata?.in_stock !== false ? (
                  <span className="text-green-400 text-xs">✓ В наличии</span>
                ) : (
                  <span className="text-red-400 text-xs">Нет в наличии</span>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/materials" className="bg-accent hover:bg-accent-dark text-slate-950 font-bold px-8 py-3 rounded-lg transition inline-block">
            Все материалы →
          </Link>
        </div>
      </div>
    </section>
  );
}