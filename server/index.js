const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mailgunClient = require('mailgun.js').client

const {
  MAILGUN_KEY,
  MAILGUN_DOMAIN,
  CAPTCHA_KEY
} = process.env

const MAILGUN_SENDER = `noreply@${MAILGUN_DOMAIN.startsWith('mg.') ? MAILGUN_DOMAIN.slice(3) : MAILGUN_DOMAIN}`

const mailgun = mailgunClient({ username: 'api', key: MAILGUN_KEY })
const mailgunBase = {
  from: MAILGUN_SENDER,
  subject: 'Mailgun Email'
}

const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/recaptcha', (req, res, next) => {
  res.json({ sitekey: CAPTCHA_KEY })
})

app.post('/mailgun/contact', (req, res, next) => {
  const {
    from,
    to,
    text = '',
    html = ''
  } = req.body

  if (!from || !to) {
    return res.status(422).json({ error: Error('missing address') })
  }

  const email = {
    ...mailgunBase,
    to,
    subject: 'Contact Form',
    text: `${from} says...\n` + text,
    html
  }

  mailgun.messages.create(MAILGUN_DOMAIN, email)
    .then((msg) => {
      const success = {
        from: MAILGUN_SENDER,
        to: from,
        subject: 'Thanks For Contacting Debbie Chen',
        text: `We have recieved your message:\n${text}`
      }
      mailgun.messages.create(MAILGUN_DOMAIN, success)
        .then((msg) => res.json({ message: 'success' }))
    })
    .catch((error) => console.log('error?', error) || res.status(500).json({ error: error.message }))
})

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
)
