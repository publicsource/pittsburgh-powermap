import React from "react"
import { graphql, Link } from "gatsby"
import { Header, List } from "semantic-ui-react"

import Layout from "../components/layout"

export default ({ data }) => {
  let person = data.person.edges[0].node.data
  let positions = data.master.edges

  return (
    <Layout>
      <Header as='h1'>{person.Name}</Header>
      <Header as='h2'>Who they are</Header>
      <Header as='h4'>Party Affiliation</Header>
      <p>{!person.Party_Affiliation ? 'Unknown' : person.Party_Affiliation}</p>
      <Header as='h4'>Day Job</Header>
      <p>{!person.Day_Job ? 'Unknown' : person.Day_Job}</p>
      <Header as='h4'>Race</Header>
      <p>{!person.Race ? 'Unknown' : person.Race}</p>
      <Header as='h4'>Gender</Header>
      <p>{!person.Gender ? 'Unknown' : person.Gender}</p>
      <Header as='h2'>Boards they serve on</Header>
      <List relaxed divided>
        {positions.map(p => (
          <List.Item>
            <List.Content>
              <List.Header>
                <Link to={`/board/${p.node.data.Board[0].data.Slug}`}>
                  {p.node.data.Board[0].data.Name}
                </Link>
              </List.Header>
              <List.Description>
                From {!p.node.data.Term_Begin_Date ? '$START' : p.node.data.Term_Begin_Date} to {!p.node.data.Term_End_Date ? '$END' : p.node.data.Term_End_Date} for {!p.node.data.Term_Length ? '$NUMBER' : p.node.data.Term_Length} terms
              </List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Layout>
  )
}

export const query = graphql`
  query GetPersonDetails (
    $name: String!, $contains: String!
  ) {
    person: allAirtable(filter: {table: {eq: "People"}, data: {Name: {eq: $name}}}) {
      totalCount
      edges {
        node {
          data {
            Name
            Slug
            Number_Board_Positions
            Race
            Gender
            Party_Affiliation
            Related_To
            Birth_Date
            Day_Job
          }
        }
      }
    }
    master: allAirtable(filter: {table: {eq: "Master"}, data: {Name: {regex: $contains}}}) {
      totalCount
      edges {
        node {
          id
          data {
            Name
            Term_Begin_Date
            Term_End_Date
            Term_Number
            Term_Length
            Reapp_Limits
            Board {
              data {
                Name
                Slug
              }
            }
          }
        }
      }
    }
  }
`