import React, { useState } from 'react'
import { Breadcrumb, TypeBadge, SectionTitle, CompactMaterialCard, CompactMaterial, TYPE_CONFIG } from '../components/shared'
import { ArrowRight, FilterIcon, ChevronDown } from '../components/icons'

const COLLECTION_MATERIALS: CompactMaterial[] = [
  { id: 1,  type: 'book',    typeLabel: 'Книга',   title: 'Манас. Полный текст в записи Саякбая Каралаева. Т. 1–8', author: 'Саякбай Каралаев', country: 'Кыргызстан', year: 1958 },
  { id: 2,  type: 'video',   typeLabel: 'Видео',   title: 'Саякбай Каралаев исполняет Манас. Архивная съёмка 1952', author: 'Госархив КиргССР',  country: 'Кыргызстан', year: 1952, img: 'https://images.unsplash.com/photo-1761872936089-1f90e87bf80d?w=240&h=160&fit=crop&auto=format' },
  { id: 3,  type: 'audio',   typeLabel: 'Аудио',   title: 'Шапак Рысмендеев. Фрагменты Манаса. 1965',              author: 'АН КиргССР',       country: 'Кыргызстан', year: 1965 },
  { id: 4,  type: 'article', typeLabel: 'Статья',  title: 'Эпос Манас как источник по этнической истории кыргызов', author: 'В. М. Плоских',    country: 'Кыргызстан', year: 2018 },
  { id: 5,  type: 'photo',   typeLabel: 'Фото',    title: 'Манасчи Джусуп Мамай. Портрет. Нарын, 1978',            country: 'Кыргызстан',      year: 1978, img: 'https://images.unsplash.com/photo-1761872936183-255a939c463a?w=240&h=160&fit=crop&auto=format' },
  { id: 6,  type: 'tk',      typeLabel: 'Традиционные знания', title: 'Манасчы — традиция исполнения и передача эпоса', country: 'Кыргызстан', year: 2021 },
  { id: 7,  type: 'book',    typeLabel: 'Книга',   title: 'Семетей и Сейтек. Вторая и третья части трилогии',        author: 'Саякбай Каралаев', country: 'Кыргызстан', year: 1960 },
  { id: 8,  type: 'article', typeLabel: 'Статья',  title: 'Международный симпозиум по эпосу Манас. Материалы',       author: 'НАН КР',           country: 'Кыргызстан', year: 2014 },
  { id: 9,  type: 'audio',   typeLabel: 'Аудио',   title: 'Джусуп Мамай. Полный текст Манаса. Запись 1984–1992',    author: 'Госрадио КР',      country: 'Кыргызстан', year: 1992 },
  { id: 10, type: 'video',   typeLabel: 'Видео',   title: 'Манас 1000. Документальный фильм, 1995',                  author: 'ТРК «Пирамида»',  country: 'Кыргызстан', year: 1995, img: 'https://images.unsplash.com/photo-1595496358672-2d175fcdd01a?w=240&h=160&fit=crop&auto=format' },
]

type FilterType = 'all' | 'book' | 'article' | 'video' | 'audio' | 'photo' | 'tk'

export function CollectionDetailPage({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [typeFilter, setTypeFilter] = useState<FilterType>('all')
  const [sortOpen, setSortOpen] = useState(false)
  const [sortBy, setSortBy] = useState('По порядку')

  const typeCounts = COLLECTION_MATERIALS.reduce((acc, m) => {
    acc[m.type] = (acc[m.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  const filtered = COLLECTION_MATERIALS.filter(m => typeFilter === 'all' || m.type === typeFilter)

  return (
    <div style={{ background: '#FAF8F4', minHeight: '100vh' }}>

      {/* Editorial hero */}
      <div style={{ position: 'relative', height: 480, overflow: 'hidden', background: '#0F2236' }}>
        <img
          src="https://images.unsplash.com/photo-1761872936089-1f90e87bf80d?w=1400&h=700&fit=crop&auto=format"
          alt="Эпос Манас — сборник"
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55 }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,34,54,0.95) 0%, rgba(15,34,54,0.5) 50%, transparent 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 0 52px 0' }}>
          <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px', width: '100%' }}>
            <Breadcrumb
              items={[{ label: 'Мирас', page: 'home' }, { label: 'Коллекции', page: 'home' }, { label: 'Эпос Манас' }]}
              onNavigate={onNavigate}
            />
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9EB8D4', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>
              Тематическая коллекция · Кыргызстан
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 700, color: 'white', lineHeight: 1.05, letterSpacing: '-0.025em', maxWidth: 700, marginBottom: 20 }}>
              Эпос «Манас»: тексты, записи, исследования
            </h1>
            <div style={{ display: 'flex', gap: 32 }}>
              {[
                { n: String(COLLECTION_MATERIALS.length), label: 'Материалов' },
                { n: '5', label: 'Форматов' },
                { n: '1952–2022', label: 'Период' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 700, color: 'white', lineHeight: 1 }}>{s.n}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9EB8D4', marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px 48px 72px' }}>

        {/* Curatorial description */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 48, marginBottom: 56, paddingBottom: 48, borderBottom: '1px solid #E2DDD5' }}>
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#B85A2A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>Кураторское описание</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#3D3A36', lineHeight: 1.8, marginBottom: 14 }}>
              Полное собрание материалов по кыргызскому героическому эпосу «Манас» — от рукописей XIX века до современных аудиозаписей манасчи. Коллекция создана совместно с Национальной академией наук Кыргызской Республики и включает документы, видео- и аудиозаписи, научные исследования и полевую документацию.
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#3D3A36', lineHeight: 1.8 }}>
              Материалы охватывают все аспекты изучения эпоса: тексты разных исполнителей, этнографические данные о традиции манасчи, историко-литературоведческие исследования и современные документальные проекты.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ background: 'white', border: '1px solid #E2DDD5', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Метаданные</div>
              {[
                { label: 'Страна', value: 'Кыргызстан' },
                { label: 'Составитель', value: 'НАН КР / Мирас' },
                { label: 'Период', value: '1952–2022' },
                { label: 'Тема', value: 'Устные традиции · Эпос · Манасчы' },
                { label: 'ЮНЕСКО', value: 'НКН человечества, 2013' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '8px 0', borderBottom: '1px solid #F0EBE2' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#9A9490', letterSpacing: '0.04em', textTransform: 'uppercase' }}>{item.label}</span>
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#1C1A17', textAlign: 'right' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filter + sort bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={() => setTypeFilter('all')} style={{
              fontFamily: 'var(--font-body)', fontSize: 13, padding: '7px 18px', borderRadius: 100,
              border: `1px solid ${typeFilter === 'all' ? '#1C3A5E' : '#D0CBC2'}`,
              background: typeFilter === 'all' ? '#1C3A5E' : 'white',
              color: typeFilter === 'all' ? 'white' : '#4A4540', cursor: 'pointer',
            }}>
              Все · {COLLECTION_MATERIALS.length}
            </button>
            {Object.entries(typeCounts).map(([type, count]) => {
              const cfg = TYPE_CONFIG[type]
              const isActive = typeFilter === type
              return (
                <button key={type} onClick={() => setTypeFilter(type as FilterType)} style={{
                  fontFamily: 'var(--font-body)', fontSize: 13, padding: '7px 16px', borderRadius: 100,
                  border: `1px solid ${isActive ? cfg?.stripe : '#D0CBC2'}`,
                  background: isActive ? cfg?.bg : 'white',
                  color: isActive ? cfg?.fg : '#4A4540', cursor: 'pointer',
                }}>
                  {cfg?.label} · {count}
                </button>
              )
            })}
          </div>

          <div style={{ position: 'relative' }}>
            <button onClick={() => setSortOpen(v => !v)} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 13, color: '#3D3A36', background: 'white', border: '1px solid #D0CBC2', borderRadius: 7, padding: '8px 14px', cursor: 'pointer' }}>
              {sortBy} <ChevronDown size={14} />
            </button>
            {sortOpen && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 4, zIndex: 50, background: 'white', border: '1px solid #D0CBC2', borderRadius: 8, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', overflow: 'hidden', minWidth: 180 }}>
                {['По порядку', 'Новые', 'По типу', 'По названию'].map(opt => (
                  <button key={opt} onClick={() => { setSortBy(opt); setSortOpen(false) }} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', background: sortBy === opt ? '#F0EBE2' : 'transparent', border: 'none', fontFamily: 'var(--font-body)', fontSize: 13, color: sortBy === opt ? '#1C1A17' : '#4A4540', cursor: 'pointer', fontWeight: sortBy === opt ? 600 : 400 }}>{opt}</button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Materials grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
          {filtered.map(mat => <CompactMaterialCard key={mat.id} mat={mat} onNavigate={onNavigate} />)}
        </div>
      </div>
    </div>
  )
}
