import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const linkStyle = {
  color: `white`,
  textDecoration: `none`,
  marginRight: `1em`,
  fontFamily: `Mallory`,
}

const Header = ({ siteTitle }) => (
  <header style={{ background: `#0d1c33`, borderBottom: `4px solid white`, padding: `1em 1em` }}>
    <div style={{ margin: `0 auto`, maxWidth: `1300px`, display: `flex`, alignItems: `center`, justifyContent: `space-between`, flexWrap: `wrap` }}>
      <div style={{ display: `flex`, flexWrap: `wrap` }}>
        <div>
          <Link to="/" style={{ ...linkStyle, textTransform: `uppercase` }}>
            {siteTitle}
          </Link>
        </div>
        <div>
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
      </div>
      <div>
        <a href="https://www.publicsource.org/" style={{ color: `#418cff`, fontFamily: `Mallory` }}>
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
