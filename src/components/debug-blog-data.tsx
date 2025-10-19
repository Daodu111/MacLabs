import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Alert, AlertDescription } from './ui/alert'
import { RefreshCw, Database, Eye } from 'lucide-react'
import { blogService } from '../services/blogService'

export function DebugBlogData() {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const runDebug = async () => {
    setIsLoading(true)
    try {
      console.log('🔍 Starting blog data debug...')
      
      // Check localStorage data
      const localData = localStorage.getItem('maclabs-blog-posts')
      const hasLocalData = !!localData
      const localPosts = localData ? JSON.parse(localData) : []
      
      // Check Firestore data
      const allPosts = await blogService.getAllPosts()
      const publishedPosts = await blogService.getPublishedPosts()
      const featuredPosts = await blogService.getFeaturedPosts()
      const categories = await blogService.getCategories()
      
      const debug = {
        localStorage: {
          hasData: hasLocalData,
          postCount: localPosts.length,
          posts: localPosts.map((p: any) => ({ id: p.id, title: p.title, published: p.published }))
        },
        firestore: {
          allPosts: allPosts.length,
          publishedPosts: publishedPosts.length,
          featuredPosts: featuredPosts.length,
          categories: categories.length,
          posts: allPosts.map((p: any) => ({ id: p.id, title: p.title, published: p.published }))
        }
      }
      
      console.log('📊 Debug Results:', debug)
      setDebugInfo(debug)
      
    } catch (error) {
      console.error('❌ Debug failed:', error)
      setDebugInfo({ error: error.message })
    } finally {
      setIsLoading(false)
    }
  }

  const migrateData = async () => {
    try {
      console.log('🔄 Starting data migration...')
      await blogService.migrateFromLocalStorage()
      console.log('✅ Migration completed!')
      runDebug() // Refresh debug info
    } catch (error) {
      console.error('❌ Migration failed:', error)
    }
  }

  const initializeDefaultPosts = async () => {
    try {
      console.log('🔄 Initializing default posts...')
      await blogService.initializeDefaultPosts()
      console.log('✅ Default posts initialized!')
      runDebug() // Refresh debug info
    } catch (error) {
      console.error('❌ Initialization failed:', error)
    }
  }

  useEffect(() => {
    runDebug()
  }, [])

  return (
    <div className="max-w-6xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Blog Data Debug
          </CardTitle>
          <CardDescription>
            Debug your blog data to see what's stored in localStorage vs Firestore
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex gap-4">
            <Button onClick={runDebug} disabled={isLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Debug
            </Button>
            <Button onClick={migrateData} variant="outline">
              Migrate from localStorage
            </Button>
            <Button onClick={initializeDefaultPosts} variant="outline">
              Initialize Default Posts
            </Button>
          </div>

          {debugInfo && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* localStorage Data */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">localStorage Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Has Data:</strong> {debugInfo.localStorage?.hasData ? 'Yes' : 'No'}</p>
                    <p><strong>Post Count:</strong> {debugInfo.localStorage?.postCount || 0}</p>
                    {debugInfo.localStorage?.posts && debugInfo.localStorage.posts.length > 0 && (
                      <div>
                        <p><strong>Posts:</strong></p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {debugInfo.localStorage.posts.map((post: any, index: number) => (
                            <li key={index}>
                              {post.title} {post.published ? '(Published)' : '(Draft)'}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Firestore Data */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Firestore Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>All Posts:</strong> {debugInfo.firestore?.allPosts || 0}</p>
                    <p><strong>Published Posts:</strong> {debugInfo.firestore?.publishedPosts || 0}</p>
                    <p><strong>Featured Posts:</strong> {debugInfo.firestore?.featuredPosts || 0}</p>
                    <p><strong>Categories:</strong> {debugInfo.firestore?.categories || 0}</p>
                    {debugInfo.firestore?.posts && debugInfo.firestore.posts.length > 0 && (
                      <div>
                        <p><strong>Posts:</strong></p>
                        <ul className="list-disc list-inside text-sm space-y-1">
                          {debugInfo.firestore.posts.map((post: any, index: number) => (
                            <li key={index}>
                              {post.title} {post.published ? '(Published)' : '(Draft)'}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {debugInfo?.error && (
            <Alert>
              <AlertDescription>
                <strong>Error:</strong> {debugInfo.error}
              </AlertDescription>
            </Alert>
          )}

          {/* Recommendations */}
          {debugInfo && !debugInfo.error && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                {debugInfo.localStorage?.hasData && debugInfo.firestore?.allPosts === 0 && (
                  <Alert>
                    <AlertDescription>
                      <strong>Action Needed:</strong> You have data in localStorage but none in Firestore. 
                      Click "Migrate from localStorage" to move your data to Firestore.
                    </AlertDescription>
                  </Alert>
                )}
                
                {!debugInfo.localStorage?.hasData && debugInfo.firestore?.allPosts === 0 && (
                  <Alert>
                    <AlertDescription>
                      <strong>Action Needed:</strong> No data found in localStorage or Firestore. 
                      Click "Initialize Default Posts" to create sample content.
                    </AlertDescription>
                  </Alert>
                )}
                
                {debugInfo.firestore?.allPosts > 0 && debugInfo.firestore?.publishedPosts === 0 && (
                  <Alert>
                    <AlertDescription>
                      <strong>Issue Found:</strong> You have {debugInfo.firestore.allPosts} posts in Firestore, 
                      but none are marked as published. Check your admin dashboard to publish some posts.
                    </AlertDescription>
                  </Alert>
                )}
                
                {debugInfo.firestore?.publishedPosts > 0 && (
                  <Alert>
                    <AlertDescription>
                      <strong>✅ Good:</strong> You have {debugInfo.firestore.publishedPosts} published posts in Firestore. 
                      Your blog should be working correctly.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
