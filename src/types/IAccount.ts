import { ITransaction } from './ITransaction';

export interface IAccount {
	name: string;
	account_no: string;
	currency: string;
	ledger_balance: string;
	available_balance: string;
	transactions: ITransaction[];
}
