const fs = require('fs');
const path = require('path');
const response=require('../helper/status')

const MailSettingsController = {
    update: function(req, res){

        const rawData = fs.readFileSync('data/data.json');
        const data = JSON.parse(rawData);
        let flag = true;

        const recipients= req.body.recipient;
        
        if(recipients == undefined){
            const err = response.response(false, true, `Minimum On field required`);
            return res.render('mail',{title: 'Mail-Settings', mail: data.mail, err});
        }
        
        recipients.forEach(recipient => {
            if(recipient == null || recipient == undefined || recipient == "" ){
                flag = false; 
                return;                   
            }             
        });

        if(flag == false){
            const err = response.response(false, true, `One Mail field is empty! check manually.`);
            return res.render('mail',{title: 'Mail-Settings', mail: data.mail, err});
        }

        if(req.body.mail_sender == null || req.body.mail_sender == undefined || req.body.mail_sender == "" ){
            const err = response.response(false, true, `Mail Sender address field required.`);
            return res.render('mail',{title: 'Mail-Settings', mail: data.mail, err});
        }

        data.mail.recipient = req.body.recipient;
        data.mail.from = req.body.mail_sender;

        fs.writeFile('data/data.json', JSON.stringify(data), function(err){
            if(err){
                console.log(`SmtpController::Update error: ${err}`);
                res.render('mail', {title: 'Mail-Settings', mail: data.mail});
            }
            const success = response.response(true, false, `Mail settings saved successfully!`);
            res.render('mail',{title: 'Mail-Settings', mail: data.mail, success})
        });
    }
}

module.exports = MailSettingsController;
