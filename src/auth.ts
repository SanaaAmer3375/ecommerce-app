import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import Credentials from "next-auth/providers/credentials";
import { findUserByEmail, createUser, verifyUser } from "./lib/users";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Facebook({
      clientId: process.env.AUTH_FACEBOOK_ID,
      clientSecret: process.env.AUTH_FACEBOOK_SECRET,
    }),
    Credentials({
      id: "credentials",
      credentials: {
        email: {},
        password: {},
        name: {},
        isRegister: {},
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        const name = credentials?.name as string;
        const isRegister = credentials?.isRegister === "true";

        if (isRegister) {
          const exists = await findUserByEmail(email);
          if (exists) throw new Error("EMAIL_EXISTS");
          const newUser = await createUser(name, email, password);
          return { id: newUser.id, name: newUser.name, email: newUser.email };
        } else {
          const user = await verifyUser(email, password);
          if (!user) throw new Error("INVALID_CREDENTIALS");
          return { id: user.id, name: user.name, email: user.email };
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});