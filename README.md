# 🤝 Seva Sahayog - Donation Matching Portal

**Mastercard Code for Change 2.0 Hackathon Submission by Team-10**

A comprehensive donation matching platform that connects donors with receivers (NGOs, schools, hospitals, and community organizations) to facilitate seamless KIND donations without heavy manual coordination.

## 🎯 Problem Statement

**Theme: BUILD A DONATION MATCHING PORTAL**

Seva Sahayog Foundation requires a dedicated portal to facilitate KIND DONATIONS between:
- **Givers**: Individuals, corporates, institutes
- **Receivers**: NGOs, schools, hostels, old-age homes, community organizations

The platform enables donors to list available items and receivers to post their requirements, ensuring seamless matching and transparent transactions.

## ✨ Key Features

### 🔐 Multi-Role Authentication System
- **Donors**: Individuals and organizations wanting to donate
- **Receivers**: NGOs and institutions needing donations  
- **Admins**: Platform administrators managing matches

### 📝 Donation Management
- Quick & guided donation item submission
- Photo uploads with quality checks
- Automatic content moderation (AI-powered)
- Real-time approval notifications
- Categorized item listings

### 🎯 Request Management  
- Structured requirement posting for receivers
- Authenticity validation for organizations
- Search and filter available donations
- Automatic content screening
- Match notification system

### 🤖 Smart Matching System
- AI-powered donation-request matching
- Admin review and approval workflow
- Location-based matching
- Category and urgency-based prioritization

### 📊 Admin Panel
- Comprehensive matching center
- Data export (Excel, PDF)
- Email reporting system
- User verification management
- Platform analytics

### 🌐 Multilingual Support
- English, Hindi, Marathi
- Localized user interface
- Cultural adaptability

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI library
- **Material-UI (MUI)** - Professional component library
- **Framer Motion** - Smooth animations
- **React Router** - Client-side routing
- **React Query** - API state management
- **React Hook Form** - Form management
- **i18next** - Internationalization

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **Socket.io** - Real-time notifications
- **Multer + Cloudinary** - File uploads
- **Winston** - Logging

### Security & Performance
- **Helmet** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection
- **Compression** - Response optimization
- **Input Validation** - Data sanitization

### Deployment
- **Vercel** - Full-stack deployment
- **MongoDB Atlas** - Database hosting
- **Cloudinary** - Image storage and optimization

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- MongoDB Atlas account
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Mastercard-Code-For-Change-2-0/Team-10.git
cd Team-10
```

2. **Install dependencies**
```bash
npm run install-all
```

3. **Environment Setup**

**Server (.env)**:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/seva-sahayog
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLIENT_URL=http://localhost:3000
```

**Client (.env)**:
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_WS_URL=ws://localhost:5000
```

4. **Start Development Servers**
```bash
npm run dev
```

This starts both frontend (http://localhost:3000) and backend (http://localhost:5000) servers.

## 📁 Project Structure

```
seva-sahayog-portal/
├── client/                 # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts (Auth, Notifications)
│   │   ├── pages/          # Page components
│   │   ├── i18n/          # Internationalization
│   │   └── utils/         # Utility functions
│   └── package.json
├── server/                 # Node.js Backend
│   ├── middleware/         # Custom middleware
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API endpoints
│   ├── utils/             # Utility functions
│   ├── logs/              # Application logs
│   └── package.json
├── vercel.json            # Deployment configuration
└── package.json           # Root package.json
```

## 🔐 API Endpoints

### Authentication
```
POST /api/auth/register     # User registration
POST /api/auth/login        # User login
GET  /api/auth/me          # Get current user
PUT  /api/auth/profile     # Update profile
```

### Donations
```
GET  /api/donations        # List donations
POST /api/donations        # Create donation
GET  /api/donations/:id    # Get donation details
PUT  /api/donations/:id    # Update donation
```

### Requests
```
GET  /api/requests         # List requests
POST /api/requests         # Create request
GET  /api/requests/:id     # Get request details
```

### Admin
```
GET  /api/admin/matches    # Pending matches
POST /api/admin/approve    # Approve match
GET  /api/admin/export     # Export data
```

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with gradient accents
- **Responsive Layout**: Mobile-first design approach
- **Smooth Animations**: Framer Motion for engaging interactions
- **Accessibility**: WCAG compliant components
- **Dark/Light Mode**: User preference support
- **Progressive Web App**: Mobile app-like experience

## 🛡️ Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Rate Limiting**: API abuse prevention
- **Input Validation**: Comprehensive data sanitization
- **CORS Protection**: Secure cross-origin requests
- **Content Moderation**: AI-powered inappropriate content detection

## 📈 Scalability & Performance

- **Database Indexing**: Optimized MongoDB queries
- **Image Optimization**: Cloudinary transformations
- **Response Compression**: Gzip compression
- **Caching Strategy**: React Query for client-side caching
- **Lazy Loading**: Code splitting and dynamic imports

## 🌍 Deployment

### Vercel Deployment
```bash
# Build and deploy
npm run build
vercel --prod
```

### Environment Variables Setup
Configure these in Vercel dashboard:
- `MONGODB_URI`
- `JWT_SECRET`
- `CLOUDINARY_*` variables
- `EMAIL_*` settings

## 👥 Team-10 Members
- **Lead Developer**: Full-stack development and architecture
- **Frontend Specialist**: UI/UX design and React development
- **Backend Engineer**: API development and database design
- **DevOps**: Deployment and infrastructure
- **Project Manager**: Coordination and documentation
- **QA Engineer**: Testing and quality assurance
- **Designer**: UI/UX design and branding
- **Business Analyst**: Requirements and user stories

## 🏆 Hackathon Highlights

### Innovation
- AI-powered content moderation
- Smart matching algorithm
- Real-time notifications
- Multilingual support

### Technical Excellence
- Clean, maintainable code architecture
- Comprehensive error handling
- Security best practices
- Performance optimization

### User Experience
- Intuitive, accessible design
- Mobile-responsive interface
- Smooth animations and interactions
- Multi-step guided flows

### Social Impact
- Solving real-world NGO problems
- Enabling efficient donation matching
- Reducing coordination overhead
- Transparent transaction tracking

## 📞 Support

For technical support or questions:
- **Email**: team10@sevasahayog.org
- **Issues**: GitHub Issues tab
- **Documentation**: See `/docs` folder

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ by Team-10 for Mastercard Code for Change 2.0**

*Making donation matching simple, transparent, and impactful.*