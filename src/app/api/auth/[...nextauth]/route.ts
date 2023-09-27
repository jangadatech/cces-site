import { URL } from "@/http/config";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOption = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        const { username, password } = credentials!;

        const loginResponse = await fetch(`${URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        if (loginResponse.ok) {  
          const user = await loginResponse.json();
          const {_id, username, full_name, profile} = user;

          return { id: _id, name: full_name, username: username, profile: profile };
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signin'
  }
}

const handler = NextAuth(authOption)

export { handler as GET, handler as POST };