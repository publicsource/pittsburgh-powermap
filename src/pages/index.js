import React from "react"
import { graphql, Link } from "gatsby"
import { Grid, Container, Header, Placeholder, List, Label } from "semantic-ui-react"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {

  let boards = data.boards.edges.map(e => e.node.data)
  boards.forEach(b => b.Type = "Board")
  let orderedBoards = _.orderBy(boards, [boards => boards.Done, boards => boards.Name], ['asc', 'asc'])

  let people = data.people.edges.map(e => e.node.data)
  people.forEach(p => p.Type = "Person")

  return (
    <Layout>
      <SEO title="Home" />
      <Grid stackable columns='equal'>
        <Grid.Row centered>
          <Header as='h3'>Powermapping Pittsburgh does this descriptive thing that we'll put right here.</Header>
        </Grid.Row>
        <Grid.Row centered>
          <Grid.Column>
            <Header as='h2'>{_.filter(orderedBoards, { Done: true }).length} public boards (+ more coming soon)</Header>
            <List divided relaxed size='large' style={{ height: '600px', overflowY: 'scroll' }}>
              {orderedBoards.map(b => (
                <List.Item>
                  {b.Done ? 
                    <Link to={`/board/${b.Slug}`}>{b.Name} ({b.Acronymn})</Link> 
                    : `${b.Name} (${b.Acronymn})`
                  }
                  <Label horizontal size='small' style={{ marginLeft: `5px` }}>
                    {b.Govt_Level}
                  </Label>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2' color='grey'>summary graphics tbd</Header>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2'>{data.people.totalCount} people who serve on them</Header>
            <div style={{ height: `190px`, background: `#eee`, marginBottom: `1em`, padding: `1em` }}>
              <Header as='h4'>NOTABLE PERSON CALLOUT</Header>
            </div>
            <div style={{ height: `190px`, background: `#eee`, marginBottom: `1em`, padding: `1em` }}>
              <Header as='h4'>NOTABLE PERSON CALLOUT</Header>
            </div>
            <div style={{ height: `190px`, background: `#eee`, padding: `1em` }}>
              <Header as='h4'>NOTABLE PERSON CALLOUT</Header>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered style={{ background: `white` }}>
          <Grid.Column>
            <Container fluid >
              <Header as='h2'>Why we mapped power in Pittsburgh</Header>
              <Placeholder fluid>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            </Container>
          </Grid.Column>
          <Grid.Column>
            <Container fluid>
              <Header as='h2'>About this project</Header>
              <Placeholder fluid>
                <Placeholder.Paragraph>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Paragraph>
              </Placeholder>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query AllNodesQuery {
    boards: allAirtable(filter: {table: {eq: "BoardsNext"}}) {
      totalCount
      edges {
        node {
          data {
            Name
            Acronymn
            Slug
            Done
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
  }`;

export default IndexPage
