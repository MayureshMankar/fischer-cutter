document.addEventListener("DOMContentLoaded", function () {
    // Redirect to a new page on button click
    function redirectTo(page) {
        window.location.href = page;
    }

    // Function to check if user is logged in
    function checkLoginStatus() {
        const isLoggedIn = sessionStorage.getItem("userLoggedIn"); // Example check
        if (!isLoggedIn) {
            alert("Please log in before accessing this page.");
            redirectTo('/login'); // Redirect to login page
            return false;
        }
        return true;
    }

    // Check login status when accessing "Place an Order" page
    const placeOrderButton = document.getElementById("place-order-button"); // Assumes button ID is "place-order-button"
    if (placeOrderButton) {
        placeOrderButton.addEventListener("click", function(event) {
            console.log("Place Order button clicked");
            if (!checkLoginStatus()) {
                event.preventDefault(); // Stop navigation if not logged in
            }
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            const formData = { name, email, phone, message };

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                });
                const result = await response.text();
                alert(result);
                contactForm.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('An error occurred while submitting your message. Please try again.');
            }
        });
    }

    // Sign-Up Form Submission
    const signUpForm = document.getElementById('sign-up-form');
    if (signUpForm) {
        signUpForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const termsAndConditions = document.getElementById('terms-and-conditions').checked;

            const signUpData = { name, email, phone, password, confirmPassword, termsAndConditions };
            try {
                const response = await fetch('/api/signup', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(signUpData),
                });

                const result = await response.text();
                alert(result);
                if (response.ok) {
                    redirectTo('/login'); // Redirect to login page on successful sign-up
                }
            } catch (error) {
                console.error('Error during sign-up:', error);
                alert('An error occurred while creating your account. Please try again.');
            }
        });
    }

    // Login Form Submission
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const loginData = { email, password };
            try {
                const response = await fetch('/api/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(loginData),
                });
                const result = await response.json();

                if (response.ok) {
                    alert('Login successful!');
                    sessionStorage.setItem("userLoggedIn", true); // Set login status
                    redirectTo('/placeanorder.html'); // Redirect to Place an Order page on successful login
                } else {
                    alert(result.message || 'Login failed. Please check your credentials.');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred while logging in. Please try again.');
            }
        });
    }

    // Collect references for the order form
    const serviceSelect = document.getElementById('service');
    const projectSpecifications = document.getElementById('project-specifications');
    const fileInput = document.getElementById('upload-files');
    const orderForm = document.getElementById('order-form');

    // Function to update the order summary section
    function updateOrderSummary() {
        const service = serviceSelect.value;
        const specifications = projectSpecifications.value;
        const files = fileInput.files;

        // Update service selection summary
        document.getElementById('service-summary').textContent = service ? service : 'Not selected';

        // Update project specifications summary
        document.getElementById('project-specifications-summary').textContent = specifications ? specifications : 'Not provided';

        // Update file upload summary
        const fileNames = files.length > 0 ? Array.from(files).map(file => file.name).join(', ') : 'No files uploaded';
        document.getElementById('files-uploaded-summary').textContent = fileNames;
    }

    // Event listeners to update summary whenever form fields change
    serviceSelect.addEventListener('change', updateOrderSummary);
    projectSpecifications.addEventListener('input', updateOrderSummary);
    fileInput.addEventListener('change', updateOrderSummary);

    // Place order submission
    if (orderForm) {
        orderForm.addEventListener("submit", async function (event) {
            event.preventDefault();
            console.log("Form submission triggered");

            const service = document.getElementById("service").value;
            const projectSpecifications = document.getElementById("project-specifications").value;
            const files = document.getElementById("upload-files").files;

            // Prepare FormData for sending the data (including files)
            // Create FormData object to handle file and text form data
    const formData = new FormData();

    // Get form input values
    formData.append("service", document.getElementById("service").value);
    formData.append("projectSpecifications", document.getElementById("project-specifications").value);

    // Get the files from the file input
    
    Array.from(files).forEach(file => {
        formData.append("files", file); // 'files' should match the server's expected field name
    });

    try {
        const response = await fetch('/api/place-order', {
            method: 'POST',
            body: formData // Send the FormData object directly
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Unknown error occurred");
        }

        const data = await response.json(); // Assume JSON response from server
        console.log("Order placed successfully:", data);
        alert("Order placed successfully!");
    } catch (error) {
        console.error("An error occurred while placing the order:", error.message);
        alert("An error occurred while placing the order: " + error.message);
    }
});
    }

    
    
});
