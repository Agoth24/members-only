const validate =
	(schema) =>
	(req, res, next) => {
		const result = schema.safeParse(req);

		if (!result.success) {
			return res.status(400).json({
				status: "error",
				message: "Validation Failed",
				errors: result.error.issues.map((e) => ({
					field: e.path[0],
					message: e.message,
				})),
			});
		}
		req.validated = result.data;
		next();
	};

module.exports = validate;
