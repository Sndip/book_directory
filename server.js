// *Dotenv
require("dotenv").config();

// *Packages
const express = require("express");
const session = require("express-session");

// *Import modules
const errorHandler = require("./middleware/errorHandler");

// !Production
const db = require("./config/db.config");
db.sync()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log(`Entered Wrong database credentials:\n${err}`));

// *Test
// db.authenticate()
//   .then(() => console.log("Database Connected..."))
//   .catch((err) => console.error(err));

const app = express();

// *Middleware
app.use(express.json());

app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // This will only work if you have https enabled!
      maxAge: 60000,
    },
  })
);

// *Routes
const authRoutes = require("./routes/auth.routes");

// *API
app.use("/api/v1", authRoutes);

// *Error Handler.
app.use(errorHandler);

// *Listen on pc port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
