export default {
    admin: {
        type: 'admin',
        routes: [
            {
                method: 'GET',
                path: '/config',
                handler: 'config.getConfig',
                config: { policies: [] },
            },
            {
                method: 'PUT',
                path: '/config',
                handler: 'config.setConfig',
                config: { policies: [] },
            },
        ],
    },
}
