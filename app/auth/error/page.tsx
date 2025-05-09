"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";

export default function AuthErrorPage() {
  const searchParams = useSearchParams();
  const errorType = searchParams.get("error") || "Default";
  
  // Map error codes to user-friendly messages
  const errorMessages: Record<string, string> = {
    Configuration: "There is a problem with the server configuration.",
    AccessDenied: "You do not have permission to sign in.",
    Verification: "The verification link may have been used or is invalid.",
    Default: "An unexpected authentication error occurred.",
    MissingCSRF: "The security token is missing. Please try again.",
    JWTSessionError: "Your session has expired. Please sign in again.",
    UnknownAction: "Invalid authentication action. Please try again using the button below.",
  };

  const errorMessage = errorMessages[errorType] || errorMessages.Default;

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Authentication Error</CardTitle>
          <CardDescription>
            There was a problem signing you in
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded mb-4">
            <p className="font-medium">Error: {errorType}</p>
            <p className="mt-2">{errorMessage}</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/auth/signin">
              Try Again
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 
