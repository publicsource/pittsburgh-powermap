import React from "react"
import { Grid } from "semantic-ui-react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Grid stackable columns='equal'>
      <Grid.Row centered style={{ background: `#0d1c33` }}>
        <section style={{ display: `flex`, flexDirection: `column`, color: `white` }}>
          <h1>POWERMAPPING PITTSBURGH</h1>
          <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.</p>
          <input type="text" style={{ marginTop: `1em` }}></input>
        </section>
      </Grid.Row>
      <Grid.Row centered style={{ background: `white` }}>
        <section style={{ display: `flex`, flexDirection: `column` }}>
          <p>Powermapping Pittsburgh does this descriptive thing that we'll put right here.</p>
        </section>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column>
          <div style={{ height: `600px`, border: `2px solid #418cff` }}>
            City Boards (list of links)
          </div>
        </Grid.Column>
        <Grid.Column>
          <div style={{ height: `600px`, border: `2px solid #418cff` }}>
            County Boards (list of links)
          </div>
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
          <div style={{ height: `400px`, border: `2px solid #ddd` }}>
            Why we mapped power in Pittsburgh
          </div>
        </Grid.Column>
        <Grid.Column>
          <div style={{ height: `400px`, border: `2px solid #ddd` }}>
            About the data
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Layout>
)

export default IndexPage
