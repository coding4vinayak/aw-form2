// Global variables
let currentSection = 0;
let formId = null;
let formData = {};
let currentLanguage = 'en';
const backendUrl = 'http://localhost:5000';
const totalSections = 14;

// Language translations
const translations = {
    en: {
        companyName: "Abetworks.in",
        title: "Business Information Collection Form",
        disclaimer: {
            title: "📋 Welcome to Abetworks.in Business Information Form",
            content: "This comprehensive form will take approximately 10-15 minutes to complete. Please fill it out at your convenience. Nothing is mandatory, but sharing accurate and complete information will help us provide you with better results and tailored solutions for your business needs.",
            note: "💡 Your data is secure and will be used only for providing you with the best possible service."
        },
        language: "Language",
        startForm: "Start Form",
        section: "Section",
        of: "of",
        previous: "Previous",
        next: "Next",
        save: "Save Section",
        saving: "Saving...",
        complete: "Complete Form",
        submitForm: "Submit This Form",
        thankYou: "🎉 Thank You for Your Submission!",
        submissionMsg: "Your business information has been successfully submitted. We will review your details and get back to you soon."
    },
    hi: {
        companyName: "Abetworks.in",
        title: "व्यावसायिक जानकारी संग्रह फॉर्म",
        disclaimer: {
            title: "📋 Abetworks.in व्यावसायिक जानकारी फॉर्म में आपका स्वागत है",
            content: "इस व्यापक फॉर्म को पूरा करने में लगभग 10-15 मिनट का समय लगेगा। कृपया इसे अपनी सुविधानुसार भरें। कुछ भी अनिवार्य नहीं है, लेकिन सटीक और पूर्ण जानकारी साझा करने से हमें आपके व्यावसायिक आवश्यकताओं के लिए बेहतर परिणाम और अनुकूलित समाधान प्रदान करने में मदद मिलेगी।",
            note: "💡 आपका डेटा सुरक्षित है और केवल आपको सर्वोत्तम संभावित सेवा प्रदान करने के लिए उपयोग किया जाएगा।"
        },
        language: "भाषा",
        startForm: "फॉर्म शुरू करें",
        section: "खंड",
        of: "का",
        previous: "पिछला",
        next: "अगला",
        save: "खंड सहेजें",
        saving: "सहेजा जा रहा है...",
        complete: "फॉर्म पूरा करें",
        submitForm: "यह फॉर्म जमा करें",
        thankYou: "🎉 आपके सबमिशन के लिए धन्यवाद!",
        submissionMsg: "आपकी व्यावसायिक जानकारी सफलतापूर्वक जमा की गई है। हम आपके विवरण की समीक्षा करेंगे और जल्द ही आपसे संपर्क करेंगे।"
    },
    mr: {
        companyName: "Abetworks.in",
        title: "व्यावसायिक माहिती संकलन फॉर्म",
        disclaimer: {
            title: "📋 Abetworks.in व्यावसायिक माहिती फॉर्ममध्ये आपले स्वागत आहे",
            content: "हा व्यापक फॉर्म पूर्ण करण्यासाठी अंदाजे 10-15 मिनिटे लागतील। कृपया तो आपल्या सोयीनुसार भरा। काहीही अनिवार्य नाही, परंतु अचूक आणि पूर्ण माहिती सामायिक केल्याने आम्हाला तुमच्या व्यावसायिक गरजांसाठी चांगले परिणाम आणि अनुकूलित उपाय प्रदान करण्यात मदत होईल।",
            note: "💡 तुमचा डेटा सुरक्षित आहे आणि केवळ तुम्हाला सर्वोत्तम सेवा प्रदान करण्यासाठी वापरला जाईल।"
        },
        language: "भाषा",
        startForm: "फॉर्म सुरू करा",
        section: "विभाग",
        of: "चा",
        previous: "मागील",
        next: "पुढील",
        save: "विभाग जतन करा",
        saving: "जतन करत आहे...",
        complete: "फॉर्म पूर्ण करा",
        submitForm: "हा फॉर्म सबमिट करा",
        thankYou: "🎉 तुमच्या सबमिशनसाठी धन्यवाद!",
        submissionMsg: "तुमची व्यावसायिक माहिती यशस्वीपणे सबमिट केली गेली आहे। आम्ही तुमच्या तपशिलांचे पुनरावलोकन करू आणि लवकरच तुमच्याशी संपर्क करू।"
    }
};

// Initialize the form
document.addEventListener('DOMContentLoaded', function() {
    generateFormId();
    updateLanguage();
});

// Generate unique form ID
function generateFormId() {
    formId = 'form_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Change language
function changeLanguage() {
    const select = document.getElementById('languageSelect');
    currentLanguage = select.value;
    updateLanguage();
}

// Update language texts
function updateLanguage() {
    const t = translations[currentLanguage];
    
    // Update disclaimer section
    if (document.getElementById('disclaimerTitle')) {
        document.getElementById('disclaimerTitle').textContent = t.disclaimer.title;
        document.getElementById('disclaimerText').textContent = t.disclaimer.content;
        document.getElementById('disclaimerNote').textContent = t.disclaimer.note;
        document.getElementById('startButton').textContent = t.startForm;
    }
    
    // Update form title
    if (document.getElementById('formTitle')) {
        document.getElementById('formTitle').textContent = t.title;
    }
    
    // Update navigation texts
    if (document.getElementById('sectionText')) {
        document.getElementById('sectionText').textContent = t.section;
        document.getElementById('ofText').textContent = t.of;
    }
    
    // Update button texts
    if (document.getElementById('prevBtn')) {
        document.getElementById('prevBtn').textContent = t.previous;
        document.getElementById('saveBtn').textContent = t.save;
        document.getElementById('nextBtn').textContent = t.next;
    }
}

// Start the form
function startForm() {
    currentSection = 1;
    document.getElementById('disclaimerSection').style.display = 'none';
    document.getElementById('progressSection').style.display = 'block';
    document.getElementById('navigationButtons').style.display = 'flex';
    showSection(currentSection);
    updateProgress();
}

// Show specific section
function showSection(sectionNum) {
    // Hide all sections
    const sections = document.querySelectorAll('.form-section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show current section
    const currentSectionElement = document.getElementById('section' + sectionNum);
    if (currentSectionElement) {
        currentSectionElement.classList.add('active');
    }
    
    // Update section number
    document.getElementById('currentSectionNum').textContent = sectionNum;
    
    // Update navigation buttons
    document.getElementById('prevBtn').disabled = sectionNum === 1;
    
    // Hide Next button on final section (14) since it has its own submit button
    if (sectionNum === totalSections) {
        document.getElementById('nextBtn').style.display = 'none';
    } else {
        document.getElementById('nextBtn').style.display = 'block';
        document.getElementById('nextBtn').textContent = translations[currentLanguage].next;
    }
}

// Update progress bar
function updateProgress() {
    const progress = (currentSection / totalSections) * 100;
    document.getElementById('progressBar').style.width = progress + '%';
}

// Collect form data from current section
function collectFormData() {
    const currentSectionElement = document.getElementById('section' + currentSection);
    if (!currentSectionElement) return;
    
    const inputs = currentSectionElement.querySelectorAll('input, select, textarea');
    
    // Reset checkbox arrays for current section
    const checkboxFields = ['required_pages', 'required_features', 'ad_platforms', 'additional_services'];
    checkboxFields.forEach(field => {
        formData[field] = [];
    });
    
    inputs.forEach(input => {
        if (input.type === 'checkbox') {
            if (input.checked) {
                if (!formData[input.name]) {
                    formData[input.name] = [];
                }
                if (Array.isArray(formData[input.name])) {
                    formData[input.name].push(input.value);
                } else {
                    formData[input.name] = [formData[input.name], input.value];
                }
            }
        } else if (input.type === 'file') {
            // File uploads are handled separately
        } else if (input.name && input.value !== undefined) {
            formData[input.name] = input.value;
        }
    });
    
    // Convert arrays to comma-separated strings
    Object.keys(formData).forEach(key => {
        if (Array.isArray(formData[key])) {
            formData[key] = formData[key].join(',');
        }
    });
}

// Save current section
async function saveSection() {
    try {
        const saveBtn = document.getElementById('saveBtn');
        const originalText = saveBtn.textContent;
        saveBtn.textContent = translations[currentLanguage].saving;
        saveBtn.disabled = true;
        
        // Collect form data
        collectFormData();
        
        // Prepare data for API
        const dataToSend = {
            ...formData,
            form_id: formId,
            current_section: currentSection
        };
        
        // Send to backend
        const response = await fetch(`${backendUrl}/api/save-section`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showAlert('Section saved successfully!', 'success');
        } else {
            showAlert('Error saving section: ' + result.message, 'danger');
        }
        
        saveBtn.textContent = originalText;
        saveBtn.disabled = false;
        
    } catch (error) {
        showAlert('Error saving section: ' + error.message, 'danger');
        document.getElementById('saveBtn').disabled = false;
    }
}

// Navigate to previous section
function previousSection() {
    if (currentSection > 1) {
        currentSection--;
        showSection(currentSection);
        updateProgress();
    }
}

// Navigate to next section
async function nextSection() {
    if (currentSection < totalSections) {
        // Save current section before moving
        await saveSection();
        
        currentSection++;
        showSection(currentSection);
        updateProgress();
    } else {
        // This shouldn't happen as section 14 has its own submit button
        showAlert('Please use the "Submit Complete Form" button to finish.', 'info');
    }
}

// Complete the form
function completeForm() {
    // Hide form sections and navigation
    document.getElementById('formSections').style.display = 'none';
    document.getElementById('navigationButtons').style.display = 'none';
    document.getElementById('progressSection').style.display = 'none';
    
    // Show completion message
    document.getElementById('completionSection').classList.add('active');
    
    showAlert(translations[currentLanguage].submissionMsg, 'success');
}

// Submit final form
async function submitForm() {
    try {
        // Check if required checkboxes are checked
        const confirmAccuracy = document.getElementById('confirmAccuracy').checked;
        const agreeTerms = document.getElementById('agreeTerms').checked;
        
        if (!confirmAccuracy || !agreeTerms) {
            showAlert('Please confirm the accuracy of information and agree to terms and conditions.', 'danger');
            return;
        }
        
        const submitBtn = document.getElementById('finalSubmitBtn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;
        
        // Collect final form data
        collectFormData();
        
        // Mark form as completed
        const dataToSend = {
            ...formData,
            form_id: formId,
            current_section: 14,
            is_completed: true
        };
        
        // Send to backend
        const response = await fetch(`${backendUrl}/api/save-section`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
        });
        
        const result = await response.json();
        
        if (result.success) {
            completeForm();
        } else {
            showAlert('Error submitting form: ' + result.message, 'danger');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
        
    } catch (error) {
        showAlert('Error submitting form: ' + error.message, 'danger');
        document.getElementById('finalSubmitBtn').disabled = false;
    }
}

// Start new form
function startNewForm() {
    // Reset everything
    currentSection = 0;
    formData = {};
    generateFormId();
    
    // Show disclaimer again
    document.getElementById('disclaimerSection').style.display = 'block';
    document.getElementById('progressSection').style.display = 'none';
    document.getElementById('navigationButtons').style.display = 'none';
    document.getElementById('formSections').style.display = 'block';
    document.getElementById('completionSection').classList.remove('active');
    
    // Clear all form inputs
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (input.type === 'checkbox' || input.type === 'radio') {
            input.checked = false;
        } else if (input.type === 'file') {
            input.value = '';
        } else {
            input.value = '';
        }
    });
    
    // Clear image previews
    const previews = document.querySelectorAll('#logoPreview, #photosPreview');
    previews.forEach(preview => preview.innerHTML = '');
    
    clearAlerts();
}

// Handle image upload
async function uploadImage(input, fieldName) {
    if (!input.files || input.files.length === 0) return;
    
    const file = input.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('form_id', formId);
    
    try {
        const response = await fetch(`${backendUrl}/api/upload-image`, {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
            // Display image preview
            const previewContainer = document.getElementById(fieldName.replace('_path', 'Preview'));
            if (previewContainer) {
                previewContainer.innerHTML = `<img src="${result.base64}" class="uploaded-image" alt="Uploaded image">`;
            }
            
            // Store the path in form data
            formData[fieldName] = result.url;
            
            showAlert('Image uploaded successfully!', 'success');
        } else {
            showAlert('Error uploading image: ' + result.message, 'danger');
        }
        
    } catch (error) {
        showAlert('Error uploading image: ' + error.message, 'danger');
    }
}

// Show alert message
function showAlert(message, type) {
    const alertContainer = document.getElementById('alertContainer');
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    alertContainer.appendChild(alertDiv);
    
    // Auto dismiss after 5 seconds
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}

// Clear all alerts
function clearAlerts() {
    const alertContainer = document.getElementById('alertContainer');
    alertContainer.innerHTML = '';
}

// Test backend connection
async function testBackendConnection() {
    try {
        const response = await fetch(`${backendUrl}/api/health`);
        const result = await response.json();
        console.log('Backend health check:', result);
    } catch (error) {
        console.error('Backend connection error:', error);
        showAlert('Unable to connect to backend server', 'danger');
    }
}

// Test backend on page load
testBackendConnection();