# Database Schema Notes

Collections:
- users: { name, email, role, hashedPassword, profile }
- donations: { title, category, quantity, location, images, donorId, status }
- requests: { title, category, quantity, location, requesterId, status }
- matches: { donationId, requestId, status, approvedBy }

Indexes:
- users.email unique
- donations.category + location
- requests.category + location

Seed strategy: `server/scripts/seedDatabase.js`
