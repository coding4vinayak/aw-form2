#!/bin/bash

# Unified Bootstrap Form Application Startup Script
# This script starts a single system that serves both frontend and backend

echo "🚀 Starting Unified Bootstrap Form Application..."

# Check if PostgreSQL is running
if ! pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
    echo "❌ PostgreSQL is not running. Please start PostgreSQL first."
    echo "   sudo service postgresql start"
    exit 1
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies
echo "📦 Installing dependencies..."
pip install -r backend/requirements.txt

# Set environment variables
export FLASK_APP=unified_app.py
export FLASK_ENV=development

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found. Please create one with your database credentials."
    echo "   Example:"
    echo "   DATABASE_URL=postgresql://username:password@localhost:5432/business_forms"
    echo "   SECRET_KEY=your-secret-key-here"
    exit 1
fi

# Create uploads directory
mkdir -p uploads

# Start the unified application
echo "🌐 Starting unified application on http://localhost:5000"
echo "📋 Form available at: http://localhost:5000"
echo "🔐 Admin panel at: http://localhost:5000/admin"
echo "💾 Database: PostgreSQL"
echo "🌐 Multi-language support: English, Hindi, Marathi"
echo "📊 14 comprehensive form sections"
echo ""
echo "Press Ctrl+C to stop the application"
echo ""

python unified_app.py