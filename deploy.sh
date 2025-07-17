#!/bin/bash

# 🚀 Bootstrap Form Deployment Script
# Choose your deployment platform

echo "🚀 Bootstrap Form Deployment Options"
echo "===================================="
echo ""
echo "1. Railway (Recommended for Flask apps)"
echo "2. Render (Good Flask support)"
echo "3. Static version for Netlify/Vercel"
echo "4. Heroku (Classic choice)"
echo "5. Manual setup guide"
echo ""
read -p "Choose deployment option (1-5): " choice

case $choice in
    1)
        echo "🚂 Preparing Railway deployment..."
        
        # Create Procfile
        echo "web: python unified_app.py" > Procfile
        
        # Update unified_app.py for Railway
        sed -i 's/app.run(debug=True, host='"'"'0.0.0.0'"'"', port=5000)/port = int(os.environ.get("PORT", 5000))\n    app.run(host="0.0.0.0", port=port, debug=False)/' unified_app.py
        
        echo "✅ Railway setup complete!"
        echo "📝 Next steps:"
        echo "1. Push your code to GitHub"
        echo "2. Go to https://railway.app"
        echo "3. Connect your GitHub repository"
        echo "4. Add PostgreSQL service"
        echo "5. Set environment variables"
        echo ""
        echo "🔗 Your app will be at: https://your-app-name.up.railway.app"
        ;;
        
    2)
        echo "🎨 Preparing Render deployment..."
        
        # Create render.yaml
        cat > render.yaml << 'EOF'
services:
  - type: web
    name: bootstrap-form
    env: python
    buildCommand: "pip install -r backend/requirements.txt"
    startCommand: "python unified_app.py"
    envVars:
      - key: SECRET_KEY
        generateValue: true
EOF
        
        # Update unified_app.py for Render
        sed -i 's/app.run(debug=True, host='"'"'0.0.0.0'"'"', port=5000)/port = int(os.environ.get("PORT", 5000))\n    app.run(host="0.0.0.0", port=port, debug=False)/' unified_app.py
        
        echo "✅ Render setup complete!"
        echo "📝 Next steps:"
        echo "1. Push your code to GitHub"
        echo "2. Go to https://render.com"
        echo "3. Create new web service"
        echo "4. Connect your repository"
        echo "5. Add PostgreSQL database"
        echo ""
        echo "🔗 Your app will be at: https://your-app-name.onrender.com"
        ;;
        
    3)
        echo "⚡ Creating static version..."
        
        mkdir -p static-deploy
        cp -r frontend/* static-deploy/
        
        # Create simplified app.js for static deployment
        cat > static-deploy/app-static.js << 'EOF'
// Static version - uses localStorage instead of backend
const backendUrl = '';
let currentSection = 0;
let formId = null;
let formData = {};

// Generate form ID
function generateFormId() {
    formId = 'form_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Save to localStorage
async function saveSection() {
    try {
        collectFormData();
        localStorage.setItem('formData_' + formId, JSON.stringify(formData));
        localStorage.setItem('currentSection_' + formId, currentSection);
        showAlert('Section saved locally!', 'success');
    } catch (error) {
        showAlert('Error saving section: ' + error.message, 'danger');
    }
}

// Load all forms from localStorage
function loadAllForms() {
    const forms = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('formData_')) {
            const formData = JSON.parse(localStorage.getItem(key));
            forms.push(formData);
        }
    }
    return forms;
}

// Export data as JSON
function exportData() {
    const forms = loadAllForms();
    const dataStr = JSON.stringify(forms, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'bootstrap_forms_export.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}
EOF
        
        # Update index.html to use static app.js
        sed -i 's/app.js/app-static.js/' static-deploy/index.html
        
        echo "✅ Static version created!"
        echo "📝 Next steps:"
        echo "1. Go to https://netlify.com or https://vercel.com"
        echo "2. Drag and drop the 'static-deploy' folder"
        echo "3. Your site will be live instantly!"
        echo ""
        echo "📁 Static files are in: ./static-deploy/"
        echo "⚠️  Note: Uses localStorage instead of database"
        ;;
        
    4)
        echo "🟣 Preparing Heroku deployment..."
        
        # Create Procfile
        echo "web: python unified_app.py" > Procfile
        
        # Create runtime.txt
        echo "python-3.9.16" > runtime.txt
        
        # Update for Heroku
        sed -i 's/app.run(debug=True, host='"'"'0.0.0.0'"'"', port=5000)/port = int(os.environ.get("PORT", 5000))\n    app.run(host="0.0.0.0", port=port)/' unified_app.py
        
        echo "✅ Heroku setup complete!"
        echo "📝 Next steps:"
        echo "1. Install Heroku CLI"
        echo "2. heroku login"
        echo "3. heroku create your-app-name"
        echo "4. heroku addons:create heroku-postgresql:hobby-dev"
        echo "5. git push heroku main"
        echo ""
        echo "🔗 Your app will be at: https://your-app-name.herokuapp.com"
        ;;
        
    5)
        echo "📋 Manual Deployment Guide"
        echo "========================"
        echo ""
        echo "🚂 Railway (Recommended):"
        echo "- Best for Flask apps"
        echo "- Free tier available"
        echo "- Automatic PostgreSQL"
        echo "- Easy GitHub integration"
        echo "- URL: https://railway.app"
        echo ""
        echo "🎨 Render:"
        echo "- Good Flask support"
        echo "- Free tier available"
        echo "- PostgreSQL available"
        echo "- URL: https://render.com"
        echo ""
        echo "⚡ Netlify/Vercel (Static only):"
        echo "- Free static hosting"
        echo "- CDN included"
        echo "- No backend support"
        echo "- Use localStorage version"
        echo ""
        echo "🟣 Heroku:"
        echo "- Classic choice"
        echo "- PostgreSQL add-on"
        echo "- No free tier anymore"
        echo "- URL: https://heroku.com"
        echo ""
        echo "📁 All deployment files are in ./deployment-guides/"
        ;;
        
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Setup complete! Check the deployment guides for detailed instructions."
echo "📁 Deployment files: ./deployment-guides/"
echo ""
echo "💡 Recommended: Railway or Render for full Flask app functionality"
echo "⚡ For static: Netlify/Vercel with localStorage version"