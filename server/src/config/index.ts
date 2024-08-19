import { pluginConfigSchema } from "./schema"

export interface PluginConfig {
    debug: boolean
}


export default {
    default: {
        // Debug mode
        debug: false,
       
    },
    validator(config) {
        pluginConfigSchema.validateSync(config)
    },
}
