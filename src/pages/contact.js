import React from "react"
import { Header, Grid } from "semantic-ui-react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ContactPage = () => (
  <Layout>
    <SEO title="Contact" />
    <Grid.Row style={{ marginTop: `1em`, display: 'flex', flexDirection: 'column' }}>
      <Header as='h1' style={{ borderBottom: `5px solid #418cff`, width: `100%` }}>Contact</Header>
      <p>Do you have a question about Board Explorer or want to request a correction? Contact <a style={{ borderBottom: `2px solid #418cff` }} href="mailto:rich@publicsource.org">rich@publicsource.org</a>.</p>
    </Grid.Row>
  </Layout>
)

export default ContactPage