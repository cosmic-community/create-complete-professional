'use client';

import { useState } from 'react';
import { TrackingOrder } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

export default function TrackingPage() {
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState<TrackingOrder | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const stages = ['Survey', 'Materials', 'Paving', 'Done'];
  const stagesRu: Record<string, string> = {
    'Survey': 'Замер',
    'Materials': 'Материалы',
    'Paving': 'Укладка',
    'Done': 'Готово',
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setLoading(true);
    setNotFound(false);
    setOrder(null);
    try {
      const response = await fetch(`/api/tracking?orderId=${encodeURIComponent(orderId)}`);
      const data = await response.json();
      if (data.order) {
        setOrder(data.order);
      } else {
        setNotFound(true);
      }
    } catch (err) {
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const currentStageIdx = order ? stages.indexOf(getMetafieldValue(order.metadata?.current_stage) || 'Survey') : -1;

  return (
    <div className="py-20 bg-slate-950 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Отслеживание <span className="text-accent">заказа</span>
            </h1>
            <p className="text-slate-400">Введите номер вашего заказа для отслеживания статуса</p>
          </div>

          <form onSubmit={handleSearch} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex gap-3">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Например: PS-2024-001"
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white"
              />
              <button type="submit" disabled={loading} className="bg-accent hover:bg-accent-dark text-slate-950 font-bold px-6 py-3 rounded-lg disabled:opacity-50">
                {loading ? '...' : 'Найти'}
              </button>
            </div>
          </form>

          {notFound && (
            <div className="bg-red-900/20 border border-red-800 rounded-xl p-6 text-center">
              <div className="text-4xl mb-2">❌</div>
              <p className="text-red-300">Заказ не найден. Проверьте правильность номера.</p>
            </div>
          )}

          {order && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 animate-fade-in">
              <div className="border-b border-slate-800 pb-6 mb-6">
                <div className="text-accent text-sm font-bold mb-1">Заказ № {getMetafieldValue(order.metadata?.order_id)}</div>
                <h2 className="text-2xl font-bold text-white mb-2">{getMetafieldValue(order.metadata?.project_title)}</h2>
                <div className="text-slate-400">Клиент: {getMetafieldValue(order.metadata?.client_name)}</div>
                {order.metadata?.area_m2 && (
                  <div className="text-slate-400">Площадь: <span className="text-accent font-bold">{order.metadata.area_m2} м²</span></div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-white font-bold mb-4">Статус выполнения:</h3>
                <div className="grid grid-cols-4 gap-2">
                  {stages.map((stage, i) => (
                    <div key={stage} className="text-center">
                      <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center font-bold mb-2 ${i <= currentStageIdx ? 'bg-accent text-slate-950' : 'bg-slate-800 text-slate-500'}`}>
                        {i <= currentStageIdx ? '✓' : i + 1}
                      </div>
                      <div className={`text-xs font-semibold ${i <= currentStageIdx ? 'text-white' : 'text-slate-500'}`}>
                        {stagesRu[stage]}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="relative h-1 bg-slate-800 rounded-full mt-4">
                  <div
                    className="absolute h-full bg-accent rounded-full transition-all"
                    style={{ width: `${((currentStageIdx + 1) / stages.length) * 100}%` }}
                  />
                </div>
              </div>

              {order.metadata?.notes && (
                <div className="bg-slate-950 rounded-lg p-4">
                  <div className="text-slate-400 text-sm mb-1">Заметки:</div>
                  <div className="text-white">{getMetafieldValue(order.metadata.notes)}</div>
                </div>
              )}

              <div className="grid sm:grid-cols-2 gap-3 mt-6 text-sm">
                {order.metadata?.start_date && (
                  <div className="bg-slate-950 rounded-lg p-3">
                    <div className="text-slate-500">Начало работ:</div>
                    <div className="text-white font-semibold">{getMetafieldValue(order.metadata.start_date)}</div>
                  </div>
                )}
                {order.metadata?.expected_completion && (
                  <div className="bg-slate-950 rounded-lg p-3">
                    <div className="text-slate-500">Ожидаемое завершение:</div>
                    <div className="text-white font-semibold">{getMetafieldValue(order.metadata.expected_completion)}</div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}