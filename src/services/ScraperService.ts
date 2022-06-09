import puppeteer, { Browser, Page } from 'puppeteer';
import { IAuthData } from '../types/IAuthData';
import { FormatterService } from './FormatterService';

export class ScraperService {
	private browser!: Browser;
	private page!: Page;
	private url: string;
	private formatterService: FormatterService;

	readonly OTP = '12345';

	constructor(url: string) {
		this.url = url;
		this.formatterService = new FormatterService();
	}

	async scrape(authData: IAuthData) {
		try {
			this.browser = await puppeteer.launch({
				headless: true,
				args: [
					'--no-sandbox',
					'--disable-setuid-sandbox',
					'--disable-web-security',
					'--disable-features=IsolateOrigins',
					'--disable-site-isolation-trials',
				],
			});

			this.page = await this.browser.newPage();
			await this.page.goto(this.url, { waitUntil: 'load' });
			await this.page.$eval('[href="/register"]', (el: any) =>
				el.click()
			);
			await this.page.waitForSelector('#firstName');

			await this.page.type('#firstName', authData.firstName as string);
			await this.page.type('#lastName', authData.lastName as string);
			await this.page.type('#email', authData.email);
			await this.page.type('#password', authData.password);
			await this.page.click('button[type="submit"]');

			this.page.on('response', async (response) => {
				const url = response.url();
				try {
					const status = response.status();
					const json = await response.json();
					if (
						status === 200 &&
						json.status === 'success' &&
						json.data &&
						json.data.user
					) {
						this.formatterService.format(authData, json.data.user);
					}
				} catch (err) {
					console.error(`Error at: ${url}`, err);
				}
			});

			await this.page.waitForSelector('#otp');
			await this.page.type('#otp', this.OTP);
			await this.page.click('button[type="submit"]');
			await this.page.waitForNavigation();

			console.log('dashboard', this.page.url());

			await this.page.$eval('.fa-user-circle', (el: any) => el.click());
			await this.page.waitForNavigation({
				waitUntil: 'domcontentloaded',
			});
			console.log('profile', this.page.url());

			await this.page.$eval('.fa-sign-out', (el: any) => el.click());
			await this.page.waitForNavigation({
				waitUntil: 'domcontentloaded',
			});
			console.log('logout', this.page.url());

			await this.page.close();
			await this.browser.close();
		} catch (e) {
			console.error(`Could not scrape: ${this.url}`, e);
			await this.browser.close();
		}
	}
}
