/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState } from 'react'
// import PropTypes from 'prop-types';

import { Box, Button, ContentLayout, HeaderLayout, Main, Typography } from '@strapi/design-system'
import { LoadingIndicatorPage } from '@strapi/helper-plugin'
import configAPI from '../../api/config'

const Settings = () => {
    const [defaultSettings, setDefaultSettings] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    // const query = useQuery('settings', {})

    useEffect(() => {
        ;(async () => {
            const fetchDefaultSettings = async () => {
                const tmpSettings = await configAPI.get()
                setDefaultSettings(tmpSettings)

                // Custom settings
            }
            setLoading(true)
            await fetchDefaultSettings()
            setLoading(false)
        })()
    }, [])

    return (
        <Main aria-busy={loading}>
            <HeaderLayout
                title={'TipTap Editor Settings'}
                subtitle={"Customize your editing experience with TipTap Editor's Settings"}
                primaryAction={<Button disabled>Save</Button>}
            />

            {!loading && (
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
            {loading && <LoadingIndicatorPage />}
        </Main>
    )
}

export default Settings
