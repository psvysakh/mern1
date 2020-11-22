const passport=require('passport'); //  passport package

require('../passport'); // calling config 

module.exports.passportJwt=function(req, res, next) {
  
    passport.authenticate('jwt', function(err, user, info) { // eg: calling config through package
        if (err) { 
            console.log(`Internal Error`,err);
            return next(err); }
        if (!user) { 
            console.log(`User Status`,user,info.message);
            return res.status(400).json({error:info.message});}
            console.log(`User Status`,user,info.message);
       req.user=user;
       req.message=info.message;
       next();
      })(req, res, next);
    }

module.exports.passportSignin=function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) { 
            console.log(`Internal Error`,err);
            return next(err); }
        if (!user) { 
            console.log(`User Status`,user,info.message);
            return res.status(400).json({error:info.message});}
       req.user=user;
       req.message=info.message;
       next();
      })(req, res, next);
    }
module.exports.passportGoogle =function(req, res, next) {
    passport.authenticate('googleToken', function(err, user, info) {
        if (err) { 
            console.log(`Internal Error`,err);
            return next(err); }
        if (!user) { 
            console.log(`User Status`,user,info.message);
            return res.status(400).json({error:info.message});}
       req.user=user;
       req.message=info.message;
       next();
      })(req, res, next);
    } 