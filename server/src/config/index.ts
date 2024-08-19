import { pluginConfigSchema } from './schema'
import Joi from 'joi'

export interface PluginConfig {
    debug: boolean
}

export default {
    default: {
        // Debug mode
        debug: false,
    },
    validator(config) {
        const { error, value } = pluginConfigSchema.validate(config)

        if (Joi.isError(error)) {
            throw new Error(error.message)
        }
    },
}
