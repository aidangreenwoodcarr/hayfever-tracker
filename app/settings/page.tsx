import { ReactElement } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronLeft, ExternalLink } from "lucide-react";
import GoogleMapsSetupGuide from "@/components/google-maps-setup-guide";

export default function SettingsPage(): ReactElement {
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
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              Manage your preferences and location
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="pt-4">
                <h3 className="text-lg font-medium mb-4">
                  Google Maps API Setup
                </h3>
                <GoogleMapsSetupGuide />
                <div className="mt-4">
                  <Link href="/test-api">
                    <Button variant="outline" className="w-full gap-2">
                      Test Google Maps API <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
