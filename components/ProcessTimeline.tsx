export default function ProcessTimeline() {
  const steps = [
    { num: '01', icon: '⛏️', title: 'Подготовка котлована', desc: 'Земляные работы, выемка грунта, выравнивание основания' },
    { num: '02', icon: '🚛', title: 'Доставка материалов', desc: 'Завоз щебня, песка и асфальтобетонной смеси на объект' },
    { num: '03', icon: '🛣️', title: 'Идеальная дорога', desc: 'Укладка асфальта, уплотнение, контроль качества' },
  ];

  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            От котлована до <span className="text-accent">идеальной дороги</span>
          </h2>
          <p className="text-slate-400 text-lg">Полный цикл работ под ключ</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center h-full hover:border-accent/50 transition">
                <div className="text-accent text-6xl font-extrabold mb-4 opacity-30">{step.num}</div>
                <div className="text-5xl mb-4">{step.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-accent text-3xl z-10">→</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}