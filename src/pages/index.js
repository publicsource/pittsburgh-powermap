import React from "react"
import { graphql, Link } from "gatsby"
import { Grid, Header, List, Label, Card, Image } from "semantic-ui-react"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"

import lbf from "../images/callouts/lbf.jpg"
import fontana from "../images/callouts/fontana.jpg"
import powell from "../images/callouts/powell.jpg"

const IndexPage = ({ data }) => {
  let boards = data.boards.edges.map(e => e.node.data)
  boards.forEach(b => b.Type = "Board")
  
  let orderedBoards = _.orderBy(boards, [boards => boards.Done, boards => boards.Name], ['asc', 'asc'])
  let readyBoards = _.filter(orderedBoards, function(o) { return o.Done || o.Next; });
  
  let people = data.people.edges.map(e => e.node.data)
  people.forEach(p => p.Type = "Person")

  let callouts = data.callouts.edges.map(e => e.node.data)
  let orderedCallouts = _.orderBy(callouts, callouts => callouts.Order, 'asc')

  return (
    <Layout>
      <SEO title="Home" />
      <Grid stackable columns='equal'>
        <Grid.Row style={{ marginTop: `1em` }}>
          <Header as='h2' style={{ borderBottom: `5px solid #418cff`, margin: `0 1.0875rem`, width: `100%`, }}>
            First stop: 16 authorities that influence our economy and {people.length} people who serve on them
          </Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <List divided relaxed size='large' style={{ height: `605px`, overflowY: `scroll` }}>
              {readyBoards.map((b, i) => (
                <List.Item key={i}>
                  {b.Done ? 
                    <Link to={`/board/${b.Slug}`}>{b.Name}</Link> 
                    : <span style={{ color: `rgba(0,0,0,0.4)` }}>{b.Name}</span>
                  }
                  {b.Done ? 
                    b.Govt_Level.map((g, i) => 
                      <Label horizontal key={i} color={g === 'City' ? `orange` : `yellow`} style={{ marginLeft: `6px` }}>
                        {g.toUpperCase()}
                      </Label>
                    ) : <Label style={{ marginLeft: `6px` }}>
                      {`COMING SOON`}
                    </Label>
                  }
                </List.Item>
              ))}
            </List>
          </Grid.Column>
          <Grid.Column>
            {orderedCallouts.map((c, i) => (
              <Card fluid key={i} style={{ borderLeft: `5px solid #418cff`, display: `flex`, flexDirection: `row`, alignItems: `center`, alignContent: `center` }}>
                <Card.Content>
                  <Card.Header as='h3' style={{ margin: 0 }}>
                    <Link to={`/person/${c.Person[0].data.Slug}`}>
                      {c.Person[0].data.Name}
                    </Link>
                  </Card.Header>
                  <Card.Meta>
                    {c.Boards.map((b, i) => (
                      <span key={i}>
                        {i > 0 ? `& ` : ``}
                        <Link to={`/board/${b.data.Slug}`}>
                          {b.data.Name}
                        </Link>
                      </span>
                    ))}
                  </Card.Meta>
                  <Card.Description>{c.Description}</Card.Description>
                </Card.Content>
                <Image 
                  src={c.Image_Name === `lbf` ? lbf : c.Image_Name === `fontana` ? fontana : powell} 
                  wrapped 
                  size='small'
                  bordered
                />
              </Card>
            ))}
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ height: `820px` }}>
          <Grid.Column>
            <iframe
              src="/infogram_diversity.html"
              title="Board Explorer chart: Race and gender"
              style={{ width: `100%`, height: `100%`, scrolling: `no`, overflow: `hidden`, border: `None` }}
            />
          </Grid.Column>
          <Grid.Column>
            <iframe
              src="/infogram_age.html"
              title="Board Explorer chart: Generations"
              style={{ width: `100%`, height: `100%`, scrolling: `no`, overflow: `hidden`, border: `None` }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Header as='h2' style={{ borderBottom: `5px solid #418cff`, width: `100%` }}>About this project</Header>
          <p>The Pittsburgh region is run in large part by more than 500 unelected board members of authorities, commissions and other governmental agencies.</p>
          <p>Board members usually don’t get headlines. Those go to the mayor, the county executive or, occasionally, council members, controllers and directors. But boards often decide what does and doesn’t get built, who gets contracts and grants, what rates and fees we pay for everything from bus rides to water, and more.</p>
          <p>Now, as the region copes with the effects of the coronavirus pandemic, the operations of those boards are likely to affect our lives and futures more than ever. Already, boards are switching gears from managing growth to addressing an economic emergency. It’s time we got to know them better.</p>
          <p>PublicSource’s new Board Explorer sheds light on the boards and their roles, providing information about each member and inviting analysis of this important part of the region’s power structure.</p>
          <p>We’ll start with 16 boards involved — directly or indirectly — in the region’s economy. From Alcosan, which is rebuilding the sewer system, to the Zoning Board of Adjustment, which approves or denies construction proposals, these boards affect jobs, the built environment, housing, transportation, utilities, cultural assets and more.</p>
          <p>Over the coming months, PublicSource will add more boards, further analysis and deeper looks at key members. Explore with us.</p>
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
            Acronymn
            Slug
            Done
            Next
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
            Image_Name
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
