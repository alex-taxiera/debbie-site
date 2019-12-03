import { graphql } from 'gatsby'

export const fixed373 = graphql`
  fragment fixed373 on S3ImageConnection {
    images: edges {
      node {
        file: localFile {
          data: childImageSharp {
            src: fixed(height: 373, quality: 100) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`

export const fixed200 = graphql`
  fragment fixed200 on S3ImageConnection {
    images: edges {
      node {
        file: localFile {
          data: childImageSharp {
            src: fixed(height: 200, quality: 80) {
              ...GatsbyImageSharpFixed
            }
          }
        }
      }
    }
  }
`
