const { Router } = require("express");
const validate = require("../validators/validate");
const { passcodeSchema } = require("../validators/schemas");
const {
	makeUserMember,
	makeUserAdmin,
	isMember,
	authenticateMember,
	authenticateAdmin,
} = require("../controllers/authController");

const memberRouter = Router();

// Membership authentication
memberRouter.post(
	"/",
	validate(passcodeSchema),
	authenticateMember,
	makeUserMember,
);

// Admin authentication
memberRouter.post(
	"/admin",
	isMember,
	validate(passcodeSchema),
	authenticateAdmin,
	makeUserAdmin,
);

module.exports = memberRouter;
