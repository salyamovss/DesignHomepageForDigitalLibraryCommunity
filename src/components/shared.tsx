import React from 'react'
import { BookIcon, VideoIcon, AudioIcon, PhotoIcon, ArticleIcon, TKIcon, ChevronRight, ArrowRight } from './icons'

// ─── Type Config ──────────────────────────────────────────────────────────────

export const TYPE_CONFIG: Record<string, { bg: string; fg: string; border: string; stripe: string; icon: React.ReactElement; label: string }> = {
  book:    { bg: '#EEF2F7', fg: '#1C3A5E', border: '#C8D8EB', stripe: '#1C3A5E', icon: <BookIcon />,    label: 'Книга' },
  article: { bg: '#F4F1EE', fg: '#3D2B1A', border: '#D8CFCA', stripe: '#6B4226', icon: <ArticleIcon />, label: 'Статья' },
  video:   { bg: '#F9EEE8', fg: '#7B2D00', border: '#E8C4B0', stripe: '#7B2D00', icon: <VideoIcon />,   label: 'Видео' },
  audio:   { bg: '#F1EDF8', fg: '#4A1D6B', border: '#D3C0E8', stripe: '#4A1D6B', icon: <AudioIcon />,   label: 'Аудио' },
  photo:   { bg: '#EEF4EE', fg: '#1A4A1A', border: '#BDD8BD', stripe: '#2D6A2D', icon: <PhotoIcon />,   label: 'Фото' },
  tk:      { bg: '#F5F0E8', fg: '#5C3A00', border: '#D8C89A', stripe: '#5C3A00', icon: <TKIcon />,      label: 'Традиционные знания' },
}

// ─── TypeBadge ────────────────────────────────────────────────────────────────

export function TypeBadge({ type, label, large }: { type: string; label?: string; large?: boolean }) {
  const cfg = TYPE_CONFIG[type]
  const text = label ?? cfg?.label ?? type
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: cfg?.bg || '#EEE', color: cfg?.fg || '#333', border: `1px solid ${cfg?.border || '#DDD'}`,
      borderRadius: 4, padding: large ? '5px 12px' : '3px 8px',
      fontFamily: 'var(--font-mono)', fontSize: large ? 12 : 10.5,
      letterSpacing: '0.06em', textTransform: 'uppercase', flexShrink: 0,
    }}>
      {cfg?.icon}{text}
    </span>
  )
}

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

export function Breadcrumb({ items, onNavigate }: {
  items: { label: string; page?: string }[]
  onNavigate?: (p: string) => void
}) {
  return (
    <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490', letterSpacing: '0.04em', marginBottom: 28, flexWrap: 'wrap' }}>
      {items.map((item, i) => (
        <React.Fragment key={i}>
          {i > 0 && <ChevronRight size={11} />}
          {item.page && i < items.length - 1 ? (
            <button onClick={() => onNavigate?.(item.page!)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#B85A2A', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.04em' }}>
              {item.label}
            </button>
          ) : (
            <span style={{ color: i === items.length - 1 ? '#3D3A36' : '#9A9490' }}>{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  )
}

// ─── SectionTitle ─────────────────────────────────────────────────────────────

export function SectionTitle({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: { label: string; onClick?: () => void } }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 28 }}>
      <div>
        {eyebrow && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#B85A2A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 8 }}>{eyebrow}</div>}
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 600, color: '#1C1A17', lineHeight: 1.2, letterSpacing: '-0.01em', margin: 0 }}>{title}</h2>
      </div>
      {action && (
        <button onClick={action.onClick} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500, color: '#B85A2A', background: 'none', border: 'none', cursor: 'pointer' }}>
          {action.label} <ArrowRight size={14} />
        </button>
      )}
    </div>
  )
}

// ─── MetadataItem ─────────────────────────────────────────────────────────────

export function MetadataItem({ label, value, highlight }: { label: string; value: React.ReactNode; highlight?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 12, padding: '10px 0', borderBottom: '1px solid #F0EBE2' }}>
      <dt style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490', letterSpacing: '0.04em', textTransform: 'uppercase', paddingTop: 2 }}>{label}</dt>
      <dd style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: highlight ? '#B85A2A' : '#1C1A17', fontWeight: highlight ? 500 : 400, margin: 0 }}>{value}</dd>
    </div>
  )
}

// ─── MetadataPanel ────────────────────────────────────────────────────────────

export function MetadataPanel({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div style={{ background: 'white', border: '1px solid #E2DDD5', borderRadius: 12, overflow: 'hidden' }}>
      {title && (
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #E2DDD5', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#756E65', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          {title}
        </div>
      )}
      <dl style={{ margin: 0, padding: '0 20px' }}>{children}</dl>
    </div>
  )
}

// ─── AccessBlock ──────────────────────────────────────────────────────────────

type AccessType = 'open' | 'view-only' | 'request' | 'embargo' | 'closed'

export function AccessBlock({ type, embargoDate }: { type: AccessType; embargoDate?: string }) {
  const configs: Record<AccessType, { bg: string; border: string; label: string; desc?: string; actions: { label: string; primary?: boolean }[] }> = {
    open: {
      bg: '#F0F7F0', border: '#B8D8B8', label: 'Открытый доступ',
      actions: [{ label: 'Открыть документ', primary: true }, { label: 'Скачать PDF' }],
    },
    'view-only': {
      bg: '#F0F4F8', border: '#B8CDE0', label: 'Только для просмотра',
      desc: 'Материал доступен для просмотра онлайн. Скачивание недоступно.',
      actions: [{ label: 'Открыть для просмотра', primary: true }],
    },
    request: {
      bg: '#FDF5EE', border: '#E8C4A0', label: 'Ограниченный доступ',
      desc: 'Для получения доступа к этому материалу необходимо подать запрос.',
      actions: [{ label: 'Запросить доступ', primary: true }],
    },
    embargo: {
      bg: '#F5F5F0', border: '#D8D4C8', label: 'Эмбарго',
      desc: `Материал станет доступен после ${embargoDate || 'указанной даты'}.`,
      actions: [],
    },
    closed: {
      bg: '#F5F2F0', border: '#D8D0C8', label: 'Закрытый архив',
      desc: 'Доступ к этому материалу ограничен. Обратитесь к администратору.',
      actions: [{ label: 'Связаться с архивом' }],
    },
  }
  const cfg = configs[type]
  return (
    <div style={{ background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 10, padding: '18px 20px' }}>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#756E65', marginBottom: 6 }}>Доступ</div>
      <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#1C1A17', marginBottom: cfg.desc ? 6 : 0 }}>{cfg.label}</div>
      {cfg.desc && <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#5A5550', lineHeight: 1.5, margin: '0 0 14px' }}>{cfg.desc}</p>}
      {cfg.actions.length > 0 && (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 12 }}>
          {cfg.actions.map(a => (
            <button key={a.label} style={{
              fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600,
              padding: '9px 18px', borderRadius: 7, cursor: 'pointer',
              background: a.primary ? '#1C3A5E' : 'transparent',
              color: a.primary ? 'white' : '#1C3A5E',
              border: `1px solid ${a.primary ? '#1C3A5E' : '#1C3A5E'}`,
              transition: 'all 0.15s',
            }}>{a.label}</button>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function SkeletonBar({ w = '100%', h = 16, r = 4 }: { w?: string | number; h?: number; r?: number }) {
  return (
    <div style={{
      width: w, height: h, borderRadius: r,
      background: 'linear-gradient(90deg, #E8E3DA 25%, #F0EBE2 50%, #E8E3DA 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
    }} />
  )
}

export function LoadingSkeleton({ variant = 'card' }: { variant?: 'card' | 'detail' | 'text' }) {
  return (
    <>
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0 } 100% { background-position: -200% 0 } }`}</style>
      {variant === 'card' && (
        <div style={{ background: 'white', border: '1px solid #E2DDD5', borderRadius: 10, padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <SkeletonBar w={80} h={20} r={4} />
          <SkeletonBar h={22} />
          <SkeletonBar w="75%" h={22} />
          <SkeletonBar w="40%" h={14} />
          <SkeletonBar h={14} />
          <SkeletonBar w="85%" h={14} />
        </div>
      )}
      {variant === 'detail' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <SkeletonBar h={48} r={6} />
            <SkeletonBar w="60%" h={32} />
            <SkeletonBar h={200} r={8} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[100, 95, 88, 80, 90].map((w, i) => <SkeletonBar key={i} w={`${w}%`} h={16} />)}
            </div>
          </div>
          <div style={{ background: 'white', border: '1px solid #E2DDD5', borderRadius: 12, padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <SkeletonBar w="35%" h={12} />
                <SkeletonBar w="50%" h={12} />
              </div>
            ))}
          </div>
        </div>
      )}
      {variant === 'text' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[100, 95, 88, 80, 90, 85, 70].map((w, i) => <SkeletonBar key={i} w={`${w}%`} h={16} />)}
        </div>
      )}
    </>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────

export function EmptyState({ icon, title, description, action }: {
  icon?: React.ReactNode; title: string; description?: string; action?: { label: string; onClick: () => void }
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '64px 24px', textAlign: 'center' }}>
      {icon && <div style={{ width: 56, height: 56, background: '#F0EBE2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, color: '#B0A99E' }}>{icon}</div>}
      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: '#1C1A17', marginBottom: 10, margin: '0 0 10px' }}>{title}</h3>
      {description && <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#756E65', lineHeight: 1.6, maxWidth: 360, margin: '0 0 28px' }}>{description}</p>}
      {action && (
        <button onClick={action.onClick} style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'white', background: '#1C3A5E', border: 'none', borderRadius: 8, padding: '11px 24px', cursor: 'pointer' }}>
          {action.label}
        </button>
      )}
    </div>
  )
}

// ─── System State Cards (processing, OCR, etc.) ───────────────────────────────

export function ProcessingState({ type }: { type: 'file' | 'ocr' | 'transcript' }) {
  const msgs: Record<string, { label: string; desc: string }> = {
    file:       { label: 'Файл обрабатывается',          desc: 'Загрузка и проверка файла. Обычно занимает несколько минут.' },
    ocr:        { label: 'OCR ещё не завершён',           desc: 'Текст извлекается из отсканированных страниц. Скоро будет доступен полнотекстовый поиск.' },
    transcript: { label: 'Транскрипт готовится',          desc: 'Расшифровка аудио или видео ещё не завершена. Проверьте позже.' },
  }
  const cfg = msgs[type]
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, background: '#F5F0E8', border: '1px solid #D8C89A', borderRadius: 10, padding: '16px 18px' }}>
      <div style={{ width: 32, height: 32, borderRadius: '50%', border: '3px solid #B85A2A', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite', flexShrink: 0 }} />
      <div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#1C1A17', marginBottom: 4 }}>{cfg.label}</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#756E65', lineHeight: 1.5 }}>{cfg.desc}</div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

// ─── Error Page ───────────────────────────────────────────────────────────────

export function ErrorPage({ code = 404, onBack }: { code?: number; onBack?: () => void }) {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 24px', textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: 96, fontWeight: 700, color: '#E8E3DA', lineHeight: 1, marginBottom: 8 }}>{code}</div>
      <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 600, color: '#1C1A17', marginBottom: 12 }}>
        {code === 404 ? 'Страница не найдена' : 'Произошла ошибка'}
      </h2>
      <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#756E65', lineHeight: 1.6, maxWidth: 400, marginBottom: 36 }}>
        {code === 404
          ? 'Запрашиваемая страница не существует или была перемещена.'
          : 'Что-то пошло не так. Попробуйте обновить страницу или вернитесь позже.'}
      </p>
      <div style={{ display: 'flex', gap: 12 }}>
        {onBack && (
          <button onClick={onBack} style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: 'white', background: '#1C3A5E', border: 'none', borderRadius: 8, padding: '12px 24px', cursor: 'pointer' }}>
            На главную
          </button>
        )}
        <button onClick={() => window.location.reload()} style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#1C3A5E', background: 'transparent', border: '1px solid #1C3A5E', borderRadius: 8, padding: '12px 24px', cursor: 'pointer' }}>
          Обновить страницу
        </button>
      </div>
    </div>
  )
}

// ─── Compact Material Card (for related sections) ─────────────────────────────

export interface CompactMaterial {
  id: number; type: string; typeLabel: string; title: string
  author?: string; country?: string; year?: number; img?: string | null
}

export function CompactMaterialCard({ mat, onNavigate }: { mat: CompactMaterial; onNavigate?: (p: string) => void }) {
  const cfg = TYPE_CONFIG[mat.type]
  return (
    <a
      href="#"
      onClick={e => { e.preventDefault(); onNavigate?.('publication') }}
      style={{
        display: 'flex', gap: 12, textDecoration: 'none',
        background: 'white', border: '1px solid #E2DDD5', borderRadius: 9,
        overflow: 'hidden', transition: 'all 0.15s',
      }}
      onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = '#1C3A5E'; el.style.transform = 'translateY(-1px)' }}
      onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#E2DDD5'; el.style.transform = 'translateY(0)' }}
    >
      <div style={{ width: 4, background: cfg?.stripe || '#1C3A5E', flexShrink: 0 }} />
      {mat.img && (
        <div style={{ width: 80, height: 80, flexShrink: 0, background: '#E0D9CF', overflow: 'hidden' }}>
          <img src={mat.img} alt={mat.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      )}
      <div style={{ padding: '12px 12px 12px 8px', flex: 1, minWidth: 0 }}>
        <div style={{ marginBottom: 6 }}><TypeBadge type={mat.type} label={mat.typeLabel} /></div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: '#1C1A17', lineHeight: 1.3, marginBottom: 4,
          overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
          {mat.title}
        </div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#9A9490' }}>
          {[mat.author, mat.country, mat.year].filter(Boolean).join(' · ')}
        </div>
      </div>
    </a>
  )
}

// ─── Related Materials Section ────────────────────────────────────────────────

export function RelatedMaterialsSection({ materials, onNavigate }: { materials: CompactMaterial[]; onNavigate?: (p: string) => void }) {
  const byType = materials.reduce((acc, m) => {
    if (!acc[m.type]) acc[m.type] = []
    acc[m.type].push(m)
    return acc
  }, {} as Record<string, CompactMaterial[]>)

  return (
    <div>
      {Object.entries(byType).map(([type, mats]) => (
        <div key={type} style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <TypeBadge type={type} label={TYPE_CONFIG[type]?.label || type} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490' }}>{mats.length}</span>
            </div>
            {mats.length > 3 && (
              <button style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#B85A2A', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                Все <ArrowRight size={13} />
              </button>
            )}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
            {mats.slice(0, 4).map(mat => <CompactMaterialCard key={mat.id} mat={mat} onNavigate={onNavigate} />)}
          </div>
        </div>
      ))}
    </div>
  )
}
