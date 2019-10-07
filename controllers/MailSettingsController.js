const fs = require('fs');

const MailSettingsController = {
    update: function(req, res){

        const rawData = fs.readFileSync('data/data.json');
        const data = JSON.parse(rawData);

        data.mail.recipient = req.body.recipient;

        fs.writeFile('data/data.json', JSON.stringify(data), function(err){
            if(err){
                console.log(`SmtpController::Update error: ${err}`);
                res.render('mail', {title: 'SMTP-Settings', mail: data.mail});
            }
            res.redirect('/settings/mail');
        });
    }
}

module.exports = MailSettingsController;