import { prefixPluginTranslations } from '@strapi/helper-plugin'

import pluginPkg from '../../package.json'
import { pluginId } from './pluginId'
import Initializer from './components/Initializer'
import { PluginIcon } from './components/PluginIcon'
import { getTranslation } from './utils/getTranslation'

const name = pluginPkg.strapi.name

export default {
    register(app: any) {
        app.registerPlugin({
            id: pluginId,
            name,
        })
    },

    bootstrap(app: any) {},

    async registerTrads(app: any) {
        const { locales } = app

        const importedTranslations = await Promise.all(
            (locales as string[]).map((locale) => {
                return import(`./translations/${locale}.json`)
                    .then(({ default: data }) => {
                        return {
                            data: prefixPluginTranslations(data, pluginId),
                            locale,
                        }
                    })
                    .catch(() => {
                        return {
                            data: {},
                            locale,
                        }
                    })
            })
        )

        return importedTranslations
    },
}
