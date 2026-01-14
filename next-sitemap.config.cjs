module.exports = {
  siteUrl: 'https://wizeidea.com',
  generateRobotsTxt: true,
  // Example: exclude any admin routes you might add later
  exclude: ['/admin/*'],
  changefreq: 'monthly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: ['/admin/*'],
      },
    ],
    additionalSitemaps: [
      'https://wizeidea.com/sitemap.xml',
    ],
    // Block Cloudflare Workers subdomain from indexing
    transformRobotsTxt: async (_, robotsTxt) => {
      return `# Block Cloudflare infrastructure URL
User-agent: *
Disallow: http://wize-idea.workers.dev/
Disallow: https://wize-idea.workers.dev/

${robotsTxt}`;
    },
  },
};