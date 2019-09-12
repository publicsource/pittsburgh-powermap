/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

// Initialize Semantic UI theme
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '../../theme.config$': path.join(__dirname, 'src/semantic/theme.config'),
      },
    },
  });
};

// Make a page for every Board in Airtable
exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
  {
    allAirtable(filter: {table: {eq: "Boards"}}) {
      totalCount
      edges {
        node {
          id
          data {
            Name
            Slug
          }
        }
      }
    }
  }
  `)

  let boards = result.data.allAirtable.edges.map(e => e.node.data)

  boards.forEach(b => {
    createPage({
      path: `/board/${b.Slug}`,
      component: path.resolve("./src/templates/board-page.js"),
      context: {
        name: b.Name
      },
    })
  })
}

// TODO: Make a page for every Person in Airtable