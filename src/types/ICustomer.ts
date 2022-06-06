import { IAccount } from './IAccount';

export interface ICustomer {
	id: string;
	created_at: string;
	email: string;
	firstName: string;
	lastName: string;
	accounts: IAccount[];
	photo_url?: string;
}
