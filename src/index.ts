import { ScraperService } from './services/ScraperService';

const start = async () => {
	const scrapeService = new ScraperService('');

	// Initialize
	await scrapeService.initialize();

	// Register
};

start();
