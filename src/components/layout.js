/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Grid } from "semantic-ui-react"

import HeaderWrapper from "./header-wrapper"

import "semantic-ui-less/semantic.less"
import "./layout.css"

const Layout = ({ children }) => (
  <>
    <div style={{ minHeight: `100vh`, marginBottom: `-60px` }}>
      <HeaderWrapper />
      <div
        style={{
          fontFamily: `Mallory,`,
          margin: `0 auto`,
          padding: `1.45rem 1.0875rem`, 
          maxWidth: `1300px`,
          marginBottom: `60px`
        }}>
        <Grid stackable columns='equal'>
          {children}
        </Grid>
      </div>
    </div>
    <footer
      style={{ 
        padding: `1.45rem 1.0875rem`,
        display: `flex`,
        justifyContent: `center`,
        alignItems: `center`,
        background: `#0d1c33`,
        color: `white`,
        height: `60px`,
      }}>
        <span>© Copyright 2020, PublicSource</span>
    </footer>
    <script id="parsely-cfg" src="//cdn.parsely.com/keys/publicsource.org/p.js"></script>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
