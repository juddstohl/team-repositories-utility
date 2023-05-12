const fetch = require('node-fetch');
require('dotenv').config({ path: `${process.cwd()}/.env` });

global.fetch = fetch;
global.Headers = fetch.Headers;

const apiBaseUrl = process.env['API_BASE_URL'];
const bearerToken = process.env['GITHUB_PAT'];

const headers = new Headers();
headers.set('Authorization', `Bearer ${bearerToken}`);
headers.set('Accept', 'application/vnd.github+json');

exports.apiGetGenericAsync = async (urlSegment) => {
	const url = `${apiBaseUrl}${urlSegment}`;
	console.log(url);
	const res = await fetch(url, {
		method: this.apiMethods.GET,
		headers,
	});

	return await res.json();
};

exports.apiMethods = Object.freeze({
	GET: 'GET',
	POST: 'POST',
	DELETE: 'DELETE',
	PUT: 'PUT',
});

exports.apiGenericAsync = async (urlSegment, method, body = undefined) => {
	const res = await fetch(`${apiBaseUrl}${urlSegment}`, {
		method: method,
		headers,
		body,
	});

	switch (method) {
		case this.apiMethods.GET:
			return await res.json();
		default:
			return res;
	}
};

exports.apiPostGenericAsync = async (body, urlSegment) => {
	const res = await fetch(`${apiBaseUrl}${urlSegment}`, {
		method: this.apiMethods.POST,
		headers,
		body,
	});

	return res;
};

exports.apiGetGenericPromise = async (urlSegment) => {
	return fetch(`${apiBaseUrl}${urlSegment}`, {
		method: this.apiMethods.GET,
		headers,
	});
};

// exports.httpResponseStatusLookup = (status) => {
// 	const lookup = {
// 		400: '400: already exists',
// 		429: '429: rate limit response',
// 		201: '201: success',
// 		404: '404: the project is not found or the user does not have the required permissions',
// 		401: '401: authentication credentials are incorrect or missing',
// 		403: '403: user does not have permission to manage the project containing the component or does not have permission to administer Jira.',
// 		204: '204: Successful',
// 		200: '200: Successful',
// 	};

// 	return lookup[status] || status;
// };
