import React from "react"
import { graphql, Link } from "gatsby"
import { Header, List, Grid, Card, Label, Image } from "semantic-ui-react"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  let person = data.person.edges[0].node.data
  let positions = data.master.edges

  return (
    <Layout>
      <SEO title={`${person.Name}`} />
      <Grid stackable columns='equal'>
        <Grid.Row style={{ marginLeft: `1em`, marginRight: `1em`, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: `#418cff` }}>PERSON</span>
            <Header as='h1' style={{ marginTop: `.2em` }}>
              {person.Name}
            </Header>
          </div>
          <div style={{ marginLeft: `1em` }}>
            <Image circular size='tiny' src={person.Image_Link} />
          </div>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2'>Who they are</Header>
            <Header as='h4'>Day Job</Header>
            <p>{!person.Day_Job ? 'Unknown' : `${person.Day_Job} at ${person.Employer}`}</p>
            <Header as='h4'>Race</Header>
            <p>{!person.Race ? 'Unknown' : person.Race}</p>
            <Header as='h4'>Gender</Header>
            <p>{!person.Gender ? 'Unknown' : person.Gender}</p>
            <Header as='h4'>Party Affiliation</Header>
            <p>{!person.Party_Affiliation ? 'Unknown' : person.Party_Affiliation}</p>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2'>Boards they serve on</Header>
            <List relaxed>
              {positions.map(p => (
                <List.Item>
                  <Card fluid>
                    <Card.Content>
                      <Card.Header>
                        <Link to={`/board/${p.node.data.Board[0].data.Slug}`}>
                          {p.node.data.Board[0].data.Name}
                        </Link>
                      </Card.Header>
                      <Card.Meta>
                        Since {p.node.data.Term_Begin_Date}
                      </Card.Meta>
                      <Card.Description>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span>
                            <strong>Term number:</strong> {p.node.data.Term_Number}
                          </span>
                          <span>
                            <strong>Term end:</strong> {p.node.data.Term_End_Date}
                          </span>
                          <span>
                            <strong>Reapplication limits:</strong> {p.node.data.Reapp_Limits}
                          </span>
                        </div>
                      </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                      <Label>Govt_Level</Label>
                      <Label>Tag</Label>
                    </Card.Content>
                  </Card>
                </List.Item>
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
            Employer
            Image_Link
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