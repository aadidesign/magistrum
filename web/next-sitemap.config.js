/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://magistrum-pitch.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/design-system", "/thank-you", "/api/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/design-system", "/thank-you", "/api"] },
    ],
  },
};
