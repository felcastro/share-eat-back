const Joi = require('@hapi/joi');

const plateValidator = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(1).max(80).required()
            .messages({
                'string.base': 'Nome deve ser do tipo texto',
                'string.empty': 'Nome não pode estar vazio',
                'string.min': 'Nome deve conter ao menos 1 caractere',
                'string.max': 'Nome deve conter até 80 caracteres',
                'any.required': 'Nome é obrigatório'
            }),
        price: Joi.number().precision(2).required()
            .messages({
                'number.base': 'Preço deve ser do tipo numérico',
                'number.precision': 'Preço não pode conter mais de 2 casas decimais',
                'any.required': 'Preço é obrigatório'
            }),
        description: Joi.string().max(200).required()
            .messages({
                'string.base': 'Descrição deve ser do tipo texto',
                'string.empty': 'Descrição não pode estar vazia',
                'string.max': 'Descrição deve conter até 200 caracteres',
                'any.required': 'Descrição é obrigatória'
            }),
        place_id: Joi.number().required()
            .messages({
                'number.base': 'ID do local deve ser do tipo numérico',
                'any.required': 'ID do local é obrigatório'
            })
    });
    return schema.validate(data, {convert: false});
}

module.exports.plateValidator = plateValidator;