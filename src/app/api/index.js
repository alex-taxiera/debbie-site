const BASE_URL = 'http://localhost:3001'
const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

export async function getCaptchaKey () {
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
