const BASE_URL = 'http://localhost:3001'
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

export async function getCaptchaKey () {
  function getUserIP (onNewIP) {
    var PeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection
    const pc = new PeerConnection({
      iceServers: []
    })
    const noop = () => {}
    const localIPs = {}
    const ipRegex = /\b((?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:(?<!\.)\b|\.)){4}/g

    function iterateIP (ip) {
      if (!localIPs[ip]) onNewIP(ip)
      localIPs[ip] = true
    }

    pc.createDataChannel('')

    // create offer and set local description
    pc.createOffer(function (sdp) {
      sdp.sdp.split('\n').forEach(function (line) {
        if (line.indexOf('candidate') < 0) return
        line.match(ipRegex).forEach(iterateIP)
      })

      pc.setLocalDescription(sdp, noop, noop)
    }, noop)

    pc.onicecandidate = function (ice) {
      if (!ice || !ice.candidate || !ice.candidate.candidate || !ice.candidate.candidate.match(ipRegex)) return
      ice.candidate.candidate.match(ipRegex).forEach(iterateIP)
    }
  }

  getUserIP(function (ip) {
    console.log('ip', ip)
    return fetch('http://' + ip + ':3001' + '/recaptcha', {
      headers: HEADERS
    }).then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.error('test error', res.error)
        } else {
          console.log('test key', res.sitekey)
        }
      })
  })

  return fetch(BASE_URL + '/recaptcha', {
    headers: HEADERS
  }).then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw res.error
      } else {
        return res.sitekey
      }
    })
}

export async function sendContactEmails ({ to, from, text, html }) {
  return fetch(BASE_URL + '/mailgun/contact', {
    method: 'post',
    headers: HEADERS,
    body: JSON.stringify({
      from,
      to,
      text,
      html
    })
  }).then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw res.error
      } else {
        return res.message
      }
    })
}
