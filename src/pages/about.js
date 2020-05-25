import React from "react"
import { Header, Grid } from "semantic-ui-react"

import Layout from "../components/layout"
import SEO from "../components/seo"

import ps_logo from "../images/ps_logo_square.png"

const AboutPage = () => (
  <Layout>
    <SEO title="About" thumbnail={ps_logo} />
    <Grid.Row style={{ marginTop: `1em`, display: 'flex', flexDirection: 'column' }}>
      <Header as='h1' style={{ borderBottom: `5px solid #418cff`, width: `100%` }}>About</Header>
      <p>The Pittsburgh region is run in large part by more than 500 unelected board members of authorities, commissions and other governmental agencies.</p>
      <p>Board members usually don’t get headlines. Those go to the mayor, the county executive or, occasionally, council members, controllers and directors. But boards often decide what does and doesn’t get built, who gets contracts and grants, what rates and fees we pay for everything from bus rides to water, and more.</p>
      <p>Explore the region's key boards with us.</p>
      <h3>Note on sourcing</h3>
      <p>The information in Board Explorer is drawn from public records, including governing body agendas and minutes, property ownership data, voter registration rolls, court records, authority and business websites and board members’ social media, gathered over the course of 2020.</p> 
      <p>If anything in Board Explorer is not currently accurate, please email <a style={{ borderBottom: `2px solid #418cff` }} href="mailto:rich@publicsource.org">rich@publicsource.org</a>.</p>
    </Grid.Row>
  </Layout>
)

export default AboutPage
