const fs = require('fs');

const SmtpSettingsController = {
    update: function(req, res){

        const rawData = fs.readFileSync('data/data.json');
        const data = JSON.parse(rawData);

        if(!req.body.smtp_host || !req.body.smtp_port || !req.body.smtp_user || req.body.smtp_pass){
            const error = {
                status: true,
                message: `Fields are required.`
            }
            return res.render('index', {title: 'SMTP-Settings', smtp: data.smtp, error: error});
        }

        data.smtp.host = (req.body.smtp_host).toString().trim();
        data.smtp.port = (req.body.smtp_port).toString().trim();
        data.smtp.user = (req.body.smtp_user).toString().trim();
        data.smtp.pass = (req.body.smtp_pass).toString().trim();

        if(req.body.tls_secure){
            data.smtp.tls = true;
        }else{
            data.smtp.tls = false;
        }

        // console.log(data.smtp);

        fs.writeFile('data/data.json', JSON.stringify(data), function(err){
            if(err){
                console.log(`SmtpController::Update error: ${err}`);
                res.render('index', {title: 'SMTP-Settings', smtp: data.smtp});
            }
            res.redirect('/settings/index');
        });
    }
}

module.exports = SmtpSettingsController;
