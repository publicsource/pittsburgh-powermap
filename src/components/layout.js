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

const Layout = ({ children }) => (
  <>
    <HeaderWrapper />
    <div
      style={{
        margin: `0 auto`,
        // maxWidth: 960,
        padding: `0px 1.0875rem 1.45rem`,
        paddingTop: 0,
      }}
    >
      <main>
        {children}
      </main>
      {/* <footer style={{ 
        backgroundColor: `#0d1c33`,
        margin: `0 auto`,
        height: `200px`,
        color: `white`,
        padding: `2em`,
      }}>
        PublicSource
      </footer> */}
    </div>
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
