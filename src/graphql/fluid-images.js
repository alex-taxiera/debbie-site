import { graphql } from 'gatsby'

export const fluid960 = graphql`
  fragment fluid960 on File {
    childImageSharp {
      fluid(maxWidth: 960) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`
