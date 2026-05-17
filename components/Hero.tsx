import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(245,158,11,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>
      <div className="container mx-auto px-4 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-accent/20 border border-accent/40 text-accent px-3 py-1 rounded-full text-sm font-semibold">
                🕐 24/7 Работаем круглосуточно
              </span>
              <span className="bg-blue-500/20 border border-blue-500/40 text-blue-300 px-3 py-1 rounded-full text-sm font-semibold">
                ❄️ Работаем зимой до -20°C
              </span>
              <span className="bg-green-500/20 border border-green-500/40 text-green-300 px-3 py-1 rounded-full text-sm font-semibold">
                🛡️ Гарантия 3 года
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Асфальтирование <span className="text-accent">любой сложности</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8">
              Профессиональная укладка асфальта, благоустройство территорий и аренда спецтехники. Собственный парк техники, опыт 12+ лет.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#calculator" className="bg-accent hover:bg-accent-dark text-slate-950 font-bold px-8 py-4 rounded-lg transition text-lg">
                Рассчитать стоимость
              </Link>
              <Link href="/tracking" className="border-2 border-slate-700 hover:border-accent text-white font-bold px-8 py-4 rounded-lg transition text-lg">
                Отследить заказ
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl p-6 text-center">
              <div className="text-4xl font-extrabold text-accent">12</div>
              <div className="text-slate-400 mt-2">лет опыта</div>
            </div>
            <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl p-6 text-center">
              <div className="text-4xl font-extrabold text-accent">847</div>
              <div className="text-slate-400 mt-2">проектов</div>
            </div>
            <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl p-6 text-center">
              <div className="text-4xl font-extrabold text-accent">2.4M</div>
              <div className="text-slate-400 mt-2">м² уложено</div>
            </div>
            <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl p-6 text-center">
              <div className="text-4xl font-extrabold text-accent">100%</div>
              <div className="text-slate-400 mt-2">гарантия</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}