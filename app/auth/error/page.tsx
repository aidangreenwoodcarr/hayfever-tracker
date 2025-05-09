"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent(): React.ReactNode {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  
  let errorMessage = "An error occurred during authentication";
  
  if (error === "AccessDenied") {
    errorMessage = "You don't have permission to access this resource";
  } else if (error === "Verification") {
    errorMessage = "The verification link has expired or has already been used";
  } else if (error === "Configuration") {
    errorMessage = "There is a problem with the server configuration";
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Authentication Error</CardTitle>
          <CardDescription>
            {errorMessage}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Please try signing in again or contact support if the problem persists.
          </p>
        </CardContent>
        <CardFooter>
          <Button asChild className="w-full">
            <Link href="/auth/signin">Back to Sign In</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function AuthErrorPage(): React.ReactNode {
  return (
    <Suspense fallback={
      <div className="flex h-screen items-center justify-center">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
} 
