# 🚀 Unified Bootstrap Business Form Application

A comprehensive 14-section business information collection form with unified frontend and backend deployment.

## ✨ Features

### 🎯 Complete 14-Section Form
1. **Business & Contact Information** - Basic business details
2. **Website Objective & Goals** - Purpose and success metrics
3. **Target Audience** - Customer demographics and needs
4. **Branding & Design** - Logo, colors, and visual preferences
5. **Website Pages & Features** - Required pages and functionality
6. **Content** - Photos, videos, and content requirements
7. **Business Information for SEO** - Local SEO and search optimization
8. **Google & Social Media** - Online presence and analytics
9. **Forms & Lead Generation** - Contact forms and lead capture
10. **Advertising Budget** - Marketing budget and platforms
11. **Domain & Hosting** - Technical requirements
12. **Timeline & Expectations** - Project deadlines and training
13. **Add-ons & Additional Services** - Extra services needed
14. **Final Review & Submission** - Confirmation and submission

### 🌐 Multi-Language Support
- **English** - Default language
- **हिंदी (Hindi)** - Full Hindi translation
- **मराठी (Marathi)** - Complete Marathi support

### 🔐 Admin Panel
- Password-protected admin interface
- View all submitted forms
- Export data to Excel
- Delete forms
- Enhanced form details view

### 🏗️ Unified Architecture
- **Single System Deployment** - No separate frontend/backend
- **Flask Backend** - Serves both API and static files
- **PostgreSQL Database** - Robust data storage
- **Bootstrap Frontend** - Responsive and modern UI
- **File Upload Support** - Logo and image uploads with base64 encoding

## 🚀 Quick Start

### Prerequisites
- Python 3.7+
- PostgreSQL
- Virtual environment (recommended)

### Installation

1. **Clone and navigate to bootstrap directory:**
```bash
cd /app/bootstrap
```

2. **Configure environment variables:**
```bash
# Edit .env file with your database credentials
DATABASE_URL=postgresql://username:password@localhost:5432/business_forms
SECRET_KEY=your-secret-key-here
UPLOAD_FOLDER=uploads
MAX_CONTENT_LENGTH=16777216
```

3. **Start the application:**
```bash
chmod +x start.sh
./start.sh
```

### Manual Installation

1. **Create virtual environment:**
```bash
python3 -m venv venv
source venv/bin/activate
```

2. **Install dependencies:**
```bash
pip install -r backend/requirements.txt
```

3. **Run the unified application:**
```bash
python unified_app.py
```

## 📱 Usage

### User Form
- Visit: `http://localhost:5000`
- Complete the 14-section form
- Multi-language support available
- Auto-save functionality for each section
- File upload support for logos and images

### Admin Panel
- Visit: `http://localhost:5000/admin`
- Default password: `vinayak@123`
- Features:
  - View all submitted forms
  - Export data to Excel
  - Delete forms
  - Enhanced form details

## 🗄️ Database Schema

### BusinessForm Table
- **67+ fields** covering all business aspects
- **UUID primary keys** for better JSON serialization
- **Timestamp tracking** for form submissions
- **Section progress tracking** for incomplete forms
- **File path storage** for uploaded images

### Key Fields
- Basic business information
- Website requirements and goals
- Target audience and marketing
- Technical specifications
- Timeline and budget information

## 🔧 Technical Details

### Backend (Flask)
- **Flask-SQLAlchemy** for database operations
- **Flask-CORS** for cross-origin requests
- **Pandas** for Excel export functionality
- **PIL** for image processing
- **Base64 encoding** for frontend image display

### Frontend (Bootstrap)
- **Bootstrap 5.3.0** for responsive design
- **Font Awesome** for icons
- **JavaScript** for form logic and API calls
- **Multi-language** translation system
- **Progress tracking** with visual indicators

### API Endpoints
- `GET /` - Main form page
- `GET /admin` - Admin panel
- `GET /api/health` - Health check
- `POST /api/save-section` - Save form section
- `POST /api/upload-image` - Upload images
- `GET /api/get-form/<id>` - Get form by ID
- `GET /api/get-all-forms` - Get all forms
- `DELETE /api/delete-form/<id>` - Delete form
- `GET /api/export-data` - Export to Excel

## 📊 Data Export

### Excel Export Features
- **Timestamped exports** with unique filenames
- **67+ columns** with complete form data
- **Direct download** from admin panel
- **Pandas integration** for data processing

## 🌟 Key Improvements

### From Previous Version
- ✅ **Unified deployment** - Single system instead of separate frontend/backend
- ✅ **Complete 14 sections** - All form sections implemented
- ✅ **Enhanced admin panel** - Better form management
- ✅ **Multi-language support** - Hindi and Marathi translations
- ✅ **Better file handling** - Base64 encoding for frontend compatibility
- ✅ **Improved navigation** - Section-by-section progress tracking

### Architecture Benefits
- **Simplified deployment** - Single Flask app serves everything
- **Better performance** - No separate server communication
- **Easier maintenance** - Single codebase to manage
- **Enhanced security** - Unified authentication and validation

## 🔒 Security Features

- **Input validation** on all form fields
- **File upload restrictions** with size limits
- **SQL injection protection** via SQLAlchemy
- **CORS configuration** for secure API access
- **Admin authentication** for protected areas

## 📈 Performance Optimizations

- **Section-based saving** - Prevents data loss
- **Image compression** - Optimized file storage
- **Database indexing** - Fast query performance
- **Lazy loading** - Efficient resource usage

## 🚨 Troubleshooting

### Common Issues

1. **Database connection error:**
   ```bash
   # Check PostgreSQL status
   sudo service postgresql status
   
   # Verify database URL in .env
   DATABASE_URL=postgresql://username:password@localhost:5432/business_forms
   ```

2. **File upload issues:**
   ```bash
   # Check uploads directory permissions
   mkdir -p uploads
   chmod 755 uploads
   ```

3. **Port already in use:**
   ```bash
   # Kill existing process
   lsof -ti:5000 | xargs kill -9
   ```

## 📝 Development

### Project Structure
```
bootstrap/
├── unified_app.py          # Main Flask application
├── frontend/
│   ├── index.html         # Main form page
│   ├── admin.html         # Admin panel
│   ├── app.js            # Form JavaScript
│   └── admin.js          # Admin JavaScript
├── backend/
│   ├── requirements.txt   # Python dependencies
│   └── app.py            # Legacy backend (reference)
├── uploads/               # File upload directory
├── .env                  # Environment variables
├── start.sh              # Startup script
└── README.md             # This file
```

### Adding New Sections
1. Add HTML structure in `frontend/index.html`
2. Update JavaScript logic in `frontend/app.js`
3. Update database model in `unified_app.py`
4. Update `totalSections` constant

## 🎉 Success Metrics

- **14 complete sections** with 67+ fields
- **Multi-language support** for broader accessibility
- **Unified deployment** for simplified hosting
- **Admin panel** for form management
- **PostgreSQL integration** for robust data storage
- **File upload support** with base64 encoding
- **Export functionality** for data analysis

## 📞 Support

For technical support or questions:
- Check the troubleshooting section
- Review the console logs for error messages
- Verify database connectivity
- Ensure all dependencies are installed

---

**Built with ❤️ using Flask, Bootstrap, and PostgreSQL**