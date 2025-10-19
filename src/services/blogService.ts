import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  increment,
  serverTimestamp,
  Timestamp,
  writeBatch
} from 'firebase/firestore'
import { db } from '../config/firebase'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
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
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export interface BlogAnalytics {
  id: string
  postId: string
  eventType: 'view' | 'like' | 'share' | 'comment'
  userAgent?: string
  referrer?: string
  ipAddress?: string
  timestamp: Timestamp
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  createdAt: Timestamp
}

class BlogService {
  private postsCollection = collection(db, 'blog_posts')
  private categoriesCollection = collection(db, 'blog_categories')
  private analyticsCollection = collection(db, 'blog_analytics')

  // Get all blog posts
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const q = query(this.postsCollection, orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as BlogPost))
    } catch (error) {
      console.error('Error fetching posts:', error)
      return []
    }
  }

  // Get published posts only
  async getPublishedPosts(): Promise<BlogPost[]> {
    try {
      // Temporary: Get all posts and filter client-side to avoid index requirement
      const q = query(this.postsCollection, orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      
      const allPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as BlogPost))
      
      // Filter for published posts client-side
      return allPosts.filter(post => post.published === true)
    } catch (error) {
      console.error('Error fetching published posts:', error)
      return []
    }
  }

  // Get featured posts
  async getFeaturedPosts(): Promise<BlogPost[]> {
    try {
      // Temporary: Get all posts and filter client-side to avoid index requirement
      const q = query(this.postsCollection, orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      
      const allPosts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as BlogPost))
      
      // Filter for featured and published posts client-side
      return allPosts.filter(post => post.published === true && post.featured === true)
    } catch (error) {
      console.error('Error fetching featured posts:', error)
      return []
    }
  }

  // Get post by ID
  async getPostById(id: string): Promise<BlogPost | null> {
    try {
      const docRef = doc(this.postsCollection, id)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as BlogPost
      }
      return null
    } catch (error) {
      console.error('Error fetching post:', error)
      return null
    }
  }

  // Get posts by category
  async getPostsByCategory(category: string): Promise<BlogPost[]> {
    try {
      const q = query(
        this.postsCollection,
        where('published', '==', true),
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      )
      const querySnapshot = await getDocs(q)
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as BlogPost))
    } catch (error) {
      console.error('Error fetching posts by category:', error)
      return []
    }
  }

  // Get related posts
  async getRelatedPosts(postId: string, limitCount: number = 3): Promise<BlogPost[]> {
    try {
      const currentPost = await this.getPostById(postId)
      if (!currentPost) return []

      const q = query(
        this.postsCollection,
        where('published', '==', true),
        where('category', '==', currentPost.category),
        orderBy('createdAt', 'desc'),
        limit(limitCount + 1) // +1 to exclude current post
      )
      const querySnapshot = await getDocs(q)
      
      const posts = querySnapshot.docs
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        } as BlogPost))
        .filter(post => post.id !== postId)
        .slice(0, limitCount)
      
      return posts
    } catch (error) {
      console.error('Error fetching related posts:', error)
      return []
    }
  }

  // Create new post
  async createPost(postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>): Promise<BlogPost | null> {
    try {
      const docRef = await addDoc(this.postsCollection, {
        ...postData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      
      return {
        id: docRef.id,
        ...postData,
        createdAt: new Date() as any,
        updatedAt: new Date() as any
      } as BlogPost
    } catch (error) {
      console.error('Error creating post:', error)
      return null
    }
  }

  // Update post
  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    try {
      const docRef = doc(this.postsCollection, id)
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp()
      })
      
      // Return updated post
      return await this.getPostById(id)
    } catch (error) {
      console.error('Error updating post:', error)
      return null
    }
  }

  // Delete post
  async deletePost(id: string): Promise<boolean> {
    try {
      const docRef = doc(this.postsCollection, id)
      await deleteDoc(docRef)
      return true
    } catch (error) {
      console.error('Error deleting post:', error)
      return false
    }
  }

  // Increment view count
  async incrementViews(postId: string): Promise<void> {
    try {
      const docRef = doc(this.postsCollection, postId)
      await updateDoc(docRef, {
        views: increment(1),
        updatedAt: serverTimestamp()
      })
      
      // Log analytics
      await this.logAnalytics(postId, 'view')
    } catch (error) {
      console.error('Error incrementing views:', error)
    }
  }

  // Increment likes
  async incrementLikes(postId: string): Promise<void> {
    try {
      const docRef = doc(this.postsCollection, postId)
      await updateDoc(docRef, {
        likes: increment(1),
        updatedAt: serverTimestamp()
      })
      
      // Log analytics
      await this.logAnalytics(postId, 'like')
    } catch (error) {
      console.error('Error incrementing likes:', error)
    }
  }

  // Increment shares
  async incrementShares(postId: string): Promise<void> {
    try {
      const docRef = doc(this.postsCollection, postId)
      await updateDoc(docRef, {
        shares: increment(1),
        updatedAt: serverTimestamp()
      })
      
      // Log analytics
      await this.logAnalytics(postId, 'share')
    } catch (error) {
      console.error('Error incrementing shares:', error)
    }
  }

  // Get categories with post counts
  async getCategories(): Promise<{ name: string; count: number }[]> {
    try {
      const publishedPosts = await this.getPublishedPosts()
      const categoryMap = new Map<string, number>()

      publishedPosts.forEach(post => {
        categoryMap.set(post.category, (categoryMap.get(post.category) || 0) + 1)
      })

      const categories = Array.from(categoryMap.entries()).map(([name, count]) => ({
        name,
        count
      }))

      categories.unshift({ name: 'All Posts', count: publishedPosts.length })
      return categories
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }

  // Search posts
  async searchPosts(searchQuery: string): Promise<BlogPost[]> {
    try {
      // Firestore doesn't have full-text search, so we'll search in title and excerpt
      const publishedPosts = await this.getPublishedPosts()
      const searchTerm = searchQuery.toLowerCase()
      
      return publishedPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      )
    } catch (error) {
      console.error('Error searching posts:', error)
      return []
    }
  }

  // Log analytics
  private async logAnalytics(postId: string, eventType: 'view' | 'like' | 'share' | 'comment'): Promise<void> {
    try {
      await addDoc(this.analyticsCollection, {
        postId,
        eventType,
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        timestamp: serverTimestamp()
      })
    } catch (error) {
      console.error('Error logging analytics:', error)
    }
  }

  // Get analytics data
  async getAnalytics(postId?: string): Promise<BlogAnalytics[]> {
    try {
      let q = query(this.analyticsCollection, orderBy('timestamp', 'desc'))
      
      if (postId) {
        q = query(
          this.analyticsCollection,
          where('postId', '==', postId),
          orderBy('timestamp', 'desc')
        )
      }
      
      const querySnapshot = await getDocs(q)
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as BlogAnalytics))
    } catch (error) {
      console.error('Error fetching analytics:', error)
      return []
    }
  }

  // Get analytics summary
  async getAnalyticsSummary(): Promise<{
    totalViews: number
    totalLikes: number
    totalShares: number
    totalComments: number
    topPosts: Array<{ postId: string; title: string; views: number }>
  }> {
    try {
      const analytics = await this.getAnalytics()
      const posts = await this.getAllPosts()
      
      const summary = {
        totalViews: analytics.filter(a => a.eventType === 'view').length,
        totalLikes: analytics.filter(a => a.eventType === 'like').length,
        totalShares: analytics.filter(a => a.eventType === 'share').length,
        totalComments: analytics.filter(a => a.eventType === 'comment').length,
        topPosts: posts
          .sort((a, b) => b.views - a.views)
          .slice(0, 5)
          .map(post => ({
            postId: post.id,
            title: post.title,
            views: post.views
          }))
      }
      
      return summary
    } catch (error) {
      console.error('Error fetching analytics summary:', error)
      return {
        totalViews: 0,
        totalLikes: 0,
        totalShares: 0,
        totalComments: 0,
        topPosts: []
      }
    }
  }

  // Migration from localStorage to Firestore
  async migrateFromLocalStorage(): Promise<void> {
    try {
      const existingPosts = localStorage.getItem('maclabs-blog-posts')
      if (!existingPosts) return

      const posts = JSON.parse(existingPosts)
      console.log(`Migrating ${posts.length} posts from localStorage to Firestore...`)

      for (const post of posts) {
        await this.createPost({
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          author: post.author,
          authorImage: post.authorImage,
          date: post.date,
          readTime: post.readTime,
          category: post.category,
          image: post.image,
          tags: post.tags,
          views: post.views || 0,
          likes: post.likes || 0,
          comments: post.comments || 0,
          shares: post.shares || 0,
          featured: post.featured || false,
          published: post.published !== false // Default to true
        })
      }

      console.log('Migration completed successfully!')
      // Optionally clear localStorage after successful migration
      // localStorage.removeItem('maclabs-blog-posts')
    } catch (error) {
      console.error('Error during migration:', error)
    }
  }

  // Initialize default posts in Firestore
  async initializeDefaultPosts(): Promise<void> {
    try {
      const existingPosts = await this.getAllPosts()
      if (existingPosts.length > 0) return // Already initialized

      const defaultPosts = [
        {
          title: "Understanding DeFi: The Future of Decentralized Finance",
          excerpt: "Explore how decentralized finance is revolutionizing traditional banking and financial services through blockchain technology and smart contracts.",
          content: `<p>Decentralized Finance, or DeFi, represents one of the most significant innovations in the financial sector since the advent of digital banking. By leveraging blockchain technology and smart contracts, DeFi is creating a new financial ecosystem that operates without traditional intermediaries like banks and financial institutions.</p>

<h2>What is DeFi?</h2>
<p>DeFi refers to financial applications built on blockchain networks, primarily Ethereum, that aim to recreate and improve upon traditional financial systems. Unlike conventional finance, DeFi applications are open, permissionless, and operate on a peer-to-peer basis.</p>

<h3>Key Components of DeFi</h3>
<ul>
<li><strong>Smart Contracts:</strong> Self-executing contracts with terms directly written into code</li>
<li><strong>Decentralized Exchanges (DEXs):</strong> Peer-to-peer trading platforms without central authorities</li>
<li><strong>Lending Protocols:</strong> Automated lending and borrowing systems</li>
<li><strong>Yield Farming:</strong> Earning rewards by providing liquidity to DeFi protocols</li>
</ul>

<h2>The Benefits of DeFi</h2>
<p>DeFi offers several advantages over traditional financial systems:</p>

<h3>1. Accessibility</h3>
<p>Anyone with an internet connection and a cryptocurrency wallet can access DeFi services, regardless of their location or financial status.</p>

<h3>2. Transparency</h3>
<p>All transactions and smart contract code are publicly visible on the blockchain, ensuring complete transparency.</p>

<h3>3. Interoperability</h3>
<p>DeFi protocols are designed to work together, creating a composable financial ecosystem.</p>

<h2>Popular DeFi Applications</h2>
<p>Some of the most successful DeFi platforms include:</p>

<ul>
<li><strong>Uniswap:</strong> A decentralized exchange for trading cryptocurrencies</li>
<li><strong>Compound:</strong> A lending protocol that allows users to earn interest on deposits</li>
<li><strong>Aave:</strong> A decentralized lending and borrowing platform</li>
<li><strong>MakerDAO:</strong> A protocol for creating and managing the DAI stablecoin</li>
</ul>

<h2>Risks and Challenges</h2>
<p>While DeFi offers exciting opportunities, it also comes with risks:</p>

<ul>
<li><strong>Smart Contract Risk:</strong> Bugs in smart contract code can lead to loss of funds</li>
<li><strong>Liquidity Risk:</strong> Sudden withdrawal of liquidity can affect protocol stability</li>
<li><strong>Regulatory Risk:</strong> Evolving regulations may impact DeFi operations</li>
<li><strong>Technical Risk:</strong> Blockchain network congestion and high gas fees</li>
</ul>

<h2>The Future of DeFi</h2>
<p>As DeFi continues to evolve, we can expect to see improvements in user experience, scalability, and security. The integration of traditional finance with DeFi protocols, known as "DeFi 2.0," promises to bring even more innovation to the space.</p>

<p>DeFi represents a paradigm shift in how we think about financial services. By removing intermediaries and leveraging blockchain technology, it's creating a more open, transparent, and accessible financial system for everyone.</p>`,
          author: "Sarah Chen",
          date: "2024-10-10",
          readTime: "8 min read",
          category: "DeFi",
          image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEZWZpJTIwY3J5cHRvY3VycmVuY3l8ZW58MXx8fHwxNzU3NzQ0NTUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
          tags: ["DeFi", "Blockchain", "Finance", "Ethereum"],
          views: 1247,
          likes: 89,
          comments: 23,
          shares: 45,
          featured: true,
          published: true
        }
      ]

      for (const post of defaultPosts) {
        await this.createPost(post)
      }

      console.log('Default posts initialized in Firestore')
    } catch (error) {
      console.error('Error initializing default posts:', error)
    }
  }
}

export const blogService = new BlogService()
