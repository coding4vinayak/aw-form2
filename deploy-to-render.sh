#!/bin/bash

# 🚀 Render Deployment Helper Script
# This script helps prepare your project for Render deployment

echo "🚀 Preparing Business Form App for Render deployment..."
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing git repository..."
    git init
else
    echo "✅ Git repository already initialized"
fi

# Check if requirements.txt exists
if [ ! -f "requirements.txt" ]; then
    echo "❌ requirements.txt not found!"
    exit 1
else
    echo "✅ requirements.txt found"
fi

# Check if unified_app.py exists
if [ ! -f "unified_app.py" ]; then
    echo "❌ unified_app.py not found!"
    exit 1
else
    echo "✅ unified_app.py found"
fi

# Check if render.yml exists
if [ ! -f "render.yml" ]; then
    echo "❌ render.yml not found!"
    exit 1
else
    echo "✅ render.yml configuration found"
fi

# Check if frontend directory exists
if [ ! -d "frontend" ]; then
    echo "❌ frontend directory not found!"
    exit 1
else
    echo "✅ frontend directory found"
fi

echo ""
echo "🎯 Pre-deployment checklist:"
echo "1. ✅ Git repository initialized"
echo "2. ✅ All required files present"
echo "3. ✅ Configuration files ready"
echo ""

echo "📋 Next steps:"
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Ready for Render deployment'"
echo "   git remote add origin https://github.com/yourusername/your-repo-name.git"
echo "   git push -u origin main"
echo ""
echo "2. Go to https://render.com and create:"
echo "   - PostgreSQL database first"
echo "   - Then web service connected to your GitHub repo"
echo ""
echo "3. Set these environment variables in Render:"
echo "   - DATABASE_URL: (from your PostgreSQL service)"
echo "   - SECRET_KEY: (auto-generate or set custom)"
echo "   - UPLOAD_FOLDER: uploads"
echo "   - MAX_CONTENT_LENGTH: 16777216"
echo "   - FLASK_ENV: production"
echo ""
echo "🌐 After deployment, your app will be available at:"
echo "   https://your-app-name.onrender.com"
echo ""
echo "🔐 Admin panel will be at:"
echo "   https://your-app-name.onrender.com/admin"
echo "   (Default password: vinayak@123)"
echo ""
echo "📖 Full guide available in: RENDER_DEPLOYMENT_GUIDE.md"
echo ""
echo "✨ Your Business Form App is ready for deployment! ✨"