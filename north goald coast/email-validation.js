// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // 1. Get references to the HTML elements
    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const messageDisplay = document.getElementById('message');
    const subscribeButton = newsletterForm.querySelector('button[type="submit"]'); // Also get the button for potential disabling

    // 2. Add an event listener to the form for the 'submit' event
    // Using 'submit' on the form is generally better than 'click' on the button
    // because it also handles users pressing the 'Enter' key in the input field.
    newsletterForm.addEventListener('submit', async (event) => {
        // Prevent the default form submission behavior (which would cause a page reload)
        event.preventDefault();

        // Disable the button and show a "loading" message to prevent multiple submissions
        subscribeButton.disabled = true;
        messageDisplay.textContent = 'Processing your request...';
        messageDisplay.style.color = 'gray';

        // Get the email address and trim any leading/trailing whitespace
        const email = emailInput.value.trim();

        // 3. Perform Client-Side Email Validation
        if (!email) {
            messageDisplay.textContent = 'Please enter your email address.';
            messageDisplay.style.color = 'red';
            subscribeButton.disabled = false; // Re-enable the button
            return; // Stop the function execution
        }

        // A simple, but effective, regex for email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            messageDisplay.textContent = 'Please enter a valid email address (e.g., name@example.com).';
            messageDisplay.style.color = 'red';
            subscribeButton.disabled = false; // Re-enable the button
            return; // Stop the function execution
        }

        // 4. Send the email address to your backend server
        // This is the part where JavaScript *transmits* the data.
        // Replace '/subscribe' with the actual URL of your backend API endpoint.
        const backendEndpoint = '/subscribe'; // Example: 'https://yourdomain.com/api/subscribe'

        try {
            const response = await fetch(backendEndpoint, {
                method: 'POST', // Use POST to send data
                headers: {
                    'Content-Type': 'application/json', // Tell the server we're sending JSON
                    'Accept': 'application/json' // Tell the server we prefer JSON in response
                },
                body: JSON.stringify({ email: email }) // Convert the JS object to a JSON string
            });

            // 5. Handle the response from the backend
            // Assuming your backend responds with JSON
            const responseData = await response.json();

            if (response.ok) { // Check if the HTTP status code is 2xx (e.g., 200 OK, 201 Created)
                messageDisplay.textContent = responseData.message || 'Subscription successful! Thank you.';
                messageDisplay.style.color = 'green';
                emailInput.value = ''; // Clear the input field on successful subscription
            } else {
                // Server responded with an error (e.g., 400 Bad Request, 500 Internal Server Error)
                messageDisplay.textContent = responseData.message || 'Subscription failed. Please try again later.';
                messageDisplay.style.color = 'red';
            }

        } catch (error) {
            // This 'catch' block handles network errors (e.g., server not reachable, no internet)
            console.error('Network or server error during subscription:', error);
            messageDisplay.textContent = 'An unexpected error occurred. Please check your connection and try again.';
            messageDisplay.style.color = 'red';
        } finally {
            // This block runs regardless of success or failure, re-enabling the button
            subscribeButton.disabled = false;
        }
    });
});