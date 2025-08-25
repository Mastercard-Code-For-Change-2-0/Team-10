import Organisation from "../models/Org.model.js";
import bcrypt from "bcryptjs";

const SignUpController = async (req, res) => {
    try {
        const { organisationName, email, password, role, image } = req.body;
        const existingOrg = await Organisation.findOne({ email });
        
        if (existingOrg) {
            return res.status(400).json({
                message: "Account with this email already exists.",
                success: false,
                exists: true
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newOrg = new Organisation({
            organisationName : organisationName,
            email : email,
            password: hashedPassword,
            role : role,
            image : image
        });

        await newOrg.save();
        res.json({ 
            message: "Account created successfully.",
            success: true,
            data: {
                id: newOrg._id,
                email: newOrg.email
            }
        });

    } catch (error) {
        console.error("Error in SignUpController:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false,
            error: error.message
        });
    }
};

export default SignUpController;