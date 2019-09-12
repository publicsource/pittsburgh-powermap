import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const StoriesPage = () => (
  <Layout>
    <SEO title="Stories" />
    <h1>Stories</h1>
    <p>More words here...</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default StoriesPage