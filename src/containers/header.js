import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql, Link } from 'gatsby'

import withScreenWidth from 'enhancers/with-screen-width'
import NavBar from 'components/nav-bar'
import MobileNav from 'components/mobile-nav'
import 'graphql/nav'
import 'styles/header.scss'

const Header = ({ screenWidth, siteTitle, currentPage }) => (
  <StaticQuery
    query={graphql`
      query {
        ...javascriptFrontmatter
      }
    `}
    render={(data) => (
      <header className="site-header">
        <div className="page-wrapper title">
          {screenWidth <= 480 ? (
            <div className="mobile-button">
              <MobileNav
                currentPage={currentPage}
                frontmatterEdges={data.allJavascriptFrontmatter.edges}
              />
            </div>
          ) : null}
          <h1>
            <Link
              to="/"
              className="plain-link"
            >
              {siteTitle}
            </Link>
          </h1>
        </div>
        {screenWidth > 480 ? (
          <NavBar
            currentPage={currentPage}
            frontmatterEdges={data.allJavascriptFrontmatter.edges}
          />
        ) : null}
      </header>
    )}
  />
)

Header.propTypes = {
  screenWidth: PropTypes.number.isRequired,
  siteTitle: PropTypes.string,
  currentPage: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ''
}

export default withScreenWidth(Header)
