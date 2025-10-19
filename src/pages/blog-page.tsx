import React, { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { ArrowRight, Calendar, User, Clock, Tag, Star, Search, Filter } from 'lucide-react'
import { blogService } from '../services/blogService'

interface BlogPageProps {
  onPageChange: (page: string, postId?: string) => void
}

export function BlogPage({ onPageChange }: BlogPageProps) {
  const [blogPosts, setBlogPosts] = useState<any[]>([])
  const [featuredPost, setFeaturedPost] = useState<any>(null)
  const [categories, setCategories] = useState<any[]>([])
  const [selectedCategory, setSelectedCategory] = useState('All Posts')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        console.log('🔄 Loading blog data...')
        // Load blog posts from service
        const posts = await blogService.getPublishedPosts()
        console.log('📊 Published posts loaded:', posts.length)
        setBlogPosts(posts)

        // Get featured post
        const featured = await blogService.getFeaturedPosts()
        console.log('⭐ Featured posts loaded:', featured.length)
        setFeaturedPost(featured[0] || null)

        // Get categories
        const cats = await blogService.getCategories()
        console.log('📂 Categories loaded:', cats.length)
        setCategories(cats.map(cat => ({
          ...cat,
          active: cat.name === 'All Posts'
        })))
      } catch (error) {
        console.error('Error loading blog data:', error)
      }
    }

    loadBlogData()
    
    // Add a refresh mechanism - reload data every 30 seconds
    const interval = setInterval(loadBlogData, 30000)
    
    return () => clearInterval(interval)
  }, [])

  // Filter posts by category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All Posts' || post.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  const handleCategoryChange = (categoryName: string) => {
    setSelectedCategory(categoryName)
    setCategories(cats => cats.map(cat => ({
      ...cat,
      active: cat.name === categoryName
    })))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              MacLabs Crypto & Web3
              <span className="block text-blue-600 mt-2">Marketing Insights</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Stay ahead in the crypto space with expert insights on Web3 marketing, ghostwriting strategies, 
              and actionable tips for crypto founders. Learn what's working for successful DeFi and Web3 projects.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Star className="h-6 w-6 text-yellow-500 mr-2 fill-current" />
                Featured Article
              </h2>
            </div>
            
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Left Column - Image */}
                <div className="relative h-[450px] lg:h-[600px]">
                  <ImageWithFallback
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                      {featuredPost.category}
                    </span>
                  </div>
                </div>
                
                {/* Right Column - Content */}
                <div className="p-10 lg:p-12 flex flex-col justify-center border-l border-blue-300 bg-white">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {featuredPost.title}
                  </h2>
                  
                  <p className="text-base text-gray-600 mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-6 mb-6 text-sm text-gray-500">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full mr-2 overflow-hidden flex-shrink-0">
                        {featuredPost.authorImage ? (
                          <ImageWithFallback
                            src={featuredPost.authorImage}
                            alt={featuredPost.author}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                            <User className="h-3 w-3 text-gray-600" />
                          </div>
                        )}
                      </div>
                      <span className="font-medium">{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(featuredPost.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <Button 
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-fit font-medium"
                    onClick={() => onPageChange('blog-post', featuredPost.id.toString())}
                  >
                    Read Featured Article
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Search and Filter Section */}
      <section className="py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-blue-300 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md pl-4">
                <Search className="absolute left-8 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-gray-50"
                  style={{ paddingLeft: '3.5rem' }}
                />
              </div>
              
              {/* Category Filter */}
              <div className="relative px-4">
                <Filter className="absolute left-8 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="pl-12 pr-8 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none appearance-none bg-gray-50 text-gray-700"
                  style={{ paddingLeft: '3.5rem' }}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Latest Articles</h2>
          </div>
          
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                onClick={() => onPageChange('blog-post', post.id.toString())}
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    style={{ borderRadius: '0.5rem 0.5rem 0 0' }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight mt-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-3 leading-relaxed text-sm">
                    {post.excerpt}
                  </p>
                  
                  {/* Author Info */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
                      {post.authorImage ? (
                        <ImageWithFallback
                          src={post.authorImage}
                          alt={post.author}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-300 rounded-full flex items-center justify-center">
                          <User className="h-3 w-3 text-gray-600" />
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{post.author}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-4 mt-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatDate(post.date)}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {post.readTime}
                    </div>
                  </div>
                  
                  <div className="w-full">
                    <div className="text-gray-900 font-medium text-sm px-4 py-3 rounded-md hover:bg-gray-100 transition-all duration-300 cursor-pointer text-center transform hover:scale-105">
                      Read More →
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              variant="outline"
              size="lg"
              className="group border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Load More Posts
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </section>


      {/* Newsletter Signup */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <Star className="h-12 w-12 text-white mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Ahead of the Curve
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Get the latest digital marketing insights, strategies, and trends delivered 
              straight to your inbox. Join 2,000+ marketers who trust our weekly newsletter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-white text-white placeholder-white/70 bg-white/5 focus:ring-2 focus:ring-white focus:border-white focus:bg-white/10 focus:outline-none transition-all duration-200"
                />
              <Button 
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 whitespace-nowrap"
              >
                Subscribe Now
              </Button>
            </div>
              <p className="text-white text-sm mt-4">
                No spam, unsubscribe at any time. We respect your privacy.
              </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Scale Your Crypto Project?
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Reading about crypto marketing is valuable, but implementation is where founders see real results. 
            Let's work together to turn your Web3 expertise into authority and capital.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => onPageChange('contact')}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
            >
              Get Custom Crypto Strategy
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-3"
              onClick={() => onPageChange('services')}
            >
              View Crypto Services
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
