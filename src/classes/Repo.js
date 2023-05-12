exports.Repo = class {
	// originalProtection;

	constructor(protection, repoName) {
		this.originalProtection = protection;
		this.repoName = repoName;
	}

	get isFrozen() {
		return this.originalProtection.hasOwnProperty('restrictions');
	}
};
