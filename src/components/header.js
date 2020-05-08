import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const containerStyle = {
  margin: `0 auto`, 
  padding: `1.45rem 1.0875rem`, 
  display: `flex`,
  alignItems: `center`,
  justifyContent: `space-between`,
  flexWrap: `wrap`,
  borderBottom: '3px solid white',
}

const linkStyle = {
  color: `white`,
  textDecoration: `none`,
  marginRight: `1em`,
}

const Header = ({ siteTitle }) => (
  <header style={{ background: `#0d1c33` }}>
    <div style={containerStyle}>
      <div>
        <h4 style={{ margin: 0, fontWeight: 900 }}>
          <Link to="/" style={{ ...linkStyle, textTransform: `uppercase` }}>
            {siteTitle}
          </Link>
        </h4>
        <Link to="/" style={linkStyle}>
          Home
        </Link>
        <Link to="/about" style={linkStyle}>
          About
        </Link>
        <Link to="/stories" style={linkStyle}>
          Stories
        </Link>
        <Link to="/contact" style={linkStyle}>
          Contact
        </Link>
      </div>
      <div>
        <a href="https://www.publicsource.org/" style={{ color: `#418cff`, fontWeight: 700 }}>
          PUBLICSOURCE
        </a>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
