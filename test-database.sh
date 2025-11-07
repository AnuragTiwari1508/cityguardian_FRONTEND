#!/bin/bash

# CityGuardian Database Test Script
echo "🚀 CityGuardian MongoDB Atlas Test Script"
echo "=========================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Configuration
SERVER_URL="http://localhost:3000"
HEALTH_ENDPOINT="/api/health"
SEED_ENDPOINT="/api/seed"

# Function to check if server is running
check_server() {
    echo -e "${BLUE}🔍 Checking if server is running...${NC}"
    if curl -s --connect-timeout 5 "$SERVER_URL" > /dev/null 2>&1; then
        echo -e "${GREEN}✅ Server is running at $SERVER_URL${NC}"
        return 0
    else
        echo -e "${RED}❌ Server is not running at $SERVER_URL${NC}"
        echo -e "${YELLOW}💡 Please start the server with: npm run dev${NC}"
        return 1
    fi
}

# Function to test health endpoint
test_health() {
    echo ""
    echo -e "${BLUE}🏥 Testing Database Health Check...${NC}"
    echo "================================================"
    
    HEALTH_RESPONSE=$(curl -s -w "\n%{http_code}" "$SERVER_URL$HEALTH_ENDPOINT" 2>/dev/null)
    HTTP_CODE=$(echo "$HEALTH_RESPONSE" | tail -n1)
    RESPONSE_BODY=$(echo "$HEALTH_RESPONSE" | head -n -1)
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✅ Health Check: SUCCESS (HTTP $HTTP_CODE)${NC}"
        echo ""
        echo -e "${PURPLE}📊 Health Check Response:${NC}"
        echo "$RESPONSE_BODY" | jq . 2>/dev/null || echo "$RESPONSE_BODY"
        return 0
    else
        echo -e "${RED}❌ Health Check: FAILED (HTTP $HTTP_CODE)${NC}"
        echo ""
        echo -e "${PURPLE}📊 Error Response:${NC}"
        echo "$RESPONSE_BODY" | jq . 2>/dev/null || echo "$RESPONSE_BODY"
        return 1
    fi
}

# Function to seed database
seed_database() {
    echo ""
    echo -e "${BLUE}🌱 Seeding Database with Sample Data...${NC}"
    echo "=============================================="
    
    SEED_RESPONSE=$(curl -s -w "\n%{http_code}" -X POST "$SERVER_URL$SEED_ENDPOINT" 2>/dev/null)
    HTTP_CODE=$(echo "$SEED_RESPONSE" | tail -n1)
    RESPONSE_BODY=$(echo "$SEED_RESPONSE" | head -n -1)
    
    if [ "$HTTP_CODE" = "201" ] || [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✅ Database Seeding: SUCCESS (HTTP $HTTP_CODE)${NC}"
        echo ""
        echo -e "${PURPLE}📊 Seeding Response:${NC}"
        echo "$RESPONSE_BODY" | jq . 2>/dev/null || echo "$RESPONSE_BODY"
        
        # Extract counts from response
        USER_COUNT=$(echo "$RESPONSE_BODY" | jq -r '.data.totalUsers // "N/A"' 2>/dev/null)
        COMPLAINT_COUNT=$(echo "$RESPONSE_BODY" | jq -r '.data.totalComplaints // "N/A"' 2>/dev/null)
        
        echo ""
        echo -e "${GREEN}📈 Database Summary:${NC}"
        echo -e "   👥 Total Users: $USER_COUNT"
        echo -e "   📝 Total Complaints: $COMPLAINT_COUNT"
        
        return 0
    else
        echo -e "${RED}❌ Database Seeding: FAILED (HTTP $HTTP_CODE)${NC}"
        echo ""
        echo -e "${PURPLE}📊 Error Response:${NC}"
        echo "$RESPONSE_BODY" | jq . 2>/dev/null || echo "$RESPONSE_BODY"
        return 1
    fi
}

# Function to fetch and display data
fetch_data() {
    echo ""
    echo -e "${BLUE}📊 Fetching Data from Database...${NC}"
    echo "===================================="
    
    DATA_RESPONSE=$(curl -s -w "\n%{http_code}" "$SERVER_URL$SEED_ENDPOINT" 2>/dev/null)
    HTTP_CODE=$(echo "$DATA_RESPONSE" | tail -n1)
    RESPONSE_BODY=$(echo "$DATA_RESPONSE" | head -n -1)
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✅ Data Fetch: SUCCESS (HTTP $HTTP_CODE)${NC}"
        echo ""
        
        # Parse and display users
        echo -e "${PURPLE}👥 USERS IN DATABASE:${NC}"
        echo "========================"
        echo "$RESPONSE_BODY" | jq -r '.data.users[]? | "Name: \(.name)\nEmail: \(.email)\nRole: \(.role)\nMobile: \(.mobile)\nCreated: \(.createdAt)\n---"' 2>/dev/null || echo "Could not parse users data"
        
        echo ""
        
        # Parse and display complaints
        echo -e "${PURPLE}📝 COMPLAINTS IN DATABASE:${NC}"
        echo "============================"
        echo "$RESPONSE_BODY" | jq -r '.data.complaints[]? | "Title: \(.title)\nType: \(.type)\nPriority: \(.priority)\nStatus: \(.status)\nLocation: \(.location.address // "N/A")\nAuthor: \(.author.name // "N/A")\nContact: \(.contact.mobile // "N/A")\nCreated: \(.createdAt)\n---"' 2>/dev/null || echo "Could not parse complaints data"
        
        # Display summary
        USER_COUNT=$(echo "$RESPONSE_BODY" | jq -r '.data.totalUsers // 0' 2>/dev/null)
        COMPLAINT_COUNT=$(echo "$RESPONSE_BODY" | jq -r '.data.totalComplaints // 0' 2>/dev/null)
        
        echo ""
        echo -e "${GREEN}📈 SUMMARY:${NC}"
        echo "============="
        echo -e "👥 Total Users: $USER_COUNT"
        echo -e "📝 Total Complaints: $COMPLAINT_COUNT"
        
        return 0
    else
        echo -e "${RED}❌ Data Fetch: FAILED (HTTP $HTTP_CODE)${NC}"
        echo ""
        echo -e "${PURPLE}📊 Error Response:${NC}"
        echo "$RESPONSE_BODY" | jq . 2>/dev/null || echo "$RESPONSE_BODY"
        return 1
    fi
}

# Function to test complaints API
test_complaints_api() {
    echo ""
    echo -e "${BLUE}📝 Testing Complaints API...${NC}"
    echo "================================="
    
    COMPLAINTS_RESPONSE=$(curl -s -w "\n%{http_code}" "$SERVER_URL/api/complaints" 2>/dev/null)
    HTTP_CODE=$(echo "$COMPLAINTS_RESPONSE" | tail -n1)
    RESPONSE_BODY=$(echo "$COMPLAINTS_RESPONSE" | head -n -1)
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "${GREEN}✅ Complaints API: SUCCESS (HTTP $HTTP_CODE)${NC}"
        COMPLAINT_COUNT=$(echo "$RESPONSE_BODY" | jq '. | length' 2>/dev/null || echo "N/A")
        echo -e "📊 Complaints found via API: $COMPLAINT_COUNT"
    else
        echo -e "${RED}❌ Complaints API: FAILED (HTTP $HTTP_CODE)${NC}"
        echo "$RESPONSE_BODY" | jq . 2>/dev/null || echo "$RESPONSE_BODY"
    fi
}

# Main execution
main() {
    echo ""
    echo -e "${BLUE}🚀 Starting CityGuardian Database Tests...${NC}"
    echo ""
    
    # Check if jq is available for JSON parsing
    if ! command -v jq &> /dev/null; then
        echo -e "${YELLOW}⚠️  jq not found. JSON responses will be displayed raw.${NC}"
        echo ""
    fi
    
    # Step 1: Check server
    if ! check_server; then
        exit 1
    fi
    
    # Step 2: Test health
    if test_health; then
        echo -e "${GREEN}✅ Database connection is working!${NC}"
    else
        echo -e "${RED}❌ Database connection failed. Check MongoDB Atlas setup.${NC}"
        echo -e "${YELLOW}💡 Make sure to add your IP ($(curl -s https://httpbin.org/ip | jq -r '.origin' 2>/dev/null || echo 'unknown')) to MongoDB Atlas whitelist${NC}"
        exit 1
    fi
    
    # Step 3: Seed database
    if seed_database; then
        echo -e "${GREEN}✅ Database seeding completed successfully!${NC}"
    else
        echo -e "${YELLOW}⚠️  Database seeding failed, but continuing...${NC}"
    fi
    
    # Step 4: Fetch data
    if fetch_data; then
        echo -e "${GREEN}✅ Data retrieval completed successfully!${NC}"
    else
        echo -e "${RED}❌ Data retrieval failed${NC}"
    fi
    
    # Step 5: Test complaints API
    test_complaints_api
    
    echo ""
    echo -e "${GREEN}🎉 CityGuardian Database Tests Completed!${NC}"
    echo "============================================="
    echo ""
    echo -e "${BLUE}📱 Next Steps:${NC}"
    echo "1. Visit http://localhost:3000/test-database for web interface"
    echo "2. Visit http://localhost:3000/citizen/reports to test complaint system"
    echo "3. Check MongoDB Atlas dashboard to see the data online"
    echo ""
    echo -e "${PURPLE}🔧 Troubleshooting:${NC}"
    echo "- If connection fails, check MongoDB Atlas IP whitelist"
    echo "- Verify .env.local has correct MongoDB URI"
    echo "- Ensure MongoDB Atlas cluster is running"
    echo ""
}

# Run the main function
main "$@"