const { Router } = require("express");
const validate = require("../validators/validate");
const { passcodeSchema } = require("../validators/schemas");
const {
	makeUserMember,
	makeUserAdmin,
	isMember,
} = require("../controllers/authController");

const memberRouter = Router();

memberRouter.post("/", validate(passcodeSchema), makeUserMember);
memberRouter.post("/admin", isMember, validate(passcodeSchema), makeUserAdmin);

module.exports = memberRouter;
