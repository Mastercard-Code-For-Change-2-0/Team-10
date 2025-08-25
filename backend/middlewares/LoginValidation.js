import joi from "joi";

const authSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
})

const LoginValidation = (req, res, next) => {
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

export default LoginValidation;