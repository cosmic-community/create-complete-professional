'use client';

import { useState } from 'react';
import { Service } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

export default function Calculator({ services }: { services: Service[] }) {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [area, setArea] = useState(1000);
  const [extras, setExtras] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const extrasList = [
    { id: 'drainage', label: 'Дренажная система', price: 500 },
    { id: 'marking', label: 'Дорожная разметка', price: 200 },
    { id: 'curbs', label: 'Установка бордюров', price: 800 },
    { id: 'lighting', label: 'Освещение', price: 1200 },
  ];

  const calculatePrice = (): number => {
    if (!selectedService) return 0;
    const basePrice = selectedService.metadata?.price_per_m2 || 850;
    const extrasPrice = extras.reduce((sum, id) => {
      const extra = extrasList.find(e => e.id === id);
      return sum + (extra?.price || 0);
    }, 0);
    return (basePrice + extrasPrice) * area;
  };

  const toggleExtra = (id: string) => {
    setExtras(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]);
  };

  const formatPrice = (n: number) => new Intl.NumberFormat('ru-RU').format(Math.round(n));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          work_type: selectedService?.title || 'Asphalt Paving',
          area_m2: area,
          estimated_price: calculatePrice(),
        }),
      });
      if (response.ok) {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="calculator" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Калькулятор <span className="text-accent">стоимости</span>
            </h2>
            <p className="text-slate-400 text-lg">Узнайте примерную стоимость работ за 1 минуту</p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 md:p-10">
            {/* Progress */}
            <div className="flex items-center justify-between mb-10">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${step >= s ? 'bg-accent text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                    {s}
                  </div>
                  {s < 3 && <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-accent' : 'bg-slate-800'}`} />}
                </div>
              ))}
            </div>

            {/* Step 1: Service */}
            {step === 1 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Выберите вид работ</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {services.length > 0 ? services.map(service => (
                    <button
                      key={service.id}
                      onClick={() => { setSelectedService(service); setStep(2); }}
                      className={`p-6 rounded-xl border-2 transition text-left ${selectedService?.id === service.id ? 'border-accent bg-accent/10' : 'border-slate-800 hover:border-slate-700 bg-slate-900'}`}
                    >
                      <div className="text-3xl mb-2">{getMetafieldValue(service.metadata?.icon) || '🛣️'}</div>
                      <div className="font-bold text-white mb-1">{getMetafieldValue(service.metadata?.name) || service.title}</div>
                      <div className="text-accent text-sm">от {service.metadata?.price_per_m2 || 850} ₽/м²</div>
                    </button>
                  )) : (
                    <>
                      <button onClick={() => { setStep(2); }} className="p-6 rounded-xl border-2 border-slate-800 hover:border-accent bg-slate-900 text-left">
                        <div className="text-3xl mb-2">🛣️</div>
                        <div className="font-bold text-white">Асфальтирование</div>
                        <div className="text-accent text-sm">от 850 ₽/м²</div>
                      </button>
                      <button onClick={() => { setStep(2); }} className="p-6 rounded-xl border-2 border-slate-800 hover:border-accent bg-slate-900 text-left">
                        <div className="text-3xl mb-2">🧱</div>
                        <div className="font-bold text-white">Тротуарная плитка</div>
                        <div className="text-accent text-sm">от 1200 ₽/м²</div>
                      </button>
                      <button onClick={() => { setStep(2); }} className="p-6 rounded-xl border-2 border-slate-800 hover:border-accent bg-slate-900 text-left">
                        <div className="text-3xl mb-2">⛏️</div>
                        <div className="font-bold text-white">Земляные работы</div>
                        <div className="text-accent text-sm">от 450 ₽/м²</div>
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Area */}
            {step === 2 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Укажите площадь</h3>
                <div className="text-center mb-8">
                  <div className="text-5xl md:text-6xl font-extrabold text-accent mb-2">{formatPrice(area)} м²</div>
                </div>
                <input
                  type="range"
                  min="100"
                  max="50000"
                  step="100"
                  value={area}
                  onChange={(e) => setArea(Number(e.target.value))}
                  className="w-full mb-4"
                />
                <div className="flex justify-between text-slate-500 text-sm mb-8">
                  <span>100 м²</span>
                  <span>50,000 м²</span>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => setStep(1)} className="flex-1 border-2 border-slate-700 text-white font-bold py-3 rounded-lg hover:border-slate-600">Назад</button>
                  <button onClick={() => setStep(3)} className="flex-1 bg-accent hover:bg-accent-dark text-slate-950 font-bold py-3 rounded-lg">Далее</button>
                </div>
              </div>
            )}

            {/* Step 3: Extras */}
            {step === 3 && (
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Дополнительные опции</h3>
                <div className="space-y-3 mb-8">
                  {extrasList.map(extra => (
                    <label key={extra.id} className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition ${extras.includes(extra.id) ? 'border-accent bg-accent/10' : 'border-slate-800 hover:border-slate-700'}`}>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={extras.includes(extra.id)}
                          onChange={() => toggleExtra(extra.id)}
                          className="w-5 h-5 accent-orange-500"
                        />
                        <span className="text-white font-medium">{extra.label}</span>
                      </div>
                      <span className="text-accent font-bold">+{extra.price} ₽/м²</span>
                    </label>
                  ))}
                </div>

                <div className="bg-gradient-to-br from-accent/20 to-accent/5 border border-accent/40 rounded-xl p-6 mb-6">
                  <div className="text-slate-300 text-sm mb-2">Примерная стоимость:</div>
                  <div className="text-4xl md:text-5xl font-extrabold text-accent">
                    от {formatPrice(calculatePrice())} ₽
                  </div>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => setStep(2)} className="flex-1 border-2 border-slate-700 text-white font-bold py-3 rounded-lg hover:border-slate-600">Назад</button>
                  <button onClick={() => setShowForm(true)} className="flex-1 bg-accent hover:bg-accent-dark text-slate-950 font-bold py-3 rounded-lg">Получить точный расчет</button>
                </div>
              </div>
            )}
          </div>

          {/* Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={() => !submitted && setShowForm(false)}>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                {submitted ? (
                  <div className="text-center">
                    <div className="text-5xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold text-white mb-2">Заявка отправлена!</h3>
                    <p className="text-slate-400 mb-6">Мы свяжемся с вами в ближайшее время.</p>
                    <button onClick={() => { setShowForm(false); setSubmitted(false); }} className="bg-accent hover:bg-accent-dark text-slate-950 font-bold px-6 py-3 rounded-lg">Закрыть</button>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-white mb-2">Получить точный расчет</h3>
                    <p className="text-slate-400 mb-6">Мы свяжемся с вами в течение 15 минут</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input type="text" required placeholder="Ваше имя" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white" />
                      <input type="tel" required placeholder="Телефон" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white" />
                      <input type="email" placeholder="Email (не обязательно)" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white" />
                      <textarea placeholder="Комментарий" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white" rows={3} />
                      <div className="flex gap-2">
                        <button type="button" onClick={() => setShowForm(false)} className="flex-1 border-2 border-slate-700 text-white font-bold py-3 rounded-lg">Отмена</button>
                        <button type="submit" disabled={submitting} className="flex-1 bg-accent hover:bg-accent-dark text-slate-950 font-bold py-3 rounded-lg disabled:opacity-50">
                          {submitting ? 'Отправка...' : 'Отправить'}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}