const {Router} = require("express");
const validate = require("../validators/validate");
const { passcodeSchema } = require("../validators/schemas");

const userRouter = Router();

userRouter.post("/", validate(userSc))


module.exports = userRouter;