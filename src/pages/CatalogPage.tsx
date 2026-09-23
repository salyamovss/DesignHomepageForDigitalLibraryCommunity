import React, { useState, useMemo } from 'react'
import {
  SearchIcon, BookIcon, VideoIcon, AudioIcon, PhotoIcon, ArticleIcon, TKIcon,
  XIcon, FilterIcon, ListIcon, GridIcon, ChevronDown, ChevronRight, ArrowRight,
} from '../components/icons'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Material {
  id: number
  type: 'book' | 'article' | 'video' | 'audio' | 'photo' | 'tk'
  typeLabel: string
  title: string
  author: string
  country: string
  year: number | null
  language: string
  description: string
  img: string | null
  knowledgeArea: string
  region: string
  hasFile: boolean
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ALL_MATERIALS: Material[] = [
  {
    id: 1, type: 'book', typeLabel: 'Книга',
    title: 'Манас. Полный текст эпоса в записи Саякбая Каралаева',
    author: 'Саякбай Каралаев', country: 'Кыргызстан', year: 1958,
    language: 'Кыргызский', hasFile: true,
    knowledgeArea: 'Устные традиции, язык, эпос и фольклор', region: 'Иссык-Кульская область',
    description: 'Наиболее полная версия кыргызского героического эпоса, записанная выдающимся манасчи XX века. Включает все три части трилогии: Манас, Семетей, Сейтек.',
    img: null,
  },
  {
    id: 2, type: 'video', typeLabel: 'Видео',
    title: 'Кюй для домбры. Концерт памяти Курмангазы',
    author: 'Государственная филармония Казахстана', country: 'Казахстан', year: 2019,
    language: 'Казахский', hasFile: true,
    knowledgeArea: 'Музыка, танец и исполнительское искусство', region: 'Алматы',
    description: 'Ежегодный мемориальный концерт, посвящённый великому кюйши. В программе — произведения самого Курмангазы в исполнении современных домбристов.',
    img: 'https://images.unsplash.com/photo-1761872936156-9a41f014754e?w=240&h=160&fit=crop&auto=format',
  },
  {
    id: 3, type: 'audio', typeLabel: 'Аудио',
    title: 'Шашмаком. Семь классических макомов Бухары',
    author: 'Ансамбль «Шашмаком»', country: 'Узбекистан', year: 2003,
    language: 'Таджикский', hasFile: true,
    knowledgeArea: 'Музыка, танец и исполнительское искусство', region: 'Бухарская область',
    description: 'Архивная запись полного цикла бухарских макомов — классического музыкального наследия, включённого в список ЮНЕСКО в 2003 году.',
    img: null,
  },
  {
    id: 4, type: 'photo', typeLabel: 'Фото',
    title: 'Беркутчи. Охота с орлом в горах Алтая. Фотоархив экспедиции',
    author: 'Экспедиция ИЭА РАН', country: 'Казахстан', year: 2017,
    language: 'Русский', hasFile: true,
    knowledgeArea: 'Природа, земледелие, скотоводство и пастбища', region: 'Восточно-Казахстанская область',
    description: '147 документальных фотографий традиционной охоты с беркутом. Запись технологии подготовки птицы, снаряжения и ритуалов охотничьего сезона.',
    img: 'https://images.unsplash.com/photo-1761872936183-255a939c463a?w=240&h=160&fit=crop&auto=format',
  },
  {
    id: 5, type: 'article', typeLabel: 'Статья',
    title: 'Навруз: история, семантика и современные трансформации праздника',
    author: 'Н. Р. Рашидова', country: 'Таджикистан', year: 2021,
    language: 'Русский', hasFile: true,
    knowledgeArea: 'Обряды, праздники и жизненный цикл', region: 'Душанбе',
    description: 'Историко-этнографическое исследование весеннего новолетия в Центральной Азии. Анализируются региональные различия в ритуальной практике и трансформации праздника в советский и постсоветский периоды.',
    img: null,
  },
  {
    id: 6, type: 'tk', typeLabel: 'Традиционные знания',
    title: 'Приготовление курута: технология, сезонность и передача знания',
    author: 'Айгуль Маматова', country: 'Кыргызстан', year: 2022,
    language: 'Кыргызский · Русский', hasFile: true,
    knowledgeArea: 'Еда и кулинарные традиции', region: 'Нарынская область',
    description: 'Полевая документация полного цикла изготовления курута — традиционного кисломолочного продукта. Зафиксированы знания мастера в трёх поколениях семьи из Нарынской области.',
    img: null,
  },
  {
    id: 7, type: 'book', typeLabel: 'Книга',
    title: 'Диван лугат ат-тюрк. Словарь тюркских языков',
    author: 'Махмуд аль-Кашгари', country: 'Узбекистан', year: 1072,
    language: 'Арабский · Тюркский', hasFile: true,
    knowledgeArea: 'Устные традиции, язык, эпос и фольклор', region: 'Кашгар',
    description: 'Факсимильное издание энциклопедического словаря тюркских языков XI века — важнейшего источника по истории языка, этнографии и географии тюркских народов.',
    img: null,
  },
  {
    id: 8, type: 'video', typeLabel: 'Видео',
    title: 'Юрта. Документальный фильм о строительстве и обустройстве',
    author: 'Студия «Ала-Тоо»', country: 'Кыргызстан', year: 2015,
    language: 'Кыргызский', hasFile: false,
    knowledgeArea: 'Архитектура и жилище', region: 'Чуйская область',
    description: '52-минутный документальный фильм. Съёмки подлинного процесса установки юрты, включая изготовление решётчатого каркаса, войлочных покрытий и внутреннего убранства.',
    img: 'https://images.unsplash.com/photo-1779522241041-54c64c99bf73?w=240&h=160&fit=crop&auto=format',
  },
  {
    id: 9, type: 'article', typeLabel: 'Статья',
    title: 'Орнамент «гёль» в туркменских коврах: семантика и типология',
    author: 'М. Дурдыев, А. Мурадова', country: 'Туркменистан', year: 2019,
    language: 'Туркменский · Русский', hasFile: true,
    knowledgeArea: 'Ремёсла, технологии, одежда и орнамент', region: 'Ашхабад',
    description: 'Систематизация основных типов медальона «гёль» в туркменском ковроткачестве. Рассматривается связь орнамента с родоплеменной идентичностью и геральдической функцией.',
    img: null,
  },
  {
    id: 10, type: 'photo', typeLabel: 'Фото',
    title: 'Архитектурный комплекс Регистан. Фотодокументация 1965–1970',
    author: 'Архив Института истории АН УзССР', country: 'Узбекистан', year: 1970,
    language: 'Русский', hasFile: true,
    knowledgeArea: 'Архитектура и жилище', region: 'Самарканд',
    description: '320 архивных фотографий ансамбля Регистан, сделанных в период реставрационных работ. Уникальные виды деталей декора, недоступных после завершения реставрации.',
    img: 'https://images.unsplash.com/photo-1733586092622-1b3201e802a5?w=240&h=160&fit=crop&auto=format',
  },
  {
    id: 11, type: 'tk', typeLabel: 'Традиционные знания',
    title: 'Народная медицина таджиков Горного Бадахшана: травы и практики',
    author: 'Полевая экспедиция ИЭА, д-р Ш. Назаров', country: 'Таджикистан', year: 2020,
    language: 'Шугнанский · Таджикский', hasFile: true,
    knowledgeArea: 'Традиционное целительство и здоровье', region: 'Горный Бадахшан',
    description: 'Документация лекарственных растений высокогорья и практик их применения. Интервью с 14 народными целителями, ботанический атлас 78 видов растений.',
    img: null,
  },
  {
    id: 12, type: 'book', typeLabel: 'Книга',
    title: 'Алпамыш. Узбекский народный эпос',
    author: 'В собирании Фазила Юлдаша', country: 'Узбекистан', year: 1939,
    language: 'Узбекский', hasFile: true,
    knowledgeArea: 'Устные традиции, язык, эпос и фольклор', region: 'Сурхандарьинская область',
    description: 'Классическая запись узбекского героического эпоса «Алпамыш» от сказителя Фазила Юлдаша. Текст включает более 14 000 стихотворных строк.',
    img: null,
  },
]

const KNOWLEDGE_AREAS = [
  'Устные традиции, язык, эпос и фольклор',
  'Музыка, танец и исполнительское искусство',
  'Обряды, праздники и жизненный цикл',
  'Ремёсла, технологии, одежда и орнамент',
  'Природа, земледелие, скотоводство и пастбища',
  'Традиционное целительство и здоровье',
  'Календарь, астрономия и мировоззрение',
  'Священные места и культурные ландшафты',
  'Еда и кулинарные традиции',
  'Архитектура и жилище',
  'Игры и состязания',
  'Современные формы и сохранение',
]

const LANGUAGES = [
  'Казахский', 'Кыргызский', 'Таджикский', 'Туркменский', 'Узбекский',
  'Русский', 'Арабский', 'Персидский', 'Шугнанский', 'Тюркский',
]

// ─── Type config ──────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<string, { bg: string; fg: string; border: string; stripe: string; icon: React.ReactElement; label: string; count: number }> = {
  book:    { bg: '#EEF2F7', fg: '#1C3A5E', border: '#C8D8EB', stripe: '#1C3A5E', icon: <BookIcon />,    label: 'Книга',                  count: 3847 },
  article: { bg: '#F4F1EE', fg: '#3D2B1A', border: '#D8CFCA', stripe: '#6B4226', icon: <ArticleIcon />, label: 'Статья',                 count: 2134 },
  video:   { bg: '#F9EEE8', fg: '#7B2D00', border: '#E8C4B0', stripe: '#7B2D00', icon: <VideoIcon />,   label: 'Видео',                  count: 1923 },
  audio:   { bg: '#F1EDF8', fg: '#4A1D6B', border: '#D3C0E8', stripe: '#4A1D6B', icon: <AudioIcon />,   label: 'Аудио',                  count: 456  },
  photo:   { bg: '#EEF4EE', fg: '#1A4A1A', border: '#BDD8BD', stripe: '#2D6A2D', icon: <PhotoIcon />,   label: 'Фото',                   count: 2677 },
  tk:      { bg: '#F5F0E8', fg: '#5C3A00', border: '#D8C89A', stripe: '#5C3A00', icon: <TKIcon />,      label: 'Традиционные знания',    count: 1263 },
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypeBadge({ type, label }: { type: string; label: string }) {
  const cfg = TYPE_CONFIG[type]
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: cfg?.bg || '#EEE', color: cfg?.fg || '#333',
      border: `1px solid ${cfg?.border || '#DDD'}`,
      borderRadius: 4, padding: '3px 8px',
      fontFamily: 'var(--font-mono)', fontSize: 10.5,
      letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0,
    }}>
      {cfg?.icon}{label}
    </span>
  )
}

function Checkbox({ checked, onChange, label, count }: { checked: boolean; onChange: () => void; label: string; count?: number }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '5px 0', userSelect: 'none' }}>
      <div
        onClick={onChange}
        style={{
          width: 16, height: 16, borderRadius: 3, flexShrink: 0,
          border: `1.5px solid ${checked ? '#1C3A5E' : '#C4BFB6'}`,
          background: checked ? '#1C3A5E' : 'white',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s',
        }}
      >
        {checked && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: checked ? '#1C1A17' : '#4A4540', flex: 1 }}>
        {label}
      </span>
      {count !== undefined && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490' }}>
          {count.toLocaleString('ru-RU')}
        </span>
      )}
    </label>
  )
}

function FilterSection({ title, children, defaultOpen = true }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: '1px solid #E8E3DA', paddingBottom: open ? 16 : 0 }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          width: '100%', padding: '16px 0', background: 'none', border: 'none',
          cursor: 'pointer', textAlign: 'left',
        }}
      >
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#1C1A17', letterSpacing: '0.01em' }}>
          {title}
        </span>
        <div style={{ color: '#756E65', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
          <ChevronDown size={15} />
        </div>
      </button>
      {open && <div style={{ paddingBottom: 4 }}>{children}</div>}
    </div>
  )
}

function MaterialCardList({ mat, searchQuery }: { mat: Material; searchQuery: string }) {
  const cfg = TYPE_CONFIG[mat.type]

  const highlight = (text: string) => {
    if (!searchQuery.trim()) return text
    const idx = text.toLowerCase().indexOf(searchQuery.toLowerCase())
    if (idx === -1) return text
    return (
      <>
        {text.slice(0, idx)}
        <mark style={{ background: '#FFF3C4', color: 'inherit', borderRadius: 2 }}>
          {text.slice(idx, idx + searchQuery.length)}
        </mark>
        {text.slice(idx + searchQuery.length)}
      </>
    )
  }

  return (
    <a
      href="#"
      style={{
        display: 'flex', gap: 0, textDecoration: 'none',
        background: 'white', border: '1px solid #E2DDD5', borderRadius: 10,
        overflow: 'hidden', transition: 'all 0.18s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.borderColor = '#1C3A5E'
        el.style.boxShadow = '0 4px 20px rgba(28,58,94,0.09)'
        el.style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.borderColor = '#E2DDD5'
        el.style.boxShadow = 'none'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* Type stripe */}
      <div style={{ width: 4, background: cfg?.stripe || '#1C3A5E', flexShrink: 0 }} />

      {/* Thumbnail (visual types only) */}
      {mat.img && (
        <div style={{ width: 140, flexShrink: 0, background: '#E0D9CF', overflow: 'hidden' }}>
          <img src={mat.img} alt={mat.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
        {/* Type badge + year */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <TypeBadge type={mat.type} label={mat.typeLabel} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            {mat.hasFile && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#2D6A2D', background: '#EEF4EE', border: '1px solid #BDD8BD', borderRadius: 3, padding: '2px 7px', letterSpacing: '0.06em' }}>
                ФАЙЛ
              </span>
            )}
            {mat.year && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490' }}>{mat.year}</span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'var(--font-display)', fontSize: 17.5, fontWeight: 600,
          color: '#1C1A17', lineHeight: 1.3, letterSpacing: '-0.01em', margin: 0,
        }}>
          {highlight(mat.title)}
        </h3>

        {/* Metadata row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 16px', fontFamily: 'var(--font-mono)', fontSize: 11.5, color: '#7A7470' }}>
          {mat.author && <span>{mat.author}</span>}
          <span style={{ color: '#B85A2A' }}>{mat.country}</span>
          <span>{mat.language}</span>
          <span>{mat.knowledgeArea}</span>
        </div>

        {/* Description */}
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 14, color: '#5A5550', lineHeight: 1.6,
          margin: 0, display: '-webkit-box', WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {highlight(mat.description)}
        </p>
      </div>
    </a>
  )
}

function MaterialCardGrid({ mat }: { mat: Material }) {
  const cfg = TYPE_CONFIG[mat.type]
  return (
    <a
      href="#"
      style={{
        display: 'block', textDecoration: 'none',
        background: 'white', border: '1px solid #E2DDD5',
        borderRadius: 10, overflow: 'hidden', transition: 'all 0.18s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.borderColor = '#1C3A5E'
        el.style.boxShadow = '0 4px 20px rgba(28,58,94,0.09)'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.borderColor = '#E2DDD5'
        el.style.boxShadow = 'none'
        el.style.transform = 'translateY(0)'
      }}
    >
      {mat.img ? (
        <div style={{ height: 140, background: '#E0D9CF', overflow: 'hidden' }}>
          <img src={mat.img} alt={mat.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      ) : (
        <div style={{ height: 6, background: cfg?.stripe || '#1C3A5E' }} />
      )}
      <div style={{ padding: '16px 18px 20px' }}>
        <div style={{ marginBottom: 10 }}><TypeBadge type={mat.type} label={mat.typeLabel} /></div>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 15.5, fontWeight: 600, color: '#1C1A17', lineHeight: 1.35, margin: '0 0 10px', letterSpacing: '-0.01em',
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {mat.title}
        </h3>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#7A7470', display: 'flex', flexDirection: 'column', gap: 3 }}>
          {mat.author && <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{mat.author}</span>}
          <span style={{ color: '#B85A2A' }}>{mat.country}{mat.year ? ` · ${mat.year}` : ''}</span>
        </div>
      </div>
    </a>
  )
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '80px 24px', textAlign: 'center' }}>
      <div style={{ width: 64, height: 64, background: '#F0EBE2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, color: '#B0A99E' }}>
        <SearchIcon size={28} />
      </div>
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, color: '#1C1A17', marginBottom: 12 }}>
        Материалы не найдены
      </h3>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#756E65', lineHeight: 1.6, maxWidth: 380, marginBottom: 32 }}>
        По вашему запросу ничего не найдено. Попробуйте изменить поисковый запрос или сбросить выбранные фильтры.
      </p>
      <button
        onClick={onReset}
        style={{
          fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
          color: 'white', background: '#1C3A5E', border: 'none',
          borderRadius: 8, padding: '12px 28px', cursor: 'pointer',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => { (e.target as HTMLElement).style.background = '#0F2236' }}
        onMouseLeave={e => { (e.target as HTMLElement).style.background = '#1C3A5E' }}
      >
        Сбросить фильтры
      </button>
    </div>
  )
}

// ─── Main Catalog Page ────────────────────────────────────────────────────────

export function CatalogPage({ onNavigate }: { onNavigate?: (p: string) => void } = {}) {
  const [searchQuery, setSearchQuery]       = useState('')
  const [inputValue, setInputValue]         = useState('')
  const [selectedTypes, setSelectedTypes]   = useState<string[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [selectedLanguage, setSelectedLanguage]   = useState('')
  const [selectedKA, setSelectedKA]         = useState('')
  const [fileOnly, setFileOnly]             = useState(false)
  const [sortBy, setSortBy]                 = useState('Релевантность')
  const [viewMode, setViewMode]             = useState<'list' | 'grid'>('list')
  const [currentPage, setCurrentPage]       = useState(1)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [sortOpen, setSortOpen]             = useState(false)
  const ITEMS_PER_PAGE = 8

  const COUNTRIES_FILTER = [
    { name: 'Казахстан',    count: 3847 },
    { name: 'Кыргызстан',  count: 2156 },
    { name: 'Таджикистан', count: 1934 },
    { name: 'Туркменистан',count: 1456 },
    { name: 'Узбекистан',  count: 2734 },
  ]

  const toggleType = (t: string) => setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  const toggleCountry = (c: string) => setSelectedCountries(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])

  const resetAll = () => {
    setSearchQuery(''); setInputValue(''); setSelectedTypes([])
    setSelectedCountries([]); setSelectedLanguage(''); setSelectedKA(''); setFileOnly(false)
    setCurrentPage(1)
  }

  const activeFilters: { label: string; onRemove: () => void }[] = [
    ...selectedTypes.map(t => ({ label: TYPE_CONFIG[t]?.label || t, onRemove: () => toggleType(t) })),
    ...selectedCountries.map(c => ({ label: c, onRemove: () => toggleCountry(c) })),
    ...(selectedLanguage ? [{ label: selectedLanguage, onRemove: () => setSelectedLanguage('') }] : []),
    ...(selectedKA ? [{ label: selectedKA.length > 30 ? selectedKA.slice(0, 30) + '…' : selectedKA, onRemove: () => setSelectedKA('') }] : []),
    ...(fileOnly ? [{ label: 'Только с файлом', onRemove: () => setFileOnly(false) }] : []),
  ]

  const filtered = useMemo(() => {
    let result = ALL_MATERIALS
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(m =>
        m.title.toLowerCase().includes(q) ||
        m.author.toLowerCase().includes(q) ||
        m.description.toLowerCase().includes(q) ||
        m.country.toLowerCase().includes(q)
      )
    }
    if (selectedTypes.length)     result = result.filter(m => selectedTypes.includes(m.type))
    if (selectedCountries.length) result = result.filter(m => selectedCountries.some(c => m.country.includes(c)))
    if (selectedLanguage)         result = result.filter(m => m.language.includes(selectedLanguage))
    if (selectedKA)               result = result.filter(m => m.knowledgeArea === selectedKA)
    if (fileOnly)                 result = result.filter(m => m.hasFile)
    if (sortBy === 'По названию') result = [...result].sort((a, b) => a.title.localeCompare(b.title, 'ru'))
    if (sortBy === 'Новые')       result = [...result].sort((a, b) => (b.year || 0) - (a.year || 0))
    return result
  }, [searchQuery, selectedTypes, selectedCountries, selectedLanguage, selectedKA, fileOnly, sortBy])

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

  const handleSearch = () => { setSearchQuery(inputValue); setCurrentPage(1) }
  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleSearch() }

  // ─── Filter sidebar (shared between desktop and mobile drawer) ─────────────

  const FilterSidebar = () => (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, paddingBottom: 16, borderBottom: '1px solid #E8E3DA' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#1C1A17' }}>Фильтры</span>
        {activeFilters.length > 0 && (
          <button onClick={resetAll} style={{
            fontFamily: 'var(--font-body)', fontSize: 12, color: '#B85A2A',
            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
            textDecoration: 'underline', textUnderlineOffset: 2,
          }}>
            Сбросить всё
          </button>
        )}
      </div>

      {/* Type */}
      <FilterSection title="Тип материала">
        {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
          <Checkbox key={key} checked={selectedTypes.includes(key)} onChange={() => { toggleType(key); setCurrentPage(1) }}
            label={cfg.label} count={cfg.count} />
        ))}
      </FilterSection>

      {/* Knowledge Area */}
      <FilterSection title="Область знания" defaultOpen={false}>
        <div style={{ marginBottom: 8 }}>
          <select
            value={selectedKA}
            onChange={e => { setSelectedKA(e.target.value); setCurrentPage(1) }}
            style={{
              width: '100%', padding: '9px 12px', borderRadius: 6,
              border: '1px solid #D0CBC2', background: 'white',
              fontFamily: 'var(--font-body)', fontSize: 13, color: selectedKA ? '#1C1A17' : '#9A9490',
              cursor: 'pointer', appearance: 'none',
            }}
          >
            <option value="">Все области</option>
            {KNOWLEDGE_AREAS.map(ka => <option key={ka} value={ka}>{ka}</option>)}
          </select>
        </div>
      </FilterSection>

      {/* Countries */}
      <FilterSection title="Страна">
        {COUNTRIES_FILTER.map(c => (
          <Checkbox key={c.name} checked={selectedCountries.includes(c.name)}
            onChange={() => { toggleCountry(c.name); setCurrentPage(1) }}
            label={c.name} count={c.count} />
        ))}
      </FilterSection>

      {/* Language */}
      <FilterSection title="Язык" defaultOpen={false}>
        <select value={selectedLanguage} onChange={e => { setSelectedLanguage(e.target.value); setCurrentPage(1) }} style={{
          width: '100%', padding: '9px 12px', borderRadius: 6, border: '1px solid #D0CBC2',
          background: 'white', fontFamily: 'var(--font-body)', fontSize: 13,
          color: selectedLanguage ? '#1C1A17' : '#9A9490', cursor: 'pointer', appearance: 'none',
        }}>
          <option value="">Все языки</option>
          {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </FilterSection>

      {/* File only */}
      <FilterSection title="Доступность" defaultOpen={false}>
        <Checkbox checked={fileOnly} onChange={() => { setFileOnly(v => !v); setCurrentPage(1) }}
          label="Только с файлом" />
      </FilterSection>
    </div>
  )

  return (
    <div style={{ background: '#FAF8F4', minHeight: '100vh' }}>

      {/* ── Page intro + search ───────────────────────────────────────────── */}
      <div style={{ background: 'white', borderBottom: '1px solid #E2DDD5' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 48px 32px' }}>
          {/* Breadcrumb */}
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490', letterSpacing: '0.05em', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: '#B85A2A', cursor: 'pointer' }}>Мирас</span>
            <ChevronRight size={12} />
            <span>Каталог</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 48, marginBottom: 28 }}>
            <div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 42, fontWeight: 700, color: '#1C1A17', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 10 }}>
                Каталог
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 300, color: '#5A5550', lineHeight: 1.6, maxWidth: 560 }}>
                Книги, статьи, видео, аудио, фотографии и записи традиционных знаний из пяти стран Центральной Азии. Поиск работает по всем типам материалов одновременно.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 24, flexShrink: 0 }}>
              {[
                { n: '12 300+', label: 'материалов' },
                { n: '5', label: 'стран' },
                { n: '6', label: 'форматов' },
              ].map(s => (
                <div key={s.label} style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: '#1C3A5E', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490', marginTop: 3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div style={{ display: 'flex', background: '#FAF8F4', border: '1.5px solid #D0CBC2', borderRadius: 10, overflow: 'hidden', maxWidth: 760 }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', color: '#9A9490', flexShrink: 0 }}>
              <SearchIcon size={20} />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Поиск по материалам, авторам, странам и традиционным знаниям"
              style={{
                flex: 1, border: 'none', outline: 'none', padding: '14px 8px',
                fontFamily: 'var(--font-body)', fontSize: 15, color: '#1C1A17',
                background: 'transparent',
              }}
            />
            {inputValue && (
              <button onClick={() => { setInputValue(''); setSearchQuery(''); setCurrentPage(1) }} style={{
                background: 'none', border: 'none', padding: '0 12px', cursor: 'pointer', color: '#9A9490',
              }}>
                <XIcon size={16} />
              </button>
            )}
            <button
              onClick={handleSearch}
              style={{
                background: '#1C3A5E', border: 'none', padding: '0 28px',
                color: 'white', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', flexShrink: 0, transition: 'background 0.15s',
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.background = '#0F2236' }}
              onMouseLeave={e => { (e.target as HTMLElement).style.background = '#1C3A5E' }}
            >
              Найти
            </button>
          </div>
        </div>
      </div>

      {/* ── Main layout ───────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 48px 64px', display: 'grid', gridTemplateColumns: '272px 1fr', gap: 40, alignItems: 'start' }}>

        {/* ── Sidebar (desktop) ─────────────────────────────────────────── */}
        <aside style={{ position: 'sticky', top: 80, background: 'white', border: '1px solid #E2DDD5', borderRadius: 12, padding: '0 20px 8px' }}>
          <FilterSidebar />
        </aside>

        {/* ── Results pane ──────────────────────────────────────────────── */}
        <main>

          {/* Mobile filter button */}
          <div style={{ display: 'none', marginBottom: 16 }}>
            <button
              onClick={() => setMobileFiltersOpen(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 500,
                color: '#1C1A17', background: 'white', border: '1px solid #D0CBC2',
                borderRadius: 8, padding: '10px 20px', cursor: 'pointer', width: '100%', justifyContent: 'center',
              }}
            >
              <FilterIcon size={16} />
              Фильтры
              {activeFilters.length > 0 && (
                <span style={{ background: '#1C3A5E', color: 'white', borderRadius: '50%', width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontFamily: 'var(--font-mono)' }}>
                  {activeFilters.length}
                </span>
              )}
            </button>
          </div>

          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
              {activeFilters.map((f, i) => (
                <button
                  key={i}
                  onClick={f.onRemove}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontFamily: 'var(--font-body)', fontSize: 13, color: '#1C3A5E',
                    background: '#EEF2F7', border: '1px solid #C8D8EB',
                    borderRadius: 100, padding: '6px 12px', cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#dde7f2' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#EEF2F7' }}
                >
                  {f.label} <XIcon size={12} />
                </button>
              ))}
              {activeFilters.length > 1 && (
                <button
                  onClick={resetAll}
                  style={{
                    fontFamily: 'var(--font-body)', fontSize: 13, color: '#B85A2A',
                    background: 'none', border: '1px solid #E8C4B0', borderRadius: 100,
                    padding: '6px 12px', cursor: 'pointer',
                  }}
                >
                  Сбросить все
                </button>
              )}
            </div>
          )}

          {/* Results header: count + sort + view toggle */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: '#1C1A17' }}>
              {filtered.length.toLocaleString('ru-RU')}
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 400, color: '#756E65', marginLeft: 8 }}>материалов</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* Sort */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setSortOpen(v => !v)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontFamily: 'var(--font-body)', fontSize: 13, color: '#3D3A36',
                    background: 'white', border: '1px solid #D0CBC2', borderRadius: 7,
                    padding: '8px 14px', cursor: 'pointer',
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9A9490', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Сортировка</span>
                  {sortBy} <ChevronDown size={14} />
                </button>
                {sortOpen && (
                  <div style={{
                    position: 'absolute', top: '100%', right: 0, marginTop: 4, zIndex: 50,
                    background: 'white', border: '1px solid #D0CBC2', borderRadius: 8,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden', minWidth: 180,
                  }}>
                    {['Релевантность', 'Новые', 'По названию'].map(opt => (
                      <button key={opt} onClick={() => { setSortBy(opt); setSortOpen(false); setCurrentPage(1) }} style={{
                        display: 'block', width: '100%', textAlign: 'left',
                        padding: '10px 16px', background: sortBy === opt ? '#F0EBE2' : 'transparent',
                        border: 'none', fontFamily: 'var(--font-body)', fontSize: 13,
                        color: sortBy === opt ? '#1C1A17' : '#4A4540', cursor: 'pointer',
                        fontWeight: sortBy === opt ? 600 : 400,
                      }}
                        onMouseEnter={e => { if (sortBy !== opt) (e.target as HTMLElement).style.background = '#FAF8F4' }}
                        onMouseLeave={e => { if (sortBy !== opt) (e.target as HTMLElement).style.background = 'transparent' }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* View toggle */}
              <div style={{ display: 'flex', border: '1px solid #D0CBC2', borderRadius: 7, overflow: 'hidden' }}>
                {(['list', 'grid'] as const).map(mode => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    style={{
                      padding: '8px 12px', background: viewMode === mode ? '#1C3A5E' : 'white',
                      color: viewMode === mode ? 'white' : '#756E65',
                      border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center',
                      transition: 'all 0.15s',
                    }}
                  >
                    {mode === 'list' ? <ListIcon size={16} /> : <GridIcon size={16} />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards */}
          {paginated.length === 0 ? (
            <div style={{ background: 'white', border: '1px solid #E2DDD5', borderRadius: 12 }}>
              <EmptyState onReset={resetAll} />
            </div>
          ) : viewMode === 'list' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {paginated.map(mat => (
                <MaterialCardList key={mat.id} mat={mat} searchQuery={searchQuery} />
              ))}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {paginated.map(mat => (
                <MaterialCardGrid key={mat.id} mat={mat} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 40 }}>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px',
                  background: 'white', border: '1px solid #D0CBC2', borderRadius: 7,
                  fontFamily: 'var(--font-body)', fontSize: 13, color: currentPage === 1 ? '#C4BFB6' : '#3D3A36',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                }}
              >
                ← Предыдущая
              </button>

              <div style={{ display: 'flex', gap: 4, margin: '0 8px' }}>
                {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
                  let page: number | null = i + 1
                  if (totalPages > 7) {
                    const pages = [1, 2, currentPage - 1, currentPage, currentPage + 1, totalPages - 1, totalPages]
                    page = [...new Set(pages)].filter(p => p >= 1 && p <= totalPages).sort((a, b) => a - b)[i] || null
                  }
                  if (!page) return null
                  const isActive = page === currentPage
                  return (
                    <button
                      key={`page-${page}`}
                      onClick={() => setCurrentPage(page!)}
                      style={{
                        width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: isActive ? '#1C3A5E' : 'white', border: `1px solid ${isActive ? '#1C3A5E' : '#D0CBC2'}`,
                        borderRadius: 7, fontFamily: 'var(--font-mono)', fontSize: 13,
                        color: isActive ? 'white' : '#3D3A36', cursor: 'pointer',
                      }}
                    >
                      {page}
                    </button>
                  )
                })}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6, padding: '9px 16px',
                  background: 'white', border: '1px solid #D0CBC2', borderRadius: 7,
                  fontFamily: 'var(--font-body)', fontSize: 13, color: currentPage === totalPages ? '#C4BFB6' : '#3D3A36',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                }}
              >
                Следующая →
              </button>
            </div>
          )}

          {/* Page info */}
          {filtered.length > 0 && (
            <div style={{ textAlign: 'center', marginTop: 16, fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490' }}>
              Показано {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)} из {filtered.length.toLocaleString('ru-RU')}
            </div>
          )}
        </main>
      </div>

      {/* ── Mobile filter drawer ──────────────────────────────────────────── */}
      {mobileFiltersOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
          <div
            onClick={() => setMobileFiltersOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }}
          />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'white', borderRadius: '16px 16px 0 0',
            padding: '24px 24px 40px', maxHeight: '85vh', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: '#1C1A17' }}>Фильтры</span>
              <button onClick={() => setMobileFiltersOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#756E65' }}>
                <XIcon size={20} />
              </button>
            </div>
            <FilterSidebar />
            <button
              onClick={() => setMobileFiltersOpen(false)}
              style={{
                marginTop: 24, width: '100%', padding: '14px', background: '#1C3A5E', border: 'none',
                borderRadius: 8, color: 'white', fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, cursor: 'pointer',
              }}
            >
              Показать {filtered.length} материалов
            </button>
          </div>
        </div>
      )}

      {/* ── Responsive styles ─────────────────────────────────────────────── */}
      <style>{`
        @media (max-width: 1024px) {
          .catalog-layout { grid-template-columns: 1fr !important; }
          .catalog-sidebar { display: none !important; }
          .catalog-mobile-filter-btn { display: flex !important; }
        }
        @media (max-width: 768px) {
          .catalog-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .catalog-header { flex-direction: column; align-items: flex-start !important; }
        }
      `}</style>
    </div>
  )
}
