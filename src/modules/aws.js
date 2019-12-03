import superagent from 'superagent'

const withProxy = (path) => process.env.AWS_PROXY + path

export function sendEmail ({ token, to, from, cc, bcc, subject, text, html }) {
  return superagent
    .post(withProxy('/recaptcha/mailgun/send'))
    .set('recaptcha-token', token)
    .send({
      domain: process.env.MAILGUN_DOMAIN,
      to,
      from,
      cc,
      bcc,
      subject,
      text,
      html
    })
    .then((res) => {
      console.log('res', res)
      return res.body.body.message
    })
}
