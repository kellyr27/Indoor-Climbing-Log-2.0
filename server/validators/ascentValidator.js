const Joi = require('joi');
const routeValidator = require('./routeValidator');

const ascentSchema = Joi.object({
    route: routeValidator.required(),
    date: Joi.date().required(),
    tickType: Joi.string().valid('redpoint', 'flash', 'hangdog', 'attempt').required(),
    notes: Joi.string().optional()
});

module.exports = ascentSchema;