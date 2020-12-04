import React, { useState } from "react"
import { graphql, Link } from "gatsby"
import { Grid, Header, List, Label, Item, Form, Radio } from "semantic-ui-react"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Callout from "../components/callout"
import ChartsWrapper from "../components/charts-wrapper"

import be_thumbnail from "../images/board_explorer_home.png"


const IndexPage = ({ data }) => {
  // List of all boards
  let boards = data.boards.edges.map(e => e.node.data)
  boards.forEach(b => b.Type = "Board")
  
  let orderedBoards = _.orderBy(boards, [boards => boards.Done, boards => boards.Name], ['asc', 'asc'])
  let readyBoards = _.filter(orderedBoards, function(o) { 
    return o.Done
    // return o.Done || o.Next; 
  });

  // Callouts
  let callouts = data.callouts.edges.map(e => e.node.data)
  let orderedCallouts = _.orderBy(callouts, callouts => callouts.Order, 'asc')

  // Chart controls
  let chartOptions = [
    { 
      value: "All",
      label: "All active board members",
    },
    {
      value: "City",
      label: "CITY"
    },
    {
      value: "County",
      label: "COUNTY"
    },
    {
      value: "Joint",
      label: "Joint CITY COUNTY"
    }
  ]
  const [chartFilter, setChartFilter] = useState('All');

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
        {/* LIST OF ALL BOARDS */}
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
        {/* CALLOUTS & READ MORE FEATURE*/}
        <Grid.Column>
          <Item.Group>
            {orderedCallouts.map((c, i) => (
              <Callout d={c} index={i} />
            ))}
            <Item key='read-more' style={{ background: `#d3e3ff`, padding: `.8em` }}>
              <Item.Content verticalAlign='middle'>
                <Item.Header as='h3' style={{ fontSize: `1em` }}>
                  <a 
                    href="https://www.publicsource.org/pittsburgh-allegheny-county-boards-commissions-diversity-board-explorer/"
                    target="_blank" 
                    rel="noopener noreferrer">
                    READ MORE: All on board? Powerful Pittsburgh-area panels are more diverse, but progress is uneven
                  </a>
                </Item.Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
      </Grid.Row>

      {/* ABOUT THIS PROJECT */}
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

      {/* CHARTS */}
      <Grid.Row>
        <Grid.Column>
          <Header as='h2' style={{ borderBottom: `5px solid #418cff`, width: `100%` }}>
            How diverse are the city and county boards and commissions?
          </Header>
          <Form style={{ background: `#d3e3ff`, padding: `1em` }}>
            <Header as='h4'>Filter the charts by jurisdiction:</Header>
            {chartOptions.map((c,i) => (
              <Form.Field inline key={i}>
                <Radio
                  label={{ 
                    children: c.value === 'All' ? c.label 
                      : c.value === "Joint" ? <>Joint <Label color='orange'>CITY</Label> <Label color='yellow'>COUNTY</Label></> 
                      : <><Label color={c.value === 'City' ? 'orange' : 'yellow'}>{c.label}</Label></>
                  }}
                  name='radioGroup'
                  value={c.value}
                  checked={chartFilter === c.value}
                  onChange={() => setChartFilter(c.value)}
                />
              </Form.Field>
            ))}
          </Form>
        </Grid.Column>
      </Grid.Row>
      <ChartsWrapper filter={chartFilter} />
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
