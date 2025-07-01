// src/utils/mailer.js
const nodemailer = require('nodemailer');

async function sendTestEmail(toEmail) {
  // Crée un compte ethereal temporaire
  let testAccount = await nodemailer.createTestAccount();

  // Configure le transporteur SMTP
  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });

  // Envoi du mail
  let info = await transporter.sendMail({
    from: '"Adaence" <adaence@example.com>',
    to: toEmail,
    subject: 'Test Nodemailer Ethereal',
    text: 'Hello ! Ceci est un mail de test depuis Adaence.',
    html: '<b>Hello ! Ceci est un mail de test depuis Adaence.</b>',
  });

  return nodemailer.getTestMessageUrl(info);
}

module.exports = { sendTestEmail };

