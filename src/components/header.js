import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const containerStyle = {
  margin: `0 auto`, 
  padding: `1.45rem 1.0875rem`, 
  display: `flex`,
  alignItems: `center`,
  flexWrap: `wrap`,
  border: '3px solid white',
}

const linkStyle = {
  color: `white`,
  textDecoration: `none`,
  marginRight: `1em`,
}

const Header = ({ siteTitle }) => (
  <header style={{ background: `#0d1c33` }}>
    <div style={containerStyle}>
      <h4 style={{ margin: 0, fontWeight: 900 }}>
        <Link to="/" style={{ ...linkStyle, textTransform: `uppercase` }}>
          {siteTitle}
        </Link>
      </h4>
      <Link to="/" style={linkStyle}>
        Home
      </Link>
      <Link to="/about" style={linkStyle}>
        About this project
      </Link>
      <Link to="/methods" style={linkStyle}>
        Data and methods
      </Link>
      <Link to="/stories" style={linkStyle}>
        Stories
      </Link>
      <Link to="/contact" style={linkStyle}>
        Contact
      </Link>
      <a href="https://www.publicsource.org/" style={{ color: `#418cff`, fontWeight: 700 }}>
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
