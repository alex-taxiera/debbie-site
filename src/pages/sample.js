import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'
import YouTube from 'react-youtube'
import { Carousel } from 'react-responsive-carousel'

import Layout from 'containers/layout'
import withScreenWidth from 'enhancers/with-screen-width'
import DocIcon from 'icons/doc.svg'
import 'graphql/images'
import 'styles/sample.scss'

const DocLink = ({ src, title }) => (
  <a
    className="plain-link hover-decoration"
    href={src}
    target="_blank"
  >
    <DocIcon />
    <div>{title}</div>
  </a>
)

DocLink.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

const SamplePage = ({ screenWidth }) => (
  <StaticQuery
    query={graphql`
      query {
        pembroke: file(relativePath: { eq: "pembroke.png" }) {
          ...fluid1024
        }
        curranRiverdale: file(relativePath: { eq: "curran-riverdale.png" }) {
          ...fluid1024
        }
      }
    `}
    render={(data) => (
      <Layout seo={{ title: frontmatter.title }}>
        <div className="schools">
          <div className="header">
            <div className="image">
              <Img fluid={data.pembroke.data.src} />
            </div>
            <div className="title">
              <h3>Pembroke High School</h3>
              <p>
                Austin Glass, Band Director
                <br />
                Gwynne Chapman, Chorus Director
                <br />
                Greg Tarbox, Orchestra Director
              </p>
            </div>
          </div>
          <p className="padded">
            I completed my secondary placement at Pembroke High School in Pembroke, Massachusetts with Mr. Glass as my supervising practitioner. I was also very fortunate to have the opportunity to work with and learn from both Mrs. Chapman and Mr. Tarbox, the Choral and orchestral directors at the school. At this placement I worked with the Freshmen band, Concert band, Wind ensemble, and string orchestra. I observed and taught bits and pieces of a Guitar lab, as well as concert choir, and took over a Piano lab where I taught class to beginning pianists. After school I would work with students privately on their instruments when requested and would assist in after school groups such as men’s choir, women’s choir, Jazz band and rehearsals for the school musical.
          </p>
          <div className="lessons padded">
            <h4>Lesson Plans</h4>
            <div className="doc-links">
              <DocLink src="highschool1.pdf" title="Piano Lab" />
              <DocLink src="highschool2.pdf" title="Freshmen Band" />
            </div>
          </div>
          <div className="header">
            <div className="image">
              <Img fluid={data.curranRiverdale.data.src} />
            </div>
            <div className="title">
              <h3>
                Early Childhood Education Center
                <br />
                Riverdale Elementary
              </h3>
              <p>
                Heather Kirby, Music Educator
              </p>
            </div>
          </div>
          <p className="padded">
            I completed my elementary placement at the Early Childhood Education Center, and Riverdale Elementary school under the supervision of Mrs. Kirby in Dedham, Massachusetts. During my time in this placement I worked with preschoolers and kindergarteners at the ECEC and grades 1-5 at Riverdale where I utilized the music learning theory and the Gordon approach. I also directed a piece in both the 5th grade and 4th grade chorus. I created and taught a unit plan on mexican music where the 4th graders learned a few songs in the mexican language and a game from Ecuador that was also in spanish. They performed it in their winter concert.
          </p>
          <div className="lessons padded">
            <h4>Lesson Plans</h4>
            <div className="doc-links">
              <DocLink src="elementary1.pdf" title="Kindergarten" />
              <DocLink src="elementary2.pdf" title="Grade 2" />
              <DocLink src="elementary3.pdf" title="Kindergarten" />
              <DocLink src="elementary4.pdf" title="Grade 4" />
            </div>
          </div>
        </div>
        <div className="videos">
          <h2 className="padded">Performances</h2>
          <Carousel
            width={640}
            showThumbs={false}
            showStatus={false}
            infiniteLoop
          >
            <YouTube
              videoId="kQ1tPMaFCKI"
            />
            <YouTube
              videoId="oaIpk6yqQmM"
            />
            <YouTube
              videoId="9G-OTPH6si0"
            />
          </Carousel>
        </div>
      </Layout>
    )}
  />
)

SamplePage.propTypes = {
  screenWidth: PropTypes.number.isRequired
}

export const frontmatter = {
  title: 'Sample',
  path: '/sample',
  navPosition: 3
}

export default withScreenWidth(SamplePage)
