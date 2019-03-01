import { graphql } from 'gatsby'

export const fluid1024 = graphql`
  fragment fluid1024 on File {
    data: childImageSharp {
      src: fluid(maxWidth: 1024, quality: 100) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`

export const fixed300 = graphql`
  fragment fixed300 on File {
    data: childImageSharp {
      src: fixed(width: 300, quality: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const fixed240 = graphql`
  fragment fixed240 on File {
    data: childImageSharp {
      src: fixed(width: 240, quality: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`

export const fixed480 = graphql`
  fragment fixed480 on File {
    childImageSharp {
      fixed(width: 480, quality: 100) {
        ...GatsbyImageSharpFixed
      }
    }
  }
`
