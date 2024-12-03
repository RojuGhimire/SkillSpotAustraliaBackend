const nodemailer = require('nodemailer');
const mailGen = require('mailgen');
const { mailGenConfig, mailConfig } = require('../config/mailOptions');

const forgetPassMail = async (email, pass) => {
    // creating transporter
    const transporter = nodemailer.createTransport(mailConfig);

    // basic mailgen config
    const mailGenerator = new mailGen(mailGenConfig);

    let response = {
        body: {
            title: 'Password Reset Successful',
            intro: 'Your password was reset successfully. Your login credentials are given below:',
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
        subject: 'Password Reset Successful',
        html: mail
    }

    try {
        const result = await transporter.sendMail(message);
        if (!result) return res.status(400).json({ 'error': 'An Unknown error occured try again' });
    } catch (err) {
        return res.status(500).json({ 'error': err.message });
    }
}

module.exports = forgetPassMail;