module.exports = {
	preset: 'jest-puppeteer',
	testEnvironment: 'node',
	setupFiles: ['./jest.setup.ts'],
	globalSetup: './jest.global-setup.ts',
	collectCoverageFrom: ['src/**/*.ts', '!**/node_modules/**'],
	coverageThreshold: {
		'src/**/*.ts': {
			statements: 30,
			branches: 30,
			functions: 30,
			lines: 30,
		},
	},
	testPathIgnorePatterns: ['/node_modules/', 'dist'], 
	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
	transform: {
		"^.+\\.ts?$": "ts-jest"
	},
	modulePathIgnorePatterns: ['dist/']
};
