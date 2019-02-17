import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import 'styles/nav-bar.scss'

const NavBar = ({
  currentPage,
  frontmatterEdges
}) => (
  <div
    className="page-wrapper nav-bar"
    style={{
      justifyContent: 'center'
    }}
  >
    {frontmatterEdges
      .map(({ node: { frontmatter } }) => frontmatter)
      .sort(({ navPosition: a }, { navPosition: b }) => a - b)
      .map(({ title, path }, key) => (
        <div
          className="nav-item"
          key={key}
        >
          <Link
            to={path}
            className={'plain-link' + (currentPage === title ? ' active' : '')}
            activeClassName="plain-link active"
          >
            {title}
          </Link>
        </div>
      ))}
  </div>
)

NavBar.propTypes = {
  currentPage: PropTypes.string,
  frontmatterEdges: PropTypes.arrayOf(PropTypes.shape({
    node: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        path: PropTypes.string,
        navPosition: PropTypes.number
      })
    })
  })).isRequired
}

export default NavBar
