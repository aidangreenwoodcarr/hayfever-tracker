import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth-utils";

export default async function SignInPage(): Promise<React.ReactNode> {
  const session = await auth();
  
  // If already signed in, redirect to home page
  if (session) {
    redirect("/");
  }
  
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>
            Sign in to track your hayfever symptoms
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <form action="/api/auth/signin/google" method="POST">
              <Button className="w-full" type="submit">
                Sign in with Google
              </Button>
            </form>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          All your data is private and never shared
        </CardFooter>
      </Card>
    </div>
  );
} 
