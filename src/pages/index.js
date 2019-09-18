import React from "react"
import { graphql, Link } from "gatsby"
import { Grid, Container, Header, Placeholder, List } from "semantic-ui-react"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"
import SearchAllNodes from "../components/search"

const IndexPage = ({ data }) => {

  let boards = data.boards.edges.map(e => e.node.data)
  boards.forEach(b => b.Type = "Board")
  let orderedBoards = _.orderBy(boards, [boards => boards.Name], ['asc'])

  let people = data.people.edges.map(e => e.node.data)
  people.forEach(p => p.Type = "Person")

  let allNodes = [...boards, ...people]

  return (
    <Layout>
      <SEO title="Home" />
      <Grid stackable columns='equal'>
        <Grid.Row centered style={{ background: `#0d1c33` }}>
          <section style={{ display: `flex`, flexDirection: `column` }}>
            <Header as='h1' inverted size='huge'>POWERMAPPING PITTSBURGH</Header>
            <p style={{ color: `white`, fontSize: `1em` }}>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
            <SearchAllNodes source={allNodes} />
          </section>
        </Grid.Row>
        <Grid.Row centered style={{ background: `white` }}>
          <section style={{ display: `flex`, flexDirection: `column` }}>
            <p>Powermapping Pittsburgh does this descriptive thing that we'll put right here.</p>
          </section>
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
            <div style={{ height: `190px`, background: `#ddd`, marginBottom: `1em` }}>
              Notable person highlight #1
            </div>
            <div style={{ height: `190px`, background: `#ddd`, marginBottom: `1em` }}>
              Notable person highlight #2
            </div>
            <div style={{ height: `190px`, background: `#ddd` }}>
              Notable person highlight #3
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
