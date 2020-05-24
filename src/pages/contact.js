import React from "react"
import { Header } from "semantic-ui-react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ContactPage = () => (
  <Layout>
    <SEO title="Contact" />
    <Header as='h1' style={{ borderBottom: `5px solid #418cff` }}>Contact</Header>
    <p>Do you have a question or want to request a correction? Contact <a style={{ borderBottom: `2px solid #418cff` }} href="mailto:rich@publicsource.org">rich@publicsource.org</a>.</p>
  </Layout>
)

export default ContactPage