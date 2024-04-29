const CustomError = require('../utils/CustomError');

exports.validateSchema = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
        throw new CustomError(error.details[0].message, 400);
    } else {
        next();
    }
}