import { Equipment } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

export default function EquipmentSection({ equipment }: { equipment: Equipment[] }) {
  if (!equipment || equipment.length === 0) return null;

  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Парк <span className="text-accent">собственной техники</span>
          </h2>
          <p className="text-slate-400 text-lg">Современная спецтехника всегда готова к работе</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipment.slice(0, 8).map(item => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-accent/50 transition">
              {item.metadata?.image && (
                <div className="aspect-video overflow-hidden bg-slate-800">
                  <img
                    src={`${item.metadata.image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                    alt={getMetafieldValue(item.metadata?.name) || item.title}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-5">
                <div className="text-accent text-xs uppercase font-bold mb-2">{getMetafieldValue(item.metadata?.category) || 'Техника'}</div>
                <h3 className="font-bold text-white text-lg mb-2">{getMetafieldValue(item.metadata?.name) || item.title}</h3>
                <p className="text-slate-400 text-sm mb-3">{getMetafieldValue(item.metadata?.specifications)}</p>
                {item.metadata?.quantity && (
                  <div className="text-slate-500 text-sm">Количество: <span className="text-accent font-bold">{item.metadata.quantity} ед.</span></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}