import React from "react"
import { graphql, Link } from "gatsby"
import { Header, Label, List, Grid } from "semantic-ui-react"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  let board = data.airtable.data

  return (
    <Layout>
      <SEO title={`${board.Name}`} />
      <Grid stackable columns='equal'>
        <Grid.Row style={{ marginLeft: `1em`, display: 'flex', flexDirection: 'column' }}>
          <span style={{ color: `#418cff` }}>BOARD</span>
          <Header as='h1' style={{ marginTop: `.2em` }}>{board.Name}</Header>
          <div>
            <Label>{board.Govt_Level}</Label>
            <Label>{board.Tags}</Label>
          </div>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2'>What it does</Header>
            <p>{board.Description}</p>
            <Header as='h2'>When it meets</Header>
            <p>{board.Meeting_Time}</p>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2'>{board.Number_of_Members} members</Header>
            <List relaxed divided>
              {board.Members_in_Master.map(m => (
                m.data.Name_Copy.map(n => (
                  <List.Item>
                    <List.Header>
                      <Link to={`/person/${n.data.Slug}`}>
                        {n.data.Name}
                      </Link>
                    </List.Header>
                  </List.Item>
                ))
              ))}
            </List>
          </Grid.Column>
          <Grid.Column>
            <div style={{ height: `190px`, background: `#eee`, marginBottom: `1em`, padding: `1em` }}>
              <Header as='h4'>CALLOUT</Header>
            </div>
            <div style={{ height: `190px`, background: `#eee`, marginBottom: `1em`, padding: `1em` }}>
              <Header as='h4'>CALLOUT</Header>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
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