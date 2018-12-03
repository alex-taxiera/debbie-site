import React, { Component } from 'react'

import './index.css'

class About extends Component {
  render = () => {
    return (
      <div>
        <div className='float-left text-right'>
          <img height='auto' width='100%' style={{ maxWidth: 240 }} src='/profile.jpg' alt='profile.jpg' />
        </div>
        <p>
          Debbie Chen was born and raised in Brockton, Massachusetts. Chen studies music at the University of Massachusetts Amherst where she is earning her Bachelor of Music degree in music education and bassoon performance. Chen will receive her teaching license in music grades Pre-k - 12 in February 2019.
        </p>
        <p>
          As a bassoonist, Chen has performed with the Wind Ensemble, Symphony Orchestra, Symphony Band, and the All-University Orchestra at Umass Amherst. She has also performed with the Pioneer Valley Symphony Orchestra, the Windham Orchestra, the Mt. Holyoke College Orchestra, the Boston Youth Symphony Orchestra (BYSO), and the Sharon Community Band. She has also performed solo recitals her junior and senior year of college. Chen’s former teachers include Remy Taghavi, Stephen Walt and Janet Underhill.
        </p>
        <div className='float-right text-left wide-break'>
          <img height='auto' width='100%' style={{ maxWidth: 1200 }} src='/debbie-playing.png' alt='playing.png' />
        </div>
        <p>
          In addition to bassoon, Chen studied the oboe with Fred Cohen, the oboe professor at Umass Amherst. She was also a member of the mellophone section in the Umass Marching band and she has performed on marimbas with the marimba ensemble at Umass.
        </p>
        <p>
          Chen has completed her secondary student teaching placement at Pembroke High school where she taught and worked with the freshman band, Concert Band, Wind Ensemble, Concert Choir, Guitar lab I, and Piano Lab I. She is currently student teaching in Dedham at Riverdale Elementary and the Early Childhood Education Center, where she is working with students in preschool through 5th graders utilizing the Gordon  music learning theory approach.
        </p>
        <p>
          As a passionate music educator and bassoonist, Chen strives to provide a high level of music and music education to schools, communities, and anywhere else music can reach. Aside from music, Chen loves food, being outdoors, sports, and adventuring to new places to discover the unknown.
        </p>
      </div>
    )
  }
}

export default About
