const AppError = require("../utils/applicationError");
const { INVALID_SESSION } = require("../constants/errorCodes");
const { tryCatch } = require("../utils/tryCatch");

module.exports = tryCatch(async (req, res, next) => {
  // console.log(`Session Checker: ${req.session.id}`);
  // console.log(req.session);
  if (req.session.profile) {
    console.log(`Found User Session`);
    next();
  } else {
    throw new AppError(INVALID_SESSION, "Need to login first!!", 400);
    // console.log(`No User Session Found`);
    // res.redirect("/login");
  }
});
