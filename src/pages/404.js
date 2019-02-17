import React from 'react'
import { Link } from 'gatsby'

import Layout from 'containers/layout'

const NotFoundPage = () => (
  <Layout seo={{
    title: '404: Not found'
  }}>
    <div
      style={{
        textAlign: `center`
      }}
    >
      <h1 style={{
        fontSize: `20vw`,
        color: `#825D4E`,
        background: `-webkit-linear-gradient(#825D4E, #84240C)`,
        WebkitBackgroundClip: `text`,
        WebkitTextFillColor: `transparent`
      }}>404</h1>
      <p>The page you were looking for doesn't exist.</p>
      <p>Let's get you <Link
        className="plain-link"
        style={{ textDecoration: `underline` }}
        to="/"
      >home.</Link></p>
    </div>
  </Layout>
)

export default NotFoundPage
