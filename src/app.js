const { apiGetGenericAsync } = require('./api');
const { Repo } = require('./classes/Repo');
const { envVariable } = require('./common/envEnum');

const getBranchProtection = async (owner, repo, branch) => {
	return await apiGetGenericAsync(
		`/repos/${owner}/${repo}/branches/${branch}/protection`
	);
};

const getRepos = () => {
	const repos = envVariable.REPOS;
	return repos.split(',').sort();
};

const buildIsFrozenTable = (allRepos) => {
	const data = Object.values(allRepos).map((x) => {
		return { repoName: x.repoName, isFrozen: x.isFrozen };
	});

	return console.table(data);
};

const mainFunction = async () => {
	const owner = envVariable.OWNER;
	const branch = envVariable.BRANCH;

	const allRepos = {};
	const repos = getRepos();

	for (let i = 0; i < repos.length; i++) {
		const protection = await getBranchProtection(owner, repos[i], branch);
		const repo = new Repo(protection, repos[i]);
		allRepos[repos[i]] = repo;
	}

	buildIsFrozenTable(allRepos);
};

mainFunction();
