import React, { useState, useEffect, useRef } from 'react'
import { Button } from '../components/ui/button'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { ArrowLeft, Plus, Edit, Trash2, Eye, Save, X, Upload, Calendar, User, Clock, Tag, Image as ImageIcon, Trash, Bold, Italic, Underline, List, ListOrdered, Link, Quote, Type, AlignLeft, AlignCenter, AlignRight, Star, Search } from 'lucide-react'
import { blogService } from '../services/blogService'

interface AdminPageProps {
  onPageChange: (page: string, postId?: string) => void
}

interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  authorBio?: string
  authorImage?: string
  date: string
  readTime: string
  category: string
  image: string
  tags: string[]
  views: number
  likes: number
  comments: number
  shares: number
  featured: boolean
  published: boolean
}

export function AdminPage({ onPageChange }: AdminPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [isAuthorImageUploading, setIsAuthorImageUploading] = useState(false)
  const [uploadedAuthorImage, setUploadedAuthorImage] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const authorImageInputRef = useRef<HTMLInputElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    author: 'Alex MacLeod',
    authorBio: '',
    authorImage: '',
    category: 'Digital Strategy',
    image: '',
    tags: [],
    featured: false,
    published: true
  })

  // Load blog posts from Firestore on component mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const posts = await blogService.getAllPosts()
        setBlogPosts(posts)
        setFilteredPosts(posts)
      } catch (error) {
        console.error('Error loading posts:', error)
        // If Firestore fails, show empty state
        setBlogPosts([])
        setFilteredPosts([])
      }
    }
    
    loadPosts()
  }, [])

  // Note: Posts are now saved directly to Firestore, no localStorage needed

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple authentication - in production, use proper authentication
    if (username === 'admin' && password === 'maclabs2024') {
      setIsAuthenticated(true)
      setLoginError('')
    } else {
      setLoginError('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUsername('')
    setPassword('')
  }

  const handleCreatePost = () => {
    setIsCreating(true)
    setEditingPost(null)
    setUploadedImage(null)
    setUploadedAuthorImage(null)
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: 'Alex MacLeod',
      authorBio: '',
      authorImage: '',
      category: 'Digital Strategy',
      image: '',
      tags: [],
      featured: false,
      published: true
    })
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setIsCreating(false)
    setUploadedImage(null)
    setUploadedAuthorImage(null)
    setFormData(post)
  }

  const handleDeletePost = async (postId: string) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const success = await blogService.deletePost(postId)
        if (success) {
          setBlogPosts(posts => posts.filter(post => post.id !== postId))
          setFilteredPosts(posts => posts.filter(post => post.id !== postId))
          alert('Post deleted successfully!')
        } else {
          alert('Error deleting post. Please try again.')
        }
      } catch (error) {
        console.error('Error deleting post:', error)
        alert('Error deleting post. Please try again.')
      }
    }
  }

  const handleSavePost = async () => {
    if (!formData.title || !formData.content) {
      alert('Please fill in at least the title and content')
      return
    }

    try {
      const now = new Date()
      const postData = {
        title: formData.title || '',
        excerpt: formData.excerpt || '',
        content: formData.content || '',
        author: formData.author || 'Alex MacLeod',
        authorBio: formData.authorBio || '',
        authorImage: formData.authorImage || '',
        date: editingPost?.date || now.toISOString().split('T')[0],
        readTime: formData.readTime || calculateReadTime(formData.content || ''),
        category: formData.category || 'Digital Strategy',
        image: formData.image && formData.image.startsWith('http') ? formData.image : 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9nJTIwcG9zdHxlbnwxfHx8fDE3NTc3NDQ1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: formData.tags || [],
        views: editingPost?.views || 0,
        likes: editingPost?.likes || 0,
        comments: editingPost?.comments || 0,
        shares: editingPost?.shares || 0,
        featured: formData.featured || false,
        published: formData.published !== undefined ? formData.published : true
      }

      if (editingPost) {
        // Update existing post
        const updatedPost = await blogService.updatePost(editingPost.id, postData)
        if (updatedPost) {
          setBlogPosts(posts => posts.map(post => post.id === editingPost.id ? updatedPost : post))
          setFilteredPosts(posts => posts.map(post => post.id === editingPost.id ? updatedPost : post))
        }
      } else {
        // Create new post
        const newPost = await blogService.createPost(postData)
        if (newPost) {
          setBlogPosts(posts => [newPost, ...posts])
          setFilteredPosts(posts => [newPost, ...posts])
        }
      }

      setIsCreating(false)
      setEditingPost(null)
      setUploadedImage(null)
      alert('Post saved successfully!')
    } catch (error) {
      console.error('Error saving post:', error)
      alert('Error saving post. Please try again.')
    }
  }

  const calculateReadTime = (content: string): string => {
    const wordsPerMinute = 200
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length
    const minutes = Math.ceil(wordCount / wordsPerMinute)
    return `${minutes} min read`
  }

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      const input = e.currentTarget
      const tag = input.value.trim()
      if (tag && !formData.tags?.includes(tag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...(prev.tags || []), tag]
        }))
        input.value = ''
      }
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }))
  }

  // Image upload functions
  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 1 * 1024 * 1024) { // 1MB limit for Firestore
      alert('Image size must be less than 1MB for Firestore compatibility')
      return
    }

    setIsUploading(true)
    
    try {
      // For now, just use a default image URL to avoid Firestore size limits
      // In production, you'd upload to Firebase Storage or another service
      const defaultImageUrl = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9nJTIwcG9zdHxlbnwxfHx8fDE3NTc3NDQ1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
      
      setUploadedImage(defaultImageUrl)
      setFormData(prev => ({ ...prev, image: defaultImageUrl }))
      setIsUploading(false)
      
      alert('Image uploaded successfully! (Using default image for Firestore compatibility)')
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Error uploading image. Please try again.')
      setIsUploading(false)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const removeImage = () => {
    setUploadedImage(null)
    setFormData(prev => ({ ...prev, image: '' }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Author image upload functions
  const handleAuthorImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size must be less than 5MB')
      return
    }

    setIsAuthorImageUploading(true)
    
    try {
      // Convert to base64 for demo purposes
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setUploadedAuthorImage(result)
        setFormData(prev => ({ ...prev, authorImage: result }))
        setIsAuthorImageUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error uploading author image:', error)
      alert('Error uploading author image. Please try again.')
      setIsAuthorImageUploading(false)
    }
  }

  const handleAuthorImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleAuthorImageUpload(files[0])
    }
  }

  const removeAuthorImage = () => {
    setUploadedAuthorImage(null)
    setFormData(prev => ({ ...prev, authorImage: '' }))
    if (authorImageInputRef.current) {
      authorImageInputRef.current.value = ''
    }
  }

  // Rich Text Editor Functions
  const executeCommand = (command: string, value?: string) => {
    if (!editorRef.current) return

    // Execute the command
    document.execCommand(command, false, value)
    
    // Update content without causing re-render
    setFormData(prev => ({ ...prev, content: editorRef.current?.innerHTML || '' }))
  }

  const insertHeading = (level: number) => {
    if (!editorRef.current) return

    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const heading = document.createElement(`h${level}`)
      const textContent = selection.toString() || `Heading ${level}`
      
      // Clear selection and insert heading
      range.deleteContents()
      heading.textContent = textContent
      range.insertNode(heading)
      
      // Move cursor to end of heading
      const newRange = document.createRange()
      newRange.setStartAfter(heading)
      newRange.collapse(true)
      selection.removeAllRanges()
      selection.addRange(newRange)
      
      // Update content
      setFormData(prev => ({ ...prev, content: editorRef.current?.innerHTML || '' }))
    }
  }

  const insertParagraph = () => {
    if (!editorRef.current) return

    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const paragraph = document.createElement('p')
      const textContent = selection.toString() || 'New paragraph'
      
      // Clear selection and insert paragraph
      range.deleteContents()
      paragraph.textContent = textContent
      range.insertNode(paragraph)
      
      // Move cursor to end of paragraph
      const newRange = document.createRange()
      newRange.setStartAfter(paragraph)
      newRange.collapse(true)
      selection.removeAllRanges()
      selection.addRange(newRange)
      
      // Update content
      setFormData(prev => ({ ...prev, content: editorRef.current?.innerHTML || '' }))
    }
  }

  const insertLink = () => {
    const url = prompt('Enter URL:')
    if (url) {
      executeCommand('createLink', url)
    }
  }

  const insertList = (ordered: boolean = false) => {
    executeCommand(ordered ? 'insertOrderedList' : 'insertUnorderedList')
  }

  const insertQuote = () => {
    if (!editorRef.current) return

    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const blockquote = document.createElement('blockquote')
      const textContent = selection.toString() || 'Quote text here'
      
      // Clear selection and insert blockquote
      range.deleteContents()
      blockquote.textContent = textContent
      range.insertNode(blockquote)
      
      // Move cursor to end of blockquote
      const newRange = document.createRange()
      newRange.setStartAfter(blockquote)
      newRange.collapse(true)
      selection.removeAllRanges()
      selection.addRange(newRange)
      
      // Update content
      setFormData(prev => ({ ...prev, content: editorRef.current?.innerHTML || '' }))
    }
  }

  const handleEditorChange = () => {
    if (editorRef.current) {
      setFormData(prev => ({ ...prev, content: editorRef.current?.innerHTML || '' }))
    }
  }

  // Initialize editor content only once
  useEffect(() => {
    if (editorRef.current && !editorRef.current.innerHTML) {
      editorRef.current.innerHTML = '<p>Start writing your blog post here...</p>'
    }
  }, [])

  // Update editor content when editing existing post
  useEffect(() => {
    if (editorRef.current && editingPost && formData.content) {
      editorRef.current.innerHTML = formData.content
    }
  }, [editingPost])

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredPosts(blogPosts)
    } else {
      const filtered = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      setFilteredPosts(filtered)
    }
  }, [searchQuery, blogPosts])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">Access the blog management system</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            {loginError && (
              <div className="text-red-600 text-sm text-center">{loginError}</div>
            )}

            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Login
            </Button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Demo Credentials:</strong><br />
              Username: admin<br />
              Password: maclabs2024
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (isCreating || editingPost) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setIsCreating(false)
                  setEditingPost(null)
                  setUploadedImage(null)
                }}
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Posts
              </button>
              <h1 className="text-3xl font-bold text-gray-900">
                {editingPost ? 'Edit Post' : 'Create New Post'}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleSavePost}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Post
              </Button>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter post title..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Digital Strategy">Digital Strategy</option>
                    <option value="SEO">SEO</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Email Marketing">Email Marketing</option>
                    <option value="Content Marketing">Content Marketing</option>
                    <option value="PPC">PPC</option>
                    <option value="Brand Strategy">Brand Strategy</option>
                  </select>
                </div>
              </div>

              {/* Excerpt */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt
                </label>
                <textarea
                  value={formData.excerpt || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Brief description of the post..."
                />
              </div>

              {/* Author Profile Section */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Author Profile</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Author Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={formData.author || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter author name..."
                    />
                  </div>

                  {/* Author Bio */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Author Bio
                    </label>
                    <textarea
                      value={formData.authorBio || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, authorBio: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Brief bio about the author..."
                    />
                  </div>
                </div>

                {/* Author Image Upload */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Author Profile Image
                  </label>
                  
                  {/* Upload Area */}
                  <div
                    className={`image-upload-area border-2 border-dashed rounded-lg p-4 text-center ${
                      isAuthorImageUploading 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {isAuthorImageUploading ? (
                      <div className="flex flex-col items-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mb-2"></div>
                        <p className="text-gray-600 text-sm">Uploading image...</p>
                      </div>
                    ) : uploadedAuthorImage || formData.authorImage ? (
                      <div className="image-upload-preview relative">
                        <ImageWithFallback
                          src={uploadedAuthorImage || formData.authorImage || ''}
                          alt="Author Preview"
                          className="w-20 h-20 object-cover rounded-full mx-auto"
                        />
                        <button
                          onClick={removeAuthorImage}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <Trash className="h-3 w-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                        <p className="text-sm font-medium text-gray-900 mb-1">Upload author photo</p>
                        <p className="text-xs text-gray-600 mb-3">Click to select or drag and drop</p>
                        <Button
                          type="button"
                          onClick={() => authorImageInputRef.current?.click()}
                          variant="outline"
                          size="sm"
                          className="border-blue-600 text-blue-600 hover:bg-blue-50"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Photo
                        </Button>
                        <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB</p>
                      </div>
                    )}
                    
                    <input
                      ref={authorImageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleAuthorImageInputChange}
                      className="hidden"
                    />
                  </div>
                  
                  {/* URL Input as Alternative */}
                  <div className="mt-3">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Or enter image URL
                    </label>
                    <input
                      type="url"
                      value={formData.authorImage || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, authorImage: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com/author-photo.jpg"
                    />
                  </div>
                </div>
              </div>

              {/* Featured Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image
                </label>
                
                {/* Upload Area */}
                <div
                  className={`image-upload-area border-2 border-dashed rounded-lg p-6 text-center ${
                    isDragOver 
                      ? 'drag-over border-blue-500 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {isUploading ? (
                    <div className="flex flex-col items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                      <p className="text-gray-600">Uploading image...</p>
                    </div>
                  ) : uploadedImage || formData.image ? (
                    <div className="image-upload-preview relative">
                      <ImageWithFallback
                        src={uploadedImage || formData.image || ''}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <button
                        onClick={removeImage}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <Trash className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-lg font-medium text-gray-900 mb-2">Upload an image</p>
                      <p className="text-gray-600 mb-4">Drag and drop an image here, or click to select</p>
                      <Button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose File
                      </Button>
                      <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF up to 5MB</p>
                    </div>
                  )}
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
                
                {/* URL Input as Alternative */}
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Or enter image URL
                </label>
                <input
                  type="url"
                  value={formData.image || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                    />
                  </div>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  onKeyDown={handleTagInput}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type a tag and press Enter..."
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                      <button
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content *
                </label>
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Rich Text Editor */}
                  <div>
                    {/* Toolbar */}
                    <div className="rich-text-toolbar border border-gray-300 rounded-t-lg p-2 flex flex-wrap gap-1">
                      {/* Text Formatting */}
                      <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                        <button
                          type="button"
                          onClick={() => executeCommand('bold')}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700"
                          title="Bold"
                        >
                          <Bold className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => executeCommand('italic')}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700"
                          title="Italic"
                        >
                          <Italic className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => executeCommand('underline')}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700"
                          title="Underline"
                        >
                          <Underline className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Headings */}
                      <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                        <button
                          type="button"
                          onClick={() => insertHeading(2)}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700 text-sm font-bold"
                          title="Heading 2"
                        >
                          H2
                        </button>
                        <button
                          type="button"
                          onClick={() => insertHeading(3)}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700 text-sm font-bold"
                          title="Heading 3"
                        >
                          H3
                        </button>
                        <button
                          type="button"
                          onClick={() => insertParagraph()}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700 text-sm font-bold"
                          title="Paragraph"
                        >
                          P
                        </button>
                      </div>

                      {/* Lists */}
                      <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                        <button
                          type="button"
                          onClick={() => insertList(false)}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700"
                          title="Bullet List"
                        >
                          <List className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => insertList(true)}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700"
                          title="Numbered List"
                        >
                          <ListOrdered className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Links and Quotes */}
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={insertLink}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700"
                          title="Insert Link"
                        >
                          <Link className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={insertQuote}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700"
                          title="Quote"
                        >
                          <Quote className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Editor */}
                    <div
                      ref={editorRef}
                      contentEditable
                      onInput={handleEditorChange}
                      className="w-full min-h-96 px-3 py-2 border border-t-0 border-gray-300 rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      style={{ minHeight: '24rem' }}
                      suppressContentEditableWarning={true}
                    />
                <p className="text-sm text-gray-500 mt-2">
                      Use the toolbar above to format your text. No HTML knowledge required!
                    </p>
                  </div>
                  
                  {/* Preview */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Live Preview
                    </label>
                    <div className="admin-preview" style={{ height: '80rem' }}>
                      <div 
                        className="blog-content"
                        dangerouslySetInnerHTML={{ __html: formData.content || '<p class="text-gray-500 italic">Start typing to see preview...</p>' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Settings */}
              <div className="flex items-center gap-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.featured || false}
                    onChange={(e) => setFormData(prev => ({ ...prev, featured: e.target.checked }))}
                    className="mr-2"
                  />
                  Featured Post
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.published !== false}
                    onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                    className="mr-2"
                  />
                  Published
                </label>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-6 border-t border-gray-200">
                <Button
                  onClick={handleSavePost}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
            <p className="text-gray-600 mt-2">Manage your blog posts and content</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleCreatePost}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Post
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-blue-900">{blogPosts.length}</div>
                <div className="text-sm font-medium text-blue-700">Total Posts</div>
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Edit className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-green-900">
                  {blogPosts.filter(post => post.published).length}
                </div>
                <div className="text-sm font-medium text-green-700">Published</div>
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6 border border-yellow-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-yellow-900">
                  {blogPosts.filter(post => post.featured).length}
                </div>
                <div className="text-sm font-medium text-yellow-700">Featured</div>
              </div>
              <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-purple-900">
                  {blogPosts.reduce((sum, post) => sum + post.views, 0).toLocaleString()}
                </div>
                <div className="text-sm font-medium text-purple-700">Total Views</div>
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Eye className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="px-6 py-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search posts by title, author, category, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="mt-2 text-sm text-gray-600">
                {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found
              </div>
            )}
          </div>
        </div>

        {/* Posts List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">All Posts</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredPosts.map((post) => (
              <div key={post.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{post.title}</h3>
                      {post.featured && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                      {!post.published && (
                        <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                          Draft
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(post.date)}
                      </div>
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {post.views.toLocaleString()} views
                      </div>
                      <div className="flex items-center">
                        <Tag className="h-4 w-4 mr-1" />
                        {post.category}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      onClick={() => onPageChange('blog-post', post.id)}
                      variant="outline"
                      size="sm"
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleEditPost(post)}
                      variant="outline"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => handleDeletePost(post.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
