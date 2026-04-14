import { cookies } from "next/headers";

const SESSION_COOKIE = "eg-admin-session";

export interface AdminSession {
  userId: string;
  username: string;
  isAdmin: boolean;
}

export async function getSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(SESSION_COOKIE);
  if (!sessionCookie) return null;

  try {
    const decoded = Buffer.from(sessionCookie.value, "base64").toString("utf-8");
    const session = JSON.parse(decoded) as AdminSession;
    return session.isAdmin ? session : null;
  } catch {
    return null;
  }
}

export function createSessionToken(session: AdminSession): string {
  const json = JSON.stringify(session);
  return Buffer.from(json).toString("base64");
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;
export const SESSION_MAX_AGE = 60 * 60 * 24; // 24시간
