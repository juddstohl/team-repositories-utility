require('dotenv').config({ path: `${process.cwd()}/.env` });

exports.envVariable = Object.freeze({
	BRANCH: process.env['BRANCH'],
	REPOS: process.env['REPOS'],
	API_BASE_URL: process.env['API_BASE_URL'],
	BEARER_TOKEN: process.env['GITHUB_PAT'],
	OWNER: process.env['OWNER'],
});

exports.getReposArray = () => {
	const repos = this.envVariable.REPOS;
	return repos.split(',').sort();
};
