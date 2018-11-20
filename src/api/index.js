const URL = 'https://aws-proxy.herokuapp.com/proxy/user'
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

export async function sendEmail ({ token, to, from, cc, bcc, subject, text, html }) {
  return request('/mailgun/send', {
    method: 'post',
    headers: {
      'recaptcha-token': token
    },
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
  }).then((res) => res.body.message)
    .catch((res) => {
      if (res instanceof Error) {
        throw res
      } else {
        return res.body
      }
    })
}

export async function listBucket (bucketName) {
  return request(`/bucket/${bucketName}/list`)
    .then((res) => res.body)
    .catch((res) => {
      if (res instanceof Error) {
        throw res
      } else {
        return res.body
      }
    })
}
