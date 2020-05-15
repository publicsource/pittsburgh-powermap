import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const containerStyle = {
  padding: `1.45rem 1.0875rem`, 
  display: `flex`,
  alignItems: `center`,
  justifyContent: `space-between`,
  flexWrap: `wrap`,
  borderBottom: '4px solid white',
  background: `#0d1c33`,
}

const linkStyle = {
  color: `white`,
  textDecoration: `none`,
  marginRight: `1em`,
  fontFamily: `Mallory`,
}

const Header = ({ siteTitle }) => (
  <header style={containerStyle}>
    <div>
      <Link to="/" style={{ ...linkStyle, fontWeight: 700, textTransform: `uppercase` }}>
        {siteTitle}
      </Link>
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
      <a href="https://www.publicsource.org/" style={{ color: `#418cff`, fontWeight: 700, fontFamily: `Mallory` }}>
        PUBLICSOURCE
      </a>
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
