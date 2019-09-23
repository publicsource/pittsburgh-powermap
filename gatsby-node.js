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

// Dynamically create pages from Airtable data
exports.createPages = async ({ graphql, actions: { createPage } }) => {
  const result = await graphql(`
  {
    boards: allAirtable(filter: {table: {eq: "Boards"}}) {
      totalCount
      edges {
        node {
          data {
            Name
            Slug
          }
        }
      }
    }
    people: allAirtable(filter: {table: {eq: "People"}}) {
      totalCount
      edges {
        node {
          data {
            Name
            Slug
          }
        }
      }
    }
  }
  `)

  // Make a page for every board
  let boards = result.data.boards.edges.map(e => e.node.data)
  boards.forEach(b => {
    createPage({
      path: `/board/${b.Slug}`,
      component: path.resolve("./src/templates/board-page.js"),
      context: {
        name: b.Name
      },
    })
  })

  // Make a page for every person
  let people = result.data.people.edges.map(e => e.node.data)
  people.forEach(p => {
    createPage({
      path: `/person/${p.Slug}`,
      component: path.resolve("./src/templates/person-page.js"),
      context: {
        name: p.Name,
        contains: `/${p.Name}/`
      },
    })
  })
}