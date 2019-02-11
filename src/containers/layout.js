import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import SEO from '../components/seo'
import Header from '../components/header'
import Footer from '../components/footer'

import { boxPadding } from '../style/_variables.scss'

const Layout = ({ children, seo: { title, description, lang, meta, keywords } }) => (
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
        <SEO title={title} description={description} lang={lang} meta={meta} keywords={keywords} />
        <Header siteTitle={data.site.siteMetadata.title} />
        <div className="page-wrapper">
          <main
            className="box"
            style={{
              background: `white`,
              padding: boxPadding
            }}
          >{children}</main>
        </div>
        <Footer />
      </>
    )}
  />
)

Layout.defaultProps = {
  seo: {
    lang: `en`,
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
