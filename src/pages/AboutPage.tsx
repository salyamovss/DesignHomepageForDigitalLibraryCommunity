import React from 'react'
import { Breadcrumb, SectionTitle } from '../components/shared'
import { ArrowRight } from '../components/icons'

const COUNTRIES = [
  { name: 'Казахстан',    n: '3 847' },
  { name: 'Кыргызстан',  n: '2 156' },
  { name: 'Таджикистан', n: '1 934' },
  { name: 'Туркменистан',n: '1 456' },
  { name: 'Узбекистан',  n: '2 734' },
]

const FORMATS = [
  { type: 'Книги и рукописи',          desc: 'Монографии, сборники, учебники, архивные документы, рукописи.' },
  { type: 'Статьи и публикации',        desc: 'Научные статьи, доклады, газетные материалы, полевые отчёты.' },
  { type: 'Видео',                      desc: 'Документальные фильмы, экспедиционные записи, архивные съёмки.' },
  { type: 'Аудио',                      desc: 'Запись музыки, сказаний, обрядов, интервью и полевых экспедиций.' },
  { type: 'Фотографии',                desc: 'Исторические и современные документальные фотографии.' },
  { type: 'Традиционные знания',        desc: 'Структурированные записи практик, технологий, обрядов и знаний.' },
]

export function AboutPage({ onNavigate }: { onNavigate?: (p: string) => void }) {
  return (
    <div style={{ background: '#FAF8F4', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 48px 80px' }}>

        <Breadcrumb items={[{ label: 'Мирас', page: 'home' }, { label: 'О проекте' }]} onNavigate={onNavigate} />

        {/* Header */}
        <div style={{ borderBottom: '1px solid #E2DDD5', paddingBottom: 56, marginBottom: 72 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#B85A2A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>О проекте</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: 80, alignItems: 'start' }}>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 52, fontWeight: 700, color: '#1C1A17', lineHeight: 1.05, letterSpacing: '-0.025em', margin: 0 }}>
              Мирас — открытая цифровая библиотека культуры Центральной Азии
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 17, fontWeight: 300, color: '#3D3A36', lineHeight: 1.8, margin: 0 }}>
              Платформа объединяет культурное и традиционное знание пяти стран — Казахстана, Кыргызстана, Таджикистана, Туркменистана и Узбекистана — в едином пространстве открытого доступа.
            </p>
          </div>
        </div>

        {/* Mission */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#B85A2A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>Миссия</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, color: '#1C1A17', lineHeight: 1.2, letterSpacing: '-0.01em' }}>
                Сохранение. Исследование. Доступность.
              </h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontFamily: 'var(--font-body)', fontSize: 16, color: '#3D3A36', lineHeight: 1.8 }}>
              <p>Мирас создаётся для того, чтобы знание о культуре народов Центральной Азии не оставалось только в архивах и специализированных библиотеках. Эпосы, народная музыка, традиционные технологии, обряды, рецепты, архитектурные формы и языковые традиции — всё это часть живого культурного наследия, которое должно быть доступно каждому.</p>
              <p>Платформа ориентирована одновременно на исследователей, студентов, педагогов, носителей традиций и широкую аудиторию — всех, кто интересуется культурой региона.</p>
            </div>
          </div>
        </section>

        {/* What library contains */}
        <section style={{ background: '#F0EBE2', borderRadius: 16, padding: '56px', marginBottom: 80 }}>
          <SectionTitle eyebrow="Состав библиотеки" title="Что хранит Мирас" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {FORMATS.map(f => (
              <div key={f.type} style={{ background: 'white', borderRadius: 10, padding: '22px 22px 24px', border: '1px solid #E2DDD5' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: '#1C1A17', marginBottom: 8 }}>{f.type}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#5A5550', lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Countries */}
        <section style={{ marginBottom: 80 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#B85A2A', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>Охват</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, color: '#1C1A17', lineHeight: 1.2, letterSpacing: '-0.01em' }}>Пять стран Центральной Азии</h2>
            </div>
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0, border: '1px solid #E2DDD5', borderRadius: 12, overflow: 'hidden' }}>
                {COUNTRIES.map((c, i) => (
                  <div key={c.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', background: i % 2 === 0 ? 'white' : '#F7F4F0', borderBottom: i < COUNTRIES.length - 1 ? '1px solid #E2DDD5' : 'none' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 16, fontWeight: 500, color: '#1C1A17' }}>{c.name}</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600, color: '#1C3A5E' }}>{c.n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Who is it for */}
        <section style={{ marginBottom: 80 }}>
          <SectionTitle eyebrow="Аудитория" title="Для кого создан Мирас" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {[
              { who: 'Исследователи', desc: 'Этнографы, историки, лингвисты, фольклористы, культурологи.' },
              { who: 'Студенты и педагоги', desc: 'Для учёбы, преподавания и подготовки учебных материалов.' },
              { who: 'Носители культуры', desc: 'Исполнители, мастера, знатоки традиций и их сообщества.' },
              { who: 'Общественность', desc: 'Все, кто интересуется культурой и историей Центральной Азии.' },
            ].map(item => (
              <div key={item.who} style={{ padding: '22px', background: 'white', border: '1px solid #E2DDD5', borderRadius: 10 }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: '#1C1A17', marginBottom: 8 }}>{item.who}</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: '#5A5550', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Access principles */}
        <section style={{ background: '#1C3A5E', borderRadius: 16, padding: '56px', marginBottom: 80, color: 'white' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 80 }}>
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9EB8D4', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 14 }}>Принципы</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 600, color: 'white', lineHeight: 1.2 }}>Доступ и права</h2>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { label: 'Открытый доступ', desc: 'Большинство материалов доступно для просмотра и скачивания без регистрации.' },
                { label: 'Уважение к правам сообществ', desc: 'Часть материалов публикуется с ограничениями согласно договорённостям с носителями традиций и их сообществами.' },
                { label: 'Этическое использование', desc: 'Мы следуем принципам уважительного отношения к нематериальному культурному наследию. Коммерческое использование без разрешения недопустимо.' },
                { label: 'Атрибуция', desc: 'Все материалы сопровождаются информацией об авторе, источнике и правах. Пожалуйста, указывайте источник при использовании.' },
              ].map(item => (
                <div key={item.label} style={{ paddingBottom: 20, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 15, fontWeight: 600, color: 'white', marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 1.65 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact + Partners */}
        <section>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40 }}>
            <div>
              <SectionTitle eyebrow="Контакты" title="Связаться с нами" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[
                  { label: 'По вопросам материалов', email: 'archive@miras-library.org' },
                  { label: 'Для партнёров и организаций', email: 'partners@miras-library.org' },
                  { label: 'Техническая поддержка', email: 'support@miras-library.org' },
                ].map(c => (
                  <div key={c.label} style={{ padding: '16px 20px', background: 'white', border: '1px solid #E2DDD5', borderRadius: 10 }}>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9A9490', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 4 }}>{c.label}</div>
                    <a href={`mailto:${c.email}`} style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#B85A2A', textDecoration: 'none' }}>{c.email}</a>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <SectionTitle eyebrow="Партнёры" title="Организации-партнёры" />
              <div style={{ padding: '24px', background: 'white', border: '1px solid #E2DDD5', borderRadius: 12 }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#5A5550', lineHeight: 1.7, marginBottom: 16 }}>
                  Мирас создаётся в партнёрстве с национальными академиями наук, университетами, государственными библиотеками и архивами пяти стран, а также международными организациями, занимающимися охраной нематериального культурного наследия.
                </p>
                <button style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600, color: '#1C3A5E', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  Стать партнёром <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
