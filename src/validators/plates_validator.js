const Joi = require('@hapi/joi');

const plateValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(50).required(),
        price: Joi.number().required(),
        description: Joi.string().max(200).required(),
        place_id: Joi.number().required()
    });
    return schema.validate(data);
}

module.exports.plateValidator = plateValidator;