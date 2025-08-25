import Organisation from "../models/Org.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Organisation.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "User does not exist, please sign up",
                success: false,
                exist: false
            });
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);
        if (!isPasswordEqual) {
            return res.status(401).json({
                message: "Password or email does not match",
                success: false
            });
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        return res.status(200).json({
            message: "Login successful",
            success: true,
            token: jwtToken
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
};

export default LoginController;