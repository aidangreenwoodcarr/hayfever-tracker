"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { clearAllEntries } from "@/lib/actions"
import { useRouter } from "next/navigation"
import { CheckCircle, AlertTriangle, ChevronLeft } from "lucide-react"

export default function AdminPage() {
  const router = useRouter()
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  const [result, setResult] = useState<{
    success?: boolean
    count?: number
    error?: string
  } | null>(null)

  async function handleClearDatabase() {
    setIsClearing(true)
    setResult(null)

    try {
      const result = await clearAllEntries()
      setResult(result)
      
      // Refresh the page data if successful
      if (result.success) {
        router.refresh()
      }
    } catch (error) {
      setResult({ success: false, error: "Failed to clear database" })
    } finally {
      setIsClearing(false)
      setConfirmOpen(false)
    }
  }

  return (
    <div className="container mx-auto py-6 max-w-2xl">
      <Button variant="ghost" className="mb-4 gap-1" onClick={() => router.push('/')}>
        <ChevronLeft className="h-4 w-4" />
        Back to Home
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>Manage your hayfever tracker data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-4">Database Management</h2>
            
            {!confirmOpen ? (
              <Button 
                variant="destructive" 
                onClick={() => setConfirmOpen(true)}
                className="w-full sm:w-auto"
              >
                Clear All Entries
              </Button>
            ) : (
              <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-lg border border-red-200 dark:border-red-800 space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-red-700 dark:text-red-400">Warning: This action cannot be undone</h3>
                    <p className="text-sm text-red-600 dark:text-red-300">
                      You are about to delete all entries from the database. This action cannot be reversed.
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <Button 
                    variant="outline" 
                    onClick={() => setConfirmOpen(false)}
                    size="sm"
                  >
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={handleClearDatabase}
                    size="sm"
                    disabled={isClearing}
                  >
                    {isClearing ? "Clearing..." : "Yes, Clear All Data"}
                  </Button>
                </div>
              </div>
            )}

            {result && (
              <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 ${
                result.success 
                  ? "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-300" 
                  : "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-300"
              }`}>
                {result.success ? (
                  <>
                    <CheckCircle className="h-5 w-5" />
                    <span>Successfully cleared {result.count} entries from the database</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-5 w-5" />
                    <span>{result.error || "An error occurred"}</span>
                  </>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 
