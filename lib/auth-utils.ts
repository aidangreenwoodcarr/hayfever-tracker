import { auth as nextAuth } from "@/lib/auth";

export type { Session } from "next-auth";

// For server components and server actions
export const auth = nextAuth;

// For server actions (alias for consistency)
export const getAuthSession = auth; 
