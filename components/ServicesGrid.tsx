import { Service } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

export default function ServicesGrid({ services }: { services: Service[] }) {
  if (!services || services.length === 0) {
    return (
      <section className="py-20 bg-slate-950">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400">Услуги будут добавлены в ближайшее время</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Наши <span className="text-accent">услуги</span>
          </h2>
          <p className="text-slate-400 text-lg">Полный спектр работ от подготовки до сдачи объекта</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(service => (
            <div key={service.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-accent/50 transition group">
              {service.metadata?.image && (
                <div className="aspect-video overflow-hidden bg-slate-800">
                  <img
                    src={`${service.metadata.image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
                    alt={getMetafieldValue(service.metadata?.name) || service.title}
                    width={400}
                    height={250}
                    className="w-full h-full object-cover group-hover:scale-105 transition"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="text-4xl mb-3">{getMetafieldValue(service.metadata?.icon) || '🛣️'}</div>
                <h3 className="text-xl font-bold text-white mb-3">{getMetafieldValue(service.metadata?.name) || service.title}</h3>
                <p className="text-slate-400 mb-4">{getMetafieldValue(service.metadata?.description)}</p>
                {service.metadata?.price_per_m2 && (
                  <div className="text-2xl font-extrabold text-accent">
                    от {service.metadata.price_per_m2} ₽/м²
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