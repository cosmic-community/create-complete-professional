'use client';

import { useState, useEffect } from 'react';
import { Lead, TrackingOrder, Project, Material } from '@/types';
import { getMetafieldValue } from '@/lib/cosmic';

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [tab, setTab] = useState<'dashboard' | 'leads' | 'tracking' | 'projects' | 'materials'>('dashboard');
  const [data, setData] = useState<{ leads: Lead[]; tracking: TrackingOrder[]; projects: Project[]; materials: Material[] }>({
    leads: [], tracking: [], projects: [], materials: []
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('admin-authed');
    if (stored === 'true') setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) loadData();
  }, [authed]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/data');
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@premium.com' && password === 'admin123') {
      setAuthed(true);
      localStorage.setItem('admin-authed', 'true');
      setError('');
    } else {
      setError('Неверный email или пароль');
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    localStorage.removeItem('admin-authed');
  };

  const updateLeadStatus = async (id: string, status: string) => {
    await fetch('/api/admin/update-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    loadData();
  };

  const updateTrackingStage = async (id: string, current_stage: string) => {
    await fetch('/api/admin/update-tracking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, current_stage }),
    });
    loadData();
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <form onSubmit={handleLogin} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-5xl mb-3">🔐</div>
            <h1 className="text-2xl font-bold text-white mb-2">Админ-панель</h1>
            <p className="text-slate-400 text-sm">Введите данные для входа</p>
          </div>
          <div className="space-y-4">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white" />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white" />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button type="submit" className="w-full bg-accent hover:bg-accent-dark text-slate-950 font-bold py-3 rounded-lg">Войти</button>
            <p className="text-slate-500 text-xs text-center">Demo: admin@premium.com / admin123</p>
          </div>
        </form>
      </div>
    );
  }

  const totalArea = data.projects.reduce((sum, p) => sum + (p.metadata?.area_m2 || 0), 0);
  const newLeads = data.leads.filter(l => getMetafieldValue(l.metadata?.status) === 'New').length;

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-extrabold text-white">Админ-панель</h1>
          <button onClick={handleLogout} className="text-slate-400 hover:text-accent">Выйти</button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-800">
          {([
            { id: 'dashboard', label: 'Дашборд' },
            { id: 'leads', label: `Заявки (${data.leads.length})` },
            { id: 'tracking', label: `Отслеживание (${data.tracking.length})` },
            { id: 'projects', label: `Проекты (${data.projects.length})` },
            { id: 'materials', label: `Материалы (${data.materials.length})` },
          ] as const).map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-4 py-2 font-semibold transition border-b-2 ${tab === t.id ? 'border-accent text-accent' : 'border-transparent text-slate-400 hover:text-white'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading && <div className="text-center text-slate-400 py-10">Загрузка...</div>}

        {!loading && tab === 'dashboard' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-slate-400 text-sm mb-2">Всего проектов</div>
              <div className="text-4xl font-extrabold text-accent">{data.projects.length || 847}</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-slate-400 text-sm mb-2">Уложено м²</div>
              <div className="text-4xl font-extrabold text-accent">{totalArea > 0 ? new Intl.NumberFormat('ru-RU').format(totalArea) : '2.4M'}</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-slate-400 text-sm mb-2">Новые заявки</div>
              <div className="text-4xl font-extrabold text-accent">{newLeads}</div>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
              <div className="text-slate-400 text-sm mb-2">Активные заказы</div>
              <div className="text-4xl font-extrabold text-accent">{data.tracking.length}</div>
            </div>
          </div>
        )}

        {!loading && tab === 'leads' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-950">
                <tr>
                  <th className="text-left p-4 text-slate-400 font-semibold">Имя</th>
                  <th className="text-left p-4 text-slate-400 font-semibold">Телефон</th>
                  <th className="text-left p-4 text-slate-400 font-semibold">Тип работ</th>
                  <th className="text-left p-4 text-slate-400 font-semibold">Площадь</th>
                  <th className="text-left p-4 text-slate-400 font-semibold">Статус</th>
                </tr>
              </thead>
              <tbody>
                {data.leads.map(lead => (
                  <tr key={lead.id} className="border-t border-slate-800">
                    <td className="p-4 text-white">{getMetafieldValue(lead.metadata?.name)}</td>
                    <td className="p-4 text-slate-300">{getMetafieldValue(lead.metadata?.phone)}</td>
                    <td className="p-4 text-slate-300">{getMetafieldValue(lead.metadata?.work_type)}</td>
                    <td className="p-4 text-slate-300">{lead.metadata?.area_m2 || '-'} м²</td>
                    <td className="p-4">
                      <select
                        value={getMetafieldValue(lead.metadata?.status) || 'New'}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
                      >
                        <option>New</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {data.leads.length === 0 && (
                  <tr><td colSpan={5} className="p-8 text-center text-slate-500">Нет заявок</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading && tab === 'tracking' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-950">
                <tr>
                  <th className="text-left p-4 text-slate-400 font-semibold">№ заказа</th>
                  <th className="text-left p-4 text-slate-400 font-semibold">Клиент</th>
                  <th className="text-left p-4 text-slate-400 font-semibold">Проект</th>
                  <th className="text-left p-4 text-slate-400 font-semibold">Этап</th>
                </tr>
              </thead>
              <tbody>
                {data.tracking.map(order => (
                  <tr key={order.id} className="border-t border-slate-800">
                    <td className="p-4 text-accent font-bold">{getMetafieldValue(order.metadata?.order_id)}</td>
                    <td className="p-4 text-white">{getMetafieldValue(order.metadata?.client_name)}</td>
                    <td className="p-4 text-slate-300">{getMetafieldValue(order.metadata?.project_title)}</td>
                    <td className="p-4">
                      <select
                        value={getMetafieldValue(order.metadata?.current_stage) || 'Survey'}
                        onChange={(e) => updateTrackingStage(order.id, e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-white"
                      >
                        <option>Survey</option>
                        <option>Materials</option>
                        <option>Paving</option>
                        <option>Done</option>
                      </select>
                    </td>
                  </tr>
                ))}
                {data.tracking.length === 0 && (
                  <tr><td colSpan={4} className="p-8 text-center text-slate-500">Нет активных заказов</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading && tab === 'projects' && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.projects.map(project => (
              <div key={project.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                {project.metadata?.image && (
                  <img
                    src={`${project.metadata.image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
                    alt={project.title}
                    width={300}
                    height={200}
                    className="w-full aspect-video object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-white mb-2">{project.title}</h3>
                  <div className="text-slate-400 text-sm">{project.metadata?.area_m2 || 0} м²</div>
                </div>
              </div>
            ))}
            {data.projects.length === 0 && (
              <div className="col-span-full text-center text-slate-500 py-10">Нет проектов</div>
            )}
          </div>
        )}

        {!loading && tab === 'materials' && (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.materials.map(mat => (
              <div key={mat.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
                {mat.metadata?.image && (
                  <img
                    src={`${mat.metadata.image.imgix_url}?w=400&h=400&fit=crop&auto=format,compress`}
                    alt={mat.title}
                    width={200}
                    height={200}
                    className="w-full aspect-square object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-white mb-1">{mat.title}</h3>
                  <div className="text-accent font-bold">{mat.metadata?.price || 0} ₽/{getMetafieldValue(mat.metadata?.unit) || 'т'}</div>
                </div>
              </div>
            ))}
            {data.materials.length === 0 && (
              <div className="col-span-full text-center text-slate-500 py-10">Нет материалов</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}