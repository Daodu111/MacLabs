import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Alert, AlertDescription } from './ui/alert'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { testFirebaseConnection } from '../config/firebase'
import { blogService } from '../services/blogService'
import { authService } from '../services/authService'

export function FirebaseTest() {
  const [tests, setTests] = useState({
    connection: { status: 'pending', message: 'Testing Firebase connection...' },
    firestore: { status: 'pending', message: 'Testing Firestore access...' },
    auth: { status: 'pending', message: 'Testing Authentication...' },
    blogService: { status: 'pending', message: 'Testing Blog Service...' }
  })

  const [isRunning, setIsRunning] = useState(false)

  const runTests = async () => {
    setIsRunning(true)
    
    // Test 1: Firebase Connection
    setTests(prev => ({ ...prev, connection: { status: 'running', message: 'Testing Firebase connection...' } }))
    try {
      const connectionResult = await testFirebaseConnection()
      setTests(prev => ({ 
        ...prev, 
        connection: { 
          status: connectionResult ? 'success' : 'error', 
          message: connectionResult ? 'Firebase connection successful!' : 'Firebase connection failed' 
        } 
      }))
    } catch (error) {
      setTests(prev => ({ 
        ...prev, 
        connection: { status: 'error', message: `Connection error: ${error}` } 
      }))
    }

    // Test 2: Firestore Access
    setTests(prev => ({ ...prev, firestore: { status: 'running', message: 'Testing Firestore access...' } }))
    try {
      const posts = await blogService.getAllPosts()
      setTests(prev => ({ 
        ...prev, 
        firestore: { 
          status: 'success', 
          message: `Firestore access successful! Found ${posts.length} posts.` 
        } 
      }))
    } catch (error) {
      setTests(prev => ({ 
        ...prev, 
        firestore: { status: 'error', message: `Firestore error: ${error}` } 
      }))
    }

    // Test 3: Authentication
    setTests(prev => ({ ...prev, auth: { status: 'running', message: 'Testing Authentication...' } }))
    try {
      const user = authService.getCurrentUser()
      setTests(prev => ({ 
        ...prev, 
        auth: { 
          status: 'success', 
          message: user ? `Authentication working! User: ${user.email}` : 'Authentication ready (no user logged in)' 
        } 
      }))
    } catch (error) {
      setTests(prev => ({ 
        ...prev, 
        auth: { status: 'error', message: `Auth error: ${error}` } 
      }))
    }

    // Test 4: Blog Service
    setTests(prev => ({ ...prev, blogService: { status: 'running', message: 'Testing Blog Service...' } }))
    try {
      const categories = await blogService.getCategories()
      setTests(prev => ({ 
        ...prev, 
        blogService: { 
          status: 'success', 
          message: `Blog Service working! Found ${categories.length} categories.` 
        } 
      }))
    } catch (error) {
      setTests(prev => ({ 
        ...prev, 
        blogService: { status: 'error', message: `Blog Service error: ${error}` } 
      }))
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-600" />
      case 'running':
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
      default:
        return <div className="h-5 w-5 bg-gray-300 rounded-full" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600'
      case 'error':
        return 'text-red-600'
      case 'running':
        return 'text-blue-600'
      default:
        return 'text-gray-600'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Firebase Integration Test</CardTitle>
          <CardDescription>
            Test your Firebase credentials and services to ensure everything is working correctly.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={runTests} disabled={isRunning} className="w-full">
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Running Tests...
              </>
            ) : (
              'Run Firebase Tests'
            )}
          </Button>

          <div className="space-y-3">
            {Object.entries(tests).map(([key, test]) => (
              <div key={key} className="flex items-center space-x-3 p-3 border rounded-lg">
                {getStatusIcon(test.status)}
                <div className="flex-1">
                  <p className={`font-medium ${getStatusColor(test.status)}`}>
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </p>
                  <p className="text-sm text-gray-600">{test.message}</p>
                </div>
              </div>
            ))}
          </div>

          {Object.values(tests).every(test => test.status === 'success') && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                🎉 All tests passed! Your Firebase integration is working correctly.
              </AlertDescription>
            </Alert>
          )}

          {Object.values(tests).some(test => test.status === 'error') && (
            <Alert>
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                ❌ Some tests failed. Check the error messages above and verify your Firebase configuration.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
