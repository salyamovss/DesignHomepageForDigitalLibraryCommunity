import React, { useState } from 'react'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { CatalogPage } from './pages/CatalogPage'
import { SearchPage } from './pages/SearchPage'
import { PublicationDetailPage } from './pages/PublicationDetailPage'
import { MediaDetailPage } from './pages/MediaDetailPage'
import { TKDetailPage } from './pages/TKDetailPage'
import { AuthorPage } from './pages/AuthorPage'
import { CountryPage } from './pages/CountryPage'
import { CollectionDetailPage } from './pages/CollectionDetailPage'
import { AboutPage } from './pages/AboutPage'

type Page = 'home' | 'catalog' | 'search' | 'publication' | 'media' | 'tk' | 'author' | 'country' | 'collection' | 'about'

export default function App() {
  const [page, setPage] = useState<Page>('home')

  const navigate = (p: string) => setPage(p as Page)

  function renderPage() {
    switch (page) {
      case 'home':       return <HomePage onNavigate={navigate} />
      case 'catalog':    return <CatalogPage onNavigate={navigate} />
      case 'search':     return <SearchPage onNavigate={navigate} />
      case 'publication':return <PublicationDetailPage onNavigate={navigate} />
      case 'media':      return <MediaDetailPage onNavigate={navigate} variant="video" />
      case 'tk':         return <TKDetailPage onNavigate={navigate} />
      case 'author':     return <AuthorPage onNavigate={navigate} />
      case 'country':    return <CountryPage onNavigate={navigate} />
      case 'collection': return <CollectionDetailPage onNavigate={navigate} />
      case 'about':      return <AboutPage onNavigate={navigate} />
    }
  }

  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <Header activePage={page} onNavigate={navigate} />
      {renderPage()}
      <Footer />
    </div>
  )
}
