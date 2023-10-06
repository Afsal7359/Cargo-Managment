const dotenv=require('dotenv');
const contact = require('../models/contact'); // Import your contact model
const nodemailer = require('nodemailer');
const booking = require('../models/booking');
dotenv.config()
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
module.exports={

addContact:async (req, res) => {
  
    const { name, email, subject, number, message } = req.body;

    // Save contact to the database
    await contact.create({ name, email, subject, number, message });
    req.session.successMessage2 = 'Contact form submitted';
    res.redirect('/contact')
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
      


    },
 
    
cargobooking : async (req, res) => {
  
      const { from, destination, box, name, number,email,details } = req.body;
  
      // Save contact to the database
      await booking.create({from, destination, box, name, number,email,details  });
     
      req.session.successMessage = 'Cargo Booked Successfully';

res.redirect('/');


     
     
    console.log('booking saved scucessfully');
        
        const mailOptions = {
          from: process.env.EMAIL_USER,
          subject:"New Cargo Booking",
          to: 'saidmuhammad4771@gmail.com',
         
          html: `
            <h1>Cargo Booking</h1><br/>
            from: ${from}<br/><br/>
            destination: ${destination}<br/><br/>
            N.O of box: ${box}<br/><br/>
            name: ${name}<br/><br/>
            email: ${email}<br/><br/>
            details:${details}
          `
        }; 
      
        
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response );
          }
        });
        
  
  
      },  

}



