import joi from "joi";

const authSchema = joi.object({
    organisationName: joi.string().min(3).max(100),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    role: joi.string().valid("admin", "donor", "reciever"),
    image: joi.string()
})

const SignValidation = (req, res, next) => {
    const { error, value } = authSchema.validate(req.body);
    
    if (error) {
        return res.status(400).json({
            message: error.details[0].message,
            success: false,
        });
    }
    req.body = value;
    
    next();
};

export default SignValidation;