import React from "react"
import { graphql, Link } from "gatsby"
import { Grid, Container, Header, List, Label, Card } from "semantic-ui-react"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {

  let boards = data.boards.edges.map(e => e.node.data)
  boards.forEach(b => b.Type = "Board")
  let orderedBoards = _.orderBy(boards, [boards => boards.Done, boards => boards.Name], ['asc', 'asc'])
  
  let people = data.people.edges.map(e => e.node.data)
  people.forEach(p => p.Type = "Person")

  let callouts = data.callouts.edges.map(e => e.node.data)
  let orderedCallouts = _.orderBy(callouts, callouts => callouts.Order, 'asc')
  console.log(orderedCallouts)

  return (
    <Layout>
      <SEO title="Home" />
      <Grid stackable columns='equal'>
        <Grid.Row centered>
          <Grid.Column>
            <Header 
              as='h2'
              style={{ borderBottom: `5px solid #418cff` }}>
              First stop: 16 authorities that influence our economy
            </Header>
            <List divided relaxed size='large'>
              {orderedBoards.map(b => (
                <List.Item>
                  {b.Done ? 
                    <Link to={`/board/${b.Slug}`}>{b.Name}</Link> 
                    : `${b.Name}`
                  }
                  <Label horizontal size='small' style={{ marginLeft: `5px` }}>
                    {b.Govt_Level}
                  </Label>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2'>{data.people.totalCount} people serve on these boards; here's a preview of who you should know</Header>
            {orderedCallouts.map(c => (
              <Card
                fluid
                size='small'
                href={`/person/${c.Person[0].data.Slug}`}
                header={c.Person[0].data.Name}
                meta={c.Boards.map((b, i) => (
                  <span>
                    {i > 0 ? `and ` : ``}
                    <Link key={i} to={`/board/${b.data.Slug}`}>{b.data.Name}</Link>
                  </span>
                ))}
                description={c.Description}
              />
            ))}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row centered style={{ background: `white` }}>
          <Grid.Column>
            <Container fluid >
              <Header as='h2'>About this project</Header>
              <p>The Pittsburgh region is run in large part by more than 500 unelected board members of authorities, commissions and other governmental agencies.</p>
              <p>Board members usually don’t get headlines. Those go to the mayor, the county executive or, occasionally, council members, controllers and directors. But boards often decide what does and doesn’t get built, who gets contracts and grants, what rates and fees we pay for everything from bus rides to water, and more.</p>
              <p>Now, as the region copes with the effects of the coronavirus pandemic, the operations of those boards are likely to affect our lives and futures more than ever. Already, boards are switching gears from managing growth to addressing an economic emergency. It’s time we got to know them better.</p>
              <p>PublicSource’s new Board Explorer sheds light on the boards and their roles, providing information about each member and inviting analysis of this important part of the region’s power structure.</p>
              <p>We’ll start with 16 boards involved — directly or indirectly — in the region’s economy. From Alcosan, which is rebuilding the sewer system, to the Zoning Board of Adjustment, which approves or denies construction proposals, these boards affect jobs, the built environment, housing, transportation, utilities, cultural assets and more.</p>
              <p>Over the coming months, PublicSource will add more boards, further analysis and deeper looks at key members. Explore with us.</p>
            </Container>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query AllNodesQuery {
    boards: allAirtable(filter: {table: {eq: "Boards"}, data: {Done: {eq: true}}}) {
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
    people: allAirtable(filter: {table: {eq: "People"}}) {
      totalCount
      edges {
        node {
          data {
            Name
            Slug
            Number_of_Positions
          }
        }
      }
    }
    callouts: allAirtable(filter: {table: {eq: "Callouts"}, data: {Done: {eq: true}}}) {
      totalCount
      edges {
        node {
          data {
            Description
            Done
            Order
            Boards {
              data {
                Name
                Slug
              }
            }
            Person {
              data {
                Name
                Slug
              }
            }
          }
        }
      }
    }
  }`;

export default IndexPage
