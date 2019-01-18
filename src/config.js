module.exports = {

	dojot: {
		host: 'http://localhost:8000',
		resources: {
			auth: 'auth',
//			auth: 'v2/5c41eaf93200005200732681',
			tenants: 'auth/user',
			users: 'auth/user',
			templates: 'template',
//			templates: 'v2/5c41f89d32000052007326bb',
//			templateCreation: 'v2/5c41f85f3200001e017326ba',
			devices: 'device',
//			devices: 'v2/5c41f9c932000083007326bf',
//			deviceCreation: 'v2/5c41f98a32000077037326bc',
		},
		credentials: {
			username: 'admin',
			passwd: 'admin',
		},
	}

}
