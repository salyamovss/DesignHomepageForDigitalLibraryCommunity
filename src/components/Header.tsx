import React, { useState } from 'react'
import { ChevronDown, LayersIcon } from './icons'

const NAV_ITEMS = ['Каталог', 'Авторы', 'Страны', 'Традиционные знания', 'Коллекции', 'О проекте']

interface HeaderProps {
  activePage?: string
  onNavigate?: (page: string) => void
}

export function Header({ activePage, onNavigate }: HeaderProps) {
  const [langOpen, setLangOpen] = useState(false)

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#FAF8F4', borderBottom: '1px solid #DDD8CF' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>

        {/* Logo */}
        <button
          onClick={() => onNavigate?.('home')}
          style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
          <div style={{ width: 36, height: 36, background: '#1C3A5E', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <LayersIcon size={20} />
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 15, color: '#1C1A17', lineHeight: 1.2 }}>Мирас</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#756E65', letterSpacing: '0.05em', lineHeight: 1 }}>Цифровая библиотека</div>
          </div>
        </button>

        {/* Nav */}
        <nav style={{ display: 'flex', alignItems: 'center' }}>
          {NAV_ITEMS.map(item => {
            const routes: Record<string, string> = { 'Каталог': 'catalog', 'Авторы': 'author', 'Страны': 'country', 'Традиционные знания': 'tk', 'Коллекции': 'collection', 'О проекте': 'about' }
            const isActive = activePage === (routes[item] ?? '')
            return (
              <button
                key={item}
                onClick={() => {
                  const routes: Record<string, string> = {
                    'Каталог': 'catalog',
                    'Авторы': 'author',
                    'Страны': 'country',
                    'Традиционные знания': 'tk',
                    'Коллекции': 'collection',
                    'О проекте': 'about',
                  }
                  onNavigate?.(routes[item] ?? 'home')
                }}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: 13.5, fontWeight: 500,
                  color: isActive ? '#B85A2A' : '#3D3A36',
                  background: 'none', border: 'none', borderBottom: `2px solid ${isActive ? '#B85A2A' : 'transparent'}`,
                  padding: '0 14px', height: 64, cursor: 'pointer',
                  transition: 'color 0.15s, border-color 0.15s', whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    ;(e.target as HTMLElement).style.color = '#B85A2A'
                    ;(e.target as HTMLElement).style.borderBottomColor = '#B85A2A'
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    ;(e.target as HTMLElement).style.color = '#3D3A36'
                    ;(e.target as HTMLElement).style.borderBottomColor = 'transparent'
                  }
                }}
              >
                {item}
              </button>
            )
          })}
        </nav>

        {/* Language */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={() => setLangOpen(v => !v)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 500,
              color: '#1C1A17', background: 'transparent', border: '1px solid #DDD8CF',
              borderRadius: 6, padding: '6px 12px', cursor: 'pointer',
            }}
          >
            РУС <ChevronDown size={14} />
          </button>
          {langOpen && (
            <div style={{
              position: 'absolute', top: '100%', right: 0, marginTop: 4,
              background: 'white', border: '1px solid #DDD8CF', borderRadius: 8,
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)', minWidth: 100, overflow: 'hidden', zIndex: 200,
            }}>
              {['РУС', 'ENG', 'KAZ', 'KYR'].map(lang => (
                <button key={lang} onClick={() => setLangOpen(false)} style={{
                  display: 'block', width: '100%', textAlign: 'left',
                  padding: '10px 16px', background: 'transparent', border: 'none',
                  fontFamily: 'var(--font-mono)', fontSize: 12, color: '#1C1A17', cursor: 'pointer',
                }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.background = '#F0EBE2' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.background = 'transparent' }}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
