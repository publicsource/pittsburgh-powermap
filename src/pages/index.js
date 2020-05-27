import React from "react"
import { graphql, Link } from "gatsby"
import { Grid, Header, List, Label, Item } from "semantic-ui-react"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Callout from "../components/callout"

import thumb from "../images/board_explorer_home.png"

const IndexPage = ({ data }) => {
  let boards = data.boards.edges.map(e => e.node.data)
  boards.forEach(b => b.Type = "Board")
  
  let orderedBoards = _.orderBy(boards, [boards => boards.Done, boards => boards.Name], ['asc', 'asc'])
  let readyBoards = _.filter(orderedBoards, function(o) { return o.Done || o.Next; });

  let callouts = data.callouts.edges.map(e => e.node.data)
  let orderedCallouts = _.orderBy(callouts, callouts => callouts.Order, 'asc')

  return (
    <Layout>
      <SEO title="Home" thumbnail={thumb} />
      <Grid.Row style={{ marginTop: `1em` }}>
        <Grid.Column>
          <Header as='h2' style={{ borderBottom: `5px solid #418cff`, width: `100%` }}>
            First stop: 16 authorities that influence our economy and the people who serve on them
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <List divided relaxed size='large' style={{ height: `625px`, overflowY: `scroll` }}>
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
                    href="https://www.publicsource.org/99-people-who-will-help-shape-the-pittsburgh-regions-recovery-allegheny"
                    target="_blank" 
                    rel="noopener noreferrer">
                    READ MORE: 99 people who will help shape the Pittsburgh region’s recovery
                  </a>
                </Item.Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={{ minHeight: `825px` }}>
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
        <Grid.Column>
          <Header as='h2' style={{ borderBottom: `5px solid #418cff`, width: `100%` }}>About this project</Header>
          <p>The Pittsburgh region is run in large part by more than 500 unelected board members of authorities, commissions and other governmental agencies.</p>
          <p>Board members usually don’t get headlines. Those go to the mayor, the county executive or, occasionally, council members, controllers and directors. But boards often decide what does and doesn’t get built, who gets contracts and grants, what rates and fees we pay for everything from bus rides to water, and more.</p>
          <p>Now, as the region copes with the effects of the coronavirus pandemic, the operations of those boards are likely to affect our lives and futures more than ever. Already, boards are switching gears from managing growth to addressing an economic emergency. It’s time we got to know them better.</p>
          <p>PublicSource’s new Board Explorer sheds light on the boards and their roles, providing information about each member and inviting analysis of this important part of the region’s power structure.</p>
          <p>We’ll start with 16 boards involved — directly or indirectly — in the region’s economy. From ALCOSAN, which is rebuilding the sewer system, to the Zoning Board of Adjustment, which approves or denies construction proposals, these boards affect jobs, the built environment, housing, transportation, utilities, cultural assets and more.</p>
          <p>Over the coming months, PublicSource will add more boards, further analysis and deeper looks at key members. Explore with us and, if you have a story idea or something you think we should investigate, please <Link to="/contact" style={{ borderBottom: `2px solid #418cff` }}>let us know</Link>.</p>
        </Grid.Column>
      </Grid.Row>
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
