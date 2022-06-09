import { Schema, model } from 'mongoose';

export const AuthSchema = new Schema({
	customerId: {
		type: Schema.Types.ObjectId,
		ref: 'Customer',
	},
	OTP: {
		type: Number,
	},
	userId: {
		type: String,
	},
	createdAt: {
		type: Date,
	},
});

AuthSchema.index({ customerId: 1 });

export const AuthData = model('AuthData', AuthSchema);
