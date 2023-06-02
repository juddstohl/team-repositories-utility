exports.Repo = class {
	// originalProtection;

	constructor(protection, repoName, httpStatus) {
		this.originalProtection = protection;
		this.repoName = repoName;
		this.httpStatus = httpStatus;
	}

	get isFrozen() {
		if (this.httpStatus === 404) {
			return 'Repo Not Found';
		}
		return this.originalProtection.hasOwnProperty('restrictions');
	}
};
