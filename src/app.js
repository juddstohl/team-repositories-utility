const { apiGetGenericAsync } = require('./api');

require('dotenv').config({ path: `${process.cwd()}/.env` });
const owner = process.env['OWNER'];

const getBranchProtection = async (repo, branch) => {
	return await apiGetGenericAsync(
		`/repos/${owner}/${repo}/branches/${branch}/protection`
	);
};

const mainFunction = async () => {
	const results = await getBranchProtection(
		'force-integrations-plugin-lspus',
		'release'
	);

	console.log(results);
};

mainFunction();
