/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types';

import { Box, Button, ContentLayout, HeaderLayout, Main, Typography } from '@strapi/design-system'
import { LoadingIndicatorPage } from '@strapi/helper-plugin'
import { useConfig } from '../../hooks/useConfig'
import { pluginId } from '../../pluginId'

const Settings = () => {
    const [defaultSettings, setDefaultSettings] = useState<any>(null)

    const {
        config: { isLoading, isError, data: config },
    } = useConfig()

    useEffect(() => {
        if (config) {
            setDefaultSettings(config)
        }
    }, [config])

    return (
        <Main aria-busy={isLoading}>
            <HeaderLayout
                title={'TipTap Editor Settings'}
                subtitle={"Customize your editing experience with TipTap Editor's Settings"}
                primaryAction={<Button disabled>Save</Button>}
            />

            {!isLoading && (
                <ContentLayout>
                    <Box
                        paddingTop={6}
                        paddingBottom={6}
                        paddingLeft={7}
                        paddingRight={7}
                        hasRadius
                        background="neutral0"
                        shadow="filterShadow"
                    >
                        <Typography variant="delta">Settings</Typography>
                        <Box marginTop={4}>
                            <Typography>
                                <pre>{JSON.stringify(defaultSettings, null, 4)}</pre>
                            </Typography>
                        </Box>
                    </Box>
                </ContentLayout>
            )}

            {/* Loading */}
            {isLoading && <LoadingIndicatorPage />}
        </Main>
    )
}

export default Settings
