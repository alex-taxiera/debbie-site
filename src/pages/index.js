import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from 'containers/layout'
import withScreenWidth from 'enhancers/with-screen-width'
import Inspo from 'icons/inspo.svg'
import 'graphql/images'
import 'graphql/aws'
import { Carousel } from 'react-responsive-carousel'

const IndexPage = ({ screenWidth }) => (
  <StaticQuery
    query={graphql`
      query {
        debbiePlaying: file(relativePath: { eq: "debbie-playing.png" }) {
          ...fluid1024
        }
        s3Large: allS3Image {
          ...fixed373
        }
        s3Small: allS3Image {
          ...fixed200
        }
      }
    `}
    render={(data) => (
      <Layout seo={{
        title: frontmatter.title,
        keywords: ['bassoon', 'bassoonist', 'music', 'performance', 'music educator']
      }}>
        <div id="fancy-text" className="padded">
          <Inspo />
        </div>
        <Carousel
          showThumbs={false}
          showStatus={false}
          showIndicators={false}
          infiniteLoop
          autoPlay
          interval={7000}
        >
          {(screenWidth > 480 ? data.s3Large : data.s3Small).images.map(({ node: { file } }, key) => (
            <div className="carousel-slide-wrapper" key={key} style={{ height: (screenWidth > 480 ? 373 : 200) }}>
              <Img fixed={file.data.src} />
            </div>
          ))}
        </Carousel>
        <div className="padded">
          <p className="with-top" style={{ textAlign: 'center', marginBottom: 0 }}>
            I believe that music should be enjoyed by everyone and anyone.
            <br />
            I want to help students learn and understand music so they can find ways they can enjoy music.
            <br />
            I believe that music should be fun and enjoyable for those who partake in music.
            <br />
            As a musician I want to touch the heart and stir the emotions of those who listen to my performance.
          </p>
        </div>
      </Layout>
    )}
  />
)

IndexPage.propTypes = {
  screenWidth: PropTypes.number.isRequired
}

export const frontmatter = {
  title: 'Home',
  path: '/',
  navPosition: 0
}

export default withScreenWidth(IndexPage)
