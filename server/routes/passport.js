const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET, 
    callbackURL: "http://localhost:8000/api/user/google/callback",  
  },
  function(accessToken, refreshToken, profile, done) {
    console.info('___new GoogleStrategy()');
    console.log('___google profile', profile);
    console.log('__google email', profile._json.email);
    User.findOne({email : profile._json.email})
    .then(result => {
      console.log('여기가결과',result);
      if (result === null) {
        // DB에 사용자 저장되어 있지 않으면 새로 저장
        const user = new User({
          email: profile._json && profile._json.email,
          id : profile.id
        })
        user.save(err => console.log(err)); 
        return done(null, profile);
      }
      return done(null, profile);
    })
    .catch(err => {
      console.log(err);
    })
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
}); 

passport.deserializeUser(function(user, done) {
  done(null, user);
});