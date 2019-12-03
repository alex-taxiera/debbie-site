const {
  MAILGUN_KEY,
  MAILGUN_PUB_KEY
} = process.env

const mg = require('mailgun-js')

const domains = {
  'thedebbie.com': 'mg.debbiechen.com',
  'www.thedebbie.com': 'mg.debbiechen.com'
}

class MyError {
  constructor (statusCode, message) {
    this.statusCode = statusCode
    this.body = JSON.stringify({
      error: message
    })
  }
}

exports.handler = async (event) => {
  if (!event.body) {
    console.log('no body!')
    return new MyError(400, 'no body')
  }

  const body = JSON.parse(event.body)
  const {
    to,
    cc = '',
    bcc = ''
  } = body

  console.log('checking parameters...')

  if (!domain || !to || (Array.isArray(to) && to.length < 1)) {
    if (!domain) {
      console.log('missing domain!')
      return new MyError(400, 'missing domain')
    } else {
      console.log('missing recipient!')
      return new MyError(400, 'missing recipient')
    }
  }

  const mailgun = mg({
    domain,
    apiKey: MAILGUN_KEY,
    publicApiKey: MAILGUN_PUB_KEY
  })

  console.log('reducing recipients...')

  const recipients = [to, cc, bcc].reduce((list, recipient) => {
    if (!recipient) {
      return list
    }
    if (Array.isArray(recipient)) {
      for (const value of recipient) {
        if (typeof value !== 'string') {
          console.log(`invalid type: "${value}"`)
          return new MyError(400, `invalid type: "${value}"`)
        }
      }
    } else {
      if (typeof recipient !== 'string') {
        console.log(`invalid type: "${recipient}"`)
        return new MyError(400, `invalid type: "${recipient}"`)
      }
    }
    return list.concat(recipient)
  }, [])

  console.log('parsing recipients...')

  try {
    const {
      unparsed
    } = await mailgun.parse(recipients)
    if (unparsed && unparsed.length > 0) {
      console.log('unparsable recipients')
      return new MyError(400, 'could not parse recipients')
    }
  } catch (error) {
    console.log('parsing error')
    throw error
  }

  console.log('validating recipients...')

  for (const recipient of recipients) {
    try {
      const results = await mailgun.validate(recipient, true)
      if (!results.is_valid) {
        console.log(`invalid recipient "${recipient}"`)
        return new MyError(400, `invalid recipient "${recipient}"`)
      }
    } catch (error) {
      console.log(`error validating recipient "${recipient}"`)
      throw error
    }
  }

  console.log('collecting email details...')

  const {
    from = `noreply@${domain.startsWith('mg.') ? domain.slice(3) : domain}`,
    subject = 'Mailgun Email',
    text = '',
    html = ''
  } = body

  const email = {
    from,
    to,
    subject,
    text,
    html
  }

  try {
    console.log('trying to send...')
    const success = await mailgun.messages().send(email)
    console.log('success!')
    return { statusCode: 200, body: JSON.stringify(success) }
  } catch (error) {
    if (error.message.startsWith('Domain not found')) {
      console.log(`domain not found: ${domain}`)
      return new MyError(400, error.message)
    }
    console.log('error sending mail:', error)
    throw error
  }
}
