import React, { useState } from 'react'
import {
  SearchIcon, ArrowRight, ChevronDown, BookIcon, VideoIcon, AudioIcon,
  PhotoIcon, ArticleIcon, TKIcon, CategoryIconSVG,
} from '../components/icons'

// ─── Data ─────────────────────────────────────────────────────────────────────

const POPULAR_SEARCHES = ['Манас', 'Навруз', 'дутар', 'юрта', 'Шёлковый путь', 'батик', 'кумыс']

const KNOWLEDGE_CATEGORIES = [
  { id: 1,  title: 'Устные традиции, язык, эпос и фольклор',           count: 1847, icon: 'speech' },
  { id: 2,  title: 'Музыка, танец и исполнительское искусство',         count: 923,  icon: 'music' },
  { id: 3,  title: 'Обряды, праздники и жизненный цикл',               count: 756,  icon: 'ritual' },
  { id: 4,  title: 'Ремёсла, технологии, одежда и орнамент',           count: 1124, icon: 'craft' },
  { id: 5,  title: 'Природа, земледелие, скотоводство и пастбища',     count: 634,  icon: 'nature' },
  { id: 6,  title: 'Традиционное целительство и здоровье',             count: 412,  icon: 'healing' },
  { id: 7,  title: 'Календарь, астрономия и мировоззрение',            count: 289,  icon: 'star' },
  { id: 8,  title: 'Священные места и культурные ландшафты',           count: 367,  icon: 'landscape' },
  { id: 9,  title: 'Еда и кулинарные традиции',                        count: 518,  icon: 'food' },
  { id: 10, title: 'Архитектура и жилище',                             count: 445,  icon: 'arch' },
  { id: 11, title: 'Игры и состязания',                                count: 234,  icon: 'game' },
  { id: 12, title: 'Современные формы и сохранение',                   count: 678,  icon: 'preserve' },
]

const COUNTRIES = [
  { name: 'Казахстан',    native: 'Қазақстан',   materials: 3847, img: 'https://images.unsplash.com/photo-1770062630209-582373b6113b?w=640&h=420&fit=crop&auto=format' },
  { name: 'Кыргызстан',  native: 'Кыргызстан',  materials: 2156, img: 'https://images.unsplash.com/photo-1595496358672-2d175fcdd01a?w=640&h=420&fit=crop&auto=format' },
  { name: 'Таджикистан', native: 'Тоҷикистон',  materials: 1934, img: 'https://images.unsplash.com/photo-1761872936156-9a41f014754e?w=640&h=420&fit=crop&auto=format' },
  { name: 'Туркменистан',native: 'Türkmenistan', materials: 1456, img: 'https://images.unsplash.com/photo-1642514805906-a8307e41c3d7?w=640&h=420&fit=crop&auto=format' },
  { name: 'Узбекистан',  native: "O'zbekiston",  materials: 2734, img: 'https://images.unsplash.com/photo-1733586092622-1b3201e802a5?w=640&h=420&fit=crop&auto=format' },
]

const COLLECTIONS = [
  {
    id: 1, title: 'Эпос «Манас»: тексты, записи, исследования', count: 342, country: 'Кыргызстан',
    description: 'Полное собрание материалов по кыргызскому героическому эпосу — от рукописей XIX века до современных аудиозаписей манасчи.',
    img: 'https://images.unsplash.com/photo-1761872936089-1f90e87bf80d?w=700&h=460&fit=crop&auto=format',
  },
  {
    id: 2, title: 'Архитектурное наследие Шёлкового пути', count: 518, country: 'Узбекистан',
    description: 'Мечети, медресе, мавзолеи и крепости от Самарканда до Хивы. Фотоархивы, обмеры, историко-архитектурные исследования.',
    img: 'https://images.unsplash.com/photo-1733586092622-1b3201e802a5?w=700&h=460&fit=crop&auto=format',
  },
  {
    id: 3, title: 'Кочевая культура: юрта и её смыслы', count: 214, country: 'Казахстан · Кыргызстан',
    description: 'Конструкция, орнамент и обряды, связанные с жилищем кочевника. Полевые материалы из Казахстана и Кыргызстана.',
    img: 'https://images.unsplash.com/photo-1784035117363-ac1dffdead3a?w=700&h=460&fit=crop&auto=format',
  },
]

const TYPE_CFG: Record<string, { bg: string; fg: string; border: string; stripe: string; icon: React.ReactElement }> = {
  book:    { bg: '#EEF2F7', fg: '#1C3A5E', border: '#C8D8EB', stripe: '#1C3A5E', icon: <BookIcon /> },
  video:   { bg: '#F9EEE8', fg: '#7B2D00', border: '#E8C4B0', stripe: '#7B2D00', icon: <VideoIcon /> },
  audio:   { bg: '#F1EDF8', fg: '#4A1D6B', border: '#D3C0E8', stripe: '#4A1D6B', icon: <AudioIcon /> },
  photo:   { bg: '#EEF4EE', fg: '#1A4A1A', border: '#BDD8BD', stripe: '#2D6A2D', icon: <PhotoIcon /> },
  article: { bg: '#F4F1EE', fg: '#3D2B1A', border: '#D8CFCA', stripe: '#6B4226', icon: <ArticleIcon /> },
  tk:      { bg: '#F5F0E8', fg: '#5C3A00', border: '#D8C89A', stripe: '#5C3A00', icon: <TKIcon /> },
}

const MATERIALS = [
  { id: 1, type: 'book',    typeLabel: 'Книга',               title: 'Манас. Полный текст эпоса в записи Саякбая Каралаева',     author: 'Саякбай Каралаев',            country: 'Кыргызстан',              year: 1958, lang: 'Кыргызский',             img: null },
  { id: 2, type: 'video',   typeLabel: 'Видео',               title: 'Кюй для домбры. Концерт памяти Курмангазы',                author: 'Государственная филармония',   country: 'Казахстан',               year: 2019, lang: 'Казахский',               img: 'https://images.unsplash.com/photo-1761872936156-9a41f014754e?w=480&h=300&fit=crop&auto=format' },
  { id: 3, type: 'audio',   typeLabel: 'Аудио',               title: 'Шашмаком. Семь классических макомов Бухары',               author: 'Ансамбль «Шашмаком»',          country: 'Узбекистан · Таджикистан', year: 2003, lang: 'Таджикский',              img: null },
  { id: 4, type: 'photo',   typeLabel: 'Фото',                title: 'Беркутчи. Охота с орлом в горах Алтая',                   author: 'Экспедиция ИЭА РАН',           country: 'Казахстан',               year: 2017, lang: 'Русский',                 img: 'https://images.unsplash.com/photo-1761872936183-255a939c463a?w=480&h=300&fit=crop&auto=format' },
  { id: 5, type: 'article', typeLabel: 'Статья',              title: 'Навруз: история, семантика и современные трансформации',   author: 'Н. Р. Рашидова',               country: 'Таджикистан',             year: 2021, lang: 'Русский',                 img: null },
  { id: 6, type: 'tk',      typeLabel: 'Традиционные знания', title: 'Приготовление курута: технология, сезонность и передача',  author: 'Айгуль Маматова',              country: 'Кыргызстан',              year: 2022, lang: 'Кыргызский · Русский',    img: null },
]

// ─── Section components ───────────────────────────────────────────────────────

function TypeBadge({ type, label }: { type: string; label: string }) {
  const cfg = TYPE_CFG[type]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: cfg?.bg || '#EEE', color: cfg?.fg || '#333', border: `1px solid ${cfg?.border || '#DDD'}`,
      borderRadius: 4, padding: '3px 8px', fontFamily: 'var(--font-mono)', fontSize: 10.5,
      letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0,
    }}>
      {cfg?.icon}{label}
    </span>
  )
}

function Hero({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [search, setSearch] = useState('')
  return (
    <section style={{ display: 'grid', gridTemplateColumns: '1fr 420px', minHeight: 'calc(100vh - 64px)', maxHeight: 760 }}>
      <div style={{ background: '#1C3A5E', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px 64px 64px 80px' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9EB8D4', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 24 }}>
          Казахстан · Кыргызстан · Таджикистан · Туркменистан · Узбекистан
        </div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 54, color: '#FAF8F4', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24, maxWidth: 560 }}>
          Культура и традиционные знания Центральной Азии
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, fontWeight: 300, color: '#AFC6DC', lineHeight: 1.65, marginBottom: 40, maxWidth: 500 }}>
          Открытая цифровая библиотека книг, статей, видео, аудио, фотографий и традиционных знаний пяти стран. Для исследователей, студентов и всех, кому важна живая культура региона.
        </p>
        <div style={{ position: 'relative', maxWidth: 540 }}>
          <div style={{ display: 'flex', background: 'white', borderRadius: 10, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', color: '#756E65', flexShrink: 0 }}>
              <SearchIcon size={22} />
            </div>
            <input
              type="text" value={search} onChange={e => setSearch(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') onNavigate?.('catalog') }}
              placeholder="Найдите книги, видео, аудио, фото, авторов…"
              style={{ flex: 1, border: 'none', outline: 'none', padding: '18px 8px', fontFamily: 'var(--font-body)', fontSize: 16, color: '#1C1A17', background: 'transparent' }}
            />
            <button
              onClick={() => onNavigate?.('catalog')}
              style={{ background: '#B85A2A', border: 'none', padding: '0 28px', color: 'white', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, cursor: 'pointer', flexShrink: 0, transition: 'background 0.15s' }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = '#9A4A22' }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = '#B85A2A' }}
            >Найти</button>
          </div>
        </div>
        <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6E8DA8', letterSpacing: '0.05em' }}>Популярное:</span>
          {POPULAR_SEARCHES.map(term => (
            <button key={term} onClick={() => onNavigate?.('catalog')} style={{
              fontFamily: 'var(--font-body)', fontSize: 13, color: '#AFC6DC',
              background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 100, padding: '4px 14px', cursor: 'pointer', transition: 'all 0.15s',
            }}
              onMouseEnter={e => { const el = e.target as HTMLElement; el.style.background = 'rgba(255,255,255,0.15)'; el.style.color = '#FAF8F4' }}
              onMouseLeave={e => { const el = e.target as HTMLElement; el.style.background = 'rgba(255,255,255,0.08)'; el.style.color = '#AFC6DC' }}
            >{term}</button>
          ))}
        </div>
        <div style={{ marginTop: 56, display: 'flex', gap: 40 }}>
          {[{ n: '12 300+', label: 'материалов' }, { n: '5', label: 'стран' }, { n: '6', label: 'форматов' }].map(s => (
            <div key={s.label}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, color: '#FAF8F4', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6E8DA8', marginTop: 4, letterSpacing: '0.05em' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ position: 'relative', overflow: 'hidden', background: '#0F2236' }}>
        <img src="https://images.unsplash.com/photo-1761872936089-1f90e87bf80d?w=840&h=1000&fit=crop&auto=format" alt="Беркутчи на коне с орлом на закате"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.88 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(28,58,94,0.45) 0%, transparent 50%)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 24, right: 24, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em' }}>
          Беркутчи · Казахстан
        </div>
      </div>
    </section>
  )
}

function KnowledgeCategories() {
  return (
    <section style={{ background: '#F0EBE2', padding: '80px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#B85A2A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Традиционные знания</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 600, color: '#1C1A17', lineHeight: 1.15, letterSpacing: '-0.01em' }}>Области знания</h2>
          </div>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: '#B85A2A', textDecoration: 'none' }}>
            Все категории <ArrowRight />
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {KNOWLEDGE_CATEGORIES.map(cat => (
            <a key={cat.id} href="#" style={{ background: 'white', border: '1px solid #DDD8CF', borderRadius: 10, padding: '24px 22px', textDecoration: 'none', display: 'block', transition: 'all 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = '#1C3A5E'; el.style.boxShadow = '0 4px 20px rgba(28,58,94,0.10)'; el.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#DDD8CF'; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)' }}
            >
              <div style={{ color: '#1C3A5E', marginBottom: 14 }}><CategoryIconSVG type={cat.icon} /></div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: '#1C1A17', lineHeight: 1.4, marginBottom: 12 }}>{cat.title}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#756E65', letterSpacing: '0.03em' }}>{cat.count.toLocaleString('ru-RU')} материалов</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function Countries() {
  return (
    <section style={{ background: '#FAF8F4', padding: '80px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#B85A2A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>География</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 600, color: '#1C1A17', lineHeight: 1.15, letterSpacing: '-0.01em' }}>Страны и регионы</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
          {COUNTRIES.map(c => (
            <a key={c.name} href="#" style={{ display: 'block', position: 'relative', borderRadius: 10, overflow: 'hidden', aspectRatio: '3 / 4', textDecoration: 'none', background: '#1C3A5E', cursor: 'pointer' }}
              onMouseEnter={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if (img) img.style.opacity = '1' }}
              onMouseLeave={e => { const img = e.currentTarget.querySelector('img') as HTMLImageElement; if (img) img.style.opacity = '0.72' }}
            >
              <img src={c.img} alt={c.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', opacity: 0.72, transition: 'opacity 0.3s' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 60%, transparent 100%)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 20px 22px' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'white', lineHeight: 1.2, marginBottom: 4 }}>{c.name}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{c.native}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 10, letterSpacing: '0.03em' }}>
                  {c.materials.toLocaleString('ru-RU')} материалов
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedCollections() {
  return (
    <section style={{ background: '#1C3A5E', padding: '80px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9EB8D4', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Коллекции</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 600, color: '#FAF8F4', lineHeight: 1.15, letterSpacing: '-0.01em' }}>Тематические подборки</h2>
          </div>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: '#AFC6DC', textDecoration: 'none' }}>
            Все коллекции <ArrowRight />
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
          {COLLECTIONS.map(col => (
            <a key={col.id} href="#" style={{ display: 'block', textDecoration: 'none', background: 'white', borderRadius: 12, overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 12px 40px rgba(0,0,0,0.25)' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none' }}
            >
              <div style={{ height: 200, overflow: 'hidden', background: '#1C3A5E' }}>
                <img src={col.img} alt={col.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: '24px 24px 28px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#B85A2A', letterSpacing: '0.05em', marginBottom: 10 }}>{col.country}</div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: '#1C1A17', lineHeight: 1.3, marginBottom: 12 }}>{col.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#5A5550', lineHeight: 1.6, marginBottom: 20 }}>{col.description}</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#756E65' }}>{col.count} материалов</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#1C3A5E' }}>
                    Открыть <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedMaterials() {
  return (
    <section style={{ background: '#F0EBE2', padding: '80px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#B85A2A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Материалы</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 600, color: '#1C1A17', lineHeight: 1.15, letterSpacing: '-0.01em' }}>Недавно добавленные</h2>
          </div>
          <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500, color: '#B85A2A', textDecoration: 'none' }}>
            Весь каталог <ArrowRight />
          </a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {MATERIALS.map(mat => {
            const cfg = TYPE_CFG[mat.type]
            return (
              <a key={mat.id} href="#" style={{ display: 'block', textDecoration: 'none', background: 'white', border: '1px solid #DDD8CF', borderRadius: 10, overflow: 'hidden', transition: 'all 0.2s' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = '#1C3A5E'; el.style.boxShadow = '0 4px 20px rgba(28,58,94,0.10)'; el.style.transform = 'translateY(-2px)' }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#DDD8CF'; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)' }}
              >
                {mat.img
                  ? <div style={{ height: 160, overflow: 'hidden', background: '#1C3A5E' }}><img src={mat.img} alt={mat.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>
                  : <div style={{ height: 8, background: cfg?.stripe || '#1C3A5E' }} />
                }
                <div style={{ padding: '20px 22px 24px' }}>
                  <div style={{ marginBottom: 14 }}><TypeBadge type={mat.type} label={mat.typeLabel} /></div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: '#1C1A17', lineHeight: 1.35, marginBottom: 14, letterSpacing: '-0.01em' }}>{mat.title}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    {mat.author && <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#5A5550' }}>{mat.author}</div>}
                    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490' }}>
                      <span>{mat.country}</span>{mat.year && <span>{mat.year}</span>}<span>{mat.lang}</span>
                    </div>
                  </div>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function AboutSection() {
  const stats = [
    { n: '12 300+', label: 'Единиц хранения' },
    { n: '5', label: 'Стран-участников' },
    { n: '320+', label: 'Авторов и сообществ' },
    { n: '1920—', label: 'Временной охват' },
  ]
  return (
    <section style={{ background: '#FAF8F4', padding: '96px 0', borderTop: '1px solid #DDD8CF' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#B85A2A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>О проекте</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 600, color: '#1C1A17', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 28 }}>
              Открытый доступ к живому наследию
            </h2>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, fontWeight: 300, color: '#3D3A36', lineHeight: 1.7, marginBottom: 20 }}>
              «Мирас» — цифровая платформа, объединяющая культурное и традиционное знание пяти стран Центральной Азии. Проект создаётся совместно с научными институтами, университетами, архивами и носителями традиций.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, fontWeight: 300, color: '#3D3A36', lineHeight: 1.7, marginBottom: 36 }}>
              Каждый материал проходит экспертную верификацию. Мы стремимся не только сохранить, но и сделать доступным то, что раньше существовало только в архивах или в памяти людей.
            </p>
            <div style={{ display: 'flex', gap: 16 }}>
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1C3A5E', color: 'white', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, padding: '14px 28px', borderRadius: 8, transition: 'background 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#0F2236' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#1C3A5E' }}
              >
                О проекте <ArrowRight size={16} />
              </a>
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #1C3A5E', color: '#1C3A5E', textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, padding: '14px 28px', borderRadius: 8, transition: 'all 0.15s' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#1C3A5E'; el.style.color = 'white' }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = '#1C3A5E' }}
              >
                Для исследователей
              </a>
            </div>
          </div>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, borderRadius: 12, overflow: 'hidden', border: '1px solid #DDD8CF' }}>
              {stats.map((stat, i) => (
                <div key={stat.label} style={{ padding: '36px 32px', background: i % 2 === 0 ? 'white' : '#F7F4F0', borderRight: i % 2 === 0 ? '1px solid #DDD8CF' : 'none', borderBottom: i < 2 ? '1px solid #DDD8CF' : 'none' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 700, color: '#1C3A5E', lineHeight: 1, marginBottom: 10, letterSpacing: '-0.02em' }}>{stat.n}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#756E65', letterSpacing: '0.03em' }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, padding: '20px 24px', background: '#F0EBE2', borderRadius: 10 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#756E65', letterSpacing: '0.05em', marginBottom: 6 }}>ПАРТНЁРЫ ПРОЕКТА</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#3D3A36', lineHeight: 1.5 }}>
                Научные академии, университеты, национальные библиотеки и архивы пяти стран Центральной Азии.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── HomePage export ──────────────────────────────────────────────────────────

export function HomePage({ onNavigate }: { onNavigate?: (p: string) => void }) {
  return (
    <>
      <Hero onNavigate={onNavigate} />
      <KnowledgeCategories />
      <Countries />
      <FeaturedCollections />
      <FeaturedMaterials />
      <AboutSection />
    </>
  )
}
