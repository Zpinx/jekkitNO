const passport = require("passport");
const env      = require('dotenv').config();
const { OIDCStrategy } = require("passport-azure-ad");

const azureADOptions = {
  identityMetadata: "https://login.microsoftonline.com/7cd6d84a-2a63-49f6-8ff4-ccc63f6d3cec/v2.0/.well-known/openid-configuration",
  clientID: env.clientID,
  responseType: "code",
  responseMode: "form_post",
  redirectUrl: "jekkit.azurewebsites.net",
  allowHttpForRedirectUrl: true, // Set to false in production
  clientSecret: env.clientSecret,
  validateIssuer: false, // Set to true to validate the issuer
  passReqToCallback: false,
};

passport.use(
  new OIDCStrategy(azureADOptions, function (iss, sub, profile, accessToken, refreshToken, done) {
    // Implement your verification or user creation logic here
    // The `profile` object contains user information returned by Azure AD
    // Call `done` with the user object to complete the authentication process
    done(null, profile);
  })
);

passport.serializeUser(function (user, done) {
  // Serialize the user object to store in the session
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // Deserialize the user object from the session
  done(null, user);
});

module.exports = passport;