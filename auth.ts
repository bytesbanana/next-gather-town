import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "./db/db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.type === "credentials") return true;
      if (!account || !user) return false;

      const userInfo = {
        name: user.name!,
        email: user.email!,
        image: user.image!,
        username: user.name!.toLowerCase().replace(" ", "_"),
      };

      try {
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, userInfo.email));

        if (user.length === 0) {
          console.log(`[nextauth][callbacks][signin] new user`, userInfo);
          await db.insert(users).values(userInfo);
        }
      } catch (error) {
        console.error(`[nextauth][callbacks][signin]`, error);
        return false;
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id! as string;
      return session;
    },
  },
});
