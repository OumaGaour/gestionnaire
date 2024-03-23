const router = require("express").Router();
const {validate, Admin } = require("../models/admin");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let admin = await Admin.findOne({ email: req.body.email });
		if (admin)
			return res
				.status(409)
				.send({ message: "Admin with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		admin = await new Admin({ ...req.body, password: hashPassword }).save();

		const token = await new Token({
			adminId: admin._id,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		const url = `${process.env.BASE_URL}admins/${admin.id}/verify/${token.token}`;
		await sendEmail(admin.email, "Verify Email", url);

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const admin = await Admin.findOne({ _id: req.params.id });
		if (!admin) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			adminId: admin._id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		await Admin.updateOne({ _id: admin._id, verified: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;