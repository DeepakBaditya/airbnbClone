const Joi = require('joi');
// used for server side schema validation

//here we a define server side schema validation for the listingSchema
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        description : Joi.string().required(),
        image : Joi.string().allow("",null),
        price : Joi.number().required().min(0),
        location : Joi.string().required(),
        country : Joi.string().required(),
    }).required()
})