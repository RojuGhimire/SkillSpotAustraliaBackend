const mailConfig = {
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
}

const mailGenConfig = {
    theme: 'default',
    product: {
        name: 'Skill Spot Australia',
        link: 'https://skill-spot-aus.vercel.app/',
    }
}

module.exports = { mailConfig, mailGenConfig }