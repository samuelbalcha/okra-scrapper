import { ScraperService } from './ScraperService';
import { FormatterService } from './FormatterService';

jest.setTimeout(20000);

describe('ScraperService', () => {
	describe('scrape', () => {
		it('should throw error when unable to scrape page', async () => {
			const scrapeService = new ScraperService('https://google.com');

			expect(async () => {
				await scrapeService.scrape({
					firstName: 'sam',
					lastName: 'bal',
					email: 'abc@gmail.com',
					password: '234-admin',
				});
			}).rejects.toThrowError(
				'Could not scrape: https://google.com Error: Error: failed to find element matching selector "[href="/register"]"'
			);
		});

		it('should call formatterService.format when data is available', async () => {
			const scrapeService = new ScraperService('https://bankof.okra.ng/');
			const formatterService = new FormatterService();

			const formatterServiceSpy = jest.spyOn(formatterService, 'format');
			const email = `sam-${Date.now()}@gmail.com`;

			await scrapeService.scrape({
				firstName: 'Samuel',
				lastName: 'Balcha',
				email,
				password: '234-admin',
			});

			expect(formatterServiceSpy).toHaveBeenCalled();
		});
	});
});
