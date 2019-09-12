import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ContactPage = () => (
  <Layout>
    <SEO title="Contact" />
    <h1>Contact</h1>
    <p>More words here...</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default ContactPage