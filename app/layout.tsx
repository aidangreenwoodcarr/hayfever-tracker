import type { Metadata } from "next";
import "@/app/globals.css";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, BarChart2, CalendarDays, Settings, Shield } from "lucide-react";
import type { ReactElement } from "react";
import { Providers } from "./providers";
import { AuthStatus } from "@/components/auth-status";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hayfever Tracker",
  description: "Track pollen levels and manage your hayfever symptoms",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): ReactElement {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen">
            <div className="hidden md:flex flex-col w-16 border-r bg-background">
              <div className="flex flex-col items-center gap-4 py-4">
                <Link
                  href="/"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground"
                >
                  <BarChart2 className="h-6 w-6" />
                </Link>
                <nav className="flex flex-col items-center gap-4 mt-8">
                  <Link href="/">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                    >
                      <Home className="h-5 w-5" />
                      <span className="sr-only">Dashboard</span>
                    </Button>
                  </Link>
                  <Link href="/add-entry">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                    >
                      <CalendarDays className="h-5 w-5" />
                      <span className="sr-only">Add Entry</span>
                    </Button>
                  </Link>
                  <Link href="/history">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                    >
                      <BarChart2 className="h-5 w-5" />
                      <span className="sr-only">History</span>
                    </Button>
                  </Link>
                  <Link href="/settings">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                    >
                      <Settings className="h-5 w-5" />
                      <span className="sr-only">Settings</span>
                    </Button>
                  </Link>
                  <Link href="/admin">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-10 w-10 rounded-full"
                    >
                      <Shield className="h-5 w-5" />
                      <span className="sr-only">Admin</span>
                    </Button>
                  </Link>
                </nav>
              </div>
            </div>
            <div className="flex-1 flex flex-col min-h-screen">
              <header className="border-b bg-background py-3 px-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl font-semibold">Hayfever Tracker</h1>
                  <AuthStatus />
                </div>
              </header>
              <main className="flex-1 container py-6 md:px-6">{children}</main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
