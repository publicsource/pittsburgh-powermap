import React from "react"
import { Header, Placeholder } from "semantic-ui-react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const MethodsPage = () => (
  <Layout>
    <SEO title="Methods" />
    <Header as='h1'>Data and methods</Header>
    <Placeholder fluid>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
      <Placeholder.Paragraph>
        <Placeholder.Line />
        <Placeholder.Line />
        <Placeholder.Line />
      </Placeholder.Paragraph>
    </Placeholder>
  </Layout>
)

export default MethodsPage