// Global variables
let isAuthenticated = false;
let forms = [];
let selectedFormData = null;
const backendUrl = 'http://localhost:5000';
const ADMIN_PASSWORD = 'vinayak@123';

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    // Handle login form submission
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Check if already authenticated (from localStorage)
    const savedAuth = localStorage.getItem('adminAuthenticated');
    if (savedAuth === 'true') {
        isAuthenticated = true;
        showAdminDashboard();
        fetchAllForms();
    }
});

// Handle login
function handleLogin(e) {
    e.preventDefault();
    const password = document.getElementById('password').value;
    
    if (password === ADMIN_PASSWORD) {
        isAuthenticated = true;
        localStorage.setItem('adminAuthenticated', 'true');
        showAdminDashboard();
        fetchAllForms();
        clearAlert('loginAlert');
    } else {
        showAlert('Invalid password. Please try again.', 'danger', 'loginAlert');
    }
}

// Toggle password visibility
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eyeIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    }
}

// Show admin dashboard
function showAdminDashboard() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    document.getElementById('formDetailView').style.display = 'none';
}

// Logout
function logout() {
    isAuthenticated = false;
    localStorage.removeItem('adminAuthenticated');
    document.getElementById('loginSection').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('formDetailView').style.display = 'none';
    document.getElementById('password').value = '';
    clearAlert('loginAlert');
}

// Fetch all forms
async function fetchAllForms() {
    try {
        showLoading(true);
        const response = await fetch(`${backendUrl}/api/get-all-forms`);
        const result = await response.json();
        
        if (result.success) {
            forms = result.data || [];
            displayForms();
            document.getElementById('totalFormsCount').textContent = forms.length;
        } else {
            showAlert('Failed to fetch forms: ' + result.message, 'danger');
        }
    } catch (error) {
        showAlert('Error fetching forms: ' + error.message, 'danger');
    } finally {
        showLoading(false);
    }
}

// Display forms
function displayForms() {
    const container = document.getElementById('formsContainer');
    
    if (forms.length === 0) {
        container.innerHTML = `
            <div class="no-forms">
                <i class="fas fa-inbox fa-3x mb-3"></i>
                <h3>No client forms submitted yet</h3>
                <p>Share your form link with clients to start collecting business information.</p>
            </div>
        `;
        return;
    }
    
    const formsHtml = forms.map((form, index) => {
        const submitDate = new Date(form.timestamp).toLocaleDateString();
        const businessName = form.business_name || 'Untitled Business';
        const contactName = form.full_name || 'Unknown';
        const email = form.email || 'Not provided';
        const phone = form.phone || 'Not provided';
        const businessType = form.business_type || 'Not specified';
        
        return `
            <div class="form-card">
                <div class="form-header">
                    <div>
                        <h4 class="mb-1">#${index + 1} - ${businessName}</h4>
                        <small class="text-muted">Submitted: ${submitDate}</small>
                    </div>
                    <button class="btn btn-danger btn-sm" onclick="deleteForm('${form.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                
                <div class="form-details">
                    <div class="detail-item">
                        <strong>Contact Person:</strong>
                        ${contactName}
                    </div>
                    <div class="detail-item">
                        <strong>Email:</strong>
                        ${email}
                    </div>
                    <div class="detail-item">
                        <strong>Phone:</strong>
                        ${phone}
                    </div>
                    <div class="detail-item">
                        <strong>Business Type:</strong>
                        ${businessType}
                    </div>
                    <div class="detail-item">
                        <strong>Business Address:</strong>
                        ${form.business_address || 'Not provided'}
                    </div>
                    <div class="detail-item">
                        <strong>Website Purpose:</strong>
                        ${form.website_purpose ? form.website_purpose.substring(0, 100) + '...' : 'Not provided'}
                    </div>
                </div>
                
                <div class="form-actions">
                    <button class="btn btn-info btn-sm" onclick="viewFormDetails('${form.id}')">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="btn btn-success btn-sm" onclick="window.open('index.html?form_id=${form.id}', '_blank')">
                        <i class="fas fa-external-link-alt"></i> View Form
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = formsHtml;
}

// View form details
async function viewFormDetails(formId) {
    try {
        showLoading(true);
        const response = await fetch(`${backendUrl}/api/get-form/${formId}`);
        const result = await response.json();
        
        if (result.success) {
            selectedFormData = result.data;
            showFormDetails();
        } else {
            showAlert('Failed to fetch form details: ' + result.message, 'danger');
        }
    } catch (error) {
        showAlert('Error fetching form details: ' + error.message, 'danger');
    } finally {
        showLoading(false);
    }
}

// Show form details
function showFormDetails() {
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('formDetailView').style.display = 'block';
    
    const container = document.getElementById('formDetailContainer');
    const form = selectedFormData;
    
    const importantFields = [
        { key: 'full_name', label: 'Full Name' },
        { key: 'email', label: 'Email' },
        { key: 'phone', label: 'Phone' },
        { key: 'business_name', label: 'Business Name' },
        { key: 'business_display_name', label: 'Business Display Name' },
        { key: 'business_type', label: 'Business Type' },
        { key: 'registration_number', label: 'Registration Number' },
        { key: 'business_locations', label: 'Business Locations' },
        { key: 'website_purpose', label: 'Website Purpose' },
        { key: 'business_goals', label: 'Business Goals' },
        { key: 'success_metrics', label: 'Success Metrics' },
        { key: 'target_customer', label: 'Target Customer' },
        { key: 'geographic_regions', label: 'Geographic Regions' },
        { key: 'customer_needs', label: 'Customer Needs' },
        { key: 'customer_sources', label: 'Customer Sources' },
        { key: 'color_scheme', label: 'Color Scheme' },
        { key: 'font_styles', label: 'Font Styles' },
        { key: 'tagline', label: 'Tagline' },
        { key: 'website_feel', label: 'Website Feel' },
        { key: 'reference_websites', label: 'Reference Websites' },
        { key: 'required_pages', label: 'Required Pages' },
        { key: 'required_features', label: 'Required Features' },
        { key: 'mobile_responsive', label: 'Mobile Responsive' },
        { key: 'multilingual', label: 'Multilingual' },
        { key: 'content_ready', label: 'Content Ready' },
        { key: 'need_content_help', label: 'Need Content Help' },
        { key: 'business_address', label: 'Business Address' },
        { key: 'business_phone', label: 'Business Phone' },
        { key: 'business_email', label: 'Business Email' },
        { key: 'business_hours', label: 'Business Hours' },
        { key: 'areas_served', label: 'Areas Served' },
        { key: 'product_categories', label: 'Product Categories' },
        { key: 'search_keywords', label: 'Search Keywords' },
        { key: 'business_tags', label: 'Business Tags' },
        { key: 'business_description', label: 'Business Description' },
        { key: 'has_google_profile', label: 'Has Google Profile' },
        { key: 'google_profile_link', label: 'Google Profile Link' },
        { key: 'social_media_links', label: 'Social Media Links' },
        { key: 'has_analytics', label: 'Has Analytics' },
        { key: 'running_ads', label: 'Running Ads' },
        { key: 'form_details', label: 'Form Details' },
        { key: 'form_destination', label: 'Form Destination' },
        { key: 'form_integrations', label: 'Form Integrations' },
        { key: 'response_time', label: 'Response Time' },
        { key: 'ad_budget', label: 'Ad Budget' },
        { key: 'ad_platforms', label: 'Ad Platforms' },
        { key: 'promotions', label: 'Promotions' },
        { key: 'has_domain', label: 'Has Domain' },
        { key: 'domain_name', label: 'Domain Name' },
        { key: 'has_hosting', label: 'Has Hosting' },
        { key: 'hosting_provider', label: 'Hosting Provider' },
        { key: 'need_email_setup', label: 'Need Email Setup' },
        { key: 'need_security', label: 'Need Security' },
        { key: 'launch_date', label: 'Launch Date' },
        { key: 'upcoming_deadlines', label: 'Upcoming Deadlines' },
        { key: 'need_training', label: 'Need Training' },
        { key: 'additional_services', label: 'Additional Services' },
        { key: 'additional_notes', label: 'Additional Notes' }
    ];
    
    const detailsHtml = importantFields
        .filter(field => form[field.key] && form[field.key].trim() !== '')
        .map(field => `
            <div class="detail-item">
                <strong>${field.label}:</strong>
                <span>${form[field.key]}</span>
            </div>
        `).join('');
    
    container.innerHTML = `
        <div class="form-detail-container">
            <h4 class="mb-4">📋 Complete Form Data - ${form.business_name || 'Untitled Business'}</h4>
            <div class="details-grid">
                ${detailsHtml}
            </div>
        </div>
    `;
}

// Back to list
function backToList() {
    document.getElementById('formDetailView').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    selectedFormData = null;
}

// Delete form
async function deleteForm(formId) {
    if (!confirm('Are you sure you want to delete this form?')) return;
    
    try {
        const response = await fetch(`${backendUrl}/api/delete-form/${formId}`, {
            method: 'DELETE'
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Form deleted successfully', 'success');
            fetchAllForms(); // Refresh the list
        } else {
            showAlert('Error deleting form: ' + result.message, 'danger');
        }
    } catch (error) {
        showAlert('Error deleting form: ' + error.message, 'danger');
    }
}

// Download Excel
async function downloadExcel() {
    try {
        const response = await fetch(`${backendUrl}/api/export-data`);
        
        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `business_forms_export_${new Date().toISOString().split('T')[0]}.xlsx`;
            a.click();
            window.URL.revokeObjectURL(url);
            showAlert('Excel file downloaded successfully!', 'success');
        } else {
            showAlert('Failed to download Excel file', 'danger');
        }
    } catch (error) {
        showAlert('Download error: ' + error.message, 'danger');
    }
}

// Show loading indicator
function showLoading(show) {
    document.getElementById('loadingIndicator').style.display = show ? 'block' : 'none';
}

// Show alert
function showAlert(message, type, containerId = 'alertContainer') {
    const container = document.getElementById(containerId);
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    container.appendChild(alertDiv);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Clear alerts
function clearAlert(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
}

// Test backend connection
async function testBackendConnection() {
    try {
        const response = await fetch(`${backendUrl}/api/health`);
        const result = await response.json();
        console.log('Backend health check:', result);
    } catch (error) {
        console.error('Backend connection error:', error);
    }
}

// Test backend on page load
testBackendConnection();