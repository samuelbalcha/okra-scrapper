import { ScraperService } from './ScraperService';

describe('ScraperService', () => {
	const scrapeService = new ScraperService('https://bankof.okra.ng/');

	describe('initialize', () => {
		it('should initialize browser and return current location', async () => {
			const url = await scrapeService.initialize();
			expect(url).toEqual('https://bankof.okra.ng/');
			await scrapeService.close();
		});
	});

	describe('register', () => {
		let existingEmail = '';

		beforeEach(async () => {
			await scrapeService.initialize();
		});

		it('should return success when new user data is provided', async () => {
			const email = `sam-${Date.now()}@gmail.com`;
			existingEmail = email;

			const { success, data } = await scrapeService.register(
				{
					firstName: 'sam',
					lastName: 'bal',
					email,
					password: '234-admin',
				},
				'[href="/register"]'
			);

			expect(success).toEqual(true);
			expect(data).toHaveProperty('data.user');
			await scrapeService.close();
		});

		it('should return status "400" when existing user data is provided', async () => {
			const authData = {
				firstName: 'sam',
				lastName: 'bal',
				email: existingEmail,
				password: '234-admin',
			};

			expect(
				async () =>
					await scrapeService.register(authData, '[href="/register"]')
			).rejects.toThrowError();
			await scrapeService.close();
		});
	});
});
