const testAuth = (z, bundle) => {
	var request = {
		'url': 'https://api.boxc.com/v1/users/me',
		'method': 'GET',
		'headers': {
			'Authorization': 'Bearer ' + bundle.authData.access_token
		}
	};
	const promise = z.request(request);
	return promise.then((response) => {
		const resp = JSON.parse(response.content);
		if ('status' in resp) {
			throw new Error('The OAuth Token you supplied is invalid.');
		}
		return resp.user;
	});
}

const connectionLabel = (z, bundle) => {
	return bundle.inputData.user.first_name + ' ' + bundle.inputData.user.last_name + ' @ ' + bundle.inputData.user.address.company_name;
}

module.exports = {
	type: 'custom',
	fields: [
		{
			key: 'access_token',
			label: 'OAuth Token',
			required: true,
			type: 'string',
			helpText: 'To generate an OAuth Token simply log into your BoxC account in a browser, select "Applications" from the left menu, and then click "+Create Token".'
		}
	],
	test: testAuth,
	connectionLabel: connectionLabel
}