import { Schema, model } from 'mongoose';
import { Currency } from '../enums/Currency';
import { AccountStatus } from '../enums/AccountStatus';

export const AccountSchema = new Schema({
	customerId: {
		type: Schema.Types.ObjectId,
		ref: 'Customer',
	},
	name: {
		type: String,
		required: true,
	},
	accountNumber: {
		type: String,
		required: true,
	},
	ledgerBalance: {
		type: String,
		required: true,
	},
	availableBalance: {
		type: String,
		required: true,
	},
	currency: {
		type: String,
		required: true,
		enum: [
			Currency.USD,
			Currency.EUR,
			Currency.GPB,
			Currency.NGN,
			Currency.ETB,
		],
		default: Currency.USD,
	},
	status: {
		type: String,
		required: true,
		enum: [AccountStatus.ACTIVE, AccountStatus.SUSPENDED],
		default: AccountStatus.ACTIVE,
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
});

AccountSchema.index({ customerId: 1, accountNumber: 1, createdAt: -1 });
AccountSchema.index({ accountNumber: 1 });

export const Account = model('Account', AccountSchema);
