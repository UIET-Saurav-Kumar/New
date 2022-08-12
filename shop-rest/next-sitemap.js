module.exports = {
    siteUrl: 'https://buylowcal.com',
    generateRobotsTxt: true, // (optional)
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          // allow: '/',
          disallow: ['*/logout', '*/checkout*', '*/404', '*/profile'],
        },
      ],
    },
    exclude: [
      '*/404',
      '*/Change Password',
      '*/downloads',
      '*/logout',
      '*/user',
      '*/refunds',
      '*/profile',
      '*/checkout*',
      '*/orders*',
    ],
  };
  