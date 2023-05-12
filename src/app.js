const { apiGetGenericAsync } = require('./api');

require('dotenv').config({ path: `${process.cwd()}/.env` });
const owner = process.env['OWNER'];

const getBranchProtection = async (repo, branch) => {
	return await apiGetGenericAsync(
		`/repos/${owner}/${repo}/branches/${branch}/protection`
	);
};

const getRepos = () => {
	const repos = process.env['REPOS'];
	return repos.split(',');
};

const Repo = class {
	// originalProtection;

	constructor(protection, repoName) {
		this.originalProtection = protection;
		this.repoName = repoName;
	}

	get isFrozen() {
		return this.originalProtection.hasOwnProperty('restrictions');
	}
};

const mainFunction = async () => {
	const master = {};
	const repos = getRepos();

	for (let i = 0; i < repos.length; i++) {
		const protection = await getBranchProtection(repos[i], 'release');
		const repo = new Repo(protection, repos[i]);
		master[repos[i]] = repo;
	}

	console.log(master[repos[0]].isFrozen);
};

mainFunction();
