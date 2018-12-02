import React from 'react'
import Carousel from 'nuka-carousel'

import { listBucket } from '../../api'

const IMAGE_URL = 'https://s3.us-east-2.amazonaws.com/debbie-carousel'

export default function render () {
  return (
    <div>
      <div>
        some inspirational text
      </div>
      {async () => {
        try {
          const start = Date.now()
          const images = await listBucket('debbie-carousel')
          console.log(`request took ${Date.now() - start}ms!`)
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
          return null
        }
      }
      }
    </div>
  )
}
