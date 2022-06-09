import 'dotenv/config';
import mongoose from 'mongoose';

export class DBManager {
	readonly connectionString = process.env.MONGODB_URL as string;

	connect() {
		mongoose.connect(this.connectionString, (err) => {
			if (err) {
				console.log(`Error connecting to MongoDB: ${err}`);
			}
		});
	}
}
