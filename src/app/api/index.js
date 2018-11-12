const URL = 'https://aws-proxy.herokuapp.com/proxy'
const MAILGUN_DOMAIN = 'mg.thedebbiechen.com'

const HEADERS = {
  'Content-Type': 'application/json',
  'Accept': 'application/json'
}

async function request (path, options = { headers: {} }) {
  if (!options.headers) {
    options.headers = {}
  }
  for (const [header, value] of Object.entries(HEADERS)) {
    options.headers[header] = value
  }
  try {
    const results = await fetch(URL + path, options)
    const json = await results.json()
    if (json.error) {
      console.log('server error:', json.error)
      throw Error(json.error)
    } else {
      return json
    }
  } catch (error) {
    console.log('throwing error:', error)
    throw error
  }
}

export async function getCaptchaKey () {
  return request('/recaptcha-keys/thedebbiechen_com')
    .then((res) => res.key)
}

export async function sendEmail ({ to, from, cc, bcc, subject, text, html }) {
  return request('/mailgun/send', {
    method: 'post',
    body: JSON.stringify({
      domain: MAILGUN_DOMAIN,
      to,
      from,
      cc,
      bcc,
      subject,
      text,
      html
    })
  }).then((res) => res.message)
}
