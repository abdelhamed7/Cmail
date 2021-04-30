const express = require("express");
const mongoose = require("mongoose");
const keys = require("./Config/keys");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/User");
require("./Services/Passport");

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000 * 60,
    keys: [keys.cookieKey],
  })
);
app.use(passport.initialize());

app.use(passport.session());

require("./Routes/authRoutes")(app);
mongoose.connect(keys.mongoURI);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
