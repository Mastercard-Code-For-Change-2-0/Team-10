require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const Organisation = require('../models/User');

async function main() {
	const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
	if (!uri) throw new Error('MONGODB_URI not set');
	await mongoose.connect(uri);
	const email = process.env.SEED_ADMIN_EMAIL || 'admin@example.org';
	const password = process.env.SEED_ADMIN_PASSWORD || 'admin123';
	let user = await Organisation.findOne({ email });
	if (!user) {
		const hashed = await bcrypt.hash(password, 10);
		user = await Organisation.create({ organisationName: 'Admin', email, password: hashed, role: 'admin' });
		console.log('Created admin user:', email, password);
	} else {
		console.log('Admin already exists:', email);
	}
	await mongoose.disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
