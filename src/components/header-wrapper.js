import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import Header from "./header"
import SearchAllNodes from "./search"

const HeaderWrapper = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      } 
      boards: allAirtable(filter: {table: {eq: "Boards"}}) {
        totalCount
        edges {
          node {
            data {
              Name
              Slug
              Govt_Level
              Number_of_Members
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
              Number_of_Positions
            }
          }
        }
      }
    }
  `)

  let boards = data.boards.edges.map(e => e.node.data)
  boards.forEach(b => b.Type = "Board")

  let people = data.people.edges.map(e => e.node.data)
  people.forEach(p => p.Type = "Person")

  let allNodes = [...boards, ...people]

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <section style={{ display: `flex`, flexDirection: `column`, alignContent: 'center', alignItems: 'center', flexWrap: `wrap`, background: `#0d1c33`, padding: `3em 1em`, marginBottom: `2em` }}>
        <h2 style={{ fontWeight: 900, color: `white` }}>Board Explorer: Understanding Pittsburgh's unelected power structure</h2>
        <div style={{ minWidth: `600px` }}>
          <SearchAllNodes source={allNodes} />
        </div>
      </section>
    </>
  )
}

export default HeaderWrapper