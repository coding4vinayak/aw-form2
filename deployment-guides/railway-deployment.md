# Railway Deployment Guide for Bootstrap Form

## 🚀 Deploy to Railway (Easiest for Flask Apps)

### Step 1: Prepare Your Project
```bash
cd /app/bootstrap
```

### Step 2: Create Railway Configuration
```bash
# Create Procfile
echo "web: python unified_app.py" > Procfile

# Create railway.json
cat > railway.json << 'EOF'
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "numReplicas": 1,
    "sleepApplication": false,
    "restartPolicyType": "ON_FAILURE"
  }
}
EOF
```

### Step 3: Update Environment Variables
```bash
# Update .env for production
cat > .env << 'EOF'
DATABASE_URL=postgresql://postgres:password@monorail.proxy.rlwy.net:12345/railway
SECRET_KEY=your-production-secret-key
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216
EOF
```

### Step 4: Deploy to Railway
1. Go to https://railway.app
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Railway will automatically detect Flask and deploy

### Step 5: Add Database
1. In Railway dashboard, click "Add Service"
2. Choose "PostgreSQL"
3. Copy the connection string to your .env

### Step 6: Update Your App
```python
# Update unified_app.py to use Railway's PORT
import os
PORT = int(os.environ.get('PORT', 5000))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=PORT)
```

## 🌐 Your App URLs:
- **Form**: https://your-app-name.up.railway.app
- **Admin**: https://your-app-name.up.railway.app/admin

## 💰 Cost: FREE tier available, then ~$5/month