import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function GoogleMapsSetupGuide(): React.ReactElement {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Google Maps Platform Setup Required</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-2">
          To use the pollen data feature, you need to set up your Google Maps
          Platform project correctly:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-sm">
          <li>
            Go to the{" "}
            <Link
              href="https://console.cloud.google.com/google/maps-apis/api-list"
              className="text-primary underline"
            >
              Google Cloud Console
            </Link>
          </li>
          <li>Select your project or create a new one</li>
          <li>
            <strong>Enable these APIs</strong>:
            <ul className="list-disc pl-5 mt-1">
              <li>Maps JavaScript API</li>
              <li>Geocoding API</li>
              <li>Places API</li>
              <li>Pollen API</li>
            </ul>
          </li>
          <li>
            <strong>Set up billing</strong>: Make sure billing is enabled for
            your Google Cloud Project (required for these APIs)
          </li>
          <li>
            <strong>Create an API key</strong>: In the &quot;Credentials&quot;
            section, create an API key with appropriate restrictions
          </li>
          <li>
            <strong>Add the API key</strong>: Set the GOOGLE_MAPS_API_KEY
            environment variable in your Vercel project
          </li>
        </ol>
        <p className="mt-3 text-xs">
          <strong>Note</strong>: The Pollen API might be in preview or limited
          availability. If you&apos;re unable to access it, the app will fall
          back to sample data.
        </p>
      </AlertDescription>
    </Alert>
  );
}
