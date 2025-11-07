"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RefreshCw, Database, Users, FileText, Check, X, AlertCircle } from 'lucide-react'

interface TestResult {
  success: boolean
  message: string
  data?: any
  error?: string
  timestamp?: string
}

export default function DatabaseTestPage() {
  const [healthCheck, setHealthCheck] = useState<TestResult | null>(null)
  const [seedResult, setSeedResult] = useState<TestResult | null>(null)
  const [dataResult, setDataResult] = useState<TestResult | null>(null)
  const [loading, setLoading] = useState(false)

  const testHealth = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/health')
      const data = await response.json()
      setHealthCheck({
        success: response.ok,
        message: data.status === 'ok' ? 'Database connected successfully' : 'Database connection failed',
        data: data,
        timestamp: new Date().toISOString()
      })
    } catch (error: any) {
      setHealthCheck({
        success: false,
        message: 'Health check failed',
        error: error.message,
        timestamp: new Date().toISOString()
      })
    }
    setLoading(false)
  }

  const seedDatabase = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/seed', { method: 'POST' })
      const data = await response.json()
      setSeedResult({
        success: response.ok,
        message: data.message || 'Database seeding completed',
        data: data,
        timestamp: new Date().toISOString()
      })
    } catch (error: any) {
      setSeedResult({
        success: false,
        message: 'Database seeding failed',
        error: error.message,
        timestamp: new Date().toISOString()
      })
    }
    setLoading(false)
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/seed')
      const data = await response.json()
      setDataResult({
        success: response.ok,
        message: data.message || 'Data retrieved successfully',
        data: data,
        timestamp: new Date().toISOString()
      })
    } catch (error: any) {
      setDataResult({
        success: false,
        message: 'Data retrieval failed',
        error: error.message,
        timestamp: new Date().toISOString()
      })
    }
    setLoading(false)
  }

  const runAllTests = async () => {
    await testHealth()
    await seedDatabase()
    await fetchData()
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
            <Database className="w-8 h-8 text-accent" />
            CityGuardian Database Test Dashboard
          </h1>
          <p className="text-muted-foreground">
            Test MongoDB Atlas connection, seed sample data, and view database contents
          </p>
        </div>

        {/* Control Panel */}
        <Card className="p-6 mb-8 border-accent/30 bg-card/50 backdrop-blur">
          <h2 className="text-xl font-bold text-foreground mb-4">Test Controls</h2>
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={testHealth}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Test Connection
            </Button>
            <Button 
              onClick={seedDatabase}
              disabled={loading}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Database className="w-4 h-4" />
              Seed Database
            </Button>
            <Button 
              onClick={fetchData}
              disabled={loading}
              variant="outline"
              className="flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Fetch Data
            </Button>
            <Button 
              onClick={runAllTests}
              disabled={loading}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Check className="w-4 h-4" />
              Run All Tests
            </Button>
          </div>
        </Card>

        {/* Test Results */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Health Check */}
          <Card className="p-6 border-accent/30 bg-card/50 backdrop-blur">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Health Check
            </h3>
            {healthCheck ? (
              <div className="space-y-3">
                <Badge variant={healthCheck.success ? "default" : "destructive"} className="flex items-center gap-1 w-fit">
                  {healthCheck.success ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  {healthCheck.success ? 'Connected' : 'Failed'}
                </Badge>
                <p className="text-sm text-muted-foreground">{healthCheck.message}</p>
                {healthCheck.data && (
                  <div className="text-xs bg-muted/50 p-2 rounded">
                    <p>Database: {healthCheck.data.database?.name || 'N/A'}</p>
                    <p>Status: {healthCheck.data.database?.status || 'N/A'}</p>
                    <p>Provider: {healthCheck.data.database?.provider || 'N/A'}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Click "Test Connection" to check database health</p>
            )}
          </Card>

          {/* Seed Results */}
          <Card className="p-6 border-accent/30 bg-card/50 backdrop-blur">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Data Seeding
            </h3>
            {seedResult ? (
              <div className="space-y-3">
                <Badge variant={seedResult.success ? "default" : "destructive"} className="flex items-center gap-1 w-fit">
                  {seedResult.success ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  {seedResult.success ? 'Success' : 'Failed'}
                </Badge>
                <p className="text-sm text-muted-foreground">{seedResult.message}</p>
                {seedResult.data?.data && (
                  <div className="text-xs bg-muted/50 p-2 rounded">
                    <p>Users: {seedResult.data.data.totalUsers || 0}</p>
                    <p>Complaints: {seedResult.data.data.totalComplaints || 0}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Click "Seed Database" to create sample data</p>
            )}
          </Card>

          {/* Data Fetch */}
          <Card className="p-6 border-accent/30 bg-card/50 backdrop-blur">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Data Retrieval
            </h3>
            {dataResult ? (
              <div className="space-y-3">
                <Badge variant={dataResult.success ? "default" : "destructive"} className="flex items-center gap-1 w-fit">
                  {dataResult.success ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                  {dataResult.success ? 'Success' : 'Failed'}
                </Badge>
                <p className="text-sm text-muted-foreground">{dataResult.message}</p>
                {dataResult.data?.data && (
                  <div className="text-xs bg-muted/50 p-2 rounded">
                    <p>Users Found: {dataResult.data.data.totalUsers || 0}</p>
                    <p>Complaints Found: {dataResult.data.data.totalComplaints || 0}</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm">Click "Fetch Data" to retrieve database contents</p>
            )}
          </Card>
        </div>

        {/* Detailed Data Display */}
        {dataResult?.success && dataResult.data?.data && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Users Data */}
            <Card className="p-6 border-accent/30 bg-card/50 backdrop-blur">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Users ({dataResult.data.data.totalUsers})
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {dataResult.data.data.users?.map((user: any, index: number) => (
                  <div key={user.id} className="bg-muted/30 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{user.name}</h4>
                      <Badge variant="outline">{user.role}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <p className="text-sm text-muted-foreground">{user.mobile}</p>
                    <p className="text-xs text-muted-foreground">Created: {new Date(user.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Complaints Data */}
            <Card className="p-6 border-accent/30 bg-card/50 backdrop-blur">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Complaints ({dataResult.data.data.totalComplaints})
              </h3>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {dataResult.data.data.complaints?.map((complaint: any, index: number) => (
                  <div key={complaint.id} className="bg-muted/30 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground text-sm">{complaint.title}</h4>
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">{complaint.type}</Badge>
                        <Badge variant={
                          complaint.priority === 'critical' ? 'destructive' :
                          complaint.priority === 'high' ? 'default' : 'secondary'
                        } className="text-xs">
                          {complaint.priority}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{complaint.description?.substring(0, 100)}...</p>
                    <p className="text-xs text-muted-foreground">📍 {complaint.location?.address}</p>
                    <p className="text-xs text-muted-foreground">👤 {complaint.author?.name}</p>
                    <div className="flex items-center justify-between mt-2">
                      <Badge variant="outline" className="text-xs">{complaint.status}</Badge>
                      <span className="text-xs text-muted-foreground">
                        ❤️ {complaint.likes} 💬 {complaint.comments}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Instructions */}
        <Card className="p-6 mt-8 border-accent/30 bg-card/50 backdrop-blur">
          <h3 className="text-lg font-bold text-foreground mb-4">Instructions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Testing Steps:</h4>
              <ol className="list-decimal list-inside space-y-1">
                <li>First, test the database connection</li>
                <li>If connected, seed sample data</li>
                <li>Fetch and view the stored data</li>
                <li>Check the complaints in citizen portal</li>
              </ol>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">Troubleshooting:</h4>
              <ul className="list-disc list-inside space-y-1">
                <li>Check MongoDB Atlas IP whitelist</li>
                <li>Verify connection string in .env.local</li>
                <li>Ensure cluster is running in Atlas</li>
                <li>Check network connectivity</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}