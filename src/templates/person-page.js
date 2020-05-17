import React from "react"
import { graphql, Link } from "gatsby"
import { Header, Grid, Card, Breadcrumb } from "semantic-ui-react"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  let person = data.person.edges[0].node.data
  console.log(person)

  let schools = []
  schools.push(person.High_School, person.College, person.College2, person.College3)

  return (
    <Layout>
      <SEO title={`${person.Name}`} />
      <Grid stackable columns='equal'>
        <Grid.Row style={{ marginLeft: `1em`, display: 'flex', flexDirection: 'column' }}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <Link to='/' style={{ color: `#418cff` }}>Home</Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Person</Breadcrumb.Section>
          </Breadcrumb>
          <Header as='h1'>{person.Name}</Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2'>Who they are</Header>
            <Header as='h4'>Age</Header>
            <p>{person.Age} years old</p>
            <Header as='h4'>Party affiliation</Header>
            <p>{!person.Party_Affiliation ? 'Unknown' : person.Party_Affiliation}</p>
            <Header as='h4'>Residence</Header>
            <p>{!person.Residence ? 'Unknown' : person.Residence}</p>
            <Header as='h4'>Day job</Header>
            <p>{!person.Day_Job ? 'Unknown' : `${person.Day_Job}, ${person.Employer}`}</p>
            <Header as='h4'>Education</Header>
            <p>{_.compact(schools).join(', ')}</p>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2'>Boards they serve on</Header>
            {person.Positions.map(p => (
              <Card
                fluid
                href={`/board/${p.data.Board[0].data.Slug}`}
                header={p.data.Board[0].data.Name}
                description={`${p.data.Office}, ${p.data.Term_Length}-year term: first served ${p.data.Term_Begin_Date}, current term ends ${p.data.Term_End_Date}`}
                style={{ borderLeft: `5px solid #418cff` }}
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
            Age
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
                Term_Length
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