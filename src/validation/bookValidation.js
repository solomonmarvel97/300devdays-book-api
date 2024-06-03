const Joi = require('joi');

const bookSchema = Joi.object({
    title: Joi.string().min(3).max(255).required(),
    author: Joi.string().min(3).max(255).required(),
    publishedDate: Joi.date().required(),
    pages: Joi.number().integer().min(1).required(),
    genre: Joi.string().min(3).max(255).required()
});

module.exports = bookSchema;

