require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: `Debbie Chen`,
    description: `Debbie Chen - Bassoonist, Music Educator, Animal Lover`,
    author: `Alex Taxiera`,
    image: `src/images/favicon.png`
  },
  plugins: [
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`
      }
    },
    `gatsby-transformer-javascript-frontmatter`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: 'gatsby-source-s3',
      options: {
        aws: {
          accessKeyId: process.env.AWS_ACCESS_KEY,
          secretAccessKey: process.env.AWS_SECRET
        },
        buckets: ['debbie-site']
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Debbie Chen - Bassoonist`,
        short_name: `Debbie Chen`,
        start_url: `/`,
        background_color: `#E6CAA3`,
        theme_color: `#5F2B1B`,
        display: `standalone`,
        icon: `src/images/favicon.png`
      }
    },
    'gatsby-plugin-offline',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /icons/
        }
      }
    }
  ]
}
