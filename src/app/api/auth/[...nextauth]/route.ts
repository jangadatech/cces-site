import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions} from 'next-auth';

const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {

        const { username, password } = credentials!;

        const usuarioFicticio = { id: "1", name: "Usuário Fictício", email: "ficticio@example.com", username: "teste", password: "123" };
        
        if (username === usuarioFicticio.username && password === usuarioFicticio.password) {
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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };