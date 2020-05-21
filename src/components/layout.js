/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"

import HeaderWrapper from "./header-wrapper"
import "semantic-ui-less/semantic.less"
import "./layout.css"

const Layout = ({ children }) => (
  <>
    <HeaderWrapper />
    <div
      style={{
        margin: `0 auto`,
        padding: `1.45rem 1.0875rem`, 
        maxWidth: `1300px`,
        fontFamily: `Mallory`
      }}
    >
      <main>
        {children}
      </main>
    </div>
    <footer
      style={{ 
        padding: `1.45rem 1.0875rem`,
        marginBottom: 0,
        display: `flex`,
        flexDirection: `column`,
        justifyContent: `center`,
        alignItems: `center`,
        background: `#0d1c33`,
        color: `white`
      }}>
        <span>© Copyright 2020, PublicSource</span>
    </footer>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
