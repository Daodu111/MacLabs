import React, { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Badge } from '../components/ui/badge'
import { Alert, AlertDescription } from '../components/ui/alert'
import { 
  Eye, 
  Heart, 
  Share2, 
  MessageCircle, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
  BarChart3,
  Users,
  FileText,
  Calendar
} from 'lucide-react'
import { blogService, BlogPost } from '../services/blogService'
import { authService } from '../services/authService'

interface AdminDashboardProps {
  onPageChange: (page: string) => void
}

export function AdminDashboard({ onPageChange }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  
  // Blog data
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [analytics, setAnalytics] = useState<any>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  
  // Form data
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    authorImage: '',
    date: new Date().toISOString().split('T')[0],
    readTime: '',
    category: '',
    image: '',
    tags: [] as string[],
    featured: false,
    published: true
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const user = await authService.waitForAuth()
      setIsAuthenticated(!!user)
      if (user) {
        loadDashboardData()
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadDashboardData = async () => {
    try {
      const [posts, analyticsData] = await Promise.all([
        blogService.getAllPosts(),
        blogService.getAnalyticsSummary()
      ])
      setBlogPosts(posts)
      setAnalytics(analyticsData)
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    
    try {
      await authService.signIn(email, password)
      setIsAuthenticated(true)
      loadDashboardData()
    } catch (error: any) {
      setLoginError(error.message || 'Login failed')
    }
  }

  const handleLogout = async () => {
    try {
      await authService.signOut()
      setIsAuthenticated(false)
      setEmail('')
      setPassword('')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newPost = await blogService.createPost(formData)
      if (newPost) {
        setBlogPosts([newPost, ...blogPosts])
        resetForm()
        setIsCreating(false)
      }
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  const handleUpdatePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPost) return
    
    try {
      const updatedPost = await blogService.updatePost(editingPost.id, formData)
      if (updatedPost) {
        setBlogPosts(blogPosts.map(p => p.id === editingPost.id ? updatedPost : p))
        setEditingPost(null)
        resetForm()
      }
    } catch (error) {
      console.error('Error updating post:', error)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    
    try {
      const success = await blogService.deletePost(postId)
      if (success) {
        setBlogPosts(blogPosts.filter(p => p.id !== postId))
      }
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      authorImage: '',
      date: new Date().toISOString().split('T')[0],
      readTime: '',
      category: '',
      image: '',
      tags: [],
      featured: false,
      published: true
    })
  }

  const startEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      authorImage: post.authorImage || '',
      date: post.date,
      readTime: post.readTime,
      category: post.category,
      image: post.image,
      tags: post.tags,
      featured: post.featured,
      published: post.published
    })
    setIsCreating(false)
  }

  if (isLoading) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Sign in to manage your blog</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {loginError && (
                <Alert>
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Dashboard</h1>
            <p className="text-gray-600">Manage your blog posts and analytics</p>
          </div>
          <div className="flex gap-4">
            <Button onClick={() => onPageChange('blog')} variant="outline">
              View Blog
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>

        {/* Analytics Cards */}
        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
              <div className="flex items-center">
                <Eye className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalViews}</p>
                </div>
              </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
              <div className="flex items-center">
                <Heart className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Likes</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalLikes}</p>
                </div>
              </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
              <div className="flex items-center">
                <Share2 className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Shares</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalShares}</p>
                </div>
              </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
              <div className="flex items-center">
                <MessageCircle className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Comments</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalComments}</p>
                </div>
              </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Top Posts */}
        {analytics?.topPosts && analytics.topPosts.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Top Performing Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.topPosts.map((post: any, index: number) => (
                  <div key={post.postId} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-blue-600 mr-4">#{index + 1}</span>
                      <div>
                        <p className="font-medium">{post.title}</p>
                        <p className="text-sm text-gray-600">{post.views} views</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Posts Management */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Posts List */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="h-4 w-4 mr-2" />
                New Post
              </Button>
            </div>
            
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{post.title}</h3>
                          {post.featured && <Badge variant="secondary">Featured</Badge>}
                          {!post.published && <Badge variant="outline">Draft</Badge>}
                        </div>
                        <p className="text-gray-600 mb-2">{post.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            {post.views}
                          </span>
                          <span className="flex items-center">
                            <Heart className="h-4 w-4 mr-1" />
                            {post.likes}
                          </span>
                          <span className="flex items-center">
                            <Share2 className="h-4 w-4 mr-1" />
                            {post.shares}
                          </span>
                          <span>{post.category}</span>
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(post)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeletePost(post.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Post Form */}
          <div className="lg:col-span-1">
            {(isCreating || editingPost) && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {editingPost ? 'Edit Post' : 'Create New Post'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={editingPost ? handleUpdatePost : handleCreatePost} className="space-y-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="excerpt">Excerpt</Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                        rows={3}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        rows={8}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="author">Author</Label>
                        <Input
                          id="author"
                          value={formData.author}
                          onChange={(e) => setFormData({...formData, author: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Category</Label>
                        <Input
                          id="category"
                          value={formData.category}
                          onChange={(e) => setFormData({...formData, category: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="readTime">Read Time</Label>
                        <Input
                          id="readTime"
                          value={formData.readTime}
                          onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                          placeholder="5 min read"
                        />
                      </div>
                      <div>
                        <Label htmlFor="date">Date</Label>
                        <Input
                          id="date"
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData({...formData, date: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="image">Featured Image URL</Label>
                      <Input
                        id="image"
                        value={formData.image}
                        onChange={(e) => setFormData({...formData, image: e.target.value})}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                          className="mr-2"
                        />
                        Featured
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.published}
                          onChange={(e) => setFormData({...formData, published: e.target.checked})}
                          className="mr-2"
                        />
                        Published
                      </label>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        <Save className="h-4 w-4 mr-2" />
                        {editingPost ? 'Update' : 'Create'}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsCreating(false)
                          setEditingPost(null)
                          resetForm()
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
