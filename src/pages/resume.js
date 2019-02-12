import React from 'react'

import Layout from '../containers/layout'

import './style/resume.scss'

const ResumePage = () => (
  <Layout seo={{ title: 'Resume' }}>
    <div className="resume-summary" style={{ margin: 'auto', padding: '1rem', paddingTop: '2.9em' }}>
      <div>
        <h2>Education</h2>
        <div className="details">
          <h4>University of Massachusetts Amherst</h4>
          <ul>
            <li>Bachelor of Music in Music Education - February 2019</li>
            <li>Bachelor of Music in Music Performance - February 2019</li>
            <li>Overall GPA (Spring 2018): 3.6</li>
          </ul>
        </div>
      </div>
      <div>
        <h2>Experience</h2>
        <div className="details">
          <h4>Teaching</h4>
          <ul>
            <li>Private Bassoon lessons (2016 - present)</li>
            <li>Private Oboe lessons (2018 - present)</li>
          </ul>
          <h4>Collegiate Ambassador, MMEA All-State Conference, 03/2016, 03/2018</h4>
          <ul>
            <li>Preside over sessions and panels</li>
            <li>Assist presenters with set-up</li>
            <li>Guide and assist conference participants with questions and concerns</li>
          </ul>
          <h4>Production Assistant, Boston Youth Symphony Orchestra, 2015-2016</h4>
          <ul>
            <li>Set-up, striked, and cleaned up rehearsal spaces</li>
            <li>Moved instruments and equipment</li>
            <li>Ushered students to and from rehearsal spaces</li>
          </ul>
        </div>
      </div>
      <div>
        <h2>Professional Affiliations</h2>
        <div className="details">
          <ul>
            <li>University of Massachusetts Amherst collegiate chapter of the National Association for Music Education (NAfME) - 2016 Secretary</li>
            <li>Massachusetts Music Educators Association (MMEA) - Spring 2017 Collegiate Secretary</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="padded" style={{ textAlign: 'center', paddingBottom: '2.9em' }}>
      <a
        className="plain-link hover-decoration"
        href="/resume.pdf"
        target="_blank"
      >
        Full Resume ➜
      </a>
    </div>
  </Layout>
)

export const frontmatter = {
  title: 'Resume',
  path: '/resume',
  navPosition: 2
}

export default ResumePage