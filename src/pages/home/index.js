import React from 'react'
import Carousel from 'nuka-carousel'

import { listBucket } from '../../api'

const IMAGE_URL = 'https://s3.us-east-2.amazonaws.com/debbie-carousel'

export default async function render () {
  try {
    const images = await listBucket('debbie-carousel')

    return (
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
  } catch (error) {
    console.error(error)
    return null
  }
}
