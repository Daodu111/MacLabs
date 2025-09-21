import { useState } from 'react'
import { Navigation } from './components/navigation'
import { Footer } from './components/footer'
import { HomePage } from './pages/home-page'
import { AboutPage } from './pages/about-page'
import { ServicesPage } from './pages/services-page'
import { FounderPage } from './pages/founder-page'
import { ContactPage } from './pages/contact-page'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />
      case 'about':
        return <AboutPage onPageChange={setCurrentPage} />
      case 'services':
        return <ServicesPage onPageChange={setCurrentPage} />
      case 'founder':
        return <FounderPage onPageChange={setCurrentPage} />
      case 'contact':
        return <ContactPage />
      default:
        return <HomePage onPageChange={setCurrentPage} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
      <Footer onPageChange={setCurrentPage} />
    </div>
  )
}