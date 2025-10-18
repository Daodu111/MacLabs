import React, { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, Facebook, Twitter, Linkedin, Link2, MessageCircle, Heart, Bookmark, Eye, Check } from 'lucide-react'
import { blogService } from '../services/blogService'

interface BlogPostPageProps {
  onPageChange: (page: string, postId?: string) => void
  postId?: string
}

export function BlogPostPage({ onPageChange, postId }: BlogPostPageProps) {
  const [isSharing, setIsSharing] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [blogPost, setBlogPost] = useState<any>(null)
  const [relatedPosts, setRelatedPosts] = useState<any[]>([])

  useEffect(() => {
    if (postId) {
      // Get the blog post
      const post = blogService.getPostById(postId)
      if (post) {
        setBlogPost(post)
        // Increment view count
        blogService.incrementViews(postId)
        // Get related posts
        const related = blogService.getRelatedPosts(postId, 3)
        setRelatedPosts(related)
        
        // Check if post is bookmarked
        const bookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]')
        setIsBookmarked(bookmarkedPosts.includes(postId))
      }
    }
  }, [postId])

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
      // Create a shareable URL with post ID parameter
      const baseUrl = window.location.origin
      const shareableUrl = `${baseUrl}?post=${blogPost.id}`
      await navigator.clipboard.writeText(shareableUrl)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleLike = () => {
    if (!isLiked) {
      blogService.incrementLikes(blogPost.id)
    }
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    if (!postId) return
    
    const bookmarkedPosts = JSON.parse(localStorage.getItem('bookmarkedPosts') || '[]')
    
    if (isBookmarked) {
      // Remove from bookmarks
      const updatedBookmarks = bookmarkedPosts.filter((id: string) => id !== postId)
      localStorage.setItem('bookmarkedPosts', JSON.stringify(updatedBookmarks))
    } else {
      // Add to bookmarks
      bookmarkedPosts.push(postId)
      localStorage.setItem('bookmarkedPosts', JSON.stringify(bookmarkedPosts))
    }
    
    setIsBookmarked(!isBookmarked)
  }

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
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-xl z-10 overflow-hidden">
                  <div className="py-2">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide border-b border-gray-100">
                      Share on Social
                    </div>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
                    >
                      <Linkedin className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">LinkedIn</span>
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-sky-50 hover:text-sky-700 transition-all duration-200 group"
                    >
                      <Twitter className="h-5 w-5 text-blue-400 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">X (Twitter)</span>
                    </button>
                    <button
                      onClick={() => handleShare('facebook')}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 group"
                    >
                      <Facebook className="h-5 w-5 text-blue-600 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">Facebook</span>
                    </button>
                    <button
                      onClick={() => handleShare('whatsapp')}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-green-50 hover:text-green-700 transition-all duration-200 group"
                    >
                      <MessageCircle className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
                      <span className="font-medium">WhatsApp</span>
                    </button>
                    <hr className="my-2 border-gray-100" />
                    <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Other Options
                    </div>
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-3 w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 group"
                    >
                      {copySuccess ? (
                        <>
                          <Check className="h-5 w-5 text-green-500 group-hover:scale-110 transition-transform" />
                          <span className="font-medium text-green-600">Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Link2 className="h-5 w-5 text-gray-500 group-hover:scale-110 transition-transform" />
                          <span className="font-medium">Copy Link</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Save/Bookmark Button */}
            <button 
              onClick={handleBookmark}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
                isBookmarked 
                  ? 'border-blue-600 bg-blue-50 text-blue-600' 
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              {isBookmarked ? 'Saved' : 'Save'}
            </button>
          </div>
          
          {/* Horizontal Line Below Share & Save */}
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
                  {blogPost.authorBio || 'Crypto enthusiast and blockchain expert with over 5 years of experience in the Web3 space. Passionate about making decentralized technology accessible to everyone.'}
                </p>
              </div>
            </div>
          </div>
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
