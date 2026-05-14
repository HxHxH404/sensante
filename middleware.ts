import { withAuth } from "next-auth/middleware"

export default withAuth({
  pages: {
    signIn: "/login",
  },
})

export const config = {
  matcher: [
    "/patients/:path*",
    "/consultations/:path*",
    "/dashboard/:path*",
    "/profil/:path*",
  ],
}
