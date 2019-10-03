let express = require("express"),
    path = require('path'),
    fs = require('fs'),
    multer = require('multer'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');

let app = express();

app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "linchpins.com"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

function getFileName(originalName){
    let output = originalName.substr(0, originalName.lastIndexOf('.')) || originalName;
    output = output.replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
    return output;
}


//Settings of multer to upload file inside the own server
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, __dirname + '/public/uploads');
    },
    filename: function(req, file, cb){
        cb(null,
            getFileName(file.originalname) +
            '-' +
            Date.now() +
            '.'+
            file.originalname.substr((file.originalname.lastIndexOf('.')+1))
            ); //Making last part of filename random to make it unique
    }
});

const upload = multer({storage: storage});


// We need to only do this once at start
/* const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        // should be replaced with real sender's account
        user: 'pixel.wax.shop@gmail.com',
        pass: 'linchpinspass123'
    },
    tls:{
        rejectUnauthorized: false
    }
}); */

//Another test gmail smtp
const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        // should be replaced with real sender's account
        user: 'mamun.dev.less@gmail.com',
        pass: 'AzYm12X?@12'
    },
    tls:{
        rejectUnauthorized: false
    }
});

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
let newDate = new Date(Date.now());


app.post('/send-email', upload.single('attachment'), function(req, res) {


    let attachment;
    if(req.file !== undefined){
        attachment = req.file.filename;
    }

    // ['pixel.wax.shop@gmail.com', 'irtacreative@gmail.com', 'mvitale@linchpins.com', 'dorota@linchpins.com']
    let mailOptions = {
        from: `"no-reply" <pixel.wax.shop@gmail.com>`,
        to: ['pixel.wax.shop@gmail.com', 'irtacreative@gmail.com', 'mvitale@linchpins.com', 'dorota@linchpins.com'],
        subject: `Inquiry ${newDate}`,
        html: `User has sent an inquiry. <br/>Name: ${req.body.name}<br/>Email: ${req.body.email}<br/>Message: ${req.body.message}`,
    }

    if(attachment !==undefined){
        mailOptions.attachments = [
            {
                filename: attachment,
                path: __dirname + '/public/uploads/'+ attachment
            }
        ]
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.sendStatus(500);
        }

        console.log(`Mail sent to: ${info.messageId}`);

        if(attachment !== undefined){
            fs.unlink(`${__dirname}/public/uploads/${attachment}`, (err) => {
                if(err){
                    console.log(`Can not delete file form uploads folder. Delete it manually. Error: ${err}`);
                }
                return;
            });
        }
        res.sendStatus(200); // We can just return 200 here so we know request was success
    });
});

let port = process.env.PORT;
if (port == null || port == "") {
    port = 8000;
}

let server = app.listen(port, function() {
    let port = server.address().port;
    console.log("Server started at http://localhost:%s", port);
});
