const { apiGenericAsync, apiMethods } = require('./common/api');
const { formattedProtectionPut } = require('./formattedProtectionPut');
const { getBranchProtection } = require('./appApiCalls');
const { envVariable } = require('./common/envEnum');

const putRestriction = async (owner, repo, branch, body) => {
	return await apiGenericAsync(
		`/repos/${owner}/${repo}/branches/${branch}/protection`,
		apiMethods.PUT,
		JSON.stringify(body)
	);
};

exports.setRestriction = async (repoArray, freeze) => {
	const owner = envVariable.OWNER;
	const branch = envVariable.BRANCH;

	const results = [];

	for (let i = 0; i < repoArray.length; i++) {
		try {
			const protection = await getBranchProtection(
				owner,
				repoArray[i],
				branch
			);
			const restriction = formattedProtectionPut(protection, freeze);
			const res = await putRestriction(
				owner,
				repoArray[i],
				branch,
				restriction
			);

			results.push({ httpStatus: res.status, repository: repoArray[i] });
		} catch (error) {
			console.log({ error: error });
		}
	}

	return results;
};
