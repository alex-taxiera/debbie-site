const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

export async function getCaptchaKey () {
  return fetch('/recaptcha', {
    headers: HEADERS
  }).then((res) => res.json())
    .then((res) => {
      if (res.error) {
        throw res.error
      } else {
        return res.sitekey
      }
    })
    .catch(console.error)
}

export async function sendContactEmails ({ to, from, text, html }) {
  return fetch('/mailgun/contact', {
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
