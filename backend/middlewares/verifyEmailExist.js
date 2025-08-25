import Organisation from '../models/Org.model.js'; // Adjust the path to your model

const verifyEmailExists = async (req, res, next) => {

    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ 
            message: "Bad Request. Email is required in the request body.",
            success: false
        });
    }

    try {

        const user = await Organisation.findOne({ email });

        if (!user) {
            return res.status(401).json({ 
                message: "Authentication Failed. User not found.",
                success: false
            });
        }
        req.user = user;
        

        next();
    } catch (error) {
        console.error("Error in verifyEmailExists middleware:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

export default verifyEmailExists;