import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <h1>About this project</h1>
    <p>More words here...</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default AboutPage
