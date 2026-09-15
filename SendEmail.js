const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'shrav8426@gmail.com',
            pass: 'pisv skjs uecy bktv',
        },
    });

    const mailOptions = {
        from: 'shrav8426@gmail.com',
        to,
        subject,
        text,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail };