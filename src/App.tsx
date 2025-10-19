import { useState, useEffect } from 'react'
import { Navigation } from './components/navigation'
import { Footer } from './components/footer'
import { HomePage } from './pages/home-page'
import { AboutPage } from './pages/about-page'
import { ServicesPage } from './pages/services-page'
import { BlogPage } from './pages/blog-page'
import { BlogPostPage } from './pages/blog-post-page'
import { AdminPage } from './pages/admin-page'
import { AdminDashboard } from './pages/admin-dashboard'
import { ContactPage } from './pages/contact-page'
import { FirebaseTest } from './components/firebase-test'
import { DebugBlogData } from './components/debug-blog-data'

export default function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [currentPostId, setCurrentPostId] = useState<string | null>(null)

  // Handle URL parameters for direct blog post links
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const postId = urlParams.get('post')
    if (postId) {
      setCurrentPage('blog-post')
      setCurrentPostId(postId)
    }
  }, [])

  const handlePageChange = (page: string, postId?: string) => {
    setCurrentPage(page)
    if (postId) {
      setCurrentPostId(postId)
    } else {
      setCurrentPostId(null)
    }
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={handlePageChange} />
      case 'about':
        return <AboutPage onPageChange={handlePageChange} />
      case 'services':
        return <ServicesPage onPageChange={handlePageChange} />
      case 'blog':
        return <BlogPage onPageChange={handlePageChange} />
      case 'blog-post':
        return <BlogPostPage onPageChange={handlePageChange} postId={currentPostId || undefined} />
      case 'admin':
        return <AdminPage onPageChange={handlePageChange} />
      case 'admin-dashboard':
        return <AdminDashboard onPageChange={handlePageChange} />
      case 'contact':
        return <ContactPage />
      case 'firebase-test':
        return <FirebaseTest />
      case 'debug-blog':
        return <DebugBlogData />
      default:
        return <HomePage onPageChange={handlePageChange} />
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
      <main>
        {renderPage()}
      </main>
      <Footer onPageChange={handlePageChange} />
    </div>
  )
}