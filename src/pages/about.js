import React from "react"
import { Header, Placeholder } from "semantic-ui-react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <Header as='h1'>About</Header>
    <p>The Pittsburgh region is run in large part by more than 500 unelected board members of authorities, commissions and other governmental agencies.</p>
    <p>Board members usually don’t get headlines. Those go to the mayor, the county executive or, occasionally, council members, controllers and directors. But boards often decide what does and doesn’t get built, who gets contracts and grants, what rates and fees we pay for everything from bus rides to water, and more.</p>
    <p>Now, as the region copes with the effects of the coronavirus pandemic, the operations of those boards are likely to affect our lives and futures more than ever. Already, boards are switching gears from managing growth to addressing an economic emergency. It’s time we got to know them better.</p>
    <p>PublicSource’s new Board Explorer sheds light on the boards and their roles, providing information about each member and inviting analysis of this important part of the region’s power structure.</p>
    <p>We’ll start with 16 boards involved — directly or indirectly — in the region’s economy. From Alcosan, which is rebuilding the sewer system, to the Zoning Board of Adjustment, which approves or denies construction proposals, these boards affect jobs, the built environment, housing, transportation, utilities, cultural assets and more.</p>
    <p>Over the coming months, PublicSource will add more boards, further analysis and deeper looks at key members. Explore with us.</p>
    <h4>Note on sourcing</h4>
    <p>The information in Board Explorer is drawn from public records, including governing body agendas and minutes, property ownership data, voter registration rolls, court records, authority and business websites and board members’ social media, gathered over the course of 2020. If anything in Board Explorer is not currently accurate, please email rich@publicsource.org.</p>
  </Layout>
)

export default AboutPage
