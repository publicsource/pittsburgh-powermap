import React from "react"
import { graphql, Link } from "gatsby"
import { Header, Label, List, Grid, Breadcrumb, Card, Button } from "semantic-ui-react"
import _ from "lodash"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  let board = data.airtable.data

  return (
    <Layout>
      <SEO title={`${board.Name}`} />
      <Grid stackable columns='equal'>
        <Grid.Row style={{ marginLeft: `1em`, display: 'flex', flexDirection: 'column' }}>
          <Breadcrumb>
            <Breadcrumb.Section>
              <Link to='/' style={{ color: `#418cff` }}>Home</Link>
            </Breadcrumb.Section>
            <Breadcrumb.Divider />
            <Breadcrumb.Section active>Board</Breadcrumb.Section>
          </Breadcrumb>
          <Header as='h1'>{board.Name} ({board.Acronymn})</Header>
          <Header.Subheader>
            {board.Govt_Level.map((g, i) => 
              <Label horizontal key={i} color={g === 'City' ? `orange` : `yellow`} style={{ marginRight: `6px` }}>
                {g.toUpperCase()}
              </Label>
            )}
          </Header.Subheader>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Header as='h2'>What it does</Header>
            <p>{board.Description}</p>
            <Header as='h2'>When it meets</Header>
            <p>{board.Meeting_Time}</p>
            <Header as='h2'>Website</Header>
            <a href={board.Website} target="_blank" rel="noopener noreferrer">{board.Website}</a>
          </Grid.Column>
          <Grid.Column>
            <Header as='h2' style={{ borderBottom: `5px solid #418cff`}}>{board.Number_of_Members} members</Header>
            <List relaxed divided size='large'>
              {board.Positions.map(m => (
                m.data.Person.map((n, i) => (
                  <List.Item key={i}>
                    <List.Header>
                      <Link to={`/person/${n.data.Slug}`}>
                        {n.data.Name}
                      </Link>
                    </List.Header>
                    <List.Description>
                      {n.data.Positions[0].data.Office.slice(2)}, joined {n.data.Positions[0].data.Term_Begin_Date}
                    </List.Description>
                  </List.Item>
                ))
              ))}
            </List>
          </Grid.Column>
        </Grid.Row>
        {board.Stories ? 
          <Grid.Row style={{ display: `flex`, flexDirection: `column`, marginLeft: `1em` }}>
            <Header as='h2'>Stories</Header>
            <Card.Group>
              {board.Stories.map((s, i) => (
                  <Card key={i} fluid style={{ borderLeft: `5px solid #418cff` }}>
                    <Card.Content>
                      <Card.Header as='h5' style={{ marginBottom: 0 }}>
                        <a href={s.data.Link}>{s.data.Title}</a>
                      </Card.Header>
                      <Card.Meta>{s.data.Date}</Card.Meta>
                    </Card.Content>
                  </Card>
              ))}
            </Card.Group>
          </Grid.Row> : ``}
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query($name: String!) {
    airtable(data: {Name: {eq: $name}}) {
      id
      data {
        Name
        Acronymn
        Govt_Level
        Description
        Meeting_Time
        Website
        Number_of_Members
        Positions {
          data {
            Person {
              data {
                Name
                Slug
                Positions {
                  data {
                    Office
                    Term_Begin_Date
                    Term_Length
                  }
                }
              }
            }
          }
        }
        Stories {
          data {
            Title
            Link
            Date
          }
        }
      }
    }
  }
`