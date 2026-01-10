/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://wizeidea.com',
  generateRobotsTxt: true,
  // Exclude any admin routes if you add them later
  exclude: ['/admin/*'],
  // Changefreq & priority can be tuned per page later
  changefreq: 'monthly',
  priority: 0.7,
};