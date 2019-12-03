import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from 'containers/layout'
import withScreenWidth from 'enhancers/with-screen-width'
import 'graphql/images'

const AboutPage = ({ screenWidth }) => (
  <StaticQuery
    query={graphql`
      query {
        debbiePlaying: file(relativePath: { eq: "debbie-playing.png" }) {
          ...fluid1024
        }
        profile: file(relativePath: { eq: "profile.jpg" }) {
          ...fixed240
        }
        castle240: file(relativePath: { eq: "castle.jpg" }) {
          ...fixed240
        }
        castle300: file(relativePath: { eq: "castle.jpg" }) {
          ...fixed300
        }
      }
    `}
    render={(data) => (
      <Layout seo={{ title: frontmatter.title }}>
        <div className="padded">
          <div className="left-inline-image" style={{ marginTop: '0' }}>
            <Img fixed={data.profile.data.src} />
          </div>
          <p>
            Debbie Chen was born and raised in Brockton, Massachusetts. Chen studies music at the University of Massachusetts Amherst (UMass) where she is earning her Bachelor of Music degree in music education and bassoon performance.
          </p>
          <p>
            As a bassoonist, Chen has performed with the Wind Ensemble, Symphony Orchestra, Symphony Band, and the All-University Orchestra at UMass Amherst. She has also performed with the Pioneer Valley Symphony Orchestra, the Windham Orchestra, the Mt. Holyoke College Orchestra, the Boston Youth Symphony Orchestra (BYSO), and the Sharon Community Band. She has also performed solo recitals her junior and senior year of college. Chen’s former teachers include Remy Taghavi, Stephen Walt and Janet Underhill.
          </p>
        </div>
        <Img fluid={data.debbiePlaying.data.src} />
        <div className="padded" style={{ marginTop: '1.45rem' }}>
          <p>
            Chen loves playing any and all instruments she can get her hands on. After taking oboe tech at UMass, Chen studied oboe with Fred Cohen, the oboe professor at UMass Amherst, for a year. She was also a member of the mellophone section in the UMass Marching band and she has performed on marimbas with two marimba ensemble at UMass. In addition to these instruments, Chen plays the piano and the clarinet and is attempting to learn flute, saxophone, guitar, and ukulele.
          </p>
          <div className="left-inline-image" style={{ marginBottom: '0', marginTop: '0' }}>
            <Img fixed={screenWidth < 610 && screenWidth > 480 ? data.castle240.data.src : data.castle300.data.src} />
          </div>
          <p>
            Chen has completed her secondary student teaching placement at Pembroke High school where she taught and worked with the freshman band, Concert Band, Wind Ensemble, Concert Choir, Guitar lab I, and Piano Lab I. She is currently student teaching in Dedham at Riverdale Elementary and the Early Childhood Education Center, where she is working with students in preschool through 5th grade utilizing the Gordon  music learning theory approach.
          </p>
          <p style={{ marginBottom: 0 }}>
            As a passionate music educator and bassoonist, Chen strives to provide a high level of music and music education to schools, communities, and anywhere else music can reach. Aside from music, Chen loves food, being outdoors, sports, and adventuring to new places to discover the unknown.
          </p>
        </div>
      </Layout>
    )}
  />
)

AboutPage.propTypes = {
  screenWidth: PropTypes.number.isRequired
}

export const frontmatter = {
  title: 'About',
  path: '/about',
  navPosition: 1
}

export default withScreenWidth(AboutPage)
