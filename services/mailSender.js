const nodeMailer = require('nodemailer');
const fs = require('fs');

const rawData = fs.readFileSync('data/data.json');
const data = JSON.parse(rawData);

 mailSender = {
    config: {
            host: data.smtp.host,
            port: data.smtp.port,
            secure: true,
            auth: {
                user: data.smtp.user,
                pass: data.smtp.pass
            }
    },

    tls: function(option){
        if(option == false){
            mailSender.config.tls = {
                rejectUnauthorized: false
            }
        }else{
            delete mailSender.config.tls;
        }
    },

    transporter: function(){
        mailSender.tls(data.smtp.tls);
        return nodeMailer.createTransport(mailSender.config)
    },

    mailOptions: function(name, email, message) {
        const newDate = new Date(Date.now());
        const recipient = data.mail.recipient;
        return {
            from: `"no-reply" ${data.mail.from}`,
            to: recipient,
            subject: `Inquiry ${newDate}`,
            html: `User has sent an inquiry. <br/>Name: ${name}<br/>Email: ${email}<br/>Message: ${message}`,
        }
    }
}

module.exports = mailSender;
