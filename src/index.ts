import express from 'express';
import { json as bodyParser, urlencoded } from 'body-parser';

import { ScraperService } from './services/ScraperService';

const app = express();
const port = process.env.PORT || 5000;

app.use(
	urlencoded({
		extended: true,
	})
);
app.use(bodyParser());

const scraper = new ScraperService(process.env.SCRAPE_URL as string);

app.get('*', (_req, res) => {
	res.send({ message: 'Welcome to Okra scraper' });
});

app.post('/scrape', async (req, res) => {
	const authData = {
		email: req.body.email,
		password: req.body.password,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	};

	await scraper.initialize();
	await scraper.scrape(authData);
	res.status(200).send({ message: 'Success' });
});

app.listen(port, () => {
	console.log(`Okra scraper connected at port ${port}`);
});
