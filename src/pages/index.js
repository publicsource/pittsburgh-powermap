import React from "react"
import { graphql, Link } from "gatsby"
import { Grid, Container, Header, Placeholder, List, Label } from "semantic-ui-react"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {

  let boards = data.boards.edges.map(e => e.node.data)
  boards.forEach(b => b.Type = "Board")
  let orderedBoards = _.orderBy(boards, [boards => boards.Name], ['asc'])

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
            <Header as='h2'>{_.filter(orderedBoards, { Govt_Level: 'City' }).length} City Boards</Header>
            <List divided relaxed size='large' style={{ height: '600px', overflowY: 'scroll' }}>
              {_.filter(orderedBoards, { Govt_Level: 'City' }).map(b => (
                <List.Item as='a'>
                  <Link to={`/board/${b.Slug}`}>
                    {b.Name}
                  </Link>
                  <Label horizontal size='small' style={{ marginLeft: `5px` }}>
                    {b.Tags}
                  </Label>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2'>{_.filter(orderedBoards, { Govt_Level: 'County' }).length} County Boards</Header>
            <List divided relaxed size='large' style={{ height: '600px', overflowY: 'scroll' }}>
              {_.filter(orderedBoards, { Govt_Level: 'County' }).map(b => (
                <List.Item as='a'>
                  <Link to={`/board/${b.Slug}`}>
                    {b.Name}
                  </Link>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2'>{data.people.totalCount} People who serve on them</Header>
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
              <Header as='h2'>About the data</Header>
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
    boards: allAirtable(filter: {table: {eq: "Boards"}}) {
      totalCount
      edges {
        node {
          data {
            Name
            Slug
            Govt_Level
            Number_of_Members
            Tags
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
            Number_Board_Positions
          }
        }
      }
    }
  }`;

export default IndexPage
