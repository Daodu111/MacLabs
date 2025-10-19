import { blogService } from '../services/blogService'

/**
 * Migration utility to help users migrate from localStorage to Firestore
 */
export class MigrationService {
  
  /**
   * Check if migration is needed
   */
  static needsMigration(): boolean {
    const existingPosts = localStorage.getItem('maclabs-blog-posts')
    return !!existingPosts
  }

  /**
   * Get migration status
   */
  static getMigrationStatus(): {
    hasLocalData: boolean
    hasFirestoreData: boolean
    needsMigration: boolean
  } {
    const hasLocalData = !!localStorage.getItem('maclabs-blog-posts')
    
    // This would need to be checked asynchronously in practice
    return {
      hasLocalData,
      hasFirestoreData: false, // Would need async check
      needsMigration: hasLocalData
    }
  }

  /**
   * Perform migration from localStorage to Firestore
   */
  static async migrateToFirestore(): Promise<{
    success: boolean
    migratedCount: number
    errors: string[]
  }> {
    const errors: string[] = []
    let migratedCount = 0

    try {
      console.log('Starting migration from localStorage to Firestore...')
      
      // Check if there's data to migrate
      const existingPosts = localStorage.getItem('maclabs-blog-posts')
      if (!existingPosts) {
        return {
          success: true,
          migratedCount: 0,
          errors: ['No localStorage data found to migrate']
        }
      }

      const posts = JSON.parse(existingPosts)
      console.log(`Found ${posts.length} posts to migrate`)

      // Migrate each post
      for (const post of posts) {
        try {
          const migratedPost = await blogService.createPost({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            author: post.author,
            authorImage: post.authorImage,
            date: post.date,
            readTime: post.readTime,
            category: post.category,
            image: post.image,
            tags: post.tags || [],
            views: post.views || 0,
            likes: post.likes || 0,
            comments: post.comments || 0,
            shares: post.shares || 0,
            featured: post.featured || false,
            published: post.published !== false // Default to true
          })

          if (migratedPost) {
            migratedCount++
            console.log(`Migrated post: ${post.title}`)
          }
        } catch (error) {
          const errorMsg = `Failed to migrate post "${post.title}": ${error}`
          errors.push(errorMsg)
          console.error(errorMsg)
        }
      }

      // Mark migration as completed
      localStorage.setItem('maclabs-blog-migration-completed', 'true')
      
      console.log(`Migration completed. Migrated ${migratedCount} posts.`)
      
      return {
        success: errors.length === 0,
        migratedCount,
        errors
      }

    } catch (error) {
      const errorMsg = `Migration failed: ${error}`
      errors.push(errorMsg)
      console.error(errorMsg)
      
      return {
        success: false,
        migratedCount,
        errors
      }
    }
  }

  /**
   * Clear localStorage data after successful migration
   */
  static clearLocalStorage(): void {
    localStorage.removeItem('maclabs-blog-posts')
    localStorage.removeItem('maclabs-blog-migration-completed')
    console.log('LocalStorage data cleared')
  }

  /**
   * Check if migration has been completed
   */
  static isMigrationCompleted(): boolean {
    return localStorage.getItem('maclabs-blog-migration-completed') === 'true'
  }

  /**
   * Initialize default posts if no data exists
   */
  static async initializeDefaultPosts(): Promise<void> {
    try {
      await blogService.initializeDefaultPosts()
      console.log('Default posts initialized')
    } catch (error) {
      console.error('Failed to initialize default posts:', error)
    }
  }

  /**
   * Full initialization process
   */
  static async initializeBlog(): Promise<{
    success: boolean
    action: 'migrated' | 'initialized' | 'skipped'
    message: string
  }> {
    try {
      // Check if migration is needed
      if (this.needsMigration() && !this.isMigrationCompleted()) {
        const result = await this.migrateToFirestore()
        if (result.success) {
          return {
            success: true,
            action: 'migrated',
            message: `Successfully migrated ${result.migratedCount} posts from localStorage to Firestore`
          }
        } else {
          return {
            success: false,
            action: 'migrated',
            message: `Migration failed: ${result.errors.join(', ')}`
          }
        }
      }

      // Check if we need to initialize default posts
      const existingPosts = await blogService.getAllPosts()
      if (existingPosts.length === 0) {
        await this.initializeDefaultPosts()
        return {
          success: true,
          action: 'initialized',
          message: 'Initialized blog with default posts'
        }
      }

      return {
        success: true,
        action: 'skipped',
        message: 'Blog is already initialized'
      }

    } catch (error) {
      console.error('Blog initialization failed:', error)
      return {
        success: false,
        action: 'skipped',
        message: `Initialization failed: ${error}`
      }
    }
  }
}

export default MigrationService
