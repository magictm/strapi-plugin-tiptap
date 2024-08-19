import Joi from 'joi'

export const pluginConfigSchema = Joi.object({
    debug: Joi.boolean().default(false),
})
