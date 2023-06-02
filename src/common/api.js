const fetch = require('node-fetch');
const { envVariable } = require('./envEnum');

global.fetch = fetch;
global.Headers = fetch.Headers;

const apiBaseUrl = envVariable.API_BASE_URL;
const bearerToken = envVariable.BEARER_TOKEN;

const headers = new Headers();
headers.set('Authorization', `Bearer ${bearerToken}`);
headers.set('Accept', 'application/vnd.github+json');

exports.apiGetGenericAsync = async (urlSegment) => {
	try {
		const url = `${apiBaseUrl}${urlSegment}`;
		const res = await fetch(url, {
			method: this.apiMethods.GET,
			headers,
		});

		const data = await res.json();
		return { status: res.status, data: data };
	} catch (error) {
		console.log({ method: 'apiGetGenericAsync', error: error });
	}
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
