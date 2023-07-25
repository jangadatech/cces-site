import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

const authOption = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "credentials",
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