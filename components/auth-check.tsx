"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, LogIn } from "lucide-react";

export function AuthCheck({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);

  // If the user is not authenticated, redirect to login after a short delay
  useEffect(() => {
    if (status === "unauthenticated") {
      const timer = setTimeout(() => {
        setIsRedirecting(true);
        // Use the current pathname for the callback URL
        const callbackUrl = encodeURIComponent(
          window.location.origin + pathname
        );
        router.push(`/auth/signin?callbackUrl=${callbackUrl}`);
      }, 3000);

      return (): void => clearTimeout(timer);
    }
  }, [status, router, pathname]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-amber-700">
            Authentication Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mb-4">
            <p className="text-amber-800">
              You need to be signed in to access this page.
              {isRedirecting
                ? " Redirecting to sign in..."
                : " You will be redirected in a few seconds."}
            </p>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={() => {
              setIsRedirecting(true);
              const callbackUrl = encodeURIComponent(
                window.location.origin + pathname
              );
              router.push(`/auth/signin?callbackUrl=${callbackUrl}`);
            }}
            disabled={isRedirecting}
            className="gap-2"
          >
            {isRedirecting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Redirecting...
              </>
            ) : (
              <>
                <LogIn className="h-4 w-4" />
                Sign in now
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // User is authenticated, render the children
  return <>{children}</>;
}
