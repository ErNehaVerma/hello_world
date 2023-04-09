function userMsg()
{
    // Get references to the input field and the submit button
    const user_name = document.getElementById('name');
    const user_email = document.getElementById('mail');
    const user_message = document.getElementById('message');

    user_name.setCustomValidity('');
    user_email.setCustomValidity('');

    if ((user_name.value == "")) 
    {
        user_name.setCustomValidity('Please enter your First Name');
        return;
    }
    // validate email and reEmail value
    if (user_email.value == "") 
    {
        user_email.setCustomValidity('Please enter your email.');
        return;
    }
    // Get the user's message from the input field
    const userData = 
    {
        userName : user_name.value,
        email: user_email.value,
        msg: user_message.value,
    };
    const existingData = JSON.parse(localStorage.getItem('userMessage')) || [];
    existingData.push(userData);
    // Convert the user data to a JSON string
    const userDataJSON = JSON.stringify(existingData);

    // Save the message to local storage
    localStorage.setItem('userMessage', userDataJSON);
    alert('Your message sent successfully..');
    // Clear the input field
    user_name.value = '';
    user_email.value = '';
    user_message.value = '';
    
}

