import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import SEO from '../components/seo'
import Header from '../components/header'
import Footer from '../components/test-footer'

const Layout = ({ children, seo }) => (
  <StaticQuery
    query={graphql`
      query test {
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
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="page-wrapper">
          <main className="box testing">
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
