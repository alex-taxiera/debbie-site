import React from 'react'
import { Link } from 'gatsby'

import Layout from '../containers/layout'

const SecondPage = () => (
  <Layout seo={{
    title: 'Page 2'
  }}>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export const frontmatter = {
  title: 'Page 2',
  path: '/page-2',
  navPosition: 1
}

export default SecondPage
