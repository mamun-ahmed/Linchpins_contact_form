const fs = require('fs');
const LocalStrategy = require('passport-local').Strategy;

const rawData = fs.readFileSync('data/data.json');
const data = JSON.parse(rawData);

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: 'username'}, (user, password, done) => {

            if(data.auth.user === user){
                if(data.auth.pass === password){
                    return done(null, data.auth);
                }else{
                    return done(null, false, {message: `Password did not match`});
                }
            }else{
                return done(null, false, {message: `User did not match`});
            }
        })
    );

    passport.serializeUser(function(userData, done){
        done(null, userData.user);
    });

    passport.deserializeUser(function(user, done){
        if(user === data.auth.user){
            done(null, user)
        }
    });
}
