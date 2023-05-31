const { Repo } = require('./classes/Repo');
const { getReposArray, envVariable } = require('./common/envEnum');
const { getBranchProtection } = require('./appApiCalls');

const buildIsFrozenTable = (allRepos) => {
	const data = Object.values(allRepos).map((x) => {
		return { repoName: x.repoName, isFrozen: x.isFrozen };
	});

	return data;
};

exports.getReposAndStatus = async () => {
	const owner = envVariable.OWNER;
	const branch = envVariable.BRANCH;
	const repos = getReposArray();

	const allRepos = {};

	for (let i = 0; i < repos.length; i++) {
		const protection = await getBranchProtection(owner, repos[i], branch);
		const repo = new Repo(protection, repos[i]);
		allRepos[repos[i]] = repo;
	}

	return buildIsFrozenTable(allRepos);
};
