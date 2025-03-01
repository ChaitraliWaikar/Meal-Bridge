// Global variables
let currentStep = 1;
const totalSteps = 4;

// DOM Ready function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the form
    updateProgressBar();
    setupFormValidation();
});

// Function to move to the next step
function nextStep() {
    if (validateCurrentStep()) {
        if (currentStep < totalSteps) {
            currentStep++;
            updateUI();
        } else {
            submitForm();
        }
    }
}

// Function to move to the previous step
function prevStep() {
    if (currentStep > 1) {
        currentStep--;
        updateUI();
    }
}

// Function to directly go to a specific step
function goToStep(step) {
    // Only allow going to a step if previous steps are completed
    if (step <= currentStep || validateBeforeJump(step)) {
        currentStep = step;
        updateUI();
    }
}

// Update the UI based on the current step
function updateUI() {
    // Hide all form sections
    const formSections = document.querySelectorAll('.form-section');
    formSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the current section
    document.getElementById(`step${currentStep}`).classList.add('active');
    
    // Update steps and progress bar
    updateProgressBar();
    
    // Scroll to top of the form
    window.scrollTo({
        top: document.querySelector('.progress-container').offsetTop - 50,
        behavior: 'smooth'
    });
}

// Update the progress bar and step indicators
function updateProgressBar() {
    // Update step classes
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
        if (index + 1 < currentStep) {
            step.classList.add('completed');
            step.classList.remove('active');
        } else if (index + 1 === currentStep) {
            step.classList.add('active');
            step.classList.remove('completed');
        } else {
            step.classList.remove('active');
            step.classList.remove('completed');
        }
    });
    
    // Update progress bar width
    const progressBar = document.getElementById('progress');
    const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;
    progressBar.style.width = `${progressPercentage}%`;
}

// Validate the current step before proceeding
function validateCurrentStep() {
    let isValid = true;
    const currentSection = document.getElementById(`step${currentStep}`);
    
    // Get all required fields in the current section
    const requiredFields = currentSection.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            highlightInvalidField(field);
        } else {
            removeInvalidHighlight(field);
        }
    });
    
    // Special validation for step 3 (checkboxes)
    if (currentStep === 3) {
        const checkboxes = currentSection.querySelectorAll('input[type="checkbox"]');
        let atLeastOneChecked = false;
        
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                atLeastOneChecked = true;
            }
        });
        
        if (!atLeastOneChecked) {
            isValid = false;
            alert('Please select at least one food type needed.');
        }
    }
    
    // Special validation for email format in step 1
    if (currentStep === 1) {
        const emailField = document.getElementById('email');
        if (emailField.value && !isValidEmail(emailField.value)) {
            isValid = false;
            highlightInvalidField(emailField);
            alert('Please enter a valid email address.');
        }
        
        // Password strength validation
        const passwordField = document.getElementById('password');
        if (passwordField.value && !isStrongPassword(passwordField.value)) {
            isValid = false;
            highlightInvalidField(passwordField);
            alert('Password must be at least 8 characters and include at least one uppercase letter, one lowercase letter, and one number.');
        }
    }
    
    return isValid;
}

// Function to validate before jumping to a specific step
function validateBeforeJump(targetStep) {
    // Only validate if trying to jump ahead
    if (targetStep <= currentStep) return true;
    
    // Validate all steps before the target step
    for (let i = 1; i < targetStep; i++) {
        const tempCurrentStep = currentStep;
        currentStep = i; // Temporarily set current step
        
        if (!validateCurrentStep()) {
            currentStep = tempCurrentStep; // Restore current step
            return false;
        }
    }
    
    return true;
}

// Helper function to highlight invalid fields
function highlightInvalidField(field) {
    field.classList.add('invalid');
    field.style.border = '1px solid #ff6b6b';
}

// Helper function to remove invalid highlight
function removeInvalidHighlight(field) {
    field.classList.remove('invalid');
    field.style.border = '1px solid #ddd';
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Password strength validation
function isStrongPassword(password) {
    // At least 8 characters, one uppercase, one lowercase, one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
}

// Setup form validation events
function setupFormValidation() {
    // Add input event listeners to all form fields
    const formFields = document.querySelectorAll('input, select, textarea');
    
    formFields.forEach(field => {
        field.addEventListener('input', function() {
            if (field.hasAttribute('required') && field.value.trim()) {
                removeInvalidHighlight(field);
            }
            
            // Special handling for email field
            if (field.id === 'email' && isValidEmail(field.value)) {
                removeInvalidHighlight(field);
            }
            
            // Special handling for password field
            if (field.id === 'password' && isStrongPassword(field.value)) {
                removeInvalidHighlight(field);
            }
        });
    });
}

// Function to handle form submission
function submitForm() {
    // Get all form data
    const formData = {
        // Step 1
        orgName: document.getElementById('org-name').value,
        contactName: document.getElementById('contact-name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value,
        
        // Step 2
        orgType: document.getElementById('org-type').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        state: document.getElementById('state').value,
        zip: document.getElementById('zip').value,
        capacity: document.getElementById('capacity').value,
        
        // Step 3
        foodTypes: {
            produce: document.getElementById('produce').checked,
            dairy: document.getElementById('dairy').checked,
            meat: document.getElementById('meat').checked
        }
    };
    
    // In a real application, you would send this data to your server
    console.log('Form submitted:', formData);
    
    // Show success message in step 4
    showSuccessMessage();
}

// Function to show success message
function showSuccessMessage() {
    // Create step 4 content if it doesn't exist
    if (!document.getElementById('step4')) {
        const step4 = document.createElement('div');
        step4.id = 'step4';
        step4.className = 'form-section';
        step4.innerHTML = `
            <div class="success-message">
                <div class="success-icon">✓</div>
                <h3>Registration Complete!</h3>
                <p>Thank you for registering as a food receiver. Your application has been submitted and is under review.</p>
                <p>We'll send you an email at ${document.getElementById('email').value} once your account is activated.</p>
                <div class="btn-container" style="justify-content: center; margin-top: 30px;">
                    <button class="btn btn-primary" onclick="redirectToDashboard()">Go to Dashboard</button>
                </div>
            </div>
        `;
        
        document.getElementById('registration-container').appendChild(step4);
    }
    
    // Show step 4
    updateUI();
}

// Function to redirect to dashboard (for demo purposes)
function redirectToDashboard() {
    // In a real application, this would redirect to the dashboard
    alert('In a real application, you would be redirected to your dashboard.');
    
    // For demo purposes, you could create a simple dashboard view
    // and toggle it here
    document.getElementById('registration-container').style.display = 'none';
    
    // If you had a dashboard container, you would show it here
    // document.getElementById('dashboard-container').style.display = 'block';
}

// Additional functionality for the dashboard (if needed)
function setupDashboard() {
    // This function would set up any dashboard-specific functionality
    // Such as tabs, calendar events, donation acceptance, etc.
    
    // For example, tab functionality:
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
}