import React, { useState, useEffect, useRef } from 'react'
import { Button } from '../components/ui/button'
import { ImageWithFallback } from '../components/figma/ImageWithFallback'
import { ArrowLeft, Plus, Edit, Trash2, Eye, Save, X, Upload, Calendar, User, Clock, Tag, Image as ImageIcon, Trash, Bold, Italic, Underline, List, ListOrdered, Link, Quote, Type, AlignLeft, AlignCenter, AlignRight, AlignJustify, Star, Search, Minus, Plus as PlusIcon, RotateCcw, Table as TableIcon } from 'lucide-react'
import { blogService } from '../services/blogService'
import { auth } from '../config/firebase'
import { authService } from '../services/authService'

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
  applause: number
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
  const contentImageInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    excerpt: '',
    content: '',
    author: 'Sam Daodu',
    authorBio: '',
    authorImage: '',
    category: 'Crypto Marketing',
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginError('')
    
    try {
      // Use Firebase Auth for authentication (required for Storage uploads)
      // Try to sign in with the provided credentials
      // Note: You'll need to create a Firebase user with email/password
      // For now, you can use the admin email/password
      const email = username.includes('@') ? username : `${username}@maclabs.com`
      await authService.signIn(email, password)
      setIsAuthenticated(true)
      setLoginError('')
    } catch (error: any) {
      console.error('Login error:', error)
      // Fallback to simple auth for backward compatibility
      if (username === 'admin' && password === 'maclabs2024') {
        setIsAuthenticated(true)
        setLoginError('')
        // Show warning that Firebase Auth is needed for image uploads
        console.warn('Using simple auth. Image uploads require Firebase Auth. Please create a Firebase user and sign in with email/password.')
      } else {
        setLoginError(error?.message || 'Invalid credentials. Note: Image uploads require Firebase Auth sign-in.')
      }
    }
  }

  const handleLogout = async () => {
    try {
      // Sign out from Firebase Auth if signed in
      if (auth.currentUser) {
        await authService.signOut()
      }
    } catch (error) {
      console.error('Error signing out:', error)
    }
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
      author: 'Sam Daodu',
      authorBio: '',
      authorImage: '',
      category: 'Crypto Marketing',
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
          // Reload all posts from Firestore to ensure consistency
          const allPosts = await blogService.getAllPosts()
          setBlogPosts(allPosts)
          setFilteredPosts(allPosts)
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
        author: formData.author || 'Sam Daodu',
        authorBio: formData.authorBio || '',
        authorImage: formData.authorImage || '',
        date: editingPost?.date || now.toISOString().split('T')[0],
        readTime: formData.readTime || calculateReadTime(formData.content || ''),
        category: formData.category || 'Crypto Marketing',
        image: formData.image && formData.image.startsWith('http') ? formData.image : 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9nJTIwcG9zdHxlbnwxfHx8fDE3NTc3NDQ1NTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: formData.tags || [],
        views: editingPost?.views || 0,
        likes: editingPost?.likes || 0,
        applause: editingPost?.applause || 0,
        comments: editingPost?.comments || 0,
        shares: editingPost?.shares || 0,
        featured: formData.featured || false,
        published: formData.published !== undefined ? formData.published : true
      }

      if (editingPost) {
        // Update existing post
        const updatedPost = await blogService.updatePost(editingPost.id, postData)
        if (updatedPost) {
          // Reload all posts from Firestore to ensure consistency
          const allPosts = await blogService.getAllPosts()
          setBlogPosts(allPosts)
          setFilteredPosts(allPosts)
        }
      } else {
        // Create new post
        const newPost = await blogService.createPost(postData)
        if (newPost) {
          // Reload all posts from Firestore to ensure consistency
          const allPosts = await blogService.getAllPosts()
          setBlogPosts(allPosts)
          setFilteredPosts(allPosts)
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

  // Image upload functions - Convert to base64 for storage in Firestore (no Firebase Storage needed)
  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Limit to 500KB to stay within Firestore document size limits
    if (file.size > 500 * 1024) {
      alert('Image size must be less than 500KB. Please use the URL input for larger images, or compress your image first.')
      return
    }

    setIsUploading(true)
    
    try {
      // Convert image to base64
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64String = e.target?.result as string
        setUploadedImage(base64String)
        setFormData(prev => ({ ...prev, image: base64String }))
        setIsUploading(false)
      }
      reader.onerror = () => {
        alert('Error reading file. Please try again or use the URL input instead.')
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error: any) {
      console.error('Error uploading image:', error)
      alert('Error uploading image. Please try again or use the URL input instead.')
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
    
    const files = e.dataTransfer.files
    if (files && files.length > 0) {
      const file = files.item(0) as File
      handleFileUpload(file)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const file = files.item(0) as File
      handleFileUpload(file)
    }
  }

  const removeImage = () => {
    setUploadedImage(null)
    setFormData(prev => ({ ...prev, image: '' }))
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Author image upload functions - Convert to base64 for storage in Firestore (no Firebase Storage needed)
  const handleAuthorImageUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Limit to 200KB for author images
    if (file.size > 200 * 1024) {
      alert('Author image size must be less than 200KB. Please use the URL input for larger images, or compress your image first.')
      return
    }

    setIsAuthorImageUploading(true)
    
    try {
      // Convert image to base64
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64String = e.target?.result as string
        setUploadedAuthorImage(base64String)
        setFormData(prev => ({ ...prev, authorImage: base64String }))
        setIsAuthorImageUploading(false)
        console.log('Author image uploaded successfully! (Stored as base64)')
      }
      reader.onerror = () => {
        alert('Error reading file. Please try again or use the URL input instead.')
        setIsAuthorImageUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (error: any) {
      console.error('Error uploading author image:', error)
      alert('Error uploading author image. Please try again or use the URL input instead.')
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
      const selectedText = selection.toString()
      
      // Only apply formatting if text is selected
      if (selectedText) {
        const heading = document.createElement(`h${level}`)
        
        // Clear selection and insert heading
        range.deleteContents()
        heading.textContent = selectedText
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
  }

  const insertParagraph = () => {
    if (!editorRef.current) return

    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const selectedText = selection.toString()
      
      // Only apply formatting if text is selected
      if (selectedText) {
        const paragraph = document.createElement('p')
        
        // Clear selection and insert paragraph
        range.deleteContents()
        paragraph.textContent = selectedText
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
  }

  const insertNormalText = () => {
    if (!editorRef.current) return

    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      const selectedText = selection.toString()
      
      // Only apply formatting if text is selected
      if (selectedText) {
        // Create a text node to remove any formatting
        const textNode = document.createTextNode(selectedText)
        
        // Clear selection and insert plain text
        range.deleteContents()
        range.insertNode(textNode)
        
        // Move cursor to end of text
        const newRange = document.createRange()
        newRange.setStartAfter(textNode)
        newRange.collapse(true)
        selection.removeAllRanges()
        selection.addRange(newRange)
        
        // Update content
        setFormData(prev => ({ ...prev, content: editorRef.current?.innerHTML || '' }))
      }
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
      
      // Check if we're already inside a blockquote
      let parent: Node | null = range.commonAncestorContainer
      if (parent.nodeType === Node.TEXT_NODE) {
        parent = parent.parentNode as Node | null
      }
      
      let blockquoteParent: Node | null = parent
      while (blockquoteParent && blockquoteParent !== editorRef.current) {
        if (blockquoteParent.nodeName === 'BLOCKQUOTE') {
          // Already inside a blockquote, don't create another one
          return
        }
        blockquoteParent = blockquoteParent.parentNode as Node | null
      }
      
      const blockquote = document.createElement('blockquote')
      const textContent = selection.toString()
      
      // Only insert blockquote if there's selected text
      if (textContent) {
        // Clear selection and insert blockquote
        range.deleteContents()
        blockquote.textContent = textContent
        range.insertNode(blockquote)
        
        // Move cursor to end of blockquote and insert a normal paragraph
        const newRange = document.createRange()
        newRange.setStartAfter(blockquote)
        newRange.collapse(true)
        
        // Insert a normal paragraph after the blockquote
        const paragraph = document.createElement('p')
        paragraph.innerHTML = '<br>'
        newRange.insertNode(paragraph)
        
        // Move cursor to the new paragraph
        const finalRange = document.createRange()
        finalRange.setStart(paragraph, 0)
        finalRange.collapse(true)
        selection.removeAllRanges()
        selection.addRange(finalRange)
      }
      
      // Update content
      setFormData(prev => ({ ...prev, content: editorRef.current?.innerHTML || '' }))
    }
  }

  const handleEditorChange = () => {
    if (editorRef.current) {
      setFormData(prev => ({ ...prev, content: editorRef.current?.innerHTML || '' }))
    }
  }

  const insertContentImageFromUrl = () => {
    const url = prompt('Enter image URL:')
    if (!url) return
    executeCommand('insertImage', url)
  }

  const handleContentImageFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const file = files.item(0) as File
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      executeCommand('insertImage', dataUrl)
      if (contentImageInputRef.current) contentImageInputRef.current.value = ''
    }
    reader.readAsDataURL(file as Blob)
  }

  const insertTable = () => {
    if (!editorRef.current) return
    const rowsStr = prompt('Number of rows?', '3') || '3'
    const colsStr = prompt('Number of columns?', '3') || '3'
    const rows = Math.max(1, parseInt(rowsStr, 10) || 3)
    const cols = Math.max(1, parseInt(colsStr, 10) || 3)
    const table = document.createElement('table')
    table.style.width = '100%'
    table.style.borderCollapse = 'collapse'
    for (let r = 0; r < rows; r++) {
      const tr = document.createElement('tr')
      for (let c = 0; c < cols; c++) {
        const cell = r === 0 ? document.createElement('th') : document.createElement('td')
        cell.textContent = r === 0 ? `Header ${c + 1}` : `Cell ${r}-${c + 1}`
        cell.style.border = '1px solid #e5e7eb'
        cell.style.padding = '12px'
        tr.appendChild(cell)
      }
      table.appendChild(tr)
    }
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0)
      range.deleteContents()
      range.insertNode(table)
      setFormData(prev => ({ ...prev, content: editorRef.current?.innerHTML || '' }))
    }
  }

  const handleEditorKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        let parent: Node | null = range.commonAncestorContainer
        
        if (parent.nodeType === Node.TEXT_NODE) {
          parent = parent.parentNode as Node | null
        }
        
        // Check if we're inside a blockquote
        let blockquoteParent: Node | null = parent
        while (blockquoteParent && blockquoteParent !== editorRef.current) {
          if (blockquoteParent.nodeName === 'BLOCKQUOTE') {
            // Exit the blockquote by creating a normal paragraph after it
            e.preventDefault()
            
            const newParagraph = document.createElement('p')
            newParagraph.innerHTML = '<br>'
            
            // Insert paragraph after the blockquote
            if (blockquoteParent.parentNode) {
              blockquoteParent.parentNode.insertBefore(newParagraph, blockquoteParent.nextSibling)
              
              // Move cursor to the new paragraph
              const newRange = document.createRange()
              newRange.setStart(newParagraph, 0)
              newRange.collapse(true)
              selection.removeAllRanges()
              selection.addRange(newRange)
              
              // Update content
              setFormData(prev => ({ ...prev, content: editorRef.current?.innerHTML || '' }))
            }
            return
          }
          blockquoteParent = blockquoteParent.parentNode as Node | null
        }
      }
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
      <div className="pt-16 min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full" style={{ maxWidth: '380px' }}>
          <div className="bg-white rounded-lg shadow-lg p-6">
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
          </div>
        </div>
      </div>
    )
  }

  if (isCreating || editingPost) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex flex-col gap-6">
              <button
                onClick={() => {
                  setIsCreating(false)
                  setEditingPost(null)
                  setUploadedImage(null)
                }}
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors w-fit"
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
                    <option value="Crypto Marketing">Crypto Marketing</option>
                    <option value="Ghostwriting">Ghostwriting</option>
                    <option value="DeFi">DeFi</option>
                    <option value="Web3 Gaming">Web3 Gaming</option>
                    <option value="Gamble-Fi">Gamble-Fi</option>
                    <option value="Crypto Infrastructure">Crypto Infrastructure</option>
                    <option value="Presale & ICO Marketing">Presale & ICO Marketing</option>
                    <option value="Social Media Growth">Social Media Growth</option>
                    <option value="Funnel Optimization">Funnel Optimization</option>
                    <option value="Web3 Strategy">Web3 Strategy</option>
                    <option value="Thought Leadership">Thought Leadership</option>
                    <option value="Investor Relations">Investor Relations</option>
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
                      <div className="space-y-3">
                        <div className="image-upload-preview relative inline-block">
                          <ImageWithFallback
                            src={uploadedAuthorImage || formData.authorImage || ''}
                            alt="Author Preview"
                            className="w-20 h-20 object-cover rounded-full mx-auto"
                          />
                          <button
                            onClick={removeAuthorImage}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors shadow-lg"
                            title="Remove author image"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                        <Button
                          type="button"
                          onClick={removeAuthorImage}
                          variant="outline"
                          size="sm"
                          className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                        >
                          <Trash className="h-3 w-3 mr-2" />
                          Remove Author Image
                        </Button>
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
                    <div className="flex gap-2">
                      <input
                        type="url"
                        value={formData.authorImage || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, authorImage: e.target.value }))}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/author-photo.jpg"
                      />
                      {formData.authorImage && (
                        <Button
                          type="button"
                          onClick={removeAuthorImage}
                          variant="outline"
                          size="sm"
                          className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 whitespace-nowrap"
                        >
                          <X className="h-3 w-3 mr-1" />
                          Clear
                        </Button>
                      )}
                    </div>
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
                    <div className="space-y-3">
                      <div className="image-upload-preview relative">
                        <ImageWithFallback
                          src={uploadedImage || formData.image || ''}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                          title="Remove image"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <Button
                        type="button"
                        onClick={removeImage}
                        variant="outline"
                        className="w-full border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Remove Image
                      </Button>
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
                      <p className="text-xs text-gray-500 mt-2">PNG, JPG, GIF, WEBP up to 500KB (or use URL for larger images)</p>
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
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={formData.image || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://example.com/image.jpg"
                    />
                    {formData.image && (
                      <Button
                        type="button"
                        onClick={removeImage}
                        variant="outline"
                        className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 whitespace-nowrap"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                    )}
                  </div>
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
                        <button
                          type="button"
                          onClick={() => insertNormalText()}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700 text-sm font-bold"
                          title="Normal Text"
                        >
                          Normal
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
                      <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
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
                        <button
                          type="button"
                          onClick={insertTable}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700"
                          title="Insert Table"
                        >
                          <TableIcon className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => contentImageInputRef.current?.click()}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700"
                          title="Insert Image"
                        >
                          <ImageIcon className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Text Alignment */}
                      <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                        <button
                          type="button"
                          onClick={() => executeCommand('justifyLeft')}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700"
                          title="Align Left"
                        >
                          <AlignLeft className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => executeCommand('justifyCenter')}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700"
                          title="Align Center"
                        >
                          <AlignCenter className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => executeCommand('justifyRight')}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700"
                          title="Align Right"
                        >
                          <AlignRight className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => executeCommand('justifyFull')}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700"
                          title="Justify"
                        >
                          <AlignJustify className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Font Options */}
                      <div className="flex gap-1 border-r border-gray-300 pr-2 mr-2">
                        <select
                          onChange={(e) => executeCommand('fontName', e.target.value)}
                          className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          title="Font Family"
                        >
                          <option value="">Font</option>
                          <option value="Arial">Arial</option>
                          <option value="Helvetica">Helvetica</option>
                          <option value="Times New Roman">Times New Roman</option>
                          <option value="Georgia">Georgia</option>
                          <option value="Verdana">Verdana</option>
                          <option value="Courier New">Courier New</option>
                          <option value="Monaco">Monaco</option>
                          <option value="Calibri">Calibri</option>
                          <option value="Montserrat">Montserrat</option>
                          <option value="Lato">Lato</option>
                        </select>
                        <select
                          onChange={(e) => executeCommand('fontSize', e.target.value)}
                          className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          title="Font Size"
                        >
                          <option value="">Size</option>
                          <option value="1">8px</option>
                          <option value="2">10px</option>
                          <option value="3">12px</option>
                          <option value="4">14px</option>
                          <option value="5">18px</option>
                          <option value="6">24px</option>
                          <option value="7">36px</option>
                        </select>
                      </div>

                      {/* Spacing Options */}
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => executeCommand('insertHorizontalRule')}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700"
                          title="Insert Horizontal Line"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => executeCommand('insertParagraph')}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700"
                          title="Insert Line Break"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => executeCommand('removeFormat')}
                          className="p-2 hover:bg-gray-200 rounded text-gray-700"
                          title="Remove Formatting"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Editor */}
                    <div
                      ref={editorRef}
                      contentEditable
                      onInput={handleEditorChange}
                      onKeyDown={handleEditorKeyDown}
                      className="w-full min-h-96 px-3 py-2 border border-t-0 border-gray-300 rounded-b-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                      style={{ minHeight: '24rem' }}
                      suppressContentEditableWarning={true}
                    />
                    <input
                      ref={contentImageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleContentImageFileInput}
                      className="hidden"
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
