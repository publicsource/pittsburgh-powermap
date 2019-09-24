import React from "react"
import { graphql, Link } from "gatsby"
import { Header, Label, List, Grid } from "semantic-ui-react"

import Layout from "../components/layout"

export default ({ data }) => {
  let board = data.airtable.data

  return (
    <Layout>
      <Header as='h1'>{board.Name}</Header>
      <Label>{board.Govt_Level}</Label>
      <Label>{board.Tags}</Label>
      <Header as='h2'>What it does</Header>
      <p>{board.Description}</p>
      <Header as='h2'>When it meets</Header>
      <p>{board.Meeting_Time}</p>
      <Header as='h2'>{board.Number_of_Members} members</Header>
      <List>
        {board.Members_in_Master.map(m => (
          m.data.Name_Copy.map(n => (
            <Link to={`/person/${n.data.Slug}`}>
              <List.Item>{n.data.Name}</List.Item>
            </Link>
          ))
        ))}
      </List>
    </Layout>
  )
}

export const query = graphql`
  query($name: String!) {
    airtable(data: {Name: {eq: $name}}) {
      id
      data {
        Name
        Govt_Level
        Description
        Meeting_Time
        Tags
        Number_of_Members
        Members_in_Master {
          data {
            Name_Copy {
              data {
                Slug
                Name
              }
            }
          }
        }
      }
    }
  }
`