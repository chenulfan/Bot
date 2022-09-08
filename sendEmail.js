const chalk = require('chalk');
const nodemailer = require('nodemailer');
require('dotenv').config();


const sendEmail = (imgUrl) => {
    console.log(chalk.yellow('📧 init email service...'));
    let transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.GMAIL_USERNAME,
            pass: process.env.GMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: 'Mta-course-bot@gmail.com', 
        to: 'chenulfan@gmail.com', 
        subject: 'Hello from your favorite BOT', 
        text: 'we added down below screenshot of the confirmation of the course.', 
        attachments: [{
            filename: imgUrl,
            path: __dirname + '/screenshots/' + imgUrl,
            cid: 'pic'
        }]
    };

    transport.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(chalk.red(err))
        }
        else {
            console.log(chalk.green('📨 Email successfully sent'));
        }
    });
}

module.exports = sendEmail;