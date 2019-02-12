import { graphql } from 'gatsby'

export const fluid960 = graphql`
  fragment fluid960 on File {
    childImageSharp {
      fluid(maxWidth: 960, quality: 100) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

export const fixed300 = graphql`
  fragment fixed300 on File {
    childImageSharp {
      fixed(width: 300, quality: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const fixed240 = graphql`
  fragment fixed240 on File {
    childImageSharp {
      fixed(width: 240, quality: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`
