const { getReposAndStatus } = require('./repoList');
const { setRestriction } = require('./repoSetRetriction');
const { getReposArray } = require('./common/envEnum');

const mainFunction = async () => {
	const args = require('minimist')(process.argv.slice(2), {
		string: ['r'],
		boolean: ['f', 't', 'l', 'd', 'a', 'h'],
	});

	const { l, r, f, t, a, h } = args;

	if (h) {
		console.log(`
		-l (list repositories with frozen status)
		-f (freeze repository)  
		-t (thaw repository)  
		-r (Single Repo, pass the index from list response)
		-a (All repositories in your .env file)`);
		return;
	}

	if (l) {
		const data = await getReposAndStatus();
		console.table(data);
		return;
	}

	if ((!f && !t) || (f && t)) {
		console.log('-f or -t is required but not both. (freeze or thaw)');
		return;
	}

	if ((!r && !a) || (r && a)) {
		console.log('-r or -a is required but not both');
		return;
	}

	let freeze = f ? true : !t;
	let results;
	if (a) {
		results = await setRestriction(getReposArray(), freeze);
	}

	if (r) {
		const input = getReposArray()[r].split(',');
		results = await setRestriction(input, freeze);
	}

	console.table(results);

	const data = await getReposAndStatus();
	console.table(data);
};

mainFunction();
