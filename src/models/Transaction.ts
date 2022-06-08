import { Schema, model } from 'mongoose';
import { TransactionType } from '../enums/TransactionType';

export const TransactionSchema = new Schema({
	sender: {
		type: Schema.Types.ObjectId,
		ref: 'Account',
		required: true,
	},
	beneficiary: {
		type: Schema.Types.ObjectId,
		ref: 'Account',
		required: true,
	},
	transactionType: {
		type: String,
		required: true,
		enum: [
			TransactionType.DEPOSIT,
			TransactionType.INVOICE,
			TransactionType.PAYMENT,
			TransactionType.WITHDRAWAL,
		],
		default: TransactionType.DEPOSIT,
	},
	direction: {
		type: String,
		required: true,
		enum: ['debit', 'credit'],
		default: 'debit',
	},
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
	status: {
		type: String,
		required: true,
		enum: ['in progress', 'fulfilled', 'rejected'],
		default: 'fulfilled',
	},
	description: {
		type: String,
	},
	amount: {
		type: String,
		required: true,
	},
});

TransactionSchema.index({ sender: 1, beneficiary: 1, createdAt: -1 });

export const Transaction = model('Transaction', TransactionSchema);
