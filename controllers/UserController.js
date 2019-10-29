const fs = require('fs');
const passport = require('passport');

const response =require('../helper/status')

const UserController = {
    landing: function(req, res, next){
        res.render('login', { title: 'Linchpins Login' });
    },
    login: function(req, res, next){
            passport.authenticate('local', {
                successRedirect: '/settings/index',
                failureRedirect: '/users/login'
            })(req, res, next);
    },
    logout: function(req, res){
        console.log(`logging out`);
        req.logout();
        res.redirect('/users/login');
    },
    signup: function(req, res){

        const rawData = fs.readFileSync('data/data.json');
        const data = JSON.parse(rawData);

        if(!req.body.username || !req.body.password || !req.body.confirm_password){
            const error = {
                status: true,
                message: `Fields are required.`
            }

            return res.render('user', {title: 'User-Settings', auth: data.auth, error: error});
        }

        const username = (req.body.username).toString().trim();
        const password = (req.body.password).toString().trim();
        const confirmPassword = (req.body.confirm_password).toString().trim();

        if(password !== confirmPassword){
            const error = {
                status: true,
                message: `Password Miss Matched.`
            }

            return res.render('user', {title: 'User-Settings', auth: data.auth, error: error});
        }

        data.auth.user = username;
        data.auth.pass = password;

        fs.writeFile('data/data.json', JSON.stringify(data), function(err){
            if(err){
                console.log(`UserController::Update error: ${err}`);
                const error = {
                    status: true,
                    message: `Internal Server Error.`
                }

                return res.render('user', {title: 'User-Settings', auth: data.auth, error: error});
            }
            const success = response.response(true, false, `User settings saved successfully!`);
            res.render('user',{title: 'User-Settings', auth: data.auth, success})
        });
    }
}

module.exports = UserController;
