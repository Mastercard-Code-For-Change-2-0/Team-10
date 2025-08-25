#!/bin/bash

# Seva Sahayog Portal Setup Script
# Mastercard Code for Change 2.0 - Team 10

echo "🚀 Setting up Seva Sahayog Donation Matching Portal..."
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ and try again."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | sed 's/v//')
REQUIRED_VERSION="16.0.0"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$NODE_VERSION" | sort -V | head -n1)" = "$REQUIRED_VERSION" ]; then 
    echo "✅ Node.js version $NODE_VERSION detected"
else
    echo "❌ Node.js version $NODE_VERSION is too old. Please upgrade to version 16 or higher."
    exit 1
fi

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client && npm install

# Install server dependencies
echo "📦 Installing server dependencies..."
cd ../server && npm install

# Go back to root
cd ..

# Create environment files from examples
echo "⚙️  Creating environment configuration files..."

if [ ! -f server/.env ]; then
    cp server/.env.example server/.env
    echo "📄 Created server/.env from example. Please update with your credentials."
fi

if [ ! -f client/.env ]; then
    echo "REACT_APP_API_URL=http://localhost:5000/api" > client/.env
    echo "REACT_APP_WS_URL=ws://localhost:5000" >> client/.env
    echo "📄 Created client/.env with default values."
fi

# Create logs directory
echo "📁 Creating logs directory..."
mkdir -p server/logs

# Display setup completion and next steps
echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Update server/.env with your MongoDB, Cloudinary, and email credentials"
echo "2. Make sure you have MongoDB Atlas cluster ready"
echo "3. Create a Cloudinary account for image uploads"
echo "4. Run 'npm run dev' to start both frontend and backend servers"
echo ""
echo "🔗 Important URLs:"
echo "   • Frontend: http://localhost:3000"
echo "   • Backend API: http://localhost:5000/api"
echo "   • Health Check: http://localhost:5000/api/health"
echo ""
echo "📚 Documentation:"
echo "   • README.md - Full project documentation"
echo "   • API endpoints and usage examples"
echo ""
echo "🎯 For Mastercard Code for Change 2.0 Hackathon"
echo "Built with ❤️  by Team-10"
echo ""
echo "Happy coding! 🚀"
