module.exports = {
  siteUrl: 'https://www.spicedirectwholesale.co.uk',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { 
        userAgent: '*', 
        allow: '/',
        disallow: ['/admin', '/dashboard'] 
      }
    ],
    additionalSitemaps: [
      'https://www.spicedirectwholesale.co.uk/server-sitemap.xml',
    ],
  },
  exclude: [
    '/server-sitemap.xml', 
    '/admin/*',
    '/api/*'
  ],
  transform: async (config, path) => {
    let priority = 0.8;
    if (path === '/') priority = 1.0;
    if (path.includes('/product')) priority = 0.9;
    
    return {
      loc: path,
      changefreq: 'daily',
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
  sitemapSize: 7000,
  generateIndexSitemap: true
};