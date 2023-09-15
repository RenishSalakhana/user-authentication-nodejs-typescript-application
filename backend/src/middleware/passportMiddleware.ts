import users from "../models/user";
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email: string, password: string, done: any) => {
      try {
        const user = await users.findOne({ where: { email: email } });

        if (!user) {
          return done(null, false, { message: "Incorrect email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return done(null, false, { message: "Incorrect email or password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

passport.deserializeUser((id: number, done: any) => {
  users
    .findByPk(id)
    .then((user: any) => {
      done(null, user);
    })
    .catch((err: any) => {
      done(err);
    });
});

export default passport;