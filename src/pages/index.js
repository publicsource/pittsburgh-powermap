import React from "react"
import { graphql, Link } from "gatsby"
import { Grid, Header, List, Label, Item } from "semantic-ui-react"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Callout from "../components/callout"

import be_thumbnail from "../images/board_explorer_home.png"

const IndexPage = ({ data }) => {
  let boards = data.boards.edges.map(e => e.node.data)
  boards.forEach(b => b.Type = "Board")
  
  let orderedBoards = _.orderBy(boards, [boards => boards.Done, boards => boards.Name], ['asc', 'asc'])
  let readyBoards = _.filter(orderedBoards, function(o) { 
    return o.Done
    // return o.Done || o.Next; 
  });

  let callouts = data.callouts.edges.map(e => e.node.data)
  let orderedCallouts = _.orderBy(callouts, callouts => callouts.Order, 'asc')

  return (
    <Layout>
      <SEO title="Home" thumbnail={be_thumbnail} />
      <Grid.Row style={{ marginTop: `1em` }}>
        <Grid.Column>
          <Header as='h2' style={{ borderBottom: `5px solid #418cff`, width: `100%` }}>
            In the spotlight: {readyBoards.length} panels that make decisions for Pittsburgh, Allegheny County
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <List divided relaxed size='large' style={{ height: `500px`, overflowY: `scroll` }}>
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
          <Item.Group>
            {orderedCallouts.map((c, i) => (
              <Callout d={c} index={i} />
            ))}
            <Item key='read-more' style={{ background: `#d3e3ff`, padding: `.8em` }}>
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3' style={{ fontSize: `1em` }}>
                  <a 
                    href="https://www.publicsource.org/who-polices-the-police-in-pittsburgh-and-allegheny-county-a-critical-crossroads-for-civilian-review/"
                    target="_blank" 
                    rel="noopener noreferrer">
                    READ MORE: The board charged with reviewing accusations against police
                  </a>
                </Item.Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as='h2' style={{ borderBottom: `5px solid #418cff`, width: `100%` }}>About this project</Header>
            <p>The Pittsburgh region is run in large part by around 500 unelected members of boards, commissions and other public agencies.</p>
            <p>Board members usually don’t get headlines. Those go to the mayor, the county executive, council members, controllers and directors. But boards often push for new policies, award contracts and grants, address demands for inclusion and equity, and more.</p>
            <p>The board structure is more diverse than it was 15 years ago, but gaps remain. It’s time for deeper exploration.</p>
            <p>PublicSource’s new Board Explorer sheds light on these panels and their roles, providing information about each member and inviting analysis of this important part of the region’s power structure.</p>
            <p>We have included 56 county, city and joint boards and commissions. As more panels form and membership changes, we'll periodically update.</p>
            <p>Explore with us, and, if you have a story idea or something you think we should investigate, please <Link to="/contact" style={{ borderBottom: `2px solid #418cff` }}>let us know</Link>.</p>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ minHeight: `700px` }}>
        <Grid.Column>
          <iframe
            src="/new_age.html"
            title="Board Explorer chart: Generations"
            style={{ width: `100%`, height: `100%`, scrolling: `no`, overflow: `hidden`, border: `None` }}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ minHeight: `1700px` }}>
        <Grid.Column>
          <iframe
            src="/new_race.html"
            title="Board Explorer chart: Race"
            style={{ width: `100%`, height: `100%`, scrolling: `no`, overflow: `hidden`, border: `None` }}
          />
        </Grid.Column>
        <Grid.Column>
          <iframe
            src="/new_gender.html"
            title="Board Explorer chart: Gender"
            style={{ width: `100%`, height: `100%`, scrolling: `no`, overflow: `hidden`, border: `None` }}
          />
        </Grid.Column>
      </Grid.Row>
      {/* <Responsive as={Grid.Row} {...Responsive.onlyMobile} style={{ minHeight: `1850px` }}>
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
      </Responsive> */}
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
