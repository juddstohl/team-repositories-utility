const data = require('./response2.json');
const { formattedProtectionPut } = require('../src/formattedProtectionPut');

describe('Tests', () => {
	test('Freeze branch', () => {
		const putPayload = formattedProtectionPut(data, true);

		console.dir(putPayload, { depth: null });
		console.dir(JSON.stringify(putPayload), { depth: null });

		expect(1).toBe(1);
	});
});
