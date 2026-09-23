import React from 'react'
import { Breadcrumb, TypeBadge, SectionTitle, CompactMaterialCard, CompactMaterial } from '../components/shared'
import { ArrowRight, CategoryIconSVG } from '../components/icons'

const MATERIALS: CompactMaterial[] = [
  { id: 1, type: 'book',  typeLabel: 'Книга',  title: 'Манас. Полный текст в записи Саякбая Каралаева', author: 'Саякбай Каралаев', country: 'Кыргызстан', year: 1958 },
  { id: 2, type: 'video', typeLabel: 'Видео',  title: 'Саякбай Каралаев. Архивная съёмка 1952',          author: 'Госархив КиргССР', country: 'Кыргызстан', year: 1952, img: 'https://images.unsplash.com/photo-1761872936089-1f90e87bf80d?w=240&h=160&fit=crop&auto=format' },
  { id: 3, type: 'audio', typeLabel: 'Аудио',  title: 'Шапак Рысмендеев. Фрагменты Манаса. 1965',       author: 'АН КиргССР',       country: 'Кыргызстан', year: 1965 },
  { id: 4, type: 'photo', typeLabel: 'Фото',   title: 'Беркутчи в горах Алтая',                         author: 'Экспедиция ИЭА',   country: 'Кыргызстан', year: 2017, img: 'https://images.unsplash.com/photo-1761872936183-255a939c463a?w=240&h=160&fit=crop&auto=format' },
]

const CATEGORIES = [
  { icon: 'speech',   title: 'Устные традиции и эпос',  count: 487 },
  { icon: 'music',    title: 'Музыка и исполнительство', count: 213 },
  { icon: 'craft',    title: 'Ремёсла и орнамент',       count: 341 },
  { icon: 'nature',   title: 'Природа и скотоводство',   count: 198 },
  { icon: 'arch',     title: 'Архитектура и жилище',     count: 156 },
  { icon: 'ritual',   title: 'Обряды и праздники',       count: 279 },
]

const REGIONS = ['Бишкек', 'Нарынская область', 'Иссык-Кульская область', 'Ошская область', 'Таласская область', 'Баткенская область', 'Джалал-Абадская область', 'Чуйская область']

const AUTHORS = [
  { name: 'Саякбай Каралаев', role: 'Манасчы', years: '1894–1971' },
  { name: 'Джусуп Мамай',     role: 'Манасчы', years: '1918–2014' },
  { name: 'Шапак Рысмендеев', role: 'Манасчы', years: '1939–2013' },
  { name: 'В. М. Плоских',    role: 'Исследователь', years: '1937–' },
]

export function CountryPage({ onNavigate }: { onNavigate?: (p: string) => void }) {
  return (
    <div style={{ background: '#FAF8F4', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: 420, overflow: 'hidden', background: '#0F2236' }}>
        <img
          src="https://images.unsplash.com/photo-1595496358672-2d175fcdd01a?w=1400&h=600&fit=crop&auto=format"
          alt="Кыргызстан — горные пейзажи"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.65 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,58,94,0.85) 0%, rgba(28,58,94,0.4) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end', padding: '0 0 52px 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', width: '100%' }}>
            <Breadcrumb items={[{ label: 'Мирас', page: 'home' }, { label: 'Страны', page: 'home' }, { label: 'Кыргызстан' }]} onNavigate={onNavigate} />
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 60, fontWeight: 700, color: 'white', lineHeight: 1.0, letterSpacing: '-0.03em', marginBottom: 8 }}>
              Кыргызстан
            </h1>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
              Кыргызстан
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>

        {/* Stats bar */}
        <div style={{ background: '#1C3A5E', borderRadius: '0 0 12px 12px', padding: '24px 36px', display: 'flex', gap: 48, marginBottom: 56 }}>
          {[
            { n: '2 156', label: 'Материалов' },
            { n: '47',    label: 'Авторов' },
            { n: '8',     label: 'Коллекций' },
            { n: '12',    label: 'Областей знания' },
            { n: '8',     label: 'Регионов' },
          ].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 30, fontWeight: 700, color: 'white', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9EB8D4', marginTop: 4, letterSpacing: '0.03em' }}>{s.label}</div>
            </div>
          ))}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <button onClick={() => onNavigate?.('catalog')} style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'white', background: '#B85A2A', border: 'none', borderRadius: 8, padding: '12px 24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              Все материалы Кыргызстана <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Introduction */}
        <div style={{ maxWidth: 720, marginBottom: 56 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#B85A2A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 12 }}>О стране</div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#3D3A36', lineHeight: 1.8, marginBottom: 14 }}>
            Кыргызстан — горная страна в сердце Центральной Азии, родина эпоса «Манас» и богатейших кочевых традиций. Коллекция Мирас охватывает фольклор, музыкальное наследие, традиционные знания, архитектуру и культуру кыргызского народа.
          </p>
        </div>

        {/* Knowledge categories */}
        <div style={{ marginBottom: 56 }}>
          <SectionTitle eyebrow="Традиционные знания" title="Области знания" action={{ label: 'Все категории', onClick: () => {} }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {CATEGORIES.map(cat => (
              <a key={cat.title} href="#" style={{ display: 'flex', gap: 14, padding: '18px 20px', background: 'white', border: '1px solid #E2DDD5', borderRadius: 10, textDecoration: 'none', transition: 'all 0.15s', alignItems: 'center' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = '#1C3A5E'; el.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#E2DDD5'; el.style.transform = 'translateY(0)' }}
              >
                <div style={{ color: '#1C3A5E', flexShrink: 0 }}><CategoryIconSVG type={cat.icon} /></div>
                <div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: '#1C1A17', lineHeight: 1.3, marginBottom: 4 }}>{cat.title}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490' }}>{cat.count} материалов</div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Featured materials */}
        <div style={{ marginBottom: 56 }}>
          <SectionTitle eyebrow="Материалы" title="Избранное" action={{ label: 'Весь каталог', onClick: () => onNavigate?.('catalog') }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
            {MATERIALS.map(mat => <CompactMaterialCard key={mat.id} mat={mat} onNavigate={onNavigate} />)}
          </div>
        </div>

        {/* Authors */}
        <div style={{ marginBottom: 56 }}>
          <SectionTitle eyebrow="Люди" title="Авторы и исполнители" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {AUTHORS.map(a => (
              <button key={a.name} onClick={() => onNavigate?.('author')} style={{ background: 'white', border: '1px solid #E2DDD5', borderRadius: 10, padding: '20px 18px', cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = '#1C3A5E'; el.style.transform = 'translateY(-1px)' }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#E2DDD5'; el.style.transform = 'translateY(0)' }}
              >
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #1C3A5E, #4A7FA0)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'white', marginBottom: 12 }}>{a.name[0]}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#1C1A17', marginBottom: 4 }}>{a.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#B85A2A' }}>{a.role}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490', marginTop: 2 }}>{a.years}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Regions */}
        <div style={{ marginBottom: 64 }}>
          <SectionTitle eyebrow="География" title="Регионы" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {REGIONS.map(r => (
              <button key={r} onClick={() => onNavigate?.('catalog')} style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#1C3A5E', background: '#EEF2F7', border: '1px solid #C8D8EB', borderRadius: 100, padding: '8px 20px', cursor: 'pointer', transition: 'all 0.15s' }}
                onMouseEnter={e => { (e.target as HTMLElement).style.background = '#dde7f2' }}
                onMouseLeave={e => { (e.target as HTMLElement).style.background = '#EEF2F7' }}
              >{r}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
