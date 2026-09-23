import React, { useState, useRef } from 'react'
import { Breadcrumb, TypeBadge, MetadataPanel, MetadataItem, AccessBlock, RelatedMaterialsSection, SectionTitle, CompactMaterial } from '../components/shared'
import { SearchIcon, XIcon } from '../components/icons'

const TRANSCRIPT_SEGMENTS = [
  { time: '00:00:08', text: 'Запись произведена в 1952 году в Доме народного творчества города Фрунзе.' },
  { time: '00:00:42', text: '«Ай, Манас, каан-манас, Ак шумкар, жаан-манас…» — начальные строки инвокации.' },
  { time: '02:14', text: 'Саякбай Каралаев начинает повествование о рождении героя Манаса.' },
  { time: '04:17', text: 'В этом фрагменте Манас обращается к богатырям перед решающей битвой.' },
  { time: '06:33', text: 'Особая техника голоса — ыры — отличает профессионального манасчи от сказителя.' },
  { time: '09:51', text: 'Описание снаряжения богатыря: бронированный доспех, копьё Ачалай, конь Аккула.' },
  { time: '12:04', text: 'Манас обращается к сорока богатырям — чоро — перед походом на Бейджин.' },
  { time: '14:28', text: 'Плач Каныкей после гибели Манаса — один из наиболее лирических фрагментов эпоса.' },
  { time: '17:03', text: 'Завершение сеанса. Комментарий исполнителя на кыргызском языке.' },
]

const RELATED_MEDIA: CompactMaterial[] = [
  { id: 2, type: 'book',    typeLabel: 'Книга',   title: 'Манас. Полный текст в записи Саякбая Каралаева',    author: 'Саякбай Каралаев',    country: 'Кыргызстан', year: 1958 },
  { id: 3, type: 'audio',   typeLabel: 'Аудио',   title: 'Шапак Рысмендеев. Фрагменты Манаса. 1965',          author: 'АН КиргССР',          country: 'Кыргызстан', year: 1965 },
  { id: 4, type: 'photo',   typeLabel: 'Фото',    title: 'Манасчи Джусуп Мамай. Портрет. Нарын, 1978',        country: 'Кыргызстан',         year: 1978, img: 'https://images.unsplash.com/photo-1761872936183-255a939c463a?w=240&h=160&fit=crop&auto=format' },
  { id: 5, type: 'tk',      typeLabel: 'Традиционные знания', title: 'Манасчы — традиция исполнения и передача эпоса', country: 'Кыргызстан', year: 2021 },
]

// ─── Video Player ─────────────────────────────────────────────────────────────

function VideoPlayer({ activeSegment, onSegmentChange }: { activeSegment: number; onSegmentChange: (i: number) => void }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(80)
  const [showSubtitles, setShowSubtitles] = useState(true)

  return (
    <div style={{ background: '#0F2236', borderRadius: 12, overflow: 'hidden', marginBottom: 36 }}>
      {/* Video area */}
      <div style={{ position: 'relative', paddingBottom: '56.25%', background: '#0A1827' }}>
        <img
          src="https://images.unsplash.com/photo-1761872936089-1f90e87bf80d?w=1200&h=675&fit=crop&auto=format"
          alt="Видео: Саякбай Каралаев"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: playing ? 0.95 : 0.7 }}
        />
        {/* Subtitle overlay */}
        {showSubtitles && (
          <div style={{ position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', padding: '0 40px' }}>
            <span style={{ display: 'inline-block', background: 'rgba(0,0,0,0.75)', color: 'white', fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.5, padding: '6px 16px', borderRadius: 4 }}>
              {TRANSCRIPT_SEGMENTS[activeSegment]?.text.slice(0, 60)}…
            </span>
          </div>
        )}
        {/* Duration badge */}
        <div style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(0,0,0,0.6)', borderRadius: 4, padding: '4px 10px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'white' }}>18:42</div>
        {/* Play button */}
        <button onClick={() => setPlaying(p => !p)} style={{ position: 'absolute', inset: 0, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {!playing && (
            <div style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)', border: '2px solid rgba(255,255,255,0.3)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
            </div>
          )}
        </button>
      </div>

      {/* Controls */}
      <div style={{ padding: '12px 20px', background: '#0F2236' }}>
        {/* Progress bar */}
        <div style={{ position: 'relative', height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2, marginBottom: 12, cursor: 'pointer' }}
          onClick={e => { const rect = e.currentTarget.getBoundingClientRect(); setProgress(((e.clientX - rect.left) / rect.width) * 100) }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${progress}%`, background: '#B85A2A', borderRadius: 2 }} />
          <div style={{ position: 'absolute', top: '50%', left: `${progress}%`, width: 12, height: 12, background: 'white', borderRadius: '50%', transform: 'translate(-50%, -50%)', boxShadow: '0 2px 4px rgba(0,0,0,0.4)' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={() => setPlaying(p => !p)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', display: 'flex' }}>
              {playing
                ? <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
                : <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              }
            </button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>
              {Math.floor(progress * 18.7 / 100).toString().padStart(2, '0')}:{Math.floor((progress * 18.7 / 100 % 1) * 60).toString().padStart(2, '0')} / 18:42
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <button onClick={() => setShowSubtitles(s => !s)} style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: showSubtitles ? '#B85A2A' : 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: '0.05em' }}>СС</button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>Кыргызский</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Audio Player ─────────────────────────────────────────────────────────────

function AudioPlayer() {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

  const bars = Array.from({ length: 80 }, (_, i) => 20 + Math.abs(Math.sin(i * 0.4) * 55 + Math.cos(i * 0.7) * 25))

  return (
    <div style={{ background: '#1C3A5E', borderRadius: 12, padding: '28px 28px 24px', marginBottom: 36 }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 600, color: 'white', marginBottom: 6 }}>
        Шапак Рысмендеев — Фрагменты Манаса
      </div>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9EB8D4', marginBottom: 24 }}>Запись 1965 года · 24:18 · Кыргызский</div>

      {/* Waveform */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 2, height: 64, marginBottom: 16, cursor: 'pointer' }}
        onClick={e => { const rect = e.currentTarget.getBoundingClientRect(); setProgress(((e.clientX - rect.left) / rect.width) * 100) }}>
        {bars.map((h, i) => {
          const isPast = (i / bars.length) * 100 < progress
          return (
            <div key={i} style={{ flex: 1, height: `${h}%`, borderRadius: 2, background: isPast ? '#B85A2A' : 'rgba(255,255,255,0.2)', transition: 'background 0.1s' }} />
          )
        })}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <button onClick={() => setPlaying(p => !p)} style={{ width: 44, height: 44, borderRadius: '50%', background: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {playing
            ? <svg width="16" height="16" viewBox="0 0 24 24" fill="#1C3A5E"><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></svg>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="#1C3A5E"><polygon points="5 3 19 12 5 21 5 3" /></svg>
          }
        </button>
        <div style={{ flex: 1, position: 'relative', height: 3, background: 'rgba(255,255,255,0.15)', borderRadius: 2, cursor: 'pointer' }}
          onClick={e => { const rect = e.currentTarget.getBoundingClientRect(); setProgress(((e.clientX - rect.left) / rect.width) * 100) }}>
          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${progress}%`, background: '#B85A2A', borderRadius: 2 }} />
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'rgba(255,255,255,0.6)', flexShrink: 0 }}>
          {Math.floor(progress * 24.3 / 100).toString().padStart(2, '0')}:{Math.floor((progress * 24.3 / 100 % 1) * 60).toString().padStart(2, '0')} / 24:18
        </span>
      </div>
    </div>
  )
}

// ─── Transcript ───────────────────────────────────────────────────────────────

function TranscriptSection({ activeSegment, onSegmentClick }: { activeSegment: number; onSegmentClick: (i: number) => void }) {
  const [transcriptSearch, setTranscriptSearch] = useState('')

  const filtered = TRANSCRIPT_SEGMENTS.filter(s =>
    !transcriptSearch || s.text.toLowerCase().includes(transcriptSearch.toLowerCase()) || s.time.includes(transcriptSearch)
  )

  return (
    <div style={{ marginTop: 40, paddingTop: 36, borderTop: '1px solid #E2DDD5' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#B85A2A', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 6 }}>Транскрипт</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 24, fontWeight: 600, color: '#1C1A17', margin: 0 }}>Расшифровка записи</h2>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490', background: '#F0EBE2', border: '1px solid #E2DDD5', borderRadius: 4, padding: '4px 10px' }}>Кыргызский → Русский</span>
      </div>

      {/* Transcript search */}
      <div style={{ display: 'flex', background: '#F0EBE2', border: '1px solid #E2DDD5', borderRadius: 8, overflow: 'hidden', marginBottom: 20, maxWidth: 480 }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px', color: '#9A9490', flexShrink: 0 }}><SearchIcon size={16} /></div>
        <input
          type="text" value={transcriptSearch} onChange={e => setTranscriptSearch(e.target.value)}
          placeholder="Поиск в транскрипте…"
          style={{ flex: 1, border: 'none', outline: 'none', padding: '10px 8px', fontFamily: 'var(--font-body)', fontSize: 14, background: 'transparent', color: '#1C1A17' }}
        />
        {transcriptSearch && (
          <button onClick={() => setTranscriptSearch('')} style={{ background: 'none', border: 'none', padding: '0 10px', cursor: 'pointer', color: '#9A9490' }}><XIcon size={14} /></button>
        )}
      </div>

      {/* Segments */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {filtered.map((seg, i) => {
          const isActive = i === activeSegment
          const highlight = transcriptSearch && seg.text.toLowerCase().includes(transcriptSearch.toLowerCase())
          return (
            <button
              key={i}
              onClick={() => onSegmentClick(i)}
              style={{
                display: 'flex', gap: 20, padding: '14px 16px', borderRadius: 8, cursor: 'pointer',
                background: isActive ? '#EEF2F7' : highlight ? '#FFF8E8' : 'transparent',
                border: `1px solid ${isActive ? '#C8D8EB' : 'transparent'}`,
                textAlign: 'left', width: '100%', transition: 'all 0.15s',
              }}
              onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = '#F7F4F0' }}
              onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.background = highlight ? '#FFF8E8' : 'transparent' }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: isActive ? '#1C3A5E' : '#B85A2A', flexShrink: 0, paddingTop: 2, minWidth: 56 }}>{seg.time}</span>
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: isActive ? '#1C1A17' : '#4A4540', lineHeight: 1.6 }}>
                {transcriptSearch && highlight ? (
                  <>
                    {seg.text.split(new RegExp(`(${transcriptSearch})`, 'gi')).map((part, j) =>
                      part.toLowerCase() === transcriptSearch.toLowerCase()
                        ? <mark key={j} style={{ background: '#FFF3C4', borderRadius: 2 }}>{part}</mark>
                        : part
                    )}
                  </>
                ) : seg.text}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

interface MediaDetailPageProps {
  variant?: 'video' | 'audio'
  onNavigate?: (p: string) => void
}

export function MediaDetailPage({ variant = 'video', onNavigate }: MediaDetailPageProps) {
  const [activeSegment, setActiveSegment] = useState(0)

  const isVideo = variant === 'video'

  return (
    <div style={{ background: '#FAF8F4', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 48px 72px' }}>

        <Breadcrumb
          items={[{ label: 'Мирас', page: 'home' }, { label: 'Каталог', page: 'catalog' }, { label: isVideo ? 'Видео' : 'Аудио' }, { label: isVideo ? 'Каралаев. Манас 1952' : 'Рысмендеев. Манас 1965' }]}
          onNavigate={onNavigate}
        />

        <div style={{ marginBottom: 32 }}>
          <div style={{ marginBottom: 14 }}><TypeBadge type={isVideo ? 'video' : 'audio'} label={isVideo ? 'Видео' : 'Аудио'} large /></div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 40, fontWeight: 700, color: '#1C1A17', lineHeight: 1.1, letterSpacing: '-0.02em', maxWidth: 800, marginBottom: 10 }}>
            {isVideo ? 'Саякбай Каралаев исполняет Манас. Архивная съёмка' : 'Шапак Рысмендеев. Фрагменты Манаса'}
          </h1>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#9A9490' }}>
            {isVideo ? 'Дом народного творчества г. Фрунзе · 1952' : 'Запись экспедиции АН КиргССР · 1965'}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, alignItems: 'start' }}>

          {/* LEFT — player + transcript */}
          <div>
            {isVideo
              ? <VideoPlayer activeSegment={activeSegment} onSegmentChange={setActiveSegment} />
              : <AudioPlayer />
            }

            {/* Description */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Об этой записи</div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#3D3A36', lineHeight: 1.75, marginBottom: 12 }}>
                {isVideo
                  ? 'Уникальная архивная видеозапись исполнения эпоса «Манас» Саякбаем Каралаевым в студийных условиях. Запись является единственным сохранившимся видеодокументом его выступления.'
                  : 'Аудиозапись исполнения фрагментов эпоса «Манас» Шапаком Рысмендеевым — одним из крупнейших манасчи второй половины XX века. Запись сделана в ходе этнографической экспедиции.'
                }
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#3D3A36', lineHeight: 1.75 }}>
                Субтитры на русском языке подготовлены Институтом языкознания НАН КР в 2021 году. Транскрипт доступен для полнотекстового поиска.
              </p>
            </div>

            <TranscriptSection activeSegment={activeSegment} onSegmentClick={setActiveSegment} />

            {/* Related */}
            <div style={{ marginTop: 48, paddingTop: 36, borderTop: '1px solid #E2DDD5' }}>
              <SectionTitle title="Связанные материалы" />
              <RelatedMaterialsSection materials={RELATED_MEDIA} onNavigate={onNavigate} />
            </div>
          </div>

          {/* RIGHT — metadata */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <AccessBlock type="view-only" />

            <MetadataPanel title="Описание материала">
              <MetadataItem label="Исполнитель" value={isVideo ? 'Саякбай Каралаев' : 'Шапак Рысмендеев'} />
              <MetadataItem label="Год" value={isVideo ? '1952' : '1965'} />
              <MetadataItem label="Продолжительность" value={isVideo ? '18:42' : '24:18'} />
              <MetadataItem label="Язык" value="Кыргызский" />
              <MetadataItem label="Субтитры" value="Русский (2021)" />
              <MetadataItem label="Страна" value="Кыргызстан" />
              <MetadataItem label="Место записи" value={isVideo ? 'Фрунзе (Бишкек)' : 'Нарынская область'} />
              <MetadataItem label="Транскрипт" value="Полный · Кыргызский" highlight />
            </MetadataPanel>

            <MetadataPanel title="Область знания">
              <MetadataItem label="Категория" value="Устные традиции, эпос" />
              <MetadataItem label="Тема" value="Манас · Манасчы" />
            </MetadataPanel>

            <MetadataPanel title="Источник и права">
              <MetadataItem label="Источник" value={isVideo ? 'Госархив КиргССР' : 'АН КиргССР'} />
              <MetadataItem label="Оцифровка" value="2019" />
              <MetadataItem label="Лицензия" value="Только просмотр" />
            </MetadataPanel>
          </div>
        </div>
      </div>
    </div>
  )
}
