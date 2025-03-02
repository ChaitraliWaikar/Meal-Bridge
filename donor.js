// Step navigation
const steps = document.querySelectorAll('.form-section');
const nextButtons = document.querySelectorAll('.next-btn');
const backButtons = document.querySelectorAll('.back-btn');
const stepIndicators = document.querySelectorAll('.step-number');
const stepLabels = document.querySelectorAll('.step-label');
const donationForm = document.getElementById('foodDonationForm');
const thankYouScreen = document.getElementById('thankYouScreen');

// Next button handlers
nextButtons.forEach(button => {
    button.addEventListener('click', () => {
        const currentStep = document.querySelector('.form-section.active');
        const currentStepIndex = Array.from(steps).indexOf(currentStep);

        if (currentStepIndex === 0 && !validateStep1()) return;
        if (currentStepIndex === 1 && !validateStep2()) return;
        if (currentStepIndex === 2 && !validateStep3()) return;

        if (currentStepIndex < steps.length - 1) {
            currentStep.classList.remove('active');
            steps[currentStepIndex + 1].classList.add('active');
            updateStepIndicators(currentStepIndex + 1);
            if (currentStepIndex + 1 === 3) updateReviewSection();
        }
    });
});

// Back button handlers
backButtons.forEach(button => {
    button.addEventListener('click', () => {
        const currentStep = document.querySelector('.form-section.active');
        const currentStepIndex = Array.from(steps).indexOf(currentStep);

        if (currentStepIndex > 0) {
            currentStep.classList.remove('active');
            steps[currentStepIndex - 1].classList.add('active');
            updateStepIndicators(currentStepIndex - 1);
        }
    });
});

// Update step indicators
function updateStepIndicators(activeIndex) {
    stepIndicators.forEach((indicator, index) => {
        if (index < activeIndex) {
            indicator.classList.add('completed');
            indicator.classList.remove('active');
        } else if (index === activeIndex) {
            indicator.classList.add('active');
            indicator.classList.remove('completed');
        } else {
            indicator.classList.remove('active', 'completed');
        }
    });

    stepLabels.forEach((label, index) => {
        if (index === activeIndex) {
            label.classList.add('active');
        } else {
            label.classList.remove('active');
        }
    });
}

// Validate Step 1: Donor Information
function validateStep1() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const address = document.getElementById('address').value.trim();

    if (!name || !email || !phone || !address) {
        alert('Please fill out all required fields in Step 1.');
        return false;
    }

    return true;
}

// Validate Step 2: Food Details
function validateStep2() {
    const foodType = document.querySelector('input[name="foodType"]:checked');
    const foodItems = document.getElementById('foodItems').value.trim();
    const quantity = document.getElementById('quantity').value.trim();

    if (!foodType || !foodItems || !quantity) {
        alert('Please fill out all required fields in Step 2.');
        return false;
    }

    return true;
}

// Validate Step 3: Delivery Options
function validateStep3() {
    const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked');
    const pickupDate = document.getElementById('pickupDate').value.trim();
    const pickupTime = document.getElementById('pickupTime').value.trim();
    const dropoffLocation = document.getElementById('dropoffLocation').value.trim();
    const dropoffDate = document.getElementById('dropoffDate').value.trim();

    if (!deliveryMethod) {
        alert('Please select a delivery method.');
        return false;
    }

    if (deliveryMethod.value === 'pickup' && (!pickupDate || !pickupTime)) {
        alert('Please fill out all required fields for pickup.');
        return false;
    }

    if (deliveryMethod.value === 'dropoff' && (!dropoffLocation || !dropoffDate)) {
        alert('Please fill out all required fields for drop-off.');
        return false;
    }

    return true;
}

// Update review section
function updateReviewSection() {
    document.getElementById('reviewName').textContent = document.getElementById('name').value;
    document.getElementById('reviewEmail').textContent = document.getElementById('email').value;
    document.getElementById('reviewPhone').textContent = document.getElementById('phone').value;
    document.getElementById('reviewOrg').textContent = document.getElementById('organization').value || '-';
    document.getElementById('reviewAddress').textContent = document.getElementById('address').value;

    document.getElementById('reviewFoodType').textContent = document.querySelector('input[name="foodType"]:checked').value;
    document.getElementById('reviewFoodItems').textContent = document.getElementById('foodItems').value;
    document.getElementById('reviewQuantity').textContent = document.getElementById('quantity').value;
    document.getElementById('reviewPackaging').textContent = document.getElementById('packaging').value;
    document.getElementById('reviewExpiry').textContent = document.getElementById('expiryDate').value || '-';
    document.getElementById('reviewInstructions').textContent = document.getElementById('instructions').value || '-';

    const deliveryMethod = document.querySelector('input[name="deliveryMethod"]:checked').value;
    document.getElementById('reviewDeliveryMethod').textContent = deliveryMethod;

    if (deliveryMethod === 'pickup') {
        document.getElementById('reviewPickupDateRow').style.display = 'block';
        document.getElementById('reviewPickupTimeRow').style.display = 'block';
        document.getElementById('reviewDropoffLocationRow').style.display = 'none';
        document.getElementById('reviewDropoffDateRow').style.display = 'none';

        document.getElementById('reviewPickupDate').textContent = document.getElementById('pickupDate').value;
        document.getElementById('reviewPickupTime').textContent = document.getElementById('pickupTime').value;
    } else {
        document.getElementById('reviewPickupDateRow').style.display = 'none';
        document.getElementById('reviewPickupTimeRow').style.display = 'none';
        document.getElementById('reviewDropoffLocationRow').style.display = 'block';
        document.getElementById('reviewDropoffDateRow').style.display = 'block';

        document.getElementById('reviewDropoffLocation').textContent = document.getElementById('dropoffLocation').value;
        document.getElementById('reviewDropoffDate').textContent = document.getElementById('dropoffDate').value;
    }
}

// Form submission
donationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    donationForm.style.display = 'none';
    thankYouScreen.style.display = 'block';

    setTimeout(() => {
        donationForm.reset();
        steps.forEach((step, index) => {
            if (index === 0) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        updateStepIndicators(0);
        donationForm.style.display = 'block';
        thankYouScreen.style.display = 'none';
    }, 5000);
});

// Toggle delivery options based on selected method
document.querySelectorAll('input[name="deliveryMethod"]').forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.value === 'pickup') {
            document.querySelector('.delivery-pickup-options').style.display = 'block';
            document.querySelector('.delivery-dropoff-options').style.display = 'none';
        } else {
            document.querySelector('.delivery-pickup-options').style.display = 'none';
            document.querySelector('.delivery-dropoff-options').style.display = 'block';
        }s
    });
});

// FAQ toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        question.parentElement.classList.toggle('show-answer');
    });
});