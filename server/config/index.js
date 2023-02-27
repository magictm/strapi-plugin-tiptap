'use strict'

const Joi = require('joi')

const configSchema = Joi.object({
    username: Joi.string(),
})

module.exports = {
    default: {},
    validator(config) {
        // console.log('config', config)
        const { error, value } = configSchema.validate(config)

        if (Joi.isError(error)) {
            throw new Error(error)
        }
    },
}
