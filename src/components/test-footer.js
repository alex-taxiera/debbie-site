import React from 'react'

const Footer = () => (
  <footer style={{
    marginTop: '2.9em',
    zIndex: 999,
    position: 'sticky',
    bottom: 0,
    background: `white`,
    borderTop: `1px #606671`,
    WebkitBoxShadow: `0 0 12px rgba(192, 192, 192, 0.6)`,
    boxShadow: `0 0 12px rgba(192, 192, 192, 0.6)`
  }}>
    <div
      className="page-wrapper"
      style={{
        textAlign: `center`
      }}
    >
      Contact Me
    </div>
  </footer>
)

export default Footer
