import React from "react"
import { Header, Placeholder } from "semantic-ui-react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const StoriesPage = () => (
  <Layout>
    <SEO title="Stories" />
    <Header as='h1'>Stories</Header>
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

export default StoriesPage