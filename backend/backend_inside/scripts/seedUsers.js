import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Organisation from '../models/Org.model.js';

dotenv.config();

async function seedUsers() {
    try {
        // Connect to MongoDB
        const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
        if (!uri) {
            throw new Error('MONGODB_URI not set in environment variables');
        }
        
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');

        // Define test users
        const testUsers = [
            {
                organisationName: 'System Admin',
                email: 'admin@sevasahayog.org',
                password: 'admin123',
                role: 'admin',
                isVerified: true,
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop'
            },
            {
                organisationName: 'TechCorp Solutions',
                email: 'donor@company.com',
                password: 'donor123',
                role: 'donor',
                isVerified: true,
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop'
            },
            {
                organisationName: 'Sunrise Healthcare Foundation',
                email: 'receiver@ngo.org',
                password: 'receiver123',
                role: 'reciever', // Note: using 'reciever' to match your schema enum
                isVerified: true,
                image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?q=80&w=150&auto=format&fit=crop'
            },
            {
                organisationName: 'GreenTech Innovations',
                email: 'donor2@greentech.com',
                password: 'greentech123',
                role: 'donor',
                isVerified: true,
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop'
            },
            {
                organisationName: 'Education for All NGO',
                email: 'receiver2@education.org',
                password: 'education123',
                role: 'reciever',
                isVerified: true,
                image: 'https://images.unsplash.com/photo-1494790108755-2616c27a8b73?q=80&w=150&auto=format&fit=crop'
            }
        ];

        // Clear existing test users (optional)
        console.log('Clearing existing test users...');
        await Organisation.deleteMany({
            email: { 
                $in: testUsers.map(user => user.email) 
            }
        });

        // Create new test users
        for (const userData of testUsers) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            
            const user = new Organisation({
                organisationName: userData.organisationName,
                email: userData.email,
                password: hashedPassword,
                role: userData.role,
                isVerified: userData.isVerified,
                image: userData.image,
                listings: []
            });

            await user.save();
            console.log(`✅ Created ${userData.role}: ${userData.email} (password: ${userData.password})`);
        }

        console.log('\n🎉 Database seeded successfully!');
        console.log('\nTest Credentials:');
        console.log('==================');
        testUsers.forEach(user => {
            console.log(`${user.role.toUpperCase()}: ${user.email} / ${user.password}`);
        });

    } catch (error) {
        console.error('❌ Error seeding database:', error);
    } finally {
        await mongoose.disconnect();
        console.log('\nDisconnected from MongoDB');
    }
}

// Run the seeding
seedUsers();
