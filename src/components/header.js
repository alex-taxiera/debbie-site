import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql, Link } from 'gatsby'

import './style/header.scss'

const Header = ({ siteTitle }) => (
  <StaticQuery
    query={graphql`
      query SitePagesQuery {
        allJavascriptFrontmatter {
          edges {
            node {
              frontmatter {
                error
                path
                title
                navPosition
              }
            }
          }
        }
      }
    `}
    render={(data) => (
      <header className="site-header">
        <div className="page-wrapper title">
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
              className="plain-link"
            >
              {siteTitle}
            </Link>
          </h1>
        </div>
        <div
          className="page-wrapper nav-bar"
          style={{
            justifyContent: `center`
          }}
        >
          {data.allJavascriptFrontmatter.edges
            .map(({ node: { frontmatter } }) => frontmatter)
            .sort(({ navPosition: a }, { navPosition: b }) => a - b)
            .map(({ title, path }, key) => (
              <div
                className="nav-item"
                key={key}
              >
                <Link
                  to={path}
                  className="plain-link"
                  activeClassName="plain-link active"
                >
                  {title}
                </Link>
              </div>
            ))}
        </div>
      </header>
    )}
  />
)

Header.propTypes = {
  siteTitle: PropTypes.string
}

Header.defaultProps = {
  siteTitle: ''
}

export default Header
