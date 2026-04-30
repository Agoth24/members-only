const {Router} = require("express");
const validate = require("../validators/validate");
const { passcodeSchema } = require("../validators/schemas");

const memberRouter = Router();

memberRouter.post("/", validate(passcodeSchema))


module.exports = memberRouter;