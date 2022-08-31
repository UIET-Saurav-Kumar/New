module.exports = {
    siteUrl: 'https://buylowcal.com',
    generateRobotsTxt: true, // (optional)
    robotsTxtOptions: {
      policies: [
        {
          userAgent: '*',
          // allow: '/',
          disallow: ['*/logout', '*/checkout*', '*/404', '*/profile','*/login','*/register', '*/otp-login', '*/invite'],
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
      '*/login*',
      '*/register*',
      '*/invite',
      '*/otp-login',

    ],
  };
  