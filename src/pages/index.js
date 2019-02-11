import React from 'react'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from '../containers/layout'
import '../graphql/fluid-images'

const IndexPage = (props) => (
  <Layout seo={{
    title: 'Home',
    keywords: [`gatsby`, `application`, `react`]
  }}>
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Img fluid={props.data.gatsbyAstronaut.childImageSharp.fluid} />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export const frontmatter = {
  title: 'Home',
  path: '/',
  navPosition: 0
}

export const pageQuery = graphql`
  query {
    gatsbyAstronaut: file(relativePath: { eq: "gatsby-astronaut.png" }) {
      ...fluid960
    }
  }
`

export default IndexPage
