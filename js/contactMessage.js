function userMsg()
{
    // Get references to the input field and the submit button
    const user_name = document.getElementById('name');
    const user_email = document.getElementById('mail');
    const user_message = document.getElementById('message');
    const submitButton = document.getElementById('submit-button');

    
    // Add a click event listener to the submit button
    submitButton.addEventListener('click', function() 
    {
        firstName.setCustomValidity('');
        email.setCustomValidity('');

        if ((firstName.value == "")) 
        {
            firstName.setCustomValidity('Please enter your First Name');
            return;
        }
        if ((lastName.value == "")) 
        {
            lastName.setCustomValidity('Please enter your Last name.');
            return;
        }
        // validate email and reEmail value
        if (email.value == "") 
        {
            email.setCustomValidity('Please enter your email.');
            return;
        }
        // Get the user's message from the input field
        const userData = 
        {
            user_Name : user_name.value,
            email: user_email.value,
            msg: user_message.value,
        };

        // Convert the user data to a JSON string
        // const userDataJSON = JSON.stringify(userData);

        // Save the message to local storage
        localStorage.setItem('userMessage', userData);
        alert('Your message sent successfully..');
        // Clear the input field
        user_name.value = '';
        user_email.value = '';
        user_message.value = '';
    });
}

