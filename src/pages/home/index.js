import React, { Component } from 'react'
import Carousel from 'nuka-carousel'

import { listBucket } from '../../api'
import Spinner from '../../app/components/spinner'

import './index.css'

const S3_BUCKET = 'debbie-carousel'
const IMAGE_URL = 'https://s3.us-east-2.amazonaws.com/' + S3_BUCKET

class Home extends Component {
  state = {
    images: null
  }

  componentWillMount = () => {
    listBucket(S3_BUCKET)
      .then((images) => this.setState({ images }))
      .catch(console.error)
  }

  render = () => {
    const {
      images
    } = this.state

    return (
      <div>
        <div className='inspirations'>
          Passionate - Adaptive - Supportive - Enthusiastic
        </div>
        {!images
          ? (
            <Spinner color='rgba(100,100,100,0.2)' />
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
                      style={{ display: 'block', maxHeight: 400, margin: 'auto' }}
                      onLoad={index > 0 ? () => null : () => window.dispatchEvent(new Event('resize'))}
                    />
                  )
                })
              }
            </Carousel>
          )
        }
      </div>
    )
  }
}

export default Home
