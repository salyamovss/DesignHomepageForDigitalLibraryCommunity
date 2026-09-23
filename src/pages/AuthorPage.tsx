import React, { useState } from 'react'
import { Breadcrumb, TypeBadge, MetadataPanel, MetadataItem, SectionTitle, CompactMaterialCard, TYPE_CONFIG, CompactMaterial } from '../components/shared'
import { ArrowRight } from '../components/icons'

const AUTHOR_MATERIALS: CompactMaterial[] = [
  { id: 1,  type: 'book',  typeLabel: 'Книга',  title: 'Манас. Полный текст эпоса. Том 1–8',           country: 'Кыргызстан', year: 1958 },
  { id: 2,  type: 'book',  typeLabel: 'Книга',  title: 'Семетей. Продолжение трилогии',                 country: 'Кыргызстан', year: 1959 },
  { id: 3,  type: 'book',  typeLabel: 'Книга',  title: 'Сейтек. Завершение эпической трилогии',          country: 'Кыргызстан', year: 1960 },
  { id: 4,  type: 'video', typeLabel: 'Видео',  title: 'Архивная съёмка исполнения Манаса. 1952',       country: 'Кыргызстан', year: 1952, img: 'https://images.unsplash.com/photo-1761872936089-1f90e87bf80d?w=240&h=160&fit=crop&auto=format' },
  { id: 5,  type: 'audio', typeLabel: 'Аудио',  title: 'Фрагменты Манаса. Студийная запись 1955',       country: 'Кыргызстан', year: 1955 },
  { id: 6,  type: 'audio', typeLabel: 'Аудио',  title: 'Большой поход. Из Манаса. Запись 1960 года',   country: 'Кыргызстан', year: 1960 },
  { id: 7,  type: 'photo', typeLabel: 'Фото',   title: 'Портрет 1948 года. Фрунзе',                    country: 'Кыргызстан', year: 1948, img: 'https://images.unsplash.com/photo-1761872936183-255a939c463a?w=240&h=160&fit=crop&auto=format' },
]

type FilterType = 'all' | 'book' | 'video' | 'audio' | 'photo' | 'article' | 'tk'

export function AuthorPage({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [filter, setFilter] = useState<FilterType>('all')

  const filtered = filter === 'all' ? AUTHOR_MATERIALS : AUTHOR_MATERIALS.filter(m => m.type === filter)

  const typeCounts = AUTHOR_MATERIALS.reduce((acc, m) => {
    acc[m.type] = (acc[m.type] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div style={{ background: '#FAF8F4', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 48px 72px' }}>

        <Breadcrumb
          items={[{ label: 'Мирас', page: 'home' }, { label: 'Авторы', page: 'home' }, { label: 'Саякбай Каралаев' }]}
          onNavigate={onNavigate}
        />

        {/* Author header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, marginBottom: 48 }}>
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
            {/* Portrait placeholder */}
            <div style={{ width: 140, flexShrink: 0 }}>
              <div style={{ width: 140, height: 160, borderRadius: 10, background: 'linear-gradient(160deg, #1C3A5E 0%, #0F2236 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(0,0,0,0.15)', marginBottom: 10 }}>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: 56, fontWeight: 700, color: 'rgba(255,255,255,0.8)' }}>С</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9A9490', textAlign: 'center', letterSpacing: '0.04em' }}>МАНАСЧЫ</div>
            </div>

            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#B85A2A', letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 12 }}>
                Исполнитель · Манасчы
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 46, fontWeight: 700, color: '#1C1A17', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 8 }}>
                Саякбай Каралаев
              </h1>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#756E65', fontStyle: 'italic', marginBottom: 20 }}>
                Саякбай Каралаев · Sayakbay Karalayev · Саякбай Каралаев
              </div>
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
                {[
                  { label: 'Годы жизни', value: '1894–1971' },
                  { label: 'Страна', value: 'Кыргызстан' },
                  { label: 'Язык', value: 'Кыргызский' },
                ].map(m => (
                  <div key={m.label}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9A9490', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 3 }}>{m.label}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#1C1A17', fontWeight: 500 }}>{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Authority record note */}
          <div>
            <div style={{ background: '#F0F4F8', border: '1px solid #C8D8EB', borderRadius: 12, padding: '20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#1C3A5E', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 10 }}>Авторитетная запись</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9A9490', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 2 }}>ID Мирас</div>
                  <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#1C3A5E' }}>MIRAS/P/0001</code>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9A9490', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 2 }}>Варианты написания</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#3D3A36', lineHeight: 1.5 }}>Саякбай Каралаев; Sayakbai Karalayev; Sayakbay Karalayev; С. Каралаев</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9A9490', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 2 }}>Роли</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['Манасчы', 'Исполнитель', 'Носитель традиции'].map(r => (
                      <span key={r} style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#5C3A00', background: '#F5F0E8', border: '1px solid #D8C89A', borderRadius: 4, padding: '2px 8px', letterSpacing: '0.04em' }}>{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, alignItems: 'start' }}>
          <div>
            {/* Biography */}
            <div style={{ marginBottom: 40 }}>
              <SectionTitle eyebrow="Биография" title="О манасчи" />
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#3D3A36', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <p>Саякбай Каралаев (1894–1971) — крупнейший кыргызский манасчи XX века, народный артист СССР (1939), лауреат Государственной премии Киргизской ССР. Считается самым авторитетным исполнителем полного текста трилогии «Манас».</p>
                <p>По преданию, дар манасчи явился ему во сне в юности. Каралаев мог исполнять эпос непрерывно в течение нескольких дней. По оценкам исследователей, он знал более 500 000 строк трилогии, что составляет около 80% известного текста.</p>
                <p>Систематическая запись его исполнения началась в 1936 году. Академия наук КиргССР организовала длительные экспедиции для фиксации текста, ставшего основой канонического издания эпоса.</p>
              </div>
            </div>

            {/* Materials filter + list */}
            <div style={{ paddingTop: 36, borderTop: '1px solid #E2DDD5' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <SectionTitle title={`Материалы (${AUTHOR_MATERIALS.length})`} />
              </div>

              {/* Type filter tabs */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                <button
                  onClick={() => setFilter('all')}
                  style={{ fontFamily: 'var(--font-body)', fontSize: 13, padding: '6px 16px', borderRadius: 100, border: `1px solid ${filter === 'all' ? '#1C3A5E' : '#D0CBC2'}`, background: filter === 'all' ? '#1C3A5E' : 'white', color: filter === 'all' ? 'white' : '#4A4540', cursor: 'pointer' }}
                >
                  Все · {AUTHOR_MATERIALS.length}
                </button>
                {Object.entries(typeCounts).map(([type, count]) => {
                  const cfg = TYPE_CONFIG[type]
                  const isActive = filter === type
                  return (
                    <button key={type} onClick={() => setFilter(type as FilterType)} style={{
                      fontFamily: 'var(--font-body)', fontSize: 13, padding: '6px 16px', borderRadius: 100,
                      border: `1px solid ${isActive ? cfg?.stripe : '#D0CBC2'}`,
                      background: isActive ? cfg?.bg : 'white',
                      color: isActive ? cfg?.fg : '#4A4540', cursor: 'pointer',
                    }}>
                      {cfg?.label} · {count}
                    </button>
                  )
                })}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
                {filtered.map(mat => <CompactMaterialCard key={mat.id} mat={mat} onNavigate={onNavigate} />)}
              </div>
            </div>

            {/* Associated entities */}
            <div style={{ marginTop: 48, paddingTop: 36, borderTop: '1px solid #E2DDD5' }}>
              <SectionTitle title="Связанные темы и регионы" />
              <div style={{ display: 'flex', gap: 32 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Области знания</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['Устные традиции и эпос', 'Манасчы', 'Кыргызская литература'].map(t => (
                      <span key={t} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#1C3A5E', background: '#EEF2F7', border: '1px solid #C8D8EB', borderRadius: 100, padding: '5px 14px', cursor: 'pointer' }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Регионы</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {['Кыргызстан', 'Иссык-Кульская область', 'Бишкек'].map(r => (
                      <span key={r} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#5C3A00', background: '#F5F0E8', border: '1px solid #D8C89A', borderRadius: 100, padding: '5px 14px', cursor: 'pointer' }}>{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <MetadataPanel title="Данные об авторе">
              <MetadataItem label="Полное имя" value="Саякбай Каралаев" />
              <MetadataItem label="Годы жизни" value="1894–1971" />
              <MetadataItem label="Страна" value="Кыргызстан (КиргССР)" />
              <MetadataItem label="Язык" value="Кыргызский" />
              <MetadataItem label="Роль" value="Манасчы, исполнитель" />
              <MetadataItem label="Звания" value="Народный артист СССР" highlight />
            </MetadataPanel>

            <MetadataPanel title="В библиотеке">
              <MetadataItem label="Материалов" value={String(AUTHOR_MATERIALS.length)} highlight />
              <MetadataItem label="Книг" value={String(typeCounts.book || 0)} />
              <MetadataItem label="Видео" value={String(typeCounts.video || 0)} />
              <MetadataItem label="Аудио" value={String(typeCounts.audio || 0)} />
              <MetadataItem label="Фото" value={String(typeCounts.photo || 0)} />
            </MetadataPanel>
          </div>
        </div>
      </div>
    </div>
  )
}
