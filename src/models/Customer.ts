/* eslint-disable @typescript-eslint/no-explicit-any */
import { Schema, model } from 'mongoose';
import { encryptPassword, createSalt, isValidPassword } from '../util';

export const CustomerSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	photoUrl: {
		type: String,
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
	hashedPassword: {
		type: String,
	},
	salt: { type: String },
});

CustomerSchema.index({ email: 1 });
CustomerSchema.index({ firstName: 1, lastName: 1, createdAt: -1 });

CustomerSchema.virtual('password')
	.set(function (this: any, password: string) {
		this._password = password;

		if (!isValidPassword(password)) {
			return this.invalidate('password', 'WEAK_PASSWORD');
		}

		this.salt = createSalt();
		this.hashedPassword = encryptPassword(password, this.salt);
	})
	.get(function (this: any) {
		return this._password;
	});

export const Customer = model('Customer', CustomerSchema);
