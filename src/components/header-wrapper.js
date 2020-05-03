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
      boards: allAirtable(filter: {table: {eq: "BoardsNext"}}) {
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
      people: allAirtable(filter: {table: {eq: "PeopleNext"}}) {
        totalCount
        edges {
          node {
            data {
              Name
              Slug
              Number_of_Board_Positions
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
      <section style={{ display: `flex`, flexDirection: `column`, alignContent: 'center', alignItems: 'center', flexWrap: `wrap`, background: `#0d1c33`, padding: `1em`, marginBottom: `2em` }}>
        <h1 style={{ fontWeight: 900, color: `white` }}>POWERMAPPING PITTSBURGH</h1>
        <p style={{ color: `white`, fontSize: `1em` }}>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
        <div style={{ minWidth: `300px` }}>
          <SearchAllNodes source={allNodes} />
        </div>
      </section>
    </>
  )
}

export default HeaderWrapper