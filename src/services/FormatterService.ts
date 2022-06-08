import { IAuthData } from '../types/IAuthData';

export class FormatterService {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() {}

	async format(authData: IAuthData, data: any) {
		console.log('do format', { authData, data });
	}
}
