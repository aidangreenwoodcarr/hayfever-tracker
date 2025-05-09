import { auth as nextAuth, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from "@/lib/auth";

export type { Session } from "next-auth";

// For server components and server actions
export const auth = nextAuth;

// For server actions (alias for consistency)
export const getAuthSession = auth;

// Export sign in and sign out functions
export const signIn = nextAuthSignIn;
export const signOut = nextAuthSignOut; 
