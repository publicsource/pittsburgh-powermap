import React from "react"
import { graphql, Link } from "gatsby"
import { Header, Grid, Card } from "semantic-ui-react"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  let person = data.person.edges[0].node.data
  console.log(person)

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
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2'>Who they are</Header>
            <Header as='h4'>Date of birth</Header>
            <p>{person.Birthdate}</p>
            <Header as='h4'>Day job</Header>
            <p>{!person.Day_Job ? 'Unknown' : `${person.Day_Job}, ${person.Employer}`}</p>
            <Header as='h4'>Party affiliation</Header>
            <p>{!person.Party_Affiliation ? 'Unknown' : person.Party_Affiliation}</p>
            <Header as='h4'>Education</Header>
            <p>{`${person.High_School}, ${person.College}, ${person.College2}, ${person.College3}`}</p>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2'>Boards they serve on</Header>
            {person.Positions.map(p => (
              <Card
                fluid
                href={`/board/${p.data.Board[0].data.Slug}`}
                header={p.data.Board[0].data.Name}
                meta={p.data.Office}
                description={`${p.data.Term_Number} terms: ${p.data.Term_Begin_Date} through ${p.data.Term_End_Date}`}
              />
            ))}
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
    $name: String!
  ) {
    person: allAirtable(filter: {table: {eq: "People"}, data: {Name: {eq: $name}}}) {
      totalCount
      edges {
        node {
          data {
            Name
            Slug
            Number_of_Positions
            Birthdate
            Residence
            Day_Job
            Employer
            Party_Affiliation
            High_School
            College
            College2
            College3
            Positions {
              data {
                Name
                Office
                Term_Begin_Date
                Term_End_Date
                Term_Number
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
    }
  }
`