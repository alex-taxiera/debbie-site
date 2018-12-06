import React, { Component } from 'react'
import propTypes from 'prop-types'

import Spinner from '../../app/components/spinner'

import './index.css'

class About extends Component {
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
      <div className='about-container'>
        <div style={isLoading ? { height: 1000 } : { display: 'none' }}>
          <Spinner color='rgba(100,100,100,0.2)' />
        </div>
        <div style={isLoading ? { display: 'none' } : null}>
          <div className='float-left text-right'>
            <img
              ref='img1'
              onLoad={this.onImageLoad}
              style={{ maxWidth: 240 }}
              src='/profile.jpg'
              alt='profile.jpg'
            />
          </div>
          <p>
            Debbie Chen was born and raised in Brockton, Massachusetts. Chen studies music at the University of Massachusetts Amherst (UMass) where she is earning her Bachelor of Music degree in music education and bassoon performance. Chen will receive her teaching license in music grades Pre-k - 12 in February 2019.
          </p>
          <p>
            As a bassoonist, Chen has performed with the Wind Ensemble, Symphony Orchestra, Symphony Band, and the All-University Orchestra at UMass Amherst. She has also performed with the Pioneer Valley Symphony Orchestra, the Windham Orchestra, the Mt. Holyoke College Orchestra, the Boston Youth Symphony Orchestra (BYSO), and the Sharon Community Band. She has also performed solo recitals her junior and senior year of college. Chen’s former teachers include Remy Taghavi, Stephen Walt and Janet Underhill.
          </p>
          <div className='float-right text-left wide-break'>
            <img
              ref='img2'
              onLoad={this.onImageLoad}
              style={{ maxWidth: 1100 }}
              src='/debbie-playing.png'
              alt='playing.png'
            />
          </div>
          <p>
            Chen loves playing any and all instruments she can get her hands on. After taking oboe tech at UMass, Chen studied oboe with Fred Cohen, the oboe professor at UMass Amherst, for a year. She was also a member of the mellophone section in the UMass Marching band and she has performed on marimbas with two marimba ensemble at UMass. In addition to these instruments, Chen plays the piano and the clarinet and is attempting to learn flute, saxophone, guitar, and ukulele.
          </p>
          <div className='float-left text-right' style={{ marginTop: '1em' }}>
            <img
              ref='img3'
              onLoad={this.onImageLoad}
              style={{ maxWidth: 300 }}
              src='/castle.jpg'
              alt='castle.jpg'
            />
          </div>
          <p>
            Chen has completed her secondary student teaching placement at Pembroke High school where she taught and worked with the freshman band, Concert Band, Wind Ensemble, Concert Choir, Guitar lab I, and Piano Lab I. She is currently student teaching in Dedham at Riverdale Elementary and the Early Childhood Education Center, where she is working with students in preschool through 5th grade utilizing the Gordon  music learning theory approach.
          </p>
          <p>
            As a passionate music educator and bassoonist, Chen strives to provide a high level of music and music education to schools, communities, and anywhere else music can reach. Aside from music, Chen loves food, being outdoors, sports, and adventuring to new places to discover the unknown.
          </p>
        </div>
      </div>
    )
  }
}

export default About
