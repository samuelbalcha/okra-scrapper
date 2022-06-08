import { Schema, model } from 'mongoose';

export const AuthSchema = new Schema({
	customerId: {
		type: Schema.Types.ObjectId,
		ref: 'Customer',
	},
	loginAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
	logoutAt: {
		type: Date,
		default: Date.now,
	},
});

AuthSchema.index({ customerId: 1, loginAt: -1 });

export const AuthData = model('AuthData', AuthSchema);
