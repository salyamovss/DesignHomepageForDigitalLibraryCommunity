import React, { useState } from 'react'
import { Breadcrumb, TypeBadge, MetadataPanel, MetadataItem, AccessBlock, RelatedMaterialsSection, SectionTitle, CompactMaterial, ProcessingState } from '../components/shared'
import { BookIcon, ArrowRight } from '../components/icons'

const RELATED: CompactMaterial[] = [
  { id: 2, type: 'video',   typeLabel: 'Видео',   title: 'Саякбай Каралаев исполняет Манас. Архивная съёмка 1952', author: 'Госархив КиргССР', country: 'Кыргызстан', year: 1952, img: 'https://images.unsplash.com/photo-1761872936089-1f90e87bf80d?w=240&h=160&fit=crop&auto=format' },
  { id: 3, type: 'audio',   typeLabel: 'Аудио',   title: 'Шапак Рысмендеев. Фрагменты Манаса. 1965', author: 'АН КиргССР', country: 'Кыргызстан', year: 1965 },
  { id: 4, type: 'article', typeLabel: 'Статья',  title: 'Эпос Манас как источник по этнической истории кыргызов', author: 'В. М. Плоских', country: 'Кыргызстан', year: 2018 },
  { id: 5, type: 'photo',   typeLabel: 'Фото',    title: 'Манасчи Джусуп Мамай. Портрет. Нарын, 1978', country: 'Кыргызстан', year: 1978, img: 'https://images.unsplash.com/photo-1761872936183-255a939c463a?w=240&h=160&fit=crop&auto=format' },
  { id: 6, type: 'tk',      typeLabel: 'Традиционные знания', title: 'Манасчы — традиция исполнения и передача эпоса', country: 'Кыргызстан', year: 2021 },
  { id: 7, type: 'book',    typeLabel: 'Книга',   title: 'Семетей и Сейтек. Вторая и третья части трилогии', author: 'Саякбай Каралаев', country: 'Кыргызстан', year: 1960 },
]

const TOC = [
  { n: 1, title: 'Предисловие редактора' },
  { n: 2, title: 'Часть первая: Рождение Манаса' },
  { n: 3, title: 'Часть вторая: Поход на Бейджин' },
  { n: 4, title: 'Часть третья: Великий поход Кёкётёй' },
  { n: 5, title: 'Часть четвёртая: Гибель Манаса' },
  { n: 6, title: 'Комментарии и примечания' },
  { n: 7, title: 'Словарь терминов' },
  { n: 8, title: 'Именной указатель' },
]

export function PublicationDetailPage({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState<'description' | 'toc' | 'bibliography'>('description')
  const [tocExpanded, setTocExpanded] = useState(false)

  return (
    <div style={{ background: '#FAF8F4', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 48px 72px' }}>

        <Breadcrumb
          items={[{ label: 'Мирас', page: 'home' }, { label: 'Каталог', page: 'catalog' }, { label: 'Книга' }, { label: 'Манас' }]}
          onNavigate={onNavigate}
        />

        {/* Page header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ marginBottom: 16 }}><TypeBadge type="book" label="Книга" large /></div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 48, fontWeight: 700, color: '#1C1A17', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 12, maxWidth: 800 }}>
            Манас
          </h1>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#756E65', fontStyle: 'italic', marginBottom: 8 }}>
            Manas · Манас (кырг.)
          </div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#5A5550' }}>
            Полный текст эпоса в записи Саякбая Каралаева. Издание Академии наук Киргизской ССР
          </div>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40, alignItems: 'start' }}>

          {/* LEFT — main content */}
          <div>
            {/* Cover + description */}
            <div style={{ display: 'flex', gap: 32, marginBottom: 40 }}>
              {/* Cover image */}
              <div style={{ width: 180, flexShrink: 0 }}>
                <div style={{ background: 'linear-gradient(135deg, #1C3A5E 0%, #0F2236 100%)', borderRadius: 8, aspectRatio: '2/3', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 20, boxShadow: '0 8px 32px rgba(0,0,0,0.2)' }}>
                  <div style={{ color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}><BookIcon size={40} /></div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'white', textAlign: 'center', lineHeight: 1.2 }}>Манас</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 12, letterSpacing: '0.05em' }}>САЯКБАЙ КАРАЛАЕВ</div>
                  <div style={{ marginTop: 'auto', fontFamily: 'var(--font-mono)', fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.05em' }}>АН КиргССР · 1958</div>
                </div>
              </div>

              {/* Short description */}
              <div style={{ flex: 1 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#3D3A36', lineHeight: 1.75, marginBottom: 16 }}>
                  «Манас» — центральный эпос кыргызского народа, один из крупнейших эпических произведений мира. Согласно подсчётам, его полный текст насчитывает более полумиллиона строк — почти в 20 раз длиннее «Илиады» и «Одиссеи» вместе взятых.
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 16, color: '#3D3A36', lineHeight: 1.75 }}>
                  Настоящее издание представляет запись эпоса от Саякбая Каралаева (1894–1971) — наиболее авторитетного манасчи XX века. Текст был зафиксирован экспедицией Академии наук КиргССР в 1949–1956 годах и впервые опубликован в полном объёме.
                </p>
              </div>
            </div>

            {/* Document preview */}
            <div style={{ marginBottom: 36 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Просмотр документа</div>
              <div style={{ background: '#E8E3DA', borderRadius: 10, height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #D8D3CA', position: 'relative', overflow: 'hidden' }}>
                {/* Simulated document pages */}
                <div style={{ position: 'absolute', inset: 0, display: 'flex', gap: 2, padding: 16, overflow: 'hidden' }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ flex: 1, background: 'white', borderRadius: 4, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 8, opacity: i === 0 ? 1 : i === 1 ? 0.7 : 0.4 }}>
                      <div style={{ height: 12, background: '#E8E3DA', borderRadius: 2, width: '60%' }} />
                      {Array.from({ length: 12 }).map((_, j) => (
                        <div key={j} style={{ height: 8, background: '#F0EBE2', borderRadius: 2, width: `${70 + Math.sin(j * 1.3) * 20}%` }} />
                      ))}
                    </div>
                  ))}
                </div>
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(248,245,240,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <button style={{ background: '#1C3A5E', color: 'white', border: 'none', borderRadius: 8, padding: '12px 24px', fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
                    Открыть полный документ
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div style={{ borderBottom: '1px solid #E2DDD5', marginBottom: 28, display: 'flex', gap: 0 }}>
              {(['description', 'toc', 'bibliography'] as const).map(tab => {
                const labels = { description: 'Описание', toc: 'Содержание', bibliography: 'Библиография' }
                const isActive = activeTab === tab
                return (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{
                    fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#1C1A17' : '#756E65', background: 'none', border: 'none',
                    borderBottom: `2px solid ${isActive ? '#B85A2A' : 'transparent'}`,
                    padding: '12px 20px', cursor: 'pointer', marginBottom: -1, transition: 'all 0.15s',
                  }}>{labels[tab]}</button>
                )
              })}
            </div>

            {activeTab === 'description' && (
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#3D3A36', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 16 }}>Эпос «Манас» — трёхчастная трилогия, включающая «Манас», «Семетей» и «Сейтек». Главный герой, богатырь Манас, объединяет кыргызские племена и ведёт их в борьбе с завоевателями.</p>
                <p style={{ marginBottom: 16 }}>В тексте эпоса содержатся сведения о быте, религиозных воззрениях, географии, военном искусстве, этикете и традиционных ценностях кыргызского народа. Эпос является важнейшим историческим и этнографическим источником.</p>
                <p>Запись Саякбая Каралаева отличается особой полнотой и художественным совершенством. В 2013 году эпос «Манас» был включён в Репрезентативный список нематериального культурного наследия человечества ЮНЕСКО.</p>
              </div>
            )}

            {activeTab === 'toc' && (
              <div>
                {(tocExpanded ? TOC : TOC.slice(0, 5)).map(item => (
                  <div key={item.n} style={{ display: 'flex', gap: 16, padding: '12px 0', borderBottom: '1px solid #F0EBE2', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490', width: 24, flexShrink: 0 }}>{item.n}</span>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#1C1A17' }}>{item.title}</span>
                  </div>
                ))}
                {!tocExpanded && TOC.length > 5 && (
                  <button onClick={() => setTocExpanded(true)} style={{ marginTop: 12, fontFamily: 'var(--font-body)', fontSize: 13, color: '#B85A2A', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 }}>
                    Показать всё содержание ({TOC.length} разделов) <ArrowRight size={13} />
                  </button>
                )}
              </div>
            )}

            {activeTab === 'bibliography' && (
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: '#5A5550', lineHeight: 1.8 }}>
                <p style={{ marginBottom: 8 }}>Каралаев С. Манас. Эпос в записи С. Каралаева. — Фрунзе: Изд-во АН Киргизской ССР, 1958. — Т. 1–8.</p>
                <p style={{ marginBottom: 8 }}>APA: Karalayev, S. (1958). <em>Manas</em>. Frunze: AN Kirgizskoy SSR.</p>
                <div style={{ marginTop: 20, padding: '14px 16px', background: '#F5F0E8', borderRadius: 8, border: '1px solid #E8D8A8' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#756E65', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>Постоянная ссылка</div>
                  <code style={{ fontSize: 12, color: '#1C3A5E', wordBreak: 'break-all' }}>https://miras-library.org/materials/book/manas-karalayev-1958</code>
                </div>
              </div>
            )}

            {/* Related knowledge areas */}
            <div style={{ marginTop: 48, paddingTop: 36, borderTop: '1px solid #E2DDD5' }}>
              <SectionTitle title="Связанные знания и темы" />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {['Устные традиции и эпос', 'Манасчы', 'Кыргызский язык', 'Героические эпосы', 'Нематериальное наследие ЮНЕСКО', 'Эпическая поэзия Центральной Азии'].map(tag => (
                  <button key={tag} style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#1C3A5E', background: '#EEF2F7', border: '1px solid #C8D8EB', borderRadius: 100, padding: '6px 16px', cursor: 'pointer' }}>{tag}</button>
                ))}
              </div>
            </div>

            {/* Related materials */}
            <div style={{ marginTop: 48, paddingTop: 36, borderTop: '1px solid #E2DDD5' }}>
              <SectionTitle title="Связанные материалы" />
              <RelatedMaterialsSection materials={RELATED} onNavigate={onNavigate} />
            </div>
          </div>

          {/* RIGHT — metadata panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* Access */}
            <AccessBlock type="open" />

            {/* Metadata */}
            <MetadataPanel title="Описание материала">
              <MetadataItem label="Автор" value={<button onClick={() => onNavigate?.('author')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#B85A2A', fontFamily: 'var(--font-body)', fontSize: 14, textDecoration: 'underline', textUnderlineOffset: 2 }}>Саякбай Каралаев</button>} />
              <MetadataItem label="Год" value="1958" />
              <MetadataItem label="Язык" value="Кыргызский" />
              <MetadataItem label="Страна" value={<button onClick={() => onNavigate?.('country')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#B85A2A', fontFamily: 'var(--font-body)', fontSize: 14, textDecoration: 'underline', textUnderlineOffset: 2 }}>Кыргызстан</button>} />
              <MetadataItem label="Регион" value="Иссык-Кульская область" />
              <MetadataItem label="Тип" value="Книга / эпическое произведение" />
              <MetadataItem label="Страниц" value="2 847" />
              <MetadataItem label="Томов" value="8" />
            </MetadataPanel>

            <MetadataPanel title="Область знания">
              <MetadataItem label="Категория" value={<button onClick={() => onNavigate?.('tk')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#B85A2A', fontFamily: 'var(--font-body)', fontSize: 14, textDecoration: 'underline', textUnderlineOffset: 2 }}>Устные традиции, язык, эпос и фольклор</button>} />
              <MetadataItem label="Подкатегория" value="Героический эпос" />
              <MetadataItem label="ЮНЕСКО" value="Список НКН человечества, 2013" highlight />
            </MetadataPanel>

            <MetadataPanel title="Источник и права">
              <MetadataItem label="Источник" value="АН Киргизской ССР" />
              <MetadataItem label="Хранение" value="Национальная библиотека КР" />
              <MetadataItem label="Лицензия" value="Общественное достояние" />
              <MetadataItem label="OCR" value="Завершён · 2022" />
            </MetadataPanel>

            {/* About author */}
            <div style={{ background: 'white', border: '1px solid #E2DDD5', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#756E65', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Об авторе</div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #1C3A5E, #4A7FA0)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: 'white' }}>С</div>
                <div>
                  <button onClick={() => onNavigate?.('author')} style={{ fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 600, color: '#1C1A17', background: 'none', border: 'none', padding: 0, cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 2, textAlign: 'left' }}>Саякбай Каралаев</button>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490', marginTop: 4, lineHeight: 1.4 }}>Манасчы · 1894–1971<br />Кыргызстан</div>
                </div>
              </div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#5A5550', lineHeight: 1.6, marginTop: 12, marginBottom: 0 }}>
                Крупнейший манасчи XX века, народный артист СССР. Сохранил и передал наиболее полную версию трилогии Манас.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
