function formValidation(event) {
    const form = document.getElementById("myForm");
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const reEmail = document.getElementById('reEmail');
    const password = document.getElementById('password');


    // reset all error messages
    firstName.setCustomValidity('');
    lastName.setCustomValidity('');
    email.setCustomValidity('');
    reEmail.setCustomValidity('');
    password.setCustomValidity('');

    // validate first name and last name
    if ((firstName.value == "")) {
        firstName.setCustomValidity('Please enter your First Name');
        return;
    }
    if ((lastName.value == "")) {
        lastName.setCustomValidity('Please enter your Last name.');
        return;
    }
    // validate email and reEmail value
    if (email.value == "") {
        email.setCustomValidity('Please enter your email.');

        return;
    }
    if (reEmail.value == "") {
        reEmail.setCustomValidity('Please enter your email again.');

        return;
    }
    // Comparing email and re-enter email
    if (email.value != reEmail.value) {
        reEmail.setCustomValidity('Email addresses do not match.');

        return;
    }


    if (password.value == "") {
        password.setCustomValidity('Please enter your Password.');

        return;
    }
    else {
        var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
        // Test the password against the regular expression
        if (!passwordRegex.test(password.value)) {
            password.setCustomValidity("Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 6 characters long.");

            return;
        }
    }

    // Create object to hold login credentials
    const userData = {
        user_id: 1,
        firstName: firstName.value,
        email: email.value,
        password: password.value,
        wishList: [],
        cart: []

    };

    // Get existing login data from local storage
    const existingData = JSON.parse(localStorage.getItem('userData')) || [];

    // Check if user exists
    const userAlreadyExists = existingData.filter(user => user.email === userData.email);
    if (!userAlreadyExists.length) {
        // Add new login data to array
        if (existingData.length == 0) {
            existingData.push(userData);
        } else {
            userData.user_id++;
            existingData.push(userData);
        }

        // Save updated login data to local storage
        localStorage.setItem('userData', JSON.stringify(existingData));
        localStorage.setItem('currentUser', JSON.stringify(userData));
        alert("You have successfully registered");
        // window.location.href="./index.html";

    }
    else {
        alert("User Already Exists. Please Login");
        event.preventDefault();
        return;
    }
}

function reset() {
    // reset all values in the format
    firstName.setCustomValidity('');
    lastName.setCustomValidity('');
    email.setCustomValidity('');
    reEmail.setCustomValidity('');
    password.setCustomValidity('');

}

function displayName() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // Adding Name for the Profile
    document.getElementById('ddFirstName').innerHTML = currentUser && currentUser.firstName;
}


// Login Function
function formvalidationLoginPage(event) {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

    email.setCustomValidity('');
    password.setCustomValidity('');

    if (email.value == " ") {
        email.setCustomValidity('Please enter your email.');
    }

    if (password.value == " ") {
        password.setCustomValidity('Please enter your Password.');
    }
    else {
        // Get login input values
        const inputEmail = document.getElementById('email').value;
        const inputPassword = document.getElementById('password').value;

        // Get saved login data from local storage
        const savedData = JSON.parse(localStorage.getItem('userData'));
        const userExists = savedData.filter(user => user.email === inputEmail && user.password === inputPassword);
        console.log(userExists)
        // Check if login was successful
        if (userExists.length) {
            console.log("Login User ", document.getElementById('LoginUser'));
            localStorage.setItem("currentUser", JSON.stringify(userExists[0]))
            alert("Successfully login ...");
        } else {
            // Incorrect login credentials
            alert("Account does not exist...");
            event.preventDefault();
            return;
        }
    }

    // Removing login/register after login
    console.log("Login User ", document.getElementById('LoginUser'));
    // currentUser && currentUser.length ? document.getElementById('LoginUser').style.display = 'none' : null;


    // for (var i = 0; i < removeLoginRegister.length; i++) {
    //     removeLoginRegister[i].style.display = 'none';
    // }

}


function logout() {

    // Remove saved login data from local storage
    localStorage.removeItem('currentUser');

    // Redirect the user to the login page
    window.location.assign('index.html');
}