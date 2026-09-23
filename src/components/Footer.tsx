import React from 'react'
import { LayersIcon, ArrowRight } from './icons'

const COUNTRIES = ['Казахстан', 'Кыргызстан', 'Таджикистан', 'Туркменистан', 'Узбекистан']
const FOOTER_KNOWLEDGE = [
  'Устные традиции и эпос', 'Музыка и исполнительское искусство',
  'Обряды и праздники', 'Ремёсла и орнамент',
  'Природа и скотоводство', 'Традиционное целительство',
]

export function Footer() {
  return (
    <footer style={{ background: '#0F2236', color: '#AFC6DC', padding: '64px 0 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 1fr 1fr', gap: 48, paddingBottom: 56 }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <div style={{ width: 36, height: 36, background: '#1C3A5E', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LayersIcon size={20} />
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, color: '#FAF8F4', lineHeight: 1.2 }}>Мирас</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#6E8DA8', letterSpacing: '0.05em' }}>Цифровая библиотека</div>
              </div>
            </div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#6E8DA8', lineHeight: 1.65, marginBottom: 20 }}>
              Культура и традиционные знания Центральной Азии. Открытый доступ к наследию пяти народов.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['РУС', 'ENG', 'KAZ'].map(lang => (
                <button key={lang} style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6E8DA8',
                  background: 'transparent', border: '1px solid #1C3A5E',
                  borderRadius: 4, padding: '5px 10px', cursor: 'pointer', transition: 'all 0.15s',
                }}
                  onMouseEnter={e => { const el = e.target as HTMLElement; el.style.color = '#FAF8F4'; el.style.borderColor = '#AFC6DC' }}
                  onMouseLeave={e => { const el = e.target as HTMLElement; el.style.color = '#6E8DA8'; el.style.borderColor = '#1C3A5E' }}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9EB8D4', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Навигация</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Каталог', 'Авторы и сообщества', 'Страны', 'Традиционные знания', 'Коллекции', 'О проекте', 'Для исследователей', 'Внести материал'].map(item => (
                <a key={item} href="#" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#6E8DA8', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#FAF8F4' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = '#6E8DA8' }}
                >{item}</a>
              ))}
            </div>
          </div>

          {/* Countries */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9EB8D4', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Страны</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {COUNTRIES.map(c => (
                <a key={c} href="#" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#6E8DA8', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#FAF8F4' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = '#6E8DA8' }}
                >{c}</a>
              ))}
            </div>
          </div>

          {/* Knowledge + Contact */}
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9EB8D4', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 20 }}>Знания</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 36 }}>
              {FOOTER_KNOWLEDGE.map(item => (
                <a key={item} href="#" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#6E8DA8', textDecoration: 'none', transition: 'color 0.15s' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.color = '#FAF8F4' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.color = '#6E8DA8' }}
                >{item}</a>
              ))}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#9EB8D4', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>Контакт</div>
            <a href="mailto:info@miras-library.org" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: '#6E8DA8', textDecoration: 'none' }}>
              info@miras-library.org
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: '1px solid #1C3A5E', padding: '20px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#3D5A72' }}>
            © 2024 Мирас. Цифровая библиотека культуры и традиционных знаний Центральной Азии.
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Политика конфиденциальности', 'Условия использования', 'Лицензии'].map(item => (
              <a key={item} href="#" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#3D5A72', textDecoration: 'none', transition: 'color 0.15s' }}
                onMouseEnter={e => { (e.target as HTMLElement).style.color = '#6E8DA8' }}
                onMouseLeave={e => { (e.target as HTMLElement).style.color = '#3D5A72' }}
              >{item}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
