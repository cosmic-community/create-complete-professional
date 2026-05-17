import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🛣️</span>
              <div className="text-xl font-bold text-white">ПремиумСтрой</div>
            </div>
            <p className="text-slate-400 text-sm">Профессиональное асфальтирование и дорожное строительство с 2012 года.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Услуги</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/services" className="hover:text-accent">Асфальтирование</Link></li>
              <li><Link href="/services" className="hover:text-accent">Благоустройство</Link></li>
              <li><Link href="/services" className="hover:text-accent">Земляные работы</Link></li>
              <li><Link href="/materials" className="hover:text-accent">Доставка материалов</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Компания</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/portfolio" className="hover:text-accent">Портфолио</Link></li>
              <li><Link href="/equipment" className="hover:text-accent">Техника</Link></li>
              <li><Link href="/tracking" className="hover:text-accent">Отслеживание заказа</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>📞 +7 (495) 123-45-67</li>
              <li>✉️ info@premiumstroe.ru</li>
              <li>📍 Москва, Россия</li>
              <li className="text-accent">🕐 24/7 - Работаем круглосуточно</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} ПремиумСтрой. Все права защищены.
        </div>
      </div>
    </footer>
  );
}