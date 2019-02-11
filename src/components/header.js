import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import { standardMargin, boxPadding } from '../style/_variables.scss'

const Header = ({ siteTitle }) => (
  <header
    className="site-header"
    style={{
      background: `white`,
      marginBottom: standardMargin,
      borderBottom: `1px #606671`,
      WebkitBoxShadow: `0px 1px 5px rgba(192, 192, 192, 0.6)`,
      boxShadow: `0 1px 5px rgba(192, 192, 192, 0.6)`
    }}
  >
    <div
      className="page-wrapper"
      style={{
        padding: `${standardMargin} ${boxPadding}`,
      }}
    >
      <div
        className="hamburger"
        style={{
          flexGrow: 99
        }}
      >
        test
      </div>
      <h1 style={{
        margin: 0,
        textAlign: `center`,
        flexGrow: 1
      }}>
        <Link
          to="/"
          style={{
            color: `black`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
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
