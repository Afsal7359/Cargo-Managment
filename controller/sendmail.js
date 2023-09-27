const dotenv=require('dotenv');
const contact = require('../models/contact'); // Import your contact model
const nodemailer = require('nodemailer');
dotenv.config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });


const addContact = async (req, res) => {
  
    const { name, email, subject, number, message } = req.body;

    // Save contact to the database
    await contact.create({ name, email, subject, number, message });
    res.redirect('/')
  console.log('contact saved scucessfully');
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'saidmuhammad4771@gmail.com',
        subject: `${subject}`,
        html: `
          <h1>Contact Form Enquiry</h1><br/>
          Name: ${name}<br/><br/>
          Email: ${email}<br/><br/>
          Subject: ${subject}<br/><br/>
          Number: ${number}<br/><br/>
          Message:<p>${message}</p>
        `
      }; 
    
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response );
        }
      });
      


    };
module.exports = { addContact };



