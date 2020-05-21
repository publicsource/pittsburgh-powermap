import React from "react"
import { Header } from "semantic-ui-react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <Header as='h1'>About</Header>
    <p>The Pittsburgh region is run in large part by more than 500 unelected board members of authorities, commissions and other governmental agencies.</p>
    <p>Board members usually don’t get headlines. Those go to the mayor, the county executive or, occasionally, council members, controllers and directors. But boards often decide what does and doesn’t get built, who gets contracts and grants, what rates and fees we pay for everything from bus rides to water, and more.</p>
    <h4>Note on sourcing</h4>
    <p>The information in Board Explorer is drawn from public records, including governing body agendas and minutes, property ownership data, voter registration rolls, court records, authority and business websites and board members’ social media, gathered over the course of 2020.</p> 
    <p>If anything in Board Explorer is not currently accurate, please email <a href="mailto:rich@publicsource.org">rich@publicsource.org</a>.</p>
  </Layout>
)

export default AboutPage
