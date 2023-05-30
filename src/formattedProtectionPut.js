exports.formattedProtectionPut = (body, freeze) => {
	let results = {};

	const { required_status_checks = {} } = body;

	if (Object.keys(required_status_checks).length === 0) {
		const rest_required_status_checks = null;
		results['required_status_checks'] = rest_required_status_checks;
	} else {
		const {
			url = '',
			contexts_url = '',
			checks,
			...rest_required_status_checks
		} = required_status_checks;
		results['required_status_checks'] = rest_required_status_checks;
	}

	const {
		enforce_admins: { enabled: enforce_admins_enabled },
	} = body;
	results['enforce_admins'] = enforce_admins_enabled;

	const { required_pull_request_reviews } = body;
	const {
		url: required_pull_request_reviews_url,
		bypass_pull_request_allowances = {},
		...rest_required_pull_request_reviews
	} = required_pull_request_reviews;

	const {
		users: bypass_pull_request_allowances_users = [],
		teams: bypass_pull_request_allowances_teams = [],
		apps: bypass_pull_request_allowances_apps = [],
	} = bypass_pull_request_allowances;

	const users = bypass_pull_request_allowances_users.map((x) => {
		return x.login;
	});
	const teams = bypass_pull_request_allowances_teams.map((x) => {
		return x.slug;
	});
	const apps = bypass_pull_request_allowances_apps.map((x) => {
		return x.slug;
	});

	rest_required_pull_request_reviews['bypass_pull_request_allowances'] = {
		users,
		teams,
		apps,
	};

	results['required_pull_request_reviews'] =
		rest_required_pull_request_reviews;

	if (freeze) {
		const restrictions = { users: [], teams: [] };
		results['restrictions'] = restrictions;
	} else {
		//Set to null to disable
		results['restrictions'] = null;
	}

	return results;
};
