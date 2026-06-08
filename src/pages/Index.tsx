import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1611117775350-ac3950990985?w=1400&q=80';
const ABOUT_IMAGE = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=900&q=80';

const NAV_ITEMS = [
  { id: 'home', label: 'Главная' },
  { id: 'services', label: 'Услуги' },
  { id: 'portfolio', label: 'Портфолио' },
  { id: 'prices', label: 'Цены' },
];

const SERVICES = [
  { icon: 'Printer', title: '3D-печать по готовой модели', desc: 'Печать изделий по файлам заказчика в форматах STL, OBJ и других популярных форматах.', tag: 'Основная услуга' },
  { icon: 'Box', title: '3D-моделирование', desc: 'Создание трехмерной модели по фотографии, чертежу, эскизу или техническому заданию.', tag: 'Проектирование' },
  { icon: 'Layers', title: 'Изготовление прототипов', desc: 'Создание опытных образцов изделий для тестирования и дальнейшего производства.', tag: 'Прототипирование' },
  { icon: 'Sparkles', title: 'Печать декоративных изделий', desc: 'Изготовление фигурок, сувениров, элементов декора и индивидуальных подарков.', tag: 'Декор' },
  { icon: 'Wrench', title: 'Постобработка', desc: 'Шлифовка, покраска, склейка деталей и подготовка изделия к использованию.', tag: 'Финишная обработка' },
];

const PORTFOLIO_ITEMS = [
  { category: 'Технические детали', title: 'Крепёжный кронштейн', material: 'ABS', days: 2, color: '#f59e0b', emoji: '⚙️' },
  { category: 'Фигурки', title: 'Коллекционная фигурка', material: 'PLA', days: 3, color: '#4ade80', emoji: '🗿' },
  { category: 'Корпуса', title: 'Корпус для Arduino', material: 'PETG', days: 1, color: '#3b9eff', emoji: '📦' },
  { category: 'Сувениры', title: 'Именной брелок', material: 'PLA', days: 1, color: '#4ade80', emoji: '🎁' },
  { category: 'Прототипы', title: 'Прототип детали', material: 'PETG', days: 3, color: '#3b9eff', emoji: '🔬' },
  { category: 'Декор', title: 'Настенный барельеф', material: 'PLA', days: 4, color: '#4ade80', emoji: '🎨' },
  { category: 'Технические детали', title: 'Шестерня привода', material: 'ABS', days: 2, color: '#f59e0b', emoji: '⚙️' },
  { category: 'Корпуса', title: 'Корпус датчика', material: 'PETG', days: 2, color: '#3b9eff', emoji: '📦' },
];

const PORTFOLIO_FILTERS = ['Все', 'Технические детали', 'Корпуса', 'Фигурки', 'Сувениры', 'Прототипы', 'Декор'];

const PRICES = [
  { label: 'Небольшие изделия', size: 'готово в день заказа', price: 'от 300 ₽', icon: 'Package' },
  { label: 'Детали среднего размера', size: '5–15 см', price: 'от 700 ₽', icon: 'Boxes' },
  { label: 'Корпуса и технические элементы', size: '15–25 см', price: 'от 1 000 ₽', icon: 'Server' },
  { label: 'Фигурки и декоративные изделия', size: 'любой размер', price: 'от 1 500 ₽', icon: 'Star' },
  { label: 'Разработка 3D-модели', size: 'по ТЗ', price: 'от 1 000 ₽', icon: 'PenTool' },
];

const ADVANTAGES = [
  { icon: 'UserCheck', text: 'Индивидуальный подход к каждому заказу' },
  { icon: 'Cpu', text: 'Современное оборудование' },
  { icon: 'Palette', text: 'Большой выбор материалов' },
  { icon: 'Target', text: 'Высокая точность печати' },
  { icon: 'Zap', text: 'Быстрые сроки выполнения' },
];

const FAQ = [
  { q: 'В каком формате нужно предоставить модель?', a: 'Принимаем STL, OBJ, STEP, 3MF и другие популярные форматы. Если файла нет — разработаем модель по вашему заданию.' },
  { q: 'Сколько времени занимает изготовление?', a: 'Небольшие изделия — в день получения заказа. Крупные или сложные проекты — 3–7 дней. Срочные заказы по договорённости.' },
  { q: 'Как рассчитывается стоимость?', a: 'Цена зависит от объёма модели, материала, сложности и постобработки. Точный расчёт — после получения файла.' },
  { q: 'Есть ли доставка?', a: 'Да, отправляем по всей России через СДЭК и Почту России. Также возможен самовывоз.' },
];


export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [portfolioFilter, setPortfolioFilter] = useState('Все');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    document.querySelectorAll('.section-reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      for (const { id } of [...NAV_ITEMS].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const filtered = portfolioFilter === 'Все' ? PORTFOLIO_ITEMS : PORTFOLIO_ITEMS.filter((p) => p.category === portfolioFilter);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Icon name="Printer" size={16} className="text-primary-foreground" />
            </div>
            <span className="font-bold text-lg tracking-tight">3D<span className="text-primary">мастер</span></span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${activeSection === item.id ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-secondary'}`}>
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => scrollTo('prices')}
              className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all glow-blue-sm">
              <Icon name="MessageCircle" size={15} />
              Заказать
            </button>
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors">
              <Icon name={menuOpen ? 'X' : 'Menu'} size={20} />
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl px-4 pb-4 pt-2 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="block w-full text-left px-3 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${HERO_IMAGE})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-sm font-mono tracking-wide font-medium">Мастерская 3D-печати</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-tight mb-6 animate-fade-in-up">
              3D-печать<br /><span className="text-gradient">на заказ</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl animate-fade-in-up delay-200">
              Изготовление деталей, прототипов, фигурок и индивидуальных изделий по вашим моделям.
              Быстро, качественно и по доступной цене.
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-300">
              <button onClick={() => scrollTo('prices')}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-all glow-blue hover:scale-105 duration-200">
                <Icon name="Printer" size={18} />
                Заказать печать
              </button>
              <button onClick={() => scrollTo('portfolio')}
                className="flex items-center gap-2 border border-border bg-secondary/50 text-foreground px-7 py-3.5 rounded-xl font-semibold hover:bg-secondary transition-all duration-200">
                <Icon name="Images" size={18} />
                Примеры работ
              </button>
            </div>

            <div className="flex flex-wrap gap-10 mt-14 pt-8 border-t border-border/50 animate-fade-in-up delay-400">
              {[{ value: '100+', label: 'Заказов выполнено' }, { value: 'В день', label: 'Срок небольших изделий' }, { value: '1–7 дн', label: 'Срок любых заказов' }].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-black text-primary">{s.value}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-muted-foreground" />
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-24 bg-card/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center section-reveal">
            <div>
              <span className="text-primary font-mono text-sm font-medium tracking-widest uppercase">О мастере</span>
              <h2 className="text-3xl sm:text-4xl font-black mt-3 mb-6">Профессиональный подход к каждому заказу</h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Занимаюсь 3D-печатью уже несколько лет. Работаю на современном оборудовании
                и постоянно слежу за новыми материалами и технологиями. Каждый заказ выполняю
                лично — от переговоров до готового изделия.
              </p>
              <div className="grid gap-3">
                {ADVANTAGES.map((adv) => (
                  <div key={adv.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon name={adv.icon} size={16} className="text-primary" />
                    </div>
                    <span className="text-sm">{adv.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden border border-border glow-blue-sm">
                <img src={ABOUT_IMAGE} alt="3D принтер" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-card border border-border rounded-xl p-4 shadow-2xl">
                <div className="text-2xl font-black text-primary">100+</div>
                <div className="text-xs text-muted-foreground mt-0.5">заказов выполнено</div>
              </div>
              <div className="absolute -top-4 -right-4 bg-primary rounded-xl p-4 shadow-2xl glow-blue">
                <Icon name="Award" size={24} className="text-primary-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16 section-reveal">
            <span className="text-primary font-mono text-sm font-medium tracking-widest uppercase">Что я делаю</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3">Услуги мастерской</h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Полный цикл — от идеи и моделирования до готового изделия с постобработкой</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 section-reveal">
            {SERVICES.map((service) => (
              <div key={service.title} className="bg-card border border-border rounded-2xl p-6 card-hover group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                  <Icon name={service.icon} size={22} className="text-primary" />
                </div>
                <div className="text-xs font-mono text-primary/70 mb-2 uppercase tracking-wider">{service.tag}</div>
                <h3 className="font-bold text-lg mb-3 leading-snug">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
              </div>
            ))}

            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex flex-col sm:flex-row lg:flex-col justify-between card-hover col-span-1">
              <div>
                <div className="text-3xl mb-2">🚀</div>
                <h3 className="font-bold text-lg mb-1">Готовы к старту?</h3>
                <p className="text-muted-foreground text-sm">Отправьте файл — рассчитаю бесплатно</p>
              </div>
              <button onClick={() => scrollTo('prices')}
                className="mt-4 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-primary/90 transition-all shrink-0">
                Заявка <Icon name="ArrowRight" size={15} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 section-reveal">
            <span className="text-primary font-mono text-sm font-medium tracking-widest uppercase">Мои работы</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3">Портфолио</h2>
            <p className="text-muted-foreground mt-4 max-w-lg mx-auto">Примеры реально выполненных заказов</p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-10 section-reveal">
            {PORTFOLIO_FILTERS.map((f) => (
              <button key={f} onClick={() => setPortfolioFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${portfolioFilter === f ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:text-foreground'}`}>
                {f}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 section-reveal">
            {filtered.map((item, i) => (
              <div key={i} className="group bg-card border border-border rounded-xl overflow-hidden card-hover cursor-pointer">
                <div className="aspect-video flex items-center justify-center relative" style={{ background: `linear-gradient(135deg, ${item.color}15, ${item.color}05)` }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl" style={{ backgroundColor: item.color + '20', border: `1px solid ${item.color}30` }}>
                    {item.emoji}
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-xs font-mono mb-0.5 truncate" style={{ color: item.color }}>{item.category}</div>
                  <div className="font-semibold text-xs mb-1.5 leading-snug">{item.title}</div>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Icon name="Layers" size={10} />{item.material}</span>
                    <span className="flex items-center gap-1"><Icon name="Clock" size={10} />{item.days} {item.days === 1 ? 'день' : 'дня'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="py-24 bg-card/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-5 section-reveal">
            <span className="text-primary font-mono text-sm font-medium tracking-widest uppercase">Стоимость</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3">Цены</h2>
          </div>

          <div className="max-w-2xl mx-auto mb-12 section-reveal">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 text-center">
              <Icon name="Info" size={18} className="text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Окончательная стоимость рассчитывается индивидуально и зависит от размеров модели,
                материала, сложности печати и необходимой постобработки.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12 section-reveal">
            {PRICES.map((price, i) => (
              <div key={price.label} className={`bg-card border rounded-2xl p-6 card-hover ${i === 0 ? 'border-primary/30 glow-blue-sm' : 'border-border'}`}>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon name={price.icon} size={18} className="text-primary" />
                </div>
                <div className="text-xs text-muted-foreground font-mono mb-1">{price.size}</div>
                <div className="font-semibold mb-1">{price.label}</div>
                <div className="text-2xl font-black text-primary">{price.price}</div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto section-reveal">
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-black mb-3">Рассчитать стоимость</h3>
              <p className="text-muted-foreground mb-6 text-sm">Отправьте файл модели или опишите задачу — пришлю расчёт в течение нескольких часов</p>
              <div className="space-y-3">
                <input type="text" placeholder="Ваше имя"
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground" />
                <input type="tel" placeholder="Телефон или Telegram"
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground" />
                <textarea placeholder="Опишите задачу или прикрепите ссылку на файл" rows={3}
                  className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm outline-none focus:border-primary/50 transition-colors placeholder:text-muted-foreground resize-none" />
                <button className="w-full bg-primary text-primary-foreground py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 glow-blue-sm">
                  <Icon name="Send" size={16} />
                  Отправить для расчёта стоимости
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 section-reveal">
            <span className="text-primary font-mono text-sm font-medium tracking-widest uppercase">Вопросы</span>
            <h2 className="text-3xl sm:text-4xl font-black mt-3">Часто спрашивают</h2>
          </div>
          <div className="space-y-3 section-reveal">
            {FAQ.map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-secondary/50 transition-colors">
                  <span className="font-semibold text-sm pr-4">{item.q}</span>
                  <Icon name="ChevronDown" size={18} className={`text-primary shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border pt-4">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <Icon name="Printer" size={16} className="text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">3D<span className="text-primary">мастер</span></span>
            </button>

            <div className="flex flex-wrap gap-1 justify-center">
              {NAV_ITEMS.map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)}
                  className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {item.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-center">
              <a href="https://t.me/" className="w-9 h-9 rounded-lg bg-secondary border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary/30 transition-all">
                <Icon name="Send" size={16} className="text-muted-foreground" />
              </a>
              <a href="tel:+7" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Phone" size={14} />
                +7 (___) ___-__-__
              </a>
              <a href="mailto:farafonoffdk@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="Mail" size={14} />
                farafonoffdk@gmail.com
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-border/50 text-center text-xs text-muted-foreground">
            © 2024 3Dмастер · Профессиональная 3D-печать на заказ
          </div>
        </div>
      </footer>
    </div>
  );
}