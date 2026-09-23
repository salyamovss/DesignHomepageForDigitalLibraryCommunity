import React, { useState, useMemo } from 'react'
import { SearchIcon, XIcon, ChevronDown, FilterIcon, ListIcon, GridIcon } from '../components/icons'
import { Breadcrumb, TypeBadge, TYPE_CONFIG, EmptyState, LoadingSkeleton } from '../components/shared'

interface SearchResult {
  id: number; type: string; typeLabel: string
  title: string; author: string; country: string; year: number | null; language: string
  img?: string | null; matchSource: string; matchSnippet: string; matchWord: string
  knowledgeArea: string; hasFile: boolean
}

const RESULTS: SearchResult[] = [
  {
    id: 1, type: 'book', typeLabel: 'Книга',
    title: 'Манас. Полный текст эпоса в записи Саякбая Каралаева',
    author: 'Саякбай Каралаев', country: 'Кыргызстан', year: 1958, language: 'Кыргызский', hasFile: true,
    knowledgeArea: 'Устные традиции, язык, эпос и фольклор',
    matchSource: 'Найдено в названии',
    matchSnippet: '«…Манас — эпическое сказание, передававшееся из поколения в поколение устным путём…»',
    matchWord: 'Манас', img: null,
  },
  {
    id: 2, type: 'video', typeLabel: 'Видео',
    title: 'Саякбай Каралаев исполняет Манас. Архивная съёмка 1952 года',
    author: 'Кыргызский государственный архив', country: 'Кыргызстан', year: 1952, language: 'Кыргызский', hasFile: true,
    knowledgeArea: 'Устные традиции, язык, эпос и фольклор',
    matchSource: 'Найдено в транскрипте',
    matchSnippet: '00:04:17 — «…в этом фрагменте Манас обращается к богатырям перед битвой…»',
    matchWord: 'Манас',
    img: 'https://images.unsplash.com/photo-1761872936089-1f90e87bf80d?w=240&h=160&fit=crop&auto=format',
  },
  {
    id: 3, type: 'audio', typeLabel: 'Аудио',
    title: 'Шапак Рысмендеев. Фрагменты Манаса. Запись 1965 года',
    author: 'Институт истории АН КиргССР', country: 'Кыргызстан', year: 1965, language: 'Кыргызский', hasFile: true,
    knowledgeArea: 'Музыка, танец и исполнительское искусство',
    matchSource: 'Найдено в транскрипте',
    matchSnippet: '«…традиция исполнения эпоса Манас восходит к глубокой древности и…»',
    matchWord: 'Манас', img: null,
  },
  {
    id: 4, type: 'article', typeLabel: 'Статья',
    title: 'Эпос Манас как источник по этнической истории кыргызов',
    author: 'В. М. Плоских', country: 'Кыргызстан', year: 2018, language: 'Русский', hasFile: true,
    knowledgeArea: 'Устные традиции, язык, эпос и фольклор',
    matchSource: 'Найдено в OCR',
    matchSnippet: '«…эпическое сказание Манас занимает особое место в системе традиционных знаний…»',
    matchWord: 'Манас', img: null,
  },
  {
    id: 5, type: 'photo', typeLabel: 'Фото',
    title: 'Манасчи Джусуп Мамай. Портрет. Сельский дом в Нарыне',
    author: 'Экспедиция АН КиргССР', country: 'Кыргызстан', year: 1978, language: 'Русский', hasFile: true,
    knowledgeArea: 'Устные традиции, язык, эпос и фольклор',
    matchSource: 'Найдено в описании',
    matchSnippet: '«…один из последних великих исполнителей Манаса, носитель полного текста трилогии…»',
    matchWord: 'Манас',
    img: 'https://images.unsplash.com/photo-1761872936183-255a939c463a?w=240&h=160&fit=crop&auto=format',
  },
  {
    id: 6, type: 'tk', typeLabel: 'Традиционные знания',
    title: 'Манасчы — традиция исполнения и передача эпоса',
    author: 'Зафиксировано: экспедиция МГУ', country: 'Кыргызстан', year: 2021, language: 'Кыргызский · Русский', hasFile: true,
    knowledgeArea: 'Устные традиции, язык, эпос и фольклор',
    matchSource: 'Найдено в ключевых словах',
    matchSnippet: '«…традиция манасчи включает особую технику памяти и передачи текста…»',
    matchWord: 'Манас', img: null,
  },
  {
    id: 7, type: 'book', typeLabel: 'Книга',
    title: 'Семетей и Сейтек. Вторая и третья части трилогии Манас',
    author: 'Саякбай Каралаев', country: 'Кыргызстан', year: 1960, language: 'Кыргызский', hasFile: true,
    knowledgeArea: 'Устные традиции, язык, эпос и фольклор',
    matchSource: 'Найдено в названии',
    matchSnippet: '«…продолжение и завершение великой трилогии Манас о кыргызских богатырях…»',
    matchWord: 'Манас', img: null,
  },
  {
    id: 8, type: 'article', typeLabel: 'Статья',
    title: 'Международный симпозиум по эпосу Манас. Материалы',
    author: 'НАН Кыргызской Республики', country: 'Кыргызстан', year: 2014, language: 'Русский · Кыргызский', hasFile: false,
    knowledgeArea: 'Современные формы и сохранение',
    matchSource: 'Найдено в описании',
    matchSnippet: '«…обсуждение вопросов охраны, исследования и популяризации эпоса Манас…»',
    matchWord: 'Манас', img: null,
  },
]

const RELATED_QUERIES = ['Саякбай Каралаев', 'манасчи', 'кыргызский эпос', 'Семетей', 'Сейтек', 'богатырский эпос']

const MATCH_SOURCE_COLORS: Record<string, { bg: string; fg: string; border: string }> = {
  'Найдено в названии':          { bg: '#EEF2F7', fg: '#1C3A5E', border: '#C8D8EB' },
  'Найдено в транскрипте':       { bg: '#F1EDF8', fg: '#4A1D6B', border: '#D3C0E8' },
  'Найдено в OCR':               { bg: '#F5F0E8', fg: '#5C3A00', border: '#D8C89A' },
  'Найдено в описании':          { bg: '#F0F4F0', fg: '#1A4A1A', border: '#BDD8BD' },
  'Найдено в ключевых словах':   { bg: '#F4F1EE', fg: '#3D2B1A', border: '#D8CFCA' },
  'Найдено в имени автора':      { bg: '#F9EEE8', fg: '#7B2D00', border: '#E8C4B0' },
}

function MatchBadge({ source }: { source: string }) {
  const cfg = MATCH_SOURCE_COLORS[source] || { bg: '#F5F5F0', fg: '#3D3A36', border: '#D8D4C8' }
  return (
    <span style={{
      display: 'inline-block', background: cfg.bg, color: cfg.fg, border: `1px solid ${cfg.border}`,
      borderRadius: 4, padding: '2px 8px', fontFamily: 'var(--font-mono)', fontSize: 10,
      letterSpacing: '0.06em', textTransform: 'uppercase',
    }}>
      {source}
    </span>
  )
}

function HighlightedSnippet({ text, word }: { text: string; word: string }) {
  if (!word) return <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#5A5550', lineHeight: 1.6, fontStyle: 'italic' }}>{text}</span>
  const parts = text.split(new RegExp(`(${word})`, 'gi'))
  return (
    <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#5A5550', lineHeight: 1.6, fontStyle: 'italic' }}>
      {parts.map((p, i) =>
        p.toLowerCase() === word.toLowerCase()
          ? <mark key={i} style={{ background: '#FFF3C4', color: '#1C1A17', borderRadius: 2, fontStyle: 'normal', padding: '0 1px' }}>{p}</mark>
          : p
      )}
    </span>
  )
}

function SearchResultCard({ result, onNavigate }: { result: SearchResult; onNavigate?: (p: string) => void }) {
  const cfg = TYPE_CONFIG[result.type]
  return (
    <a
      href="#"
      onClick={e => { e.preventDefault(); onNavigate?.('publication') }}
      style={{
        display: 'flex', gap: 0, textDecoration: 'none',
        background: 'white', border: '1px solid #E2DDD5', borderRadius: 10,
        overflow: 'hidden', transition: 'all 0.18s',
      }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = '#1C3A5E'; el.style.boxShadow = '0 4px 20px rgba(28,58,94,0.09)'; el.style.transform = 'translateY(-1px)' }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#E2DDD5'; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)' }}
    >
      <div style={{ width: 4, background: cfg?.stripe || '#1C3A5E', flexShrink: 0 }} />
      {result.img && (
        <div style={{ width: 140, flexShrink: 0, background: '#E0D9CF', overflow: 'hidden' }}>
          <img src={result.img} alt={result.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      )}
      <div style={{ flex: 1, padding: '18px 22px', display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
          <TypeBadge type={result.type} label={result.typeLabel} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {result.hasFile && (
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#2D6A2D', background: '#EEF4EE', border: '1px solid #BDD8BD', borderRadius: 3, padding: '2px 7px', letterSpacing: '0.06em' }}>ФАЙЛ</span>
            )}
            {result.year && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490' }}>{result.year}</span>}
          </div>
        </div>

        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 600, color: '#1C1A17', lineHeight: 1.3, letterSpacing: '-0.01em', margin: 0 }}>
          {result.title}
        </h3>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#7A7470' }}>
          {result.author && <span>{result.author}</span>}
          <span style={{ color: '#B85A2A' }}>{result.country}</span>
          <span>{result.language}</span>
        </div>

        {/* Match source + snippet — the key differentiator */}
        <div style={{ background: '#FAFAF8', border: '1px solid #EDE8E0', borderRadius: 8, padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          <MatchBadge source={result.matchSource} />
          <HighlightedSnippet text={result.matchSnippet} word={result.matchWord} />
        </div>
      </div>
    </a>
  )
}

export function SearchPage({ initialQuery = 'Манас', onNavigate }: { initialQuery?: string; onNavigate?: (p: string) => void }) {
  const [query, setQuery] = useState(initialQuery)
  const [inputValue, setInputValue] = useState(initialQuery)
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])
  const [selectedCountries, setSelectedCountries] = useState<string[]>([])
  const [sortBy, setSortBy] = useState('Релевантность')
  const [sortOpen, setSortOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const ITEMS_PER_PAGE = 6

  const filtered = useMemo(() => {
    let r = RESULTS
    if (selectedTypes.length) r = r.filter(m => selectedTypes.includes(m.type))
    if (selectedCountries.length) r = r.filter(m => selectedCountries.some(c => m.country.includes(c)))
    if (sortBy === 'По названию') r = [...r].sort((a, b) => a.title.localeCompare(b.title, 'ru'))
    if (sortBy === 'Новые') r = [...r].sort((a, b) => (b.year || 0) - (a.year || 0))
    return r
  }, [selectedTypes, selectedCountries, sortBy])

  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE)

  const handleSearch = () => {
    setIsLoading(true)
    setQuery(inputValue)
    setCurrentPage(1)
    setTimeout(() => setIsLoading(false), 600)
  }

  const toggleType = (t: string) => setSelectedTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t])
  const toggleCountry = (c: string) => setSelectedCountries(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c])

  return (
    <div style={{ background: '#FAF8F4', minHeight: '100vh' }}>

      {/* Search header */}
      <div style={{ background: '#1C3A5E', padding: '40px 0 36px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
          <Breadcrumb items={[{ label: 'Мирас', page: 'home' }, { label: 'Поиск' }]} onNavigate={onNavigate} />
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 700, color: '#FAF8F4', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: 24 }}>
            Результаты поиска
          </h1>

          {/* Big search bar */}
          <div style={{ display: 'flex', background: 'white', borderRadius: 10, overflow: 'hidden', maxWidth: 720, boxShadow: '0 4px 24px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', color: '#756E65', flexShrink: 0 }}>
              <SearchIcon size={20} />
            </div>
            <input
              type="text" value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
              style={{ flex: 1, border: 'none', outline: 'none', padding: '16px 8px', fontFamily: 'var(--font-body)', fontSize: 18, color: '#1C1A17', background: 'transparent' }}
            />
            {inputValue && (
              <button onClick={() => { setInputValue(''); setQuery('') }} style={{ background: 'none', border: 'none', padding: '0 12px', cursor: 'pointer', color: '#9A9490' }}>
                <XIcon size={16} />
              </button>
            )}
            <button onClick={handleSearch} style={{ background: '#B85A2A', border: 'none', padding: '0 28px', color: 'white', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, cursor: 'pointer', flexShrink: 0 }}>
              Найти
            </button>
          </div>

          {/* Result count */}
          {!isLoading && (
            <div style={{ marginTop: 16, fontFamily: 'var(--font-body)', fontSize: 14, color: '#9EB8D4' }}>
              Найдено <strong style={{ color: '#FAF8F4' }}>{filtered.length}</strong> материалов по запросу «<em style={{ color: '#AFC6DC' }}>{query}</em>»
            </div>
          )}
        </div>
      </div>

      {/* Main layout */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 48px 64px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 40, alignItems: 'start' }}>

        {/* Sidebar */}
        <aside style={{ position: 'sticky', top: 80, background: 'white', border: '1px solid #E2DDD5', borderRadius: 12, padding: '0 20px 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0', borderBottom: '1px solid #E8E3DA', marginBottom: 0 }}>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#1C1A17' }}>Уточнить поиск</span>
            {(selectedTypes.length + selectedCountries.length > 0) && (
              <button onClick={() => { setSelectedTypes([]); setSelectedCountries([]) }} style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#B85A2A', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 2 }}>
                Сбросить
              </button>
            )}
          </div>

          {/* Type filters */}
          <div style={{ borderBottom: '1px solid #E8E3DA', padding: '14px 0' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: '#1C1A17', marginBottom: 12, letterSpacing: '0.01em' }}>Тип материала</div>
            {Object.entries(TYPE_CONFIG).map(([key, cfg]) => (
              <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '4px 0' }}>
                <div onClick={() => { toggleType(key); setCurrentPage(1) }} style={{
                  width: 16, height: 16, borderRadius: 3, flexShrink: 0, cursor: 'pointer',
                  border: `1.5px solid ${selectedTypes.includes(key) ? '#1C3A5E' : '#C4BFB6'}`,
                  background: selectedTypes.includes(key) ? '#1C3A5E' : 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
                }}>
                  {selectedTypes.includes(key) && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#4A4540' }}>{cfg.label}</span>
              </label>
            ))}
          </div>

          {/* Country filters */}
          <div style={{ padding: '14px 0' }}>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, fontWeight: 600, color: '#1C1A17', marginBottom: 12 }}>Страна</div>
            {['Казахстан', 'Кыргызстан', 'Таджикистан', 'Туркменистан', 'Узбекистан'].map(c => (
              <label key={c} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '4px 0' }}>
                <div onClick={() => { toggleCountry(c); setCurrentPage(1) }} style={{
                  width: 16, height: 16, borderRadius: 3, flexShrink: 0, cursor: 'pointer',
                  border: `1.5px solid ${selectedCountries.includes(c) ? '#1C3A5E' : '#C4BFB6'}`,
                  background: selectedCountries.includes(c) ? '#1C3A5E' : 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.15s',
                }}>
                  {selectedCountries.includes(c) && <svg width="10" height="8" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#4A4540' }}>{c}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Results */}
        <main>
          {/* Related queries */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 24 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490', letterSpacing: '0.05em' }}>Связанные запросы:</span>
            {RELATED_QUERIES.map(q => (
              <button key={q} onClick={() => { setInputValue(q); setQuery(q) }} style={{
                fontFamily: 'var(--font-body)', fontSize: 13, color: '#1C3A5E',
                background: 'white', border: '1px solid #C8D8EB', borderRadius: 100, padding: '4px 14px', cursor: 'pointer',
              }}>{q}</button>
            ))}
          </div>

          {/* Results bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: '#1C1A17' }}>
              {filtered.length.toLocaleString('ru-RU')}
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 400, color: '#756E65', marginLeft: 8 }}>материалов</span>
            </div>
            <div style={{ position: 'relative' }}>
              <button onClick={() => setSortOpen(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 13, color: '#3D3A36', background: 'white', border: '1px solid #D0CBC2', borderRadius: 7, padding: '8px 14px', cursor: 'pointer' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9A9490', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Сортировка</span>
                {sortBy} <ChevronDown size={14} />
              </button>
              {sortOpen && (
                <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 4, zIndex: 50, background: 'white', border: '1px solid #D0CBC2', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden', minWidth: 180 }}>
                  {['Релевантность', 'Новые', 'По названию'].map(opt => (
                    <button key={opt} onClick={() => { setSortBy(opt); setSortOpen(false); setCurrentPage(1) }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', background: sortBy === opt ? '#F0EBE2' : 'transparent', border: 'none', fontFamily: 'var(--font-body)', fontSize: 13, color: sortBy === opt ? '#1C1A17' : '#4A4540', cursor: 'pointer', fontWeight: sortBy === opt ? 600 : 400 }}>
                      {opt}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Cards */}
          {isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {Array.from({ length: 4 }).map((_, i) => <LoadingSkeleton key={i} variant="card" />)}
            </div>
          ) : paginated.length === 0 ? (
            <div style={{ background: 'white', border: '1px solid #E2DDD5', borderRadius: 12 }}>
              <EmptyState
                icon={<SearchIcon size={26} />}
                title="Материалы не найдены"
                description={`По запросу «${query}» ничего не найдено. Попробуйте изменить запрос или сбросить фильтры.`}
                action={{ label: 'Сбросить фильтры', onClick: () => { setSelectedTypes([]); setSelectedCountries([]) } }}
              />
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {paginated.map(r => <SearchResultCard key={r.id} result={r} onNavigate={onNavigate} />)}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && !isLoading && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 40 }}>
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} style={{ padding: '9px 16px', background: 'white', border: '1px solid #D0CBC2', borderRadius: 7, fontFamily: 'var(--font-body)', fontSize: 13, color: currentPage === 1 ? '#C4BFB6' : '#3D3A36', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}>
                ← Предыдущая
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={() => setCurrentPage(p)} style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', background: currentPage === p ? '#1C3A5E' : 'white', border: `1px solid ${currentPage === p ? '#1C3A5E' : '#D0CBC2'}`, borderRadius: 7, fontFamily: 'var(--font-mono)', fontSize: 13, color: currentPage === p ? 'white' : '#3D3A36', cursor: 'pointer' }}>{p}</button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} style={{ padding: '9px 16px', background: 'white', border: '1px solid #D0CBC2', borderRadius: 7, fontFamily: 'var(--font-body)', fontSize: 13, color: currentPage === totalPages ? '#C4BFB6' : '#3D3A36', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}>
                Следующая →
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
