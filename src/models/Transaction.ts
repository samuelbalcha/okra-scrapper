import { Schema, model } from 'mongoose';
import { TransactionType } from '../enums/TransactionType';

export const TransactionSchema = new Schema({
	accountNumber: {
		type: String,
		required: true,
	},
	sender: {
		type: String,
		required: true,
	},
	beneficiary: {
		type: String,
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

TransactionSchema.index({ accountNumber: 1, createdAt: -1 });
TransactionSchema.index({ sender: 1, beneficiary: 1, createdAt: -1 });

export const Transaction = model('Transaction', TransactionSchema);
