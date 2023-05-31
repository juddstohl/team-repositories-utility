const { getReposAndStatus } = require('./repoList');
const { setRestriction } = require('./repoSetRetriction');

const mainFunction = async () => {
	const args = require('minimist')(process.argv.slice(2), {
		string: ['r'],
		boolean: ['f', 't', 'l', 'd'],
	});

	const { l, r, f, t } = args;

	if (l) {
		const data = await getReposAndStatus();
		console.table(data);
		return;
	}

	if ((!f && !t) || (f && t)) {
		console.log('-f or -t is required but not both. (freeze or thaw)');
		return;
	}

	if (!r) {
		console.log('-r is required.');
		return;
	}

	let freeze = f ? true : !t;

	const results = await setRestriction(r.split(','), freeze);
	console.table(results);
};

mainFunction();
