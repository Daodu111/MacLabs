import React, { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, Facebook, Linkedin, Link2, MessageCircle, ThumbsUp, Check } from 'lucide-react'
import { blogService } from '../services/blogService'

// Custom X (Twitter) Icon Component
const XIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

interface BlogPostPageProps {
  onPageChange: (page: string, postId?: string) => void
  postId?: string
}

export function BlogPostPage({ onPageChange, postId }: BlogPostPageProps) {
  const [isSharing, setIsSharing] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [blogPost, setBlogPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])
  
  // New Applause Feature State
  const [applauded, setApplauded] = useState(false)
  const [applause, setApplause] = useState(0)
  const [isApplauding, setIsApplauding] = useState(false)
  // comments removed

  useEffect(() => {
    const loadPostData = async () => {
      if (postId) {
        try {
          // Get the blog post
          const post = await blogService.getPostById(postId)
          if (post) {
            setBlogPost(post)
            // Increment view count
            await blogService.incrementViews(postId)
            // Get related posts
            const related = await blogService.getRelatedPosts(postId, 3)
            setRelatedPosts(related)
          }
        } catch (error) {
          console.error('Error loading post data:', error)
        }
      }
    }

    loadPostData()
  }, [postId])

  // Initialize applause state
  useEffect(() => {
    if (postId && blogPost) {
      // Check if user has applauded this post
      const applaudedPosts = localStorage.getItem('applaudedPosts')
      const applaudedArray = applaudedPosts ? JSON.parse(applaudedPosts) : []
      setApplauded(applaudedArray.includes(postId))
      
      // Set initial applause count
      setApplause(blogPost.applause || 0)
    }
  }, [postId, blogPost])

  // Close share dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSharing) {
        const target = event.target as HTMLElement
        if (!target.closest('.share-dropdown-container')) {
          setIsSharing(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isSharing])

  if (!blogPost) {
    return (
      <div className="pt-16 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => onPageChange('blog')} className="bg-blue-600 hover:bg-blue-700 text-white">
            Back to Blog
          </Button>
        </div>
      </div>
    )
  }


  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = blogPost.title
    const description = blogPost.excerpt
    const hashtags = blogPost.tags ? blogPost.tags.join(',') : 'crypto,web3,marketing'

    let shareUrl = ''
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`
        break
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}&hashtags=${encodeURIComponent(hashtags)}`
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`
        break
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${description}\n\nRead more: ${url}`)}`
        break
      default:
        return
    }

    // Increment share count
    blogService.incrementShares(blogPost.id)
    window.open(shareUrl, '_blank', 'width=600,height=400')
    setIsSharing(false)
  }

  const handleCopyLink = async () => {
    try {
      // Create a URL-friendly slug from the title
      const titleSlug = blogPost.title
        .toLowerCase()
        .replace(/[^a-z0-9\s]+/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/(^-|-$)/g, '') // Remove leading/trailing hyphens
        .substring(0, 60) // Limit length
      
      // Create a shareable URL with post ID and title slug
      // Format: /blog/post-title-slug?post=postId
      const baseUrl = window.location.origin
      const shareableUrl = `${baseUrl}/blog/${titleSlug}?post=${blogPost.id}`
      
      await navigator.clipboard.writeText(shareableUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  // New Applause Handler
  const handleApplaud = async () => {
    if (!postId || isApplauding) return
    setIsApplauding(true)

    const wasApplauded = applauded
    setApplauded(!wasApplauded)
    setApplause(prev => wasApplauded ? Math.max(0, prev - 1) : prev + 1)

    try {
      const stored = localStorage.getItem('applaudedPosts')
      const array = stored ? JSON.parse(stored) : []
      if (wasApplauded) {
        const filtered = array.filter((id: string) => id !== postId)
        localStorage.setItem('applaudedPosts', JSON.stringify(filtered))
        await blogService.decrementApplause(blogPost.id)
      } else {
        localStorage.setItem('applaudedPosts', JSON.stringify([...array, postId]))
        await blogService.incrementApplause(blogPost.id)
      }
    } catch (error) {
      console.error('Applause error:', error)
      setApplauded(wasApplauded)
      setApplause(prev => wasApplauded ? prev + 1 : Math.max(0, prev - 1))
    } finally {
      setIsApplauding(false)
    }
  }


  // comments removed

  return (
    <div className="pt-16">
      {/* Back Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => onPageChange('blog')}
            className="flex items-center text-gray-900 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Hero Image Section */}
      <div className="relative h-96 bg-black">
        <ImageWithFallback
          src={blogPost.image}
          alt={blogPost.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Article Content */}
      <article className="bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Tag */}
          <div className="mb-6 mt-12">
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {blogPost.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {blogPost.title}
          </h1>

          {/* Author and Metadata */}
          <div className="flex items-center gap-6 mb-8">
            <div className="flex items-center border-r-4 border-gray-500 pr-6">
              <div className="w-10 h-10 rounded-full mr-3 overflow-hidden">
                {blogPost.authorImage ? (
                  <ImageWithFallback
                    src={blogPost.authorImage}
                    alt={blogPost.author}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-gray-600" />
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <div>
                  <div className="font-semibold text-gray-900">{blogPost.author}</div>
                  <div className="text-sm text-gray-500">Author</div>
                </div>
                <div className="w-0.5 h-8 bg-gray-400 mx-4"></div>
              </div>
            </div>
            
            <div className="w-px h-6 bg-gray-300"></div>
            
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="h-4 w-4 mr-2" />
              {formatDate(blogPost.date)}
            </div>
            
            <div className="flex items-center text-gray-500 text-sm">
              <Clock className="h-4 w-4 mr-2" />
              {blogPost.readTime}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mb-8 pt-12 pb-6">
            {/* New Applause Button */}
            <button 
              onClick={handleApplaud}
              disabled={isApplauding}
              className={`group flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                applauded 
                  ? 'bg-blue-50 border-blue-600 text-blue-700' 
                  : 'bg-white border-gray-300 text-gray-700 hover:border-blue-500 hover:bg-blue-50'
              } ${isApplauding ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <ThumbsUp 
                className={`w-5 h-5 transition-all duration-200 ${
                  applauded ? 'fill-blue-600 stroke-blue-600' : 'fill-none stroke-current group-hover:stroke-blue-600'
                }`}
                strokeWidth={2}
              />
              <span className="font-medium">{applause}</span>
            </button>

            {/* Share Button with Dropdown */}
            <div className="relative share-dropdown-container">
              <button 
                onClick={() => setIsSharing(!isSharing)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
              <Share2 className="h-4 w-4" />
              Share
            </button>
              
              {/* Share Dropdown */}
              {isSharing && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-10 overflow-hidden">
                  <div className="px-4 py-4">
                    <div className="flex items-center gap-3 justify-center">
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 group"
                        title="Share on LinkedIn"
                      >
                        <Linkedin className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="p-3 rounded-lg hover:bg-gray-100 transition-all duration-200 group"
                        title="Share on X"
                      >
                        <XIcon className="h-6 w-6 text-gray-900 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => handleShare('facebook')}
                        className="p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 group"
                        title="Share on Facebook"
                      >
                        <Facebook className="h-6 w-6 text-blue-600 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={() => handleShare('whatsapp')}
                        className="p-3 rounded-lg hover:bg-green-50 transition-all duration-200 group"
                        title="Share on WhatsApp"
                      >
                        <MessageCircle className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform" />
                      </button>
                      <button
                        onClick={handleCopyLink}
                        className="p-3 rounded-lg hover:bg-gray-50 transition-all duration-200 group"
                        title="Copy Link"
                      >
                        {copySuccess ? (
                          <Check className="h-6 w-6 text-green-500 group-hover:scale-110 transition-transform" />
                        ) : (
                          <Link2 className="h-6 w-6 text-gray-500 group-hover:scale-110 transition-transform" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
          </div>
          
          {/* Horizontal Line Below Share */}
          <hr className="border-gray-300 my-8 mb-12" />
          
          {/* Article Content */}
          <div 
            className="prose prose-lg max-w-none mb-12 blog-content"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />

          {/* Author Bio Section */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 mt-6">About {blogPost.author}</h3>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                {blogPost.authorImage ? (
                  <ImageWithFallback
                    src={blogPost.authorImage}
                    alt={blogPost.author}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-gray-600 leading-relaxed">
                  {blogPost.authorBio || 'Author bio not available.'}
                </p>
              </div>
            </div>
          </div>

          {/* comments removed */}
        </div>
      </article>

      {/* Related Posts */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Related Articles</h2>
            <p className="text-gray-600">Continue reading with these related insights</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer"
                onClick={() => onPageChange('blog-post', post.id)}
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              onClick={() => onPageChange('blog')}
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3"
            >
              View All Articles
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
