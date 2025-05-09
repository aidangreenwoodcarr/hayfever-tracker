"use client";

import { useSession, signOut } from "next-auth/react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { UserCircle2, LogOut, LogIn } from "lucide-react";
import { useState } from "react";

export function AuthInfo() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Sign out error:", error);
      setIsLoggingOut(false);
    }
  };

  if (status === "loading") {
    return (
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 rounded-full bg-muted animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
              <div className="h-3 w-24 bg-muted animate-pulse rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (status === "unauthenticated") {
    return (
      <Card className="bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <UserCircle2 className="h-5 w-5 text-red-500" />
              <CardTitle className="text-sm font-medium text-red-700">Not signed in</CardTitle>
            </div>
            <Button 
              size="sm" 
              variant="outline" 
              className="bg-white hover:bg-red-50 text-red-600 border-red-200"
              onClick={() => router.push('/auth/signin')}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Sign in
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-green-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {session?.user?.image ? (
              <img 
                src={session.user.image} 
                alt={session.user.name || "User"} 
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <UserCircle2 className="h-5 w-5 text-green-500" />
            )}
            <div>
              <CardTitle className="text-sm font-medium text-green-700">
                Signed in as {session?.user?.name || "User"}
              </CardTitle>
              {session?.user?.email && (
                <p className="text-xs text-green-600 mt-0.5">{session.user.email}</p>
              )}
            </div>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            className="bg-white hover:bg-green-50 text-green-600 border-green-200"
            onClick={handleSignOut}
            disabled={isLoggingOut}
          >
            <LogOut className="h-4 w-4 mr-2" />
            {isLoggingOut ? "Signing out..." : "Sign out"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
} 
