const { Router } = require("express");
const validate = require("../validators/validate");
const { passcodeSchema } = require("../validators/schemas");
const {
	makeUserMember,
	makeUserAdmin,
	isMember,
	authenticateMemberPasscode,
	authenticateAdminPasscode,
} = require("../controllers/authController");

const memberRouter = Router();

// Membership authentication
memberRouter.post(
	"/",
	validate(passcodeSchema),
	authenticateMemberPasscode,
	makeUserMember,
);

// Admin authentication
memberRouter.post(
	"/admin",
	isMember,
	validate(passcodeSchema),
	authenticateAdminPasscode,
	makeUserAdmin,
);

module.exports = memberRouter;
