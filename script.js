/**
 * =========================================================================
 * JAVASCRIPT LOGIC FILE (script.js)
 * Implements: Event Handling, Interactive Features, and Custom Form Validation
 * =========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    "use strict";

    // =======================================================
    // Part 1: Event Handling (Mouse Hover Listener)
    // =======================================================
    const hoverBox = document.getElementById('hover-box');
    const secretMessage = document.getElementById('secret-message');
    const defaultMessage = document.getElementById('default-message');

    if (hoverBox && secretMessage && defaultMessage) {
        /**
         * Handles the 'mouseover' event, triggered when the mouse enters the box.
         * Shows the secret message and hides the default prompt.
         */
        const handleMouseOver = () => {
            defaultMessage.classList.add('hidden');
            secretMessage.classList.remove('hidden');
        };

        /**
         * Handles the 'mouseout' event, triggered when the mouse leaves the box.
         * Hides the secret message and shows the default prompt.
         */
        const handleMouseOut = () => {
            defaultMessage.classList.remove('hidden');
            secretMessage.classList.add('hidden');
        };

        // Attach event listeners for the hover effect
        hoverBox.addEventListener('mouseover', handleMouseOver);
        hoverBox.addEventListener('mouseout', handleMouseOut);
    }


    // =======================================================
    // Part 2: Interactive Feature (Light/Dark Mode Toggle)
    // =======================================================
    const darkModeToggle = document.getElementById('darkModeToggle');
    const modeStatus = document.getElementById('mode-status');
    const toggleBall = document.getElementById('toggle-ball');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    const body = document.body;

    if (darkModeToggle && body) {
        /**
         * Toggles the 'dark' class on the body, updating the theme and UI elements.
         * This uses the classes defined in the index.html's Tailwind setup.
         */
        const toggleDarkMode = () => {
            const isChecked = darkModeToggle.checked;
            
            if (isChecked) {
                body.classList.add('dark');
                modeStatus.textContent = 'Dark';
                
                // Move toggle ball to the right for "Dark" mode visualization
                toggleBall.style.transform = 'translateX(100%)';
                
                // Switch icons (Moon visible, Sun hidden)
                sunIcon.classList.add('hidden');
                moonIcon.classList.remove('hidden');
                
            } else {
                body.classList.remove('dark');
                modeStatus.textContent = 'Light';
                
                // Move toggle ball back to the left for "Light" mode visualization
                toggleBall.style.transform = 'translateX(0)';
                
                // Switch icons (Sun visible, Moon hidden)
                sunIcon.classList.remove('hidden');
                moonIcon.classList.add('hidden');
            }
            // Save the user's preference to local storage (optional, for persistence)
            localStorage.setItem('theme', isChecked ? 'dark' : 'light');
        };

        // 1. Check for stored preference or system preference on load
        const storedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
            darkModeToggle.checked = true;
        }
        
        // 2. Apply the initial state
        toggleDarkMode();

        // 3. Event listener for the toggle switch change
        darkModeToggle.addEventListener('change', toggleDarkMode);
    }


    // =======================================================
    // Part 3: Custom Form Validation
    // =======================================================
    const form = document.getElementById('registration-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const successMessage = document.getElementById('form-success-message');

    if (form && nameInput && emailInput && passwordInput) {

        /**
         * Helper function to show/hide validation error messages beneath an input.
         * @param {HTMLElement} inputElement - The input field element.
         * @param {string} message - The error message to display. Empty string clears the message.
         */
        const displayError = (inputElement, message) => {
            const errorElement = document.getElementById(inputElement.id + '-error');
            if (errorElement) {
                errorElement.textContent = message;
            }
        };

        /**
         * The core custom validation logic. Prevents form submission if inputs are invalid.
         * @returns {boolean} True if all fields are valid, false otherwise.
         */
        const validateForm = () => {
            let isValid = true;
            
            // Clear all previous errors and success message
            displayError(nameInput, '');
            displayError(emailInput, '');
            displayError(passwordInput, '');
            successMessage.classList.add('hidden');

            // --- 1. Validate Name (Minimum 3 characters) ---
            if (nameInput.value.trim().length < 3) {
                displayError(nameInput, 'Full Name must be at least 3 characters long.');
                isValid = false;
            }

            // --- 2. Validate Email (Using a Regular Expression) ---
            // A robust regex to check for standard email format: local@domain.tld
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                displayError(emailInput, 'Please enter a valid email address (e.g., user@domain.com).');
                isValid = false;
            }

            // --- 3. Validate Password (Minimum 8 characters) ---
            if (passwordInput.value.length < 8) {
                displayError(passwordInput, 'Password must be at least 8 characters long.');
                isValid = false;
            }
            
            return isValid;
        };

        // Event listener for form submission
        form.addEventListener('submit', (event) => {
            // Prevent the default form submission (page reload)
            event.preventDefault(); 
            
            const validationResult = validateForm();

            if (validationResult) {
                // All validation passed
                successMessage.classList.remove('hidden');
                
                // In a real application, you would now send the data to a server using fetch()
                console.log('Form submission successful. Data to be sent:', {
                    name: nameInput.value,
                    email: emailInput.value,
                    password: passwordInput.value // Note: Never send raw password in a real app
                });
                
                // Optional: reset the form after successful "submission"
                // form.reset(); 
            } else {
                // Validation failed, errors are already displayed
                console.log('Form validation failed.');
            }
        });
        
        // Bonus: Real-time validation for a better UX (validates on key-up/blur)
        // This is triggered when the user leaves the input field.
        [nameInput, emailInput, passwordInput].forEach(input => {
            input.addEventListener('blur', validateForm);
        });
    } else {
        console.error("One or more required DOM elements for the form were not found.");
    }
});