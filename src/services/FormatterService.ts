import { IAuthData } from '../types/IAuthData';
import { DBManager } from './../db/DbManager';
import { Customer } from './../models/Customer';
import { Account } from './../models/Account';
import { Transaction } from '../models/Transaction';
import { AuthData } from '../models/AuthData';

export class FormatterService {
	readonly dbManager = new DBManager();

	constructor() {
		this.dbManager.connect();
	}

	async format(authData: IAuthData, data: any) {
		const customerQuery: any = {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			createdAt: data.created_at,
			photoUrl: data.photo_url,
			password: authData.password,
		};

		const customer = await Customer.create(customerQuery);

		const authQuery: any = {
			customerId: customer._id,
			OTP: 12345,
			userId: data.id,
			createdAt: data.created_at,
		};

		await AuthData.create(authQuery);

		const accountQuery: any = [];
		const transactionsQuery: any = [];

		data.accounts.map((account: any) => {
			accountQuery.push({
				customerId: customer._id,
				name: account.name,
				accountNumber: account.account_no,
				ledgerBalance: account.ledger_balance,
				availableBalance: account.available_balance,
			});

			account.transactions.map((transaction: any) => {
				transactionsQuery.push({
					accountNumber: account.account_no,
					sender: transaction.account_sender,
					beneficiary: transaction.account_beneficiary,
					transactionType: transaction.trans_type,
					direction: transaction.type,
					description: transaction.desc,
					amount: transaction.amount,
					createdAt: transaction.trans_date,
				});
			});
		});

		await Account.insertMany(accountQuery);
		await Transaction.insertMany(transactionsQuery);
	}
}
