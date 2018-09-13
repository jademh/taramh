
require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: 'Tara Masterson Hally',
    description: 'Tara Masterson Hally\'s Portfolio Website',
  },
  plugins: [
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.SPACE_ID,
        accessToken: process.env.ACCESS_TOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-gtag',
      options: {
        // your google analytics tracking id
        trackingId: process.env.GA_TAG,
        // enable ip anonymization
        anonymize: true,
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-eslint',
    'gatsby-plugin-glamor',
  ],
};
