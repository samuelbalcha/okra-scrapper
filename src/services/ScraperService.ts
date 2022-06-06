import puppeteer, { Browser, Page } from 'puppeteer';
import { IAuthData } from '../types/IAuthData';
//import { writeFile } from 'fs/promises';

export class ScraperService {
	private browser!: Browser;
	private page!: Page;

	private url: string;

	readonly OTP = '12345';

	constructor(url: string) {
		this.url = url;
	}

	async initialize(): Promise<string> {
		this.browser = await puppeteer.launch({
			headless: true,
			args: [
				'--disable-web-security',
				'--disable-features=IsolateOrigins',
				'--disable-site-isolation-trials',
			],
		});

		this.page = await this.browser.newPage();
		await this.page.goto(this.url, { waitUntil: 'load' });
		return this.page.url();
	}

	async close(): Promise<void> {
		return this.browser.close();
	}

	async register(registerData: IAuthData, selector: string): Promise<any> {
		await this.page.$eval(selector, (el: any) => el.click());
		await this.page.waitForSelector('#firstName');

		await this.page.type('#firstName', registerData.firstName as string);
		await this.page.type('#lastName', registerData.lastName as string);
		await this.page.type('#email', registerData.email);
		await this.page.type('#password', registerData.password);

		await this.page.click('button[type="submit"]');

		return new Promise((resolve, reject) => {
			this.page.on('response', async (response) => {
				const status = response.status();
				const data = await response.text();

				if (status === 200) {
					return resolve({
						success: true,
						data: JSON.parse(data),
					});
				}
				return reject({ status });
			});
		});
	}

	async confirmOTP(): Promise<any> {
		await this.page.type('#otp', this.OTP);
		await this.page.click('button[type="submit"]');

		await this.page.waitForNavigation();

		return new Promise((resolve, reject) => {
			this.page.on('response', async (response) => {
				const status = response.status();
				const data = await response.text();

				if (status === 200) {
					return resolve({
						success: true,
						data: JSON.parse(data),
					});
				}
				return reject({ status });
			});
		});
	}

	async login(authData: IAuthData, selector: string): Promise<any> {
		await this.page.$eval(selector, (el: any) => el.click());
		await this.page.waitForSelector('#email');

		await this.page.type('#email', authData.email);
		await this.page.type('#password', '234-admin');
		await this.page.click('button[type="submit"]');

		await this.page.waitForNavigation();

		return new Promise((resolve, reject) => {
			this.page.on('response', async (response) => {
				const status = response.status();
				const data = await response.text();
				if (status === 200) {
					return resolve({
						success: true,
						data: JSON.parse(data),
					});
				}
				return reject({ status });
			});
		});
	}
}
