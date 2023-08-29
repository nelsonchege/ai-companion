export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/companion/:path*"],
};
