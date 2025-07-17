from flask import Flask, request, jsonify, send_file, render_template_string, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
import uuid
from datetime import datetime, date
import json
import base64
from PIL import Image
import pandas as pd
from io import BytesIO
import tempfile
from werkzeug.utils import secure_filename
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
app.config['UPLOAD_FOLDER'] = os.getenv('UPLOAD_FOLDER', 'uploads')
app.config['MAX_CONTENT_LENGTH'] = int(os.getenv('MAX_CONTENT_LENGTH', '16777216'))

# Initialize extensions
db = SQLAlchemy(app)
CORS(app)

# Create upload directory
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Database Models
class BusinessForm(db.Model):
    __tablename__ = 'business_forms'
    
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Basic Information
    full_name = db.Column(db.String(200))
    email = db.Column(db.String(200))
    phone = db.Column(db.String(50))
    business_name = db.Column(db.String(200))
    business_display_name = db.Column(db.String(200))
    business_type = db.Column(db.String(100))
    registration_number = db.Column(db.String(100))
    business_locations = db.Column(db.Text)
    
    # Website Objectives
    website_purpose = db.Column(db.Text)
    business_goals = db.Column(db.Text)
    success_metrics = db.Column(db.Text)
    
    # Target Audience
    target_customer = db.Column(db.Text)
    geographic_regions = db.Column(db.Text)
    customer_needs = db.Column(db.Text)
    customer_sources = db.Column(db.Text)
    
    # Branding & Design
    has_logo = db.Column(db.String(10))
    logo_path = db.Column(db.String(500))
    color_scheme = db.Column(db.String(200))
    font_styles = db.Column(db.String(200))
    tagline = db.Column(db.String(300))
    website_feel = db.Column(db.Text)
    reference_websites = db.Column(db.Text)
    
    # Website Pages & Features
    required_pages = db.Column(db.Text)
    required_features = db.Column(db.Text)
    mobile_responsive = db.Column(db.String(10))
    multilingual = db.Column(db.String(200))
    
    # Content
    content_ready = db.Column(db.String(10))
    has_photos = db.Column(db.String(10))
    photos_path = db.Column(db.String(500))
    has_videos = db.Column(db.String(10))
    videos_path = db.Column(db.String(500))
    need_content_help = db.Column(db.String(10))
    uploaded_materials = db.Column(db.String(500))
    
    # Business Information for SEO
    business_address = db.Column(db.String(500))
    business_phone = db.Column(db.String(50))
    business_email = db.Column(db.String(200))
    business_hours = db.Column(db.String(200))
    areas_served = db.Column(db.Text)
    product_categories = db.Column(db.Text)
    search_keywords = db.Column(db.Text)
    business_tags = db.Column(db.Text)
    business_description = db.Column(db.Text)
    
    # Google & Social Media
    has_google_profile = db.Column(db.String(10))
    google_profile_link = db.Column(db.String(500))
    social_media_links = db.Column(db.Text)
    has_analytics = db.Column(db.String(10))
    running_ads = db.Column(db.Text)
    
    # Forms & Lead Generation
    form_details = db.Column(db.Text)
    form_destination = db.Column(db.String(100))
    form_integrations = db.Column(db.Text)
    response_time = db.Column(db.String(100))
    
    # Advertising Budget
    ad_budget = db.Column(db.String(100))
    ad_platforms = db.Column(db.Text)
    promotions = db.Column(db.Text)
    
    # Domain & Hosting
    has_domain = db.Column(db.String(10))
    domain_name = db.Column(db.String(200))
    has_hosting = db.Column(db.String(10))
    hosting_provider = db.Column(db.String(100))
    need_email_setup = db.Column(db.String(10))
    need_security = db.Column(db.String(10))
    
    # Timeline & Expectations
    launch_date = db.Column(db.Date)
    upcoming_deadlines = db.Column(db.Text)
    need_training = db.Column(db.String(10))
    
    # Add-ons & Additional
    additional_services = db.Column(db.Text)
    additional_notes = db.Column(db.Text)
    
    # Form metadata
    current_section = db.Column(db.Integer, default=1)
    is_completed = db.Column(db.Boolean, default=False)
    
    def to_dict(self):
        """Convert model to dictionary for JSON serialization"""
        result = {}
        for column in self.__table__.columns:
            value = getattr(self, column.name)
            if isinstance(value, datetime):
                result[column.name] = value.isoformat()
            elif isinstance(value, date):
                result[column.name] = value.isoformat()
            else:
                result[column.name] = value
        return result

# Frontend Routes
@app.route('/')
def index():
    """Serve the main form page"""
    try:
        with open('frontend/index.html', 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return "Form page not found", 404

@app.route('/admin')
def admin():
    """Serve the admin page"""
    try:
        with open('frontend/admin.html', 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return "Admin page not found", 404

@app.route('/app.js')
def app_js():
    """Serve the main JavaScript file"""
    try:
        with open('frontend/app.js', 'r', encoding='utf-8') as f:
            content = f.read()
            # Replace the backend URL with current host
            content = content.replace("const backendUrl = 'http://localhost:5000';", "const backendUrl = '';")
            return content, 200, {'Content-Type': 'application/javascript'}
    except FileNotFoundError:
        return "JavaScript file not found", 404

@app.route('/admin.js')
def admin_js():
    """Serve the admin JavaScript file"""
    try:
        with open('frontend/admin.js', 'r', encoding='utf-8') as f:
            content = f.read()
            # Replace the backend URL with current host
            content = content.replace("const backendUrl = 'http://localhost:5000';", "const backendUrl = '';")
            return content, 200, {'Content-Type': 'application/javascript'}
    except FileNotFoundError:
        return "Admin JavaScript file not found", 404

# API Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'database': 'connected'
    })

@app.route('/api/save-section', methods=['POST'])
def save_section():
    """Save form section data"""
    try:
        data = request.get_json()
        form_id = data.get('form_id')
        
        if not form_id:
            return jsonify({'success': False, 'message': 'Form ID is required'}), 400
        
        # Check if form exists
        form = BusinessForm.query.get(form_id)
        if not form:
            # Create new form
            form = BusinessForm(id=form_id)
            db.session.add(form)
        
        # Update form data
        for key, value in data.items():
            if key not in ['form_id', 'current_section'] and hasattr(form, key):
                # Handle date fields specially
                if key == 'launch_date' and value:
                    try:
                        if isinstance(value, str):
                            value = datetime.strptime(value, '%Y-%m-%d').date()
                    except ValueError:
                        value = None
                setattr(form, key, value)
        
        # Update current section
        if 'current_section' in data:
            form.current_section = data['current_section']
        
        # Update completion status
        if 'is_completed' in data:
            form.is_completed = data['is_completed']
        
        form.timestamp = datetime.utcnow()
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Section saved successfully',
            'form_id': form_id
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/upload-image', methods=['POST'])
def upload_image():
    """Handle image upload"""
    try:
        if 'file' not in request.files:
            return jsonify({'success': False, 'message': 'No file provided'}), 400
        
        file = request.files['file']
        form_id = request.form.get('form_id')
        
        if not form_id:
            return jsonify({'success': False, 'message': 'Form ID is required'}), 400
        
        if file.filename == '':
            return jsonify({'success': False, 'message': 'No file selected'}), 400
        
        # Generate unique filename
        file_extension = file.filename.rsplit('.', 1)[1].lower() if '.' in file.filename else 'jpg'
        unique_filename = f"{form_id}_{str(uuid.uuid4())}.{file_extension}"
        
        # Save file
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
        file.save(filepath)
        
        # Convert to base64 for frontend display
        with open(filepath, 'rb') as img_file:
            img_data = base64.b64encode(img_file.read()).decode('utf-8')
            img_base64 = f"data:image/{file_extension};base64,{img_data}"
        
        return jsonify({
            'success': True,
            'message': 'Image uploaded successfully',
            'url': f'/uploads/{unique_filename}',
            'base64': img_base64
        })
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/get-form/<form_id>', methods=['GET'])
def get_form(form_id):
    """Get form data by ID"""
    try:
        form = BusinessForm.query.get(form_id)
        if not form:
            return jsonify({'success': False, 'message': 'Form not found'}), 404
        
        return jsonify({
            'success': True,
            'data': form.to_dict()
        })
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/get-all-forms', methods=['GET'])
def get_all_forms():
    """Get all forms"""
    try:
        forms = BusinessForm.query.order_by(BusinessForm.timestamp.desc()).all()
        
        return jsonify({
            'success': True,
            'data': [form.to_dict() for form in forms],
            'count': len(forms)
        })
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/delete-form/<form_id>', methods=['DELETE'])
def delete_form(form_id):
    """Delete a form"""
    try:
        form = BusinessForm.query.get(form_id)
        if not form:
            return jsonify({'success': False, 'message': 'Form not found'}), 404
        
        # Delete associated images
        if form.logo_path:
            try:
                os.remove(os.path.join(app.config['UPLOAD_FOLDER'], form.logo_path.split('/')[-1]))
            except:
                pass
        
        if form.photos_path:
            try:
                os.remove(os.path.join(app.config['UPLOAD_FOLDER'], form.photos_path.split('/')[-1]))
            except:
                pass
        
        # Delete form
        db.session.delete(form)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Form deleted successfully'
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/export-data', methods=['GET'])
def export_data():
    """Export all forms to Excel"""
    try:
        forms = BusinessForm.query.order_by(BusinessForm.timestamp.desc()).all()
        
        if not forms:
            return jsonify({'success': False, 'message': 'No data to export'}), 404
        
        # Convert to DataFrame
        data = [form.to_dict() for form in forms]
        df = pd.DataFrame(data)
        
        # Create Excel file
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f'business_forms_export_{timestamp}.xlsx'
        filepath = os.path.join(tempfile.gettempdir(), filename)
        
        df.to_excel(filepath, index=False)
        
        return send_file(
            filepath,
            as_attachment=True,
            download_name=filename,
            mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        )
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    """Serve uploaded files"""
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    with app.app_context():
        try:
            db.create_all()
            print("Database tables created successfully")
        except Exception as e:
            print(f"Error creating tables: {e}")
    
    print("🚀 Unified Bootstrap Form Application Starting...")
    print("📋 Form available at: http://localhost:5000")
    print("🔐 Admin panel at: http://localhost:5000/admin")
    print("💾 Database: PostgreSQL")
    print("🌐 Multi-language support: English, Hindi, Marathi")
    print("📊 14 comprehensive form sections")
    
    app.run(debug=True, host='0.0.0.0', port=5000)