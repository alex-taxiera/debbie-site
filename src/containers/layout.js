import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from 'containers/header'
import SEO from 'components/seo'
import Footer from 'components/footer'

const Layout = ({ children, seo }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data) => (
      <>
        <SEO {...seo} />
        <Header
          siteTitle={data.site.siteMetadata.title}
          currentPage={seo.title}
        />
        <div className="page-wrapper">
          <main className="box">
            {children}
          </main>
        </div>
        <Footer />
      </>
    )}
  />
)

Layout.defaultProps = {
  seo: {
    lang: 'en',
    meta: [],
    keywords: []
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  seo: PropTypes.shape({
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.array,
    keywords: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string.isRequired
  })
}

export default Layout
