const bcrypt = require("bcrypt");
const AppError = require("../utils/applicationError");
const { tryCatch } = require("../utils/tryCatch");
const { INVALID_USER_PASSWORD } = require("../constants/errorCodes");
const { validateLoginRegister } = require("../utils/joiValidate");
const { validateLogin } = require("../utils/joiValidate");

// *Models
const Login = require("../models/login.model");

// *Select All Users
exports.getUsers = tryCatch(async (req, res, next) => {
  const showUsers = await Login.findAll();
  if (!showUsers) throw error;
  res.status(200).json(showUsers);
});

// *Post Login
exports.postLogin = tryCatch(async (req, res, next) => {
  const { username, password } = req.body;

  //Validation
  const { error } = validateLogin(req.body);
  if (error) throw error;

  const user = await Login.findOne({ where: { username } });
  if (!user)
    throw new AppError(
      INVALID_USER_PASSWORD,
      "Username not registered!! Please Register your username.",
      400
    );

  const doMatch = await bcrypt.compare(password, user.password);
  if (!doMatch) {
    throw new AppError(
      INVALID_USER_PASSWORD,
      "Password doesn't match!! Please Re-enter your password.",
      400
    );
  }

  //* Generate Auth Token
  req.session.profile = user;
  console.log(req.session);
  return res.status(200).json({
    success: true,
    message: "Successfully logged in!!",
  });
});

//* Post Register
exports.postRegister = tryCatch(async (req, res, next) => {
  const { username, password, role } = req.body;

  //Validation
  const { error } = validateLoginRegister(req.body);
  if (error) throw error;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await Login.create({
    username,
    password: hashedPassword,
    role,
  });

  return res.status(200).json({
    success: true,
    message: `Account ${username} has been created.`,
    user: { username, role },
  });
});

//* Post logout
exports.getLogout = tryCatch(async (req, res, next) => {
  req.session.destroy(function (err) {
    if (err) throw err;
    return res.status(200).json({
      success: true,
      message: "Successfully logout",
    });
  });
});
