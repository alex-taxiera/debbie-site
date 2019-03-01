import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Layout from 'containers/layout'
import Inspo from 'icons/inspo.svg'
import 'graphql/images'

const IndexPage = () => (
  <StaticQuery
    query={graphql`
      query {
        debbiePlaying: file(relativePath: { eq: "debbie-playing.png" }) {
          ...fluid1024
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
        <Img fluid={data.debbiePlaying.childImageSharp.fluid} />
        {/* {!images
          ? (
            <div className='carousel-placeholder'>
              <Spinner color='rgba(100,100,100,0.2)' />
            </div>
          ) : (
            <Carousel
              autoGenerateStyleTag={false}
              transitionMode='fade'
              autoplay
              autoplayInterval={10 * 1000}
              pauseOnHover
              swiping
              wrapAround
              renderBottomCenterControls={() => null}
            >
              {
                images.map((name, index) => {
                  return (
                    <img
                      key={index}
                      src={`${IMAGE_URL}/${name}`}
                      alt=''
                      style={{ display: 'block', margin: 'auto' }}
                      onLoad={index > 0 ? () => null : () => window.dispatchEvent(new Event('resize'))}
                    />
                  )
                })
              }
            </Carousel>
          )} */
        }
        <div className="padded">
          <p className="with-top" style={{ textAlign: 'center', marginBottom: 0 }}>
            I believe that music should be enjoyed by everyone and anyone.
            <br />
            I want to help students learn and understand music so they can find ways they can enjoy music.
            <br />
            I believe that  music should be fun and enjoyable for those who partake in music.
            <br />
            As a musician I want to touch the heart and stir the emotions of those who listen to my performance.
          </p>
        </div>
      </Layout>
    )}
  />
)

export const frontmatter = {
  title: 'Home',
  path: '/',
  navPosition: 0
}

export default IndexPage
