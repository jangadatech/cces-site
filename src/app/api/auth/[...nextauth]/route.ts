import { signOut } from 'next-auth/react';
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOption = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        const { username, password } = credentials!;

        const usuarioFicticio = { id: "1", name: "Usuário Fictício", email: "ficticio@example.com", username: "teste", password: "123" };
        
        if (username === usuarioFicticio.username && password === usuarioFicticio.password) {
          // Retorna o usuário fictício somente se as credenciais coincidirem
          return usuarioFicticio;
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