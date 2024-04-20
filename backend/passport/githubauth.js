import dotenv from 'dotenv';
import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import User from '../models/UserModel.js';

dotenv.config()

console.log(process.env.GITHUB_CLIENT_SECRET)
console.log(process.env.GITHUB_CLIENT_SECRET)

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/auth/github/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    const user = await User.findOne({ username: profile.username})
    // if user is not in the data base then sign him up
    if (!user) {
      // we are just create the user but not being save in the data base yet
      const newUser = new User({
        name: profile.displayName,
        username: profile.username,
        profileUrl: profile.profileUrl,
        avatarUrl: profile.photos[0].value,
        likeProfiles: [],
        likedBy: [],
      })

      // now were saving the user to the data base
      await newUser.save()
      done(null, newUser)
    } else {
      // user already exist so he's just logging in
      done(null, user)
    }
  }
));