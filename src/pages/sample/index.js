import React, { Component } from 'react'
import propTypes from 'prop-types'

import YoutubeIframe from '../../app/components/youtube-iframe'
import Spinner from '../../app/components/spinner'

import './index.css'

const SPINNER_STYLE = {
  color: 'rgba(100,100,100,0.2)',
  fontSize: 10,
  marginTop: '-5%'
}

class Sample extends Component {
  state = {
    isLoading: true,
    imageCount: 0,
    loadedImageCount: 0
  }

  static propTypes = {
    scrollTo: propTypes.object
  }

  static defaultPropTypes = {
    scrollIfHigherThan: 0
  }

  componentWillMount = () => {
    const {
      scrollTo
    } = this.props

    scrollTo && scrollTo.scrollIntoView()
  }

  componentDidMount = () => {
    this.setState({ imageCount: Object.keys(this.refs).filter((key) => key.startsWith('img')).length })
  }

  onImageLoad = () => {
    const {
      imageCount,
      loadedImageCount
    } = this.state

    const loaded = loadedImageCount + 1

    if (loaded === imageCount) {
      this.setState({ isLoading: false })
    } else {
      this.setState({ loadedImageCount: loaded })
    }
  }

  render = () => {
    const {
      isLoading
    } = this.state

    return (
      <div className='sample-container'>
        <div style={isLoading ? { height: 1000 } : { display: 'none' }} />
        <div style={isLoading ? { display: 'none' } : null}>
          <div className='schools'>
            <div className='pembroke'>
              <div className='description'>
                <div className='float-left text-right wide-break' style={{ textAlign: 'center' }}>
                  <img
                    ref='img1'
                    onLoad={this.onImageLoad}
                    src='/pembroke.png'
                    alt='pembroke.png'
                    style={{ maxWidth: 600 }}
                  />
                </div>
                <h3>Pembroke High School</h3>
                <p>
                  Austin Glass, Band Director
                  <br />
                  Gwynne Chapman, Chorus Director
                  <br />
                  Greg Tarbox, Orchestra Director
                </p>
                <p className='clear-both'>
                  I completed my secondary placement at Pembroke High School in Pembroke, Massachusetts with Mr. Glass as my supervising practitioner. I was also very fortunate to have the opportunity to work with and learn from both Mrs. Chapman and Mr. Tarbox, the Choral and orchestral directors at the school. At this placement I worked with the Freshmen band, Concert band, Wind ensemble, and string orchestra. I observed and taught bits and pieces of a Guitar lab, as well as concert choir, and took over a Piano lab where I taught class to beginning pianists. After school I would work with students privately on their instruments when requested and would assist in after school groups such as men’s choir, women’s choir, Jazz band and rehearsals for the school musical.
                </p>
              </div>
            </div>
            <div className='riverdale-curran'>
              <div className='description'>
                <div className='float-left text-right wide-break'>
                  <img
                    ref='img2'
                    onLoad={this.onImageLoad}
                    src='/riverdale.png'
                    alt='riverdale.png'
                    style={{ maxWidth: '50%' }}
                  />
                  <img
                    ref='img3'
                    onLoad={this.onImageLoad}
                    src='/curran.png'
                    alt='curran.png'
                    style={{ maxWidth: '50%' }}
                  />
                </div>
                <h3 style={{ lineHeight: '2em' }}>Early Childhood Education Center<br />Riverdale Elementary</h3>
                <p>
                  Heather Kirby, Music Educator
                </p>
                <p className='clear-both'>
                  I completed my elementary placement at the Early Childhood Education Center, and Riverdale Elementary school under the supervision of Mrs. Kirby in Dedham, Massachusetts. During my time in this placement I worked with preschoolers and kindergarteners at the ECEC and grades 1-5 at Riverdale where I utilized the music learning theory and the Gordon approach. I also directed a piece in both the 5th grade and 4th grade chorus. I created and taught a unit plan on mexican music where the 4th graders learned a few songs in the mexican language and a game from Ecuador that was also in spanish. They performed it in their winter concert.
                </p>
              </div>
            </div>
          </div>
          <div className='videos clear-both'>
            <h2>Performances</h2>
            <div className='video padded-half'>
              <YoutubeIframe
                title='vivaldi'
                src='https://www.youtube.com/embed/kQ1tPMaFCKI'
                preloader={(<Spinner style={SPINNER_STYLE} />)}
              />
            </div>
            <div className='video padded-half'>
              <YoutubeIframe
                title='saint saens'
                src='https://www.youtube.com/embed/oaIpk6yqQmM'
                preloader={(<Spinner style={SPINNER_STYLE} />)}
              />
            </div>
            <div className='video'>
              <YoutubeIframe
                title='jesus is coming'
                src='https://www.youtube.com/embed/9G-OTPH6si0'
                preloader={(<Spinner style={SPINNER_STYLE} />)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default Sample
