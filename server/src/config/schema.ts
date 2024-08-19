import * as yup from 'yup'

export const pluginConfigSchema = yup.object().shape({
    debug: yup.boolean().default(false),
})
