import type { DefaultSession, DefaultUser } from 'next-auth';
import type { JWT as DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: 'citizen' | 'employee' | 'admin';
      email: string;
      name: string;
      image?: string | null;
    };
  }

  interface User extends DefaultUser {
    role: 'citizen' | 'employee' | 'admin';
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: 'citizen' | 'employee' | 'admin';
  }
}