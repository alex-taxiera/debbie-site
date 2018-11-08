const express = require('express')
const bodyParser = require('body-parser')
const mailgunClient = require('mailgun.js').client

const IN_PRODUCTION = process.env.NODE_ENV === 'production'

const MAILGUN_KEY = process.env[(!IN_PRODUCTION ? 'REACT_APP_' : '') + 'MAILGUN_KEY']
const MAILGUN_DOMAIN = process.env[(!IN_PRODUCTION ? 'REACT_APP_' : '') + 'MAILGUN_DOMAIN']
const MAILGUN_SENDER = `noreply@${MAILGUN_DOMAIN.startsWith('mg.') ? MAILGUN_DOMAIN.slice(3) : MAILGUN_DOMAIN}`

const mailgun = mailgunClient({ username: 'api', key: MAILGUN_KEY })
const mailgunBase = {
  from: MAILGUN_SENDER,
  subject: 'Mailgun Email'
}

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/mailgun/contact', (req, res) => {
  const {
    contacter,
    to,
    text,
    html
  } = req.body

  const email = {
    ...mailgunBase,
    to,
    subject: 'Contact Form',
    text: `${contacter} says...\n` + (text || ''),
    html: html || ''
  }
  mailgun.messages.create(MAILGUN_DOMAIN, email)
    .then((msg) => {
      const success = {
        from: MAILGUN_SENDER,
        to: contacter,
        subject: 'Thanks For Contacting Debbie Chen',
        text: `We have recieved your message:\n${text}`
      }
      mailgun.messages.create(MAILGUN_DOMAIN, success)
        .then((msg) => res.json({ message: 'success' }))
    })
    .catch((error) => res.json(500, { error: error.message }))
})

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
)
