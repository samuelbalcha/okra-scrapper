import { randomBytes, pbkdf2Sync } from 'crypto';
import _ from 'lodash';

export function isValidPassword(password: string): boolean {
	return _.isString(password) && password.length >= 6;
}

export function encryptPassword(password: string, salt: string): string {
	const saltBuffer = Buffer.from(salt, 'base64');
	return pbkdf2Sync(
		password,
		saltBuffer,
		1, // hash iteration
		64,
		'sha1'
	).toString('base64');
}

export function createSalt(): string {
	return randomBytes(16).toString('base64');
}
