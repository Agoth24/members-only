const { z } = require("zod");

const signupSchema = z.object({
	firstName: z
		.string()
		.trim()
		.min(1, { message: "First name cannot be empty" })
		.max(32, { message: "Max length for first name is 32 characters" }),
	lastName: z
		.string()
		.trim()
		.min(1, { message: "Last name cannot be empty" })
		.max(32, { message: "Max length for last name is 32 characters" }),
	username: z.coerce
		.string()
		.trim()
		.min(1, { message: "Username cannot be empty" })
		.max(32, { message: "Max length for usernames is 32 characters" }),
	password: z.coerce
		.string()
		.min(1, { message: "Password cannot be empty" })
		.max(255, { message: "Max length for passwords is 255 characters" }),
});

const loginSchema = z.object({
	username: z.coerce
		.string()
		.trim.min(1, { message: "Username cannot be empty" })
		.max(32, { message: "Max length for usernames is 32 characters" }),
	password: z.coerce
		.string()
		.min(1, { message: "Password cannot be empty" })
		.max(255, { message: "Max length for passwords is 255" }),
});

const messageSchema = z.object({
	authorId: z.int().nonnegative({ message: "Author ID cannot be negative" }),
	title: z
		.string()
		.min(1, { message: "Post title cannot be empty" })
		.max(255, { meessage: "Max length for post titles is 255 characters" }),
	content: z
		.string()
		.trim()
		.min(1, { message: "Posts contents cannot be empty" }),
});

const passcodeSchema = z.object({
	// TODO: add Zod validation for custom admin passcode
	passcode: z
		.string()
		.min(1, { message: "Passcode cannot be empty" })
		.max(255, { message: "Max passcode length is 255 characters" }),
});

module.exports = {
	signupSchema,
	loginSchema,
	messageSchema,
	passcodeSchema,
};
