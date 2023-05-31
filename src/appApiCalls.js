const { apiGetGenericAsync } = require('./common/api');

exports.getBranchProtection = async (owner, repo, branch) => {
	return await apiGetGenericAsync(
		`/repos/${owner}/${repo}/branches/${branch}/protection`
	);
};
