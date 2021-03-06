import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

import PopUpModal from 'components/pop-up-modal'
import MenuIcon from 'icons/menu.svg'
import CloseIcon from 'icons/x.svg'
import 'styles/mobile-nav.scss'

const MobileNav = ({
  currentPage,
  frontmatterEdges
}) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="mobile-nav">
      <div
        className="hamburger"
        onClick={() => setOpen(true)}
      >
        <MenuIcon />
      </div>
      <PopUpModal
        className="mobile-nav-modal"
        isOpen={open}
        onRequestClose={() => setOpen(false)}
      >
        <div className="close-icon">
          <CloseIcon />
        </div>
        <ul>
          {frontmatterEdges
            .map(({ node: { frontmatter } }) => frontmatter)
            .sort(({ navPosition: a }, { navPosition: b }) => a - b)
            .map(({ title, path }, key) => (
              <li key={key}>
                <Link
                  to={path}
                  className={'plain-link' + (currentPage === title ? ' active' : '')}
                  activeClassName="plain-link active"
                >
                  <div>
                    {title}
                  </div>
                </Link>
              </li>
            ))}
        </ul>
      </PopUpModal>
    </div>
  )
}

MobileNav.propTypes = {
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

export default MobileNav
