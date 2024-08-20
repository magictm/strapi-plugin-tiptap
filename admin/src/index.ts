import { prefixPluginTranslations } from '@strapi/helper-plugin'

import pluginPkg from '../../package.json'
import { pluginId } from './pluginId'
import Initializer from './components/Initializer'
import { PluginIcon } from './components/PluginIcon'
import { getTranslation } from './utils/getTranslation'
import MyWysiwyg from './components/Wysiwyg' // this file contains the logic for your new WYSIWYG

const name = pluginPkg.strapi.name

const settingsPageComponent = async () => {
    const component = await import(
        /* webpackChunkName: "strapi-tiptip-editor-settings-page" */ './pages/App'
    )

    return component
}

export default {
    register(app: any) {
        app.createSettingSection(
            {
                id: pluginId,
                intlLabel: {
                    id: getTranslation('settings.menu.label'),
                    defaultMessage: 'TipTap Editor by MagicTM',
                },
            },
            [
                // {
                //     intlLabel: {
                //         id: getTranslation('settings.menu.overview'),
                //         defaultMessage: 'Overview',
                //     },
                //     id: 'settings',
                //     to: '/settings/tiptap-editor/overview',
                //     Component: overviewPageComponent,
                //     permissions: [],
                // },
                {
                    intlLabel: {
                        id: getTranslation('settings.menu.settings'),
                        defaultMessage: 'Settings',
                    },
                    id: 'settings',
                    to: '/settings/' + pluginId,
                    Component: settingsPageComponent,
                    permissions: [],
                },
            ]
        )

        app.addFields({ type: 'wysiwyg', Component: MyWysiwyg })

        app.registerPlugin({
            id: pluginId,
            initializer: Initializer,
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
