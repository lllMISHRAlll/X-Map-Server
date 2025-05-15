import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
      clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          const salt = await bcrypt.genSalt(10);

          //   Generating a random password for the user and hashing it and then storing it in the db
          const hashedPassword = await bcrypt.hash(
            crypto.randomBytes(20).toString("hex"),
            salt
          );

          console.log("profile", profile);

          user = await User.create({
            username: profile.displayName,
            email: profile.emails[0].value,
            password: hashedPassword,
            isOAuth: true,
            googleId: profile.id,
            profilePic: profile?.photos[0]?.value,
          });
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});
