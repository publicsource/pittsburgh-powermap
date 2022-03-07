require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  pathPrefix: "/pittsburgh-powermap",
  siteMetadata: {
    title: `Board Explorer`,
    description: `Navigate the networks that call the shots in the Pittsburgh region. A new tool by PublicSource.`,
    author: `PublicSource`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-less`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#418cff`,
        theme_color: `#418cff`,
        display: `minimal-ui`,
        icon: `src/images/ps_logo_square.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-airtable`,
      options: {
        apiKey: process.env.AIRTABLE_API_KEY,
        tables: [
          {
            baseId: `appqQXm5Zh9nWy2hq`,
            tableName: `Positions`,
            tableLinks: [`Person`, `Board`]
          },
          {
            baseId: `appqQXm5Zh9nWy2hq`,
            tableName: `Boards`,
            tableLinks: [`Positions`, `Stories`]
          },
          {
            baseId: `appqQXm5Zh9nWy2hq`,
            tableName: `People`,
            tableLinks: [`Positions`]
          },
          {
            baseId: `appqQXm5Zh9nWy2hq`,
            tableName: `Callouts`,
            tableLinks: [`Person`, `Boards`]
          },
          {
            baseId: `appqQXm5Zh9nWy2hq`,
            tableName: `Stories`,
            tableLinks: [`People`, `Boards`]
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        google: {
          families: ['Roboto']
        }
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-24107680-1`
      }
    },
    {
      resolve: `gatsby-plugin-parsely-analytics`,
      options: {
        apikey: `publicsource.org`,
        enableInDevelopment: false // send page views when NODE_ENV !== prod
      }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
