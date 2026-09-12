import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    isAdmin: boolean;
    login: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    login?: string;
    isAdmin?: boolean;
  }
}
