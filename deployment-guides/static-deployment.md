# Static Version Deployment Guide

## 🌐 Deploy Static Version to Netlify/Vercel

### Option A: LocalStorage Version (No Backend)

```bash
# Create static version
cd /app/bootstrap
mkdir static-deploy
cp -r frontend/* static-deploy/
```

### Modify app.js for static deployment:
```javascript
// Replace backend URL with localStorage
const backendUrl = ''; // Remove backend dependency

// Replace API calls with localStorage
async function saveSection() {
    try {
        collectFormData();
        
        // Save to localStorage instead of API
        localStorage.setItem('formData_' + formId, JSON.stringify(formData));
        localStorage.setItem('currentSection_' + formId, currentSection);
        
        showAlert('Section saved locally!', 'success');
    } catch (error) {
        showAlert('Error saving section: ' + error.message, 'danger');
    }
}

// Replace admin panel with localStorage reading
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
```

### Deploy to Netlify:
1. Go to https://netlify.com
2. Drag and drop the `static-deploy` folder
3. Or connect GitHub repository
4. Site will be live at: https://your-site-name.netlify.app

### Deploy to Vercel:
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Select the `static-deploy` folder
5. Site will be live at: https://your-site-name.vercel.app

## 🌐 Your App URLs:
- **Form**: https://your-site-name.netlify.app
- **Admin**: https://your-site-name.netlify.app/admin.html

## 💰 Cost: FREE on both platforms