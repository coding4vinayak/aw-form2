# Render Deployment Guide for Bootstrap Form

## 🚀 Deploy to Render

### Step 1: Prepare Your Project
```bash
cd /app/bootstrap
```

### Step 2: Create Render Configuration
```bash
# Create render.yaml
cat > render.yaml << 'EOF'
services:
  - type: web
    name: bootstrap-form
    env: python
    region: oregon
    buildCommand: "pip install -r backend/requirements.txt"
    startCommand: "python unified_app.py"
    envVars:
      - key: DATABASE_URL
        value: "postgresql://user:password@dpg-xxxxx.oregon-postgres.render.com/dbname"
      - key: SECRET_KEY
        generateValue: true
      - key: UPLOAD_FOLDER
        value: "uploads"
      - key: MAX_CONTENT_LENGTH
        value: "16777216"

  - type: pserv
    name: bootstrap-form-db
    env: postgresql
    region: oregon
    ipAllowList: []
EOF
```

### Step 3: Update unified_app.py for Render
```python
# Add at the top of unified_app.py
import os
from pathlib import Path

# Update the __main__ section
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
```

### Step 4: Deploy to Render
1. Go to https://render.com
2. Sign up with GitHub
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Select the bootstrap folder
6. Configure:
   - Build Command: `pip install -r backend/requirements.txt`
   - Start Command: `python unified_app.py`

### Step 5: Add PostgreSQL Database
1. In Render dashboard, click "New" → "PostgreSQL"
2. Create the database
3. Copy the connection string to your environment variables

## 🌐 Your App URLs:
- **Form**: https://your-app-name.onrender.com
- **Admin**: https://your-app-name.onrender.com/admin

## 💰 Cost: FREE tier available, then ~$7/month