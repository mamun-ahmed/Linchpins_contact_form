const fs = require('fs');
const path = require('path');

const MailSettingsController = {
    update: function(req, res){
        
        console.log(__dirname);
        console.log(path.join(__dirname+'../data', 'data.json'));
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
