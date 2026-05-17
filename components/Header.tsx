import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🛣️</span>
          <div>
            <div className="text-xl font-bold text-white">ПремиумСтрой</div>
            <div className="text-xs text-slate-400">Асфальтирование с 2012 года</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/services" className="text-slate-300 hover:text-accent transition">Услуги</Link>
          <Link href="/portfolio" className="text-slate-300 hover:text-accent transition">Портфолио</Link>
          <Link href="/materials" className="text-slate-300 hover:text-accent transition">Материалы</Link>
          <Link href="/equipment" className="text-slate-300 hover:text-accent transition">Техника</Link>
          <Link href="/tracking" className="text-slate-300 hover:text-accent transition">Отслеживание</Link>
          <Link href="/admin" className="text-slate-400 hover:text-accent transition text-sm">Админ</Link>
        </nav>
        <a href="tel:+74951234567" className="bg-accent hover:bg-accent-dark text-slate-950 font-bold px-4 py-2 rounded-lg transition">
          +7 (495) 123-45-67
        </a>
      </div>
    </header>
  );
}