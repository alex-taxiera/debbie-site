import { graphql } from 'gatsby'

export const javascriptFrontmatter = graphql`
  fragment javascriptFrontmatter on Query {
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
`
