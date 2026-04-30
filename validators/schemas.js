const { z } = require("zod");

const signupSchema = z.object({
	body: z.object({
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
			.max(255, {
				message: "Max length for passwords is 255 characters",
			}),
	}),
});

const loginSchema = z.object({
	body: z.object({
		username: z.coerce
			.string()
			.trim()
			.min(1, { message: "Username cannot be empty" })
			.max(32, { message: "Max length for usernames is 32 characters" }),
		password: z.coerce
			.string()
			.min(1, { message: "Password cannot be empty" })
			.max(255, { message: "Max length for passwords is 255" }),
	}),
});

const messageSchema = z.object({
	user: z.object({
		id: z.int().nonnegative({ message: "Author ID cannot be negative" }),
	}),
	body: z.object({
		title: z
			.string()
			.min(1, { message: "Post title cannot be empty" })
			.max(255, {
				meessage: "Max length for post titles is 255 characters",
			}),
		content: z
			.string()
			.trim()
			.min(1, { message: "Posts contents cannot be empty" }),
	}),
});

const deleteMessageSchema = z.object({
	params: z.object({
		id: z.coerce.number().min(1, { message: "Post ID cannot be negative" }),
	}),
});

const passcodeSchema = z.object({
	body: z.object({
		passcode: z
			.string()
			.min(1, { message: "Passcode cannot be empty" })
			.max(255, { message: "Max passcode length is 255 characters" }),
	}),
});

module.exports = {
	signupSchema,
	loginSchema,
	messageSchema,
	passcodeSchema,
	deleteMessageSchema,
};
