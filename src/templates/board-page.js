import React from "react"
import { graphql, Link } from "gatsby"
import { Header, Label, List, Grid, Breadcrumb } from "semantic-ui-react"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  let board = data.airtable.data

  return (
    <Layout>
      <SEO title={`${board.Name}`} />
      <Grid stackable columns='equal'>
        <Grid.Row style={{ marginLeft: `1em`, display: 'flex', flexDirection: 'column' }}>
        <Breadcrumb>
          <Breadcrumb.Section>
            <Link to='/' style={{ color: `#418cff` }}>Home</Link>
          </Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section active>Board</Breadcrumb.Section>
        </Breadcrumb>
          <Header as='h1'>{board.Name} ({board.Acronymn})</Header>
          <Header.Subheader>
            {board.Govt_Level.map((g, i) => 
              <Label horizontal key={i} color={g === 'City' ? `orange` : `yellow`} style={{ marginRight: `6px` }}>
                {g.toUpperCase()}
              </Label>
            )}
          </Header.Subheader>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2'>What it does</Header>
            <p>{board.Description}</p>
            <Header as='h2'>When it meets</Header>
            <p>{board.Meeting_Time}</p>
            <Header as='h2'>Learn more</Header>
            <a href={board.Website} target="_blank" rel="noopener noreferrer">{board.Website}</a>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2' style={{ borderBottom: `5px solid #418cff`}}>{board.Number_of_Members} members</Header>
            <List relaxed divided>
              {board.Positions.map(m => (
                m.data.Person.map(n => (
                  <List.Item>
                    <List.Header>
                      <Link to={`/person/${n.data.Slug}`}>
                        {n.data.Name}
                      </Link>
                    </List.Header>
                    <List.Description>
                      {n.data.Positions[0].data.Office}, joined {n.data.Positions[0].data.Term_Begin_Date}
                    </List.Description>
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
        Acronymn
        Govt_Level
        Description
        Meeting_Time
        Website
        Number_of_Members
        Positions {
          data {
            Person {
              data {
                Name
                Slug
                Positions {
                  data {
                    Office
                    Term_Begin_Date
                    Term_Length
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`