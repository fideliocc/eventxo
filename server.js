const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser")
const passport = require("passport")
const path = require("path")

const app = express()

/*** Public Routes ***/
const users = require("./routes/api/users")

/*** Admin Routes ***/
const adminusers = require("./routes/api/admin/users")
const projects = require("./routes/api/admin/projects")
const speaker = require("./routes/api/admin/speaker")


// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/* DB Config */
const db = require("./config/keys").mongoURI
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize())

// Passport config
require("./config/passport")(passport)

/*** Using Admin Routes ***/
app.use("/api/admin/users", adminusers)
app.use("/api/admin/projects", projects)
app.use("/api/admin/speaker", speaker)

/*** Using Public Routes ***/
app.use("/api/users", users)

// Server static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));
  // Any route use the static folder /index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

// App listens on port 5000
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
