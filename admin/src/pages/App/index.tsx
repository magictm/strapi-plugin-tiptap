/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import { Switch, Route } from 'react-router-dom'
import { pluginId } from '../../pluginId'
import SettingsPage from '../Settings'
import { QueryClient, QueryClientProvider } from 'react-query'
import React from 'react'

const queryClient = new QueryClient()

const App = () => {
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <Switch>
                    <Route path={`/settings/${pluginId}`} component={SettingsPage} exact />
                </Switch>
            </QueryClientProvider>
        </div>
    )
}

export default App
