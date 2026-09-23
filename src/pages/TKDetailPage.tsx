import React, { useState } from 'react'
import { Breadcrumb, TypeBadge, MetadataPanel, MetadataItem, SectionTitle, CompactMaterialCard, RelatedMaterialsSection, CompactMaterial } from '../components/shared'
import { ArrowRight } from '../components/icons'

const RELATED_BY_TYPE = {
  publications: [
    { id: 1, type: 'book',    typeLabel: 'Книга',   title: 'Манас. Полный текст эпоса в записи Саякбая Каралаева', author: 'Саякбай Каралаев', country: 'Кыргызстан', year: 1958 },
    { id: 7, type: 'book',    typeLabel: 'Книга',   title: 'Семетей и Сейтек. Вторая и третья части трилогии',     author: 'Саякбай Каралаев', country: 'Кыргызстан', year: 1960 },
    { id: 8, type: 'article', typeLabel: 'Статья',  title: 'Международный симпозиум по эпосу Манас. Материалы',    author: 'НАН КР',           country: 'Кыргызстан', year: 2014 },
    { id: 9, type: 'article', typeLabel: 'Статья',  title: 'Эпос Манас как источник по этнической истории',        author: 'В. М. Плоских',    country: 'Кыргызстан', year: 2018 },
  ] as CompactMaterial[],
  videos: [
    { id: 2, type: 'video', typeLabel: 'Видео', title: 'Саякбай Каралаев исполняет Манас. Архивная съёмка 1952', author: 'Госархив КиргССР', country: 'Кыргызстан', year: 1952, img: 'https://images.unsplash.com/photo-1761872936089-1f90e87bf80d?w=240&h=160&fit=crop&auto=format' },
    { id: 10, type: 'video', typeLabel: 'Видео', title: 'Манас 1000. Документальный фильм о юбилейных торжествах', author: 'ТРК «Пирамида»', country: 'Кыргызстан', year: 1995, img: 'https://images.unsplash.com/photo-1595496358672-2d175fcdd01a?w=240&h=160&fit=crop&auto=format' },
  ] as CompactMaterial[],
  audios: [
    { id: 3, type: 'audio', typeLabel: 'Аудио', title: 'Шапак Рысмендеев. Фрагменты Манаса. 1965', author: 'АН КиргССР', country: 'Кыргызстан', year: 1965 },
    { id: 11, type: 'audio', typeLabel: 'Аудио', title: 'Джусуп Мамай. Полный текст Манаса. Запись 1984–1992', author: 'Госрадио КР', country: 'Кыргызстан', year: 1992 },
  ] as CompactMaterial[],
  photos: [
    { id: 5, type: 'photo', typeLabel: 'Фото', title: 'Манасчи Джусуп Мамай. Портрет. Нарын, 1978', country: 'Кыргызстан', year: 1978, img: 'https://images.unsplash.com/photo-1761872936183-255a939c463a?w=240&h=160&fit=crop&auto=format' },
    { id: 12, type: 'photo', typeLabel: 'Фото', title: 'Манасчи на праздничном собрании. Бишкек, 2013', country: 'Кыргызстан', year: 2013 },
    { id: 13, type: 'photo', typeLabel: 'Фото', title: 'Обложки изданий Манаса. ХХ век', country: 'Кыргызстан', year: 1980 },
  ] as CompactMaterial[],
}

const PEOPLE = [
  { name: 'Саякбай Каралаев', role: 'Манасчы', dates: '1894–1971', note: 'Крупнейший исполнитель XX века' },
  { name: 'Джусуп Мамай',     role: 'Манасчы', dates: '1918–2014', note: 'Последний манасчи, знавший полный текст' },
  { name: 'Шапак Рысмендеев', role: 'Манасчы', dates: '1939–2013', note: 'Лауреат государственных премий КР' },
  { name: 'В. М. Плоских',    role: 'Исследователь', dates: '1937–', note: 'Академик НАН КР, специалист по эпосу' },
]

const REGIONS = [
  { name: 'Нарынская область', desc: 'Историческая колыбель эпоса' },
  { name: 'Иссык-Кульская область', desc: 'Активная традиция исполнения' },
  { name: 'Таласская область', desc: 'Связана с местом рождения Манаса' },
  { name: 'Бишкек', desc: 'Центр современных исследований' },
]

export function TKDetailPage({ onNavigate }: { onNavigate?: (p: string) => void }) {
  const [activeTab, setActiveTab] = useState<'description' | 'transmission' | 'history'>('description')

  const countTotal = Object.values(RELATED_BY_TYPE).flat().length

  return (
    <div style={{ background: '#FAF8F4', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '36px 48px 72px' }}>

        <Breadcrumb
          items={[{ label: 'Мирас', page: 'home' }, { label: 'Традиционные знания', page: 'home' }, { label: 'Эпос Манас' }]}
          onNavigate={onNavigate}
        />

        {/* Page header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ marginBottom: 14 }}>
              <TypeBadge type="tk" label="Традиционные знания" large />
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#B85A2A', letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 12 }}>
              Устные традиции, язык, эпос и фольклор
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 700, color: '#1C1A17', lineHeight: 1.05, letterSpacing: '-0.025em', marginBottom: 14 }}>
              Эпос «Манас»
            </h1>
            <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#756E65', fontStyle: 'italic', marginBottom: 20 }}>
              Manas · Манас (кырг.) · Манас эпосу
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, color: '#3D3A36', lineHeight: 1.75, maxWidth: 640 }}>
              Героический эпос кыргызского народа — одно из крупнейших эпических произведений мира. Насчитывает более 500 000 строк и охватывает историю трёх поколений богатырей: Манаса, Семетея и Сейтека.
            </p>
          </div>

          {/* Stats panel */}
          <div>
            <div style={{ background: '#1C3A5E', borderRadius: 12, padding: '24px', marginBottom: 16 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9EB8D4', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 20 }}>В библиотеке Мирас</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {[
                  { n: Object.values(RELATED_BY_TYPE.publications).length, label: 'Публикации' },
                  { n: RELATED_BY_TYPE.videos.length, label: 'Видео' },
                  { n: RELATED_BY_TYPE.audios.length, label: 'Аудио' },
                  { n: RELATED_BY_TYPE.photos.length, label: 'Фотографии' },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'white', lineHeight: 1 }}>{s.n}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9EB8D4', marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => onNavigate?.('catalog')} style={{ marginTop: 20, width: '100%', padding: '11px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 8, color: 'white', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                Все материалы об эпосе <ArrowRight size={14} />
              </button>
            </div>

            {/* Tags */}
            <div style={{ background: 'white', border: '1px solid #E2DDD5', borderRadius: 12, padding: '16px 20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Связанные темы</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {['Манасчы', 'Героический эпос', 'Кыргызский язык', 'ЮНЕСКО', 'Устная традиция', 'Центральноазиатский эпос', 'Трёхчастная трилогия'].map(tag => (
                  <span key={tag} style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#3D3A36', background: '#F0EBE2', border: '1px solid #E2DDD5', borderRadius: 100, padding: '4px 12px', cursor: 'pointer' }}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Content tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 40, alignItems: 'start' }}>

          {/* Left — main content */}
          <div>
            {/* Tabs */}
            <div style={{ borderBottom: '1px solid #E2DDD5', marginBottom: 32, display: 'flex', gap: 0 }}>
              {(['description', 'transmission', 'history'] as const).map(tab => {
                const labels = { description: 'Описание', transmission: 'Хранение и передача', history: 'История и контекст' }
                const isActive = activeTab === tab
                return (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{
                    fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: isActive ? 600 : 400,
                    color: isActive ? '#1C1A17' : '#756E65', background: 'none', border: 'none',
                    borderBottom: `2px solid ${isActive ? '#B85A2A' : 'transparent'}`,
                    padding: '12px 20px', cursor: 'pointer', marginBottom: -1,
                  }}>{labels[tab]}</button>
                )
              })}
            </div>

            {activeTab === 'description' && (
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#3D3A36', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p>«Манас» — центральный эпос кыргызского народа, состоящий из трёх частей: «Манас», «Семетей» и «Сейтек». Полный текст насчитывает более полумиллиона строк, что делает его одним из крупнейших эпических произведений мира.</p>
                <p>Главный герой, богатырь Манас, объединяет кыргызские племена и ведёт их против завоевателей. В эпосе описываются исторические события, географические реалии, верования, обряды и этические нормы кыргызского народа.</p>
                <p>Исполнители эпоса — манасчи — обладали особым социальным статусом. Они получали тексты во сне, через видения и могли воспроизводить тысячи строк без подготовки, каждый раз создавая уникальную версию.</p>
              </div>
            )}

            {activeTab === 'transmission' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#3D3A36', lineHeight: 1.8 }}>
                  Передача эпоса осуществляется устным путём. Манасчи получают «дар» в видениях и снах, что объясняет вариативность текста между исполнителями. Каждый манасчи создаёт собственную версию, сохраняя при этом ключевые сюжетные линии.
                </p>
                <div style={{ background: '#F5F0E8', border: '1px solid #D8C89A', borderRadius: 10, padding: '20px 22px' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#5C3A00', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Современное состояние</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {['Институт языка, литературы и истории НАН КР ведёт систематическую документацию',
                      'В Кыргызстане работает несколько центров изучения и преподавания эпоса',
                      'С 2013 года эпос включён в список ЮНЕСКО',
                      'Ежегодно проводятся конкурсы среди манасчи всех возрастов'].map(item => (
                      <div key={item} style={{ display: 'flex', gap: 10, fontFamily: 'var(--font-body)', fontSize: 14, color: '#3D3A36', lineHeight: 1.5 }}>
                        <span style={{ color: '#B85A2A', flexShrink: 0, marginTop: 2 }}>—</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: '#3D3A36', lineHeight: 1.8, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p>Происхождение эпоса относят к IX–X векам. Первые письменные упоминания зафиксированы в XIX веке — Чокан Валиханов и Радлов записали фрагменты в 1860-х годах.</p>
                <p>Систематическая запись началась в советский период: с 1936 года Академия наук КиргССР организовывала экспедиции для документации эпоса от крупнейших манасчи своего времени.</p>
              </div>
            )}

            {/* People */}
            <div style={{ marginTop: 48, paddingTop: 36, borderTop: '1px solid #E2DDD5' }}>
              <SectionTitle eyebrow="Личности" title="Исполнители и исследователи" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {PEOPLE.map(person => (
                  <button key={person.name} onClick={() => onNavigate?.('author')} style={{
                    display: 'flex', gap: 14, padding: '16px', background: 'white', border: '1px solid #E2DDD5',
                    borderRadius: 10, cursor: 'pointer', textAlign: 'left', transition: 'all 0.15s',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = '#1C3A5E'; el.style.transform = 'translateY(-1px)' }}
                    onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = '#E2DDD5'; el.style.transform = 'translateY(0)' }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #1C3A5E, #4A7FA0)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 700, color: 'white' }}>
                      {person.name[0]}
                    </div>
                    <div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#1C1A17', marginBottom: 2 }}>{person.name}</div>
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#B85A2A', marginBottom: 4 }}>{person.role} · {person.dates}</div>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: '#756E65', lineHeight: 1.4 }}>{person.note}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Geography */}
            <div style={{ marginTop: 48, paddingTop: 36, borderTop: '1px solid #E2DDD5' }}>
              <SectionTitle eyebrow="География" title="Регионы и места" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {REGIONS.map(r => (
                  <div key={r.name} style={{ padding: '14px 16px', background: 'white', border: '1px solid #E2DDD5', borderRadius: 9 }}>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600, color: '#1C1A17', marginBottom: 4 }}>{r.name}</div>
                    <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#756E65' }}>{r.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Related materials by type */}
            <div style={{ marginTop: 48, paddingTop: 36, borderTop: '1px solid #E2DDD5' }}>
              <SectionTitle title="Материалы об этой теме" action={{ label: 'Все в каталоге', onClick: () => onNavigate?.('catalog') }} />

              {([
                { key: 'publications', label: 'Публикации', data: RELATED_BY_TYPE.publications },
                { key: 'videos',       label: 'Видео',      data: RELATED_BY_TYPE.videos },
                { key: 'audios',       label: 'Аудио',      data: RELATED_BY_TYPE.audios },
                { key: 'photos',       label: 'Фотографии', data: RELATED_BY_TYPE.photos },
              ] as const).map(group => (
                <div key={group.key} style={{ marginBottom: 32 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600, color: '#1C1A17' }}>{group.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490', background: '#F0EBE2', borderRadius: 100, padding: '2px 10px' }}>{group.data.length}</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 10 }}>
                    {group.data.map(mat => <CompactMaterialCard key={mat.id} mat={mat} onNavigate={onNavigate} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — metadata panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <MetadataPanel title="Классификация">
              <MetadataItem label="Категория" value="Устные традиции и эпос" highlight />
              <MetadataItem label="Подкатегория" value="Героический эпос" />
              <MetadataItem label="ЮНЕСКО" value="Репрезентативный список НКН, 2013" highlight />
              <MetadataItem label="Страна" value="Кыргызстан" />
              <MetadataItem label="Сообщество" value="Кыргызский народ" />
              <MetadataItem label="Язык" value="Кыргызский" />
            </MetadataPanel>

            {/* Rights block */}
            <div style={{ background: '#F5F0E8', border: '1px solid #D8C89A', borderRadius: 12, padding: '18px 20px' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#5C3A00', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 14 }}>Права и этика</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9A9490', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Источник</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#3D3A36' }}>Полевые экспедиции АН КиргССР, 1936–1992</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9A9490', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Согласие сообщества</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#3D3A36' }}>Получено от носителей и их наследников</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9A9490', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Ограничения</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#3D3A36' }}>Ряд записей доступен только для просмотра по договорённости с НАН КР</div>
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#9A9490', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>Атрибуция</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: '#3D3A36' }}>При использовании необходима ссылка на исполнителя и источник</div>
                </div>
              </div>
            </div>

            <MetadataPanel title="Документация">
              <MetadataItem label="Материалов" value={String(countTotal)} highlight />
              <MetadataItem label="Добавлено" value="2022–2024" />
              <MetadataItem label="Куратор" value="НАН КР / Мирас" />
            </MetadataPanel>
          </div>
        </div>
      </div>
    </div>
  )
}
