import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const MethodsPage = () => (
  <Layout>
    <SEO title="Methods" />
    <h1>Data and methods</h1>
    <p>More words here...</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default MethodsPage