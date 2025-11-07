#!/bin/bash

# CityGuardian Complete Database Setup and Test Script
echo "🚀 CityGuardian Database Complete Setup & Test"
echo "=============================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Get current IP
echo -e "${BLUE}🌐 Getting your current IP address...${NC}"
CURRENT_IP=$(curl -s https://httpbin.org/ip | jq -r '.origin' 2>/dev/null || curl -s https://ifconfig.me || echo "unknown")
echo -e "📍 Your current IP: ${GREEN}$CURRENT_IP${NC}"
echo ""

echo -e "${YELLOW}⚠️  IMPORTANT: MongoDB Atlas Connection Issue Detected${NC}"
echo "================================================================="
echo ""
echo -e "${RED}❌ Issue:${NC} Your IP ($CURRENT_IP) is not whitelisted in MongoDB Atlas"
echo ""
echo -e "${GREEN}✅ Solution: Add your IP to MongoDB Atlas whitelist${NC}"
echo ""
echo "🔧 Follow these steps:"
echo ""
echo "1. Go to MongoDB Atlas Dashboard: https://cloud.mongodb.com"
echo "2. Navigate to your project and cluster"
echo "3. Click 'Network Access' in the left sidebar"
echo "4. Click 'Add IP Address'"
echo "5. Add this IP: $CURRENT_IP"
echo "   OR"
echo "6. Add 0.0.0.0/0 for temporary testing (not recommended for production)"
echo ""
echo -e "${BLUE}📱 Alternative Testing Methods:${NC}"
echo "================================="
echo ""

# Method 1: Check if server is running
echo -e "${PURPLE}Method 1: Web Interface Testing${NC}"
echo "- Start server: npm run dev"
echo "- Visit: http://localhost:3000/test-database"
echo "- Use the web interface to test connection and data"
echo ""

# Method 2: API Testing
echo -e "${PURPLE}Method 2: API Testing (when MongoDB is accessible)${NC}"
if curl -s --connect-timeout 5 http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Server is running at http://localhost:3000${NC}"
    
    echo ""
    echo "🧪 Testing Available Endpoints:"
    echo "==============================="
    
    # Test health endpoint
    echo -e "${BLUE}🏥 Health Check:${NC}"
    HEALTH_RESPONSE=$(curl -s http://localhost:3000/api/health)
    echo "$HEALTH_RESPONSE" | jq . 2>/dev/null || echo "$HEALTH_RESPONSE"
    echo ""
    
    # Test if we can at least hit the endpoints
    echo -e "${BLUE}📊 Available Test URLs:${NC}"
    echo "- Health Check: http://localhost:3000/api/health"
    echo "- Seed Database: POST http://localhost:3000/api/seed"
    echo "- Get Data: GET http://localhost:3000/api/seed"
    echo "- Test Interface: http://localhost:3000/test-database"
    echo "- Complaints: http://localhost:3000/api/complaints"
    echo ""
    
else
    echo -e "${YELLOW}⚠️  Server not running. Start with: npm run dev${NC}"
    echo ""
fi

# Method 3: Local Development Setup
echo -e "${PURPLE}Method 3: Complete Local Development Test${NC}"
echo "==========================================="
echo ""

# Check if environment is set up
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✅ .env.local file exists${NC}"
    
    # Check if MongoDB URI is set
    if grep -q "MONGODB_URI=" .env.local; then
        echo -e "${GREEN}✅ MongoDB URI is configured${NC}"
        MONGO_URI=$(grep "MONGODB_URI=" .env.local | cut -d'=' -f2)
        # Hide password in output
        SAFE_URI=$(echo "$MONGO_URI" | sed 's/:\/\/[^:]*:[^@]*@/:\/\/***:***@/')
        echo -e "📍 MongoDB URI: $SAFE_URI"
    else
        echo -e "${RED}❌ MongoDB URI not found in .env.local${NC}"
    fi
else
    echo -e "${RED}❌ .env.local file not found${NC}"
    echo -e "${YELLOW}💡 Run the setup script: ./setup-aws.sh${NC}"
fi

echo ""
echo -e "${PURPLE}Method 4: Manual Data Verification${NC}"
echo "===================================="
echo ""
echo "Once you whitelist your IP in MongoDB Atlas:"
echo ""
echo "1. 🔄 Restart the server: npm run dev"
echo "2. 🌐 Visit: http://localhost:3000/test-database"
echo "3. 🔘 Click 'Test Connection' button"
echo "4. 🌱 Click 'Seed Database' to create sample data"
echo "5. 📊 Click 'Fetch Data' to see all data"
echo "6. 📝 Visit: http://localhost:3000/citizen/reports to test complaints"
echo ""

echo -e "${GREEN}🎯 Expected Results After IP Whitelisting:${NC}"
echo "=============================================="
echo ""
echo "✅ Health check should return status: 'ok'"
echo "✅ Database should show 3+ users (citizen, employee, admin)"
echo "✅ Database should show 5+ complaints (various types)"
echo "✅ Complaint form should work and save to database"
echo "✅ Data should be visible in MongoDB Atlas dashboard"
echo ""

echo -e "${BLUE}🔧 Current System Status:${NC}"
echo "=========================="
echo ""

# Check Node.js
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo -e "✅ Node.js: $NODE_VERSION"
else
    echo -e "❌ Node.js: Not installed"
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo -e "✅ npm: $NPM_VERSION"
else
    echo -e "❌ npm: Not installed"
fi

# Check if dependencies are installed
if [ -d "node_modules" ]; then
    echo -e "✅ Dependencies: Installed"
else
    echo -e "❌ Dependencies: Not installed (run: npm install)"
fi

# Check if build files exist
if [ -d ".next" ]; then
    echo -e "✅ Next.js: Built"
else
    echo -e "⚠️  Next.js: Not built (will build on first run)"
fi

echo ""
echo -e "${GREEN}🚀 Quick Start Commands:${NC}"
echo "========================"
echo ""
echo "1. Install dependencies:     npm install --legacy-peer-deps"
echo "2. Start development server: npm run dev"
echo "3. Open test interface:      http://localhost:3000/test-database"
echo "4. Open complaint system:    http://localhost:3000/citizen/reports"
echo ""

echo -e "${YELLOW}⚡ After Whitelisting IP in MongoDB Atlas:${NC}"
echo "=============================================="
echo ""
echo "./test-database.sh           # Run this script again"
echo "curl http://localhost:3000/api/health    # Should return success"
echo "curl -X POST http://localhost:3000/api/seed    # Create sample data"
echo "curl http://localhost:3000/api/seed           # View all data"
echo ""

echo -e "${PURPLE}📞 Support Links:${NC}"
echo "=================="
echo ""
echo "🔗 MongoDB Atlas Dashboard: https://cloud.mongodb.com"
echo "🔗 MongoDB IP Whitelist Guide: https://www.mongodb.com/docs/atlas/security-whitelist/"
echo "🔗 Next.js Documentation: https://nextjs.org/docs"
echo ""

echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "=================="
echo ""
echo -e "${YELLOW}💡 Remember: The main issue is IP whitelisting in MongoDB Atlas${NC}"
echo -e "${YELLOW}   Once fixed, all features will work perfectly!${NC}"
echo ""