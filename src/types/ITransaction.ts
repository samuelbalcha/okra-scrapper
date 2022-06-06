export interface ITransaction {
	type: 'debit' | 'credit';
	trans_type: 'deposit' | 'payment' | 'invoice' | 'withdrawal';
	desc: string;
	amount: string;
	trans_date: string;
	account_beneficiary: string;
	account_sender: string;
}
