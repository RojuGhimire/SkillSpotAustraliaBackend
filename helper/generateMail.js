const nodemailer = require('nodemailer');
const mailGen = require('mailgen');
const { mailGenConfig, mailConfig } = require('../config/mailOptions');

const generateMail = async (email, pass) => {
    // Creating a transporter
    const transporter = nodemailer.createTransport(mailConfig);

    // Basic mailgen configuration
    const mailGenerator = new mailGen(mailGenConfig);

    let response = {
        body: {
            title: 'Welcome to Skill Spot Australia',
            intro: 'We\'re very excited to have you onboard. Your client portal account has been created successfully. Your login credentials are given below:',
            table: {
                data: [
                    {
                        email: email,
                        password: pass
                    },
                ]
            },
            action: {
                instructions: 'Login to your account using following link',
                button: {
                    color: '#22BC66',
                    text: 'Login To Client Portal',
                    link: 'https://skill-spot-aus.vercel.app/'
                }
            },
            outro: `Need help, or have questions? Contact us via this <a href='https://skill-spot-aus.vercel.app/'>Link.</a>`
        }
    }

    const mail = mailGenerator.generate(response);

    let message = {
        from: '"Skill Spot Australia" <bloggingforeverything@gmail.com>',
        to: email,
        subject: 'Client Portal Account Created Successfully',
        html: mail
    }

    try {
        const result = await transporter.sendMail(message);
        if (!result) return res.status(400).json({ 'error': 'An Unknown error occured try again' });
    } catch (err) {
        return res.status(500).json({ 'error': err.message });
    }
}

module.exports = generateMail;