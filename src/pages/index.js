import React from "react"
import { graphql, Link } from "gatsby"
import { Grid, Header, List, Label, Item, Form, Checkbox } from "semantic-ui-react"
import _ from "lodash"
import { getDecade } from 'date-fns'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Callout from "../components/callout"
import AgeBarChart from "../components/age-bar-chart"
import GenderPieChart from "../components/gender-pie-chart"
import RaceTreemapChart from "../components/race-treemap-chart"

import be_thumbnail from "../images/board_explorer_home.png"

const IndexPage = ({ data }) => {
  let boards = data.boards.edges.map(e => e.node.data)
  boards.forEach(b => b.Type = "Board")
  
  // List of all boards
  let orderedBoards = _.orderBy(boards, [boards => boards.Done, boards => boards.Name], ['asc', 'asc'])
  let readyBoards = _.filter(orderedBoards, function(o) { 
    return o.Done
    // return o.Done || o.Next; 
  });

  // Callouts
  let callouts = data.callouts.edges.map(e => e.node.data)
  let orderedCallouts = _.orderBy(callouts, callouts => callouts.Order, 'asc')

  // Chart statistics
  console.log(data.chartStats);

  let byRace = _.countBy(data.chartStats.edges, 'node.data.Race');
  let bySex = _.countBy(data.chartStats.edges, 'node.data.Gender');

  let dataWithDecades = data.chartStats.edges.map(e => {
      let d = e.node.data;
      return ({ ...d, 'Decade': getDecade(new Date(d.Birthdate))})
  });
  let byDecade = _.countBy(dataWithDecades, 'Decade');

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
      <Grid.Row>
        <Grid.Column>
          <Header as='h2' style={{ borderBottom: `5px solid #418cff`, width: `100%` }}>Who makes up the boards?</Header>
          {/* <Form 
            style={{ background: `#d3e3ff`, padding: `.8em`, margin: 0, display: 'flex', flexDirection: 'row', justifyContent: `flex-start`, alignItems: 'center' }}>
            <Form.Field>View board memberships by board type: </Form.Field>
            <Form.Field style={{ marginLeft: `1em` }}>
              <Checkbox
                label='City'
                name='checkboxRadioGroup'
                value='city'
                checked={true}
              />
            </Form.Field>
            <Form.Field style={{ marginLeft: `1em` }}>
              <Checkbox
                label='County' 
                name='checkboxRadioGroup'
                value='county'
                checked={true}
              />
            </Form.Field>
            <Form.Field style={{ marginLeft: `1em` }}>
              <Checkbox
                label='Joint' 
                name='checkboxRadioGroup'
                value='joint'
                checked={true}
              />
            </Form.Field>
          </Form> */}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <AgeBarChart data={byDecade} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <RaceTreemapChart data={byRace} />
        </Grid.Column>
        <Grid.Column>
          <GenderPieChart data={bySex} />
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
    chartStats: allAirtable(filter: {table: {eq: "People"}, data: {Number_of_Active_Positions: {gt: 0}}}) {
      totalCount
      edges {
        node {
          data {
            Race
            Gender
            Birthdate (formatString: "YYYY")
            Number_of_Active_Positions
          }
        }
      }
    }
  }`;

export default IndexPage
