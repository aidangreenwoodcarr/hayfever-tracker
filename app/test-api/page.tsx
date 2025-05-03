import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft } from "lucide-react"
import GoogleMapsTest from "@/components/google-maps-test"
import GoogleMapsSetupGuide from "@/components/google-maps-setup-guide"

export default function TestApiPage() {
  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <Link href="/">
        <Button variant="ghost" className="mb-4 gap-1">
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </Link>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Google Maps API Test</CardTitle>
            <CardDescription>Verify your Google Maps API configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <GoogleMapsTest />

            <div className="pt-4">
              <h3 className="text-lg font-medium mb-4">Setup Guide</h3>
              <GoogleMapsSetupGuide />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
