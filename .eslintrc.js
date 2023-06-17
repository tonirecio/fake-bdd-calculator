module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	// eslint-disable-next-line quotes
	extends: 'airbnb-base',
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		indent: [1, 'tab'],
		'no-tabs': 0,
	},
	ignorePatterns: ['**/*.html'],
};
