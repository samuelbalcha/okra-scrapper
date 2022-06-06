/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { setup: setupPuppeteer } = require('jest-environment-puppeteer');

module.exports = async function globalSetup(globalConfig: any) {
	await setupPuppeteer(globalConfig);
};
