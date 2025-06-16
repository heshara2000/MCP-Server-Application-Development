// const express = require('express');
// const router = express.Router();

// const nodemailer = require('nodemailer');

// // Create a transporter object using SMTP
// const transporter = nodemailer.createTransport({
//     service: 'gmail', // Use your email service
//     auth: {
//         user: process.env.EMAIL, // Your email address
//         pass: process.env.EMAIL_PASSWORD // Your email app password
//     },

// });

// router.post('/send-email', async (req, res) => {
//     const {recipient, subject, body} = req.body;
//     try {
//         await transporter.sendMail({
//             from: process.env.EMAIL, // Sender address
//             to: recipient, // List of recipients
//             subject: subject, // Subject line
//             text: body, // Plain text body
//         });
//         res.send({message : 'Email sent successfully!'});
//     }
//     catch (error){
//         res.status(500).json({error: 'An error occurred while sending the email.'});
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const axios = require('axios');

router.post('/send-email', async (req, res) => {
  const { recipient, subject, body } = req.body;

  const serviceID = process.env.EMAILJS_SERVICE_ID;
  const templateID = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;

  const payload = {
    service_id: serviceID,
    template_id: templateID,
    user_id: publicKey,
    template_params: {
      to_email: recipient,
      subject: subject,
      message: body,
    },
  };

  try {
    const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send', payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      res.send({ message: 'Email sent successfully via EmailJS!' });
    } else {
      res.status(500).json({ error: 'Failed to send email.' });
    }
  } catch (error) {
    console.error('EmailJS Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'An error occurred while sending the email.' });
  }
});

module.exports = router;
