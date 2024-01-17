// Basic hashing function
function hashPassword(password) {
    return CryptoJS.MD5(password).toString();
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
    return passwordRegex.test(password);
}

function checkLogin(username, password) {
    // Logic to check if the entered username and password match stored credentials
    const storedCredentials = JSON.parse(localStorage.getItem('credentials')) || [];
    const hashedPassword = hashPassword(password);

    return storedCredentials.some(cred => cred.username === username && cred.password === hashedPassword);
}

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    const signupError = document.getElementById('signupError');
    const loginMessage = document.getElementById('loginMessage');
    const successMessage = document.getElementById('successMessage');

    // Validate the password against requirements first
    if (!validatePassword(password)) {
        signupError.innerText = "Password must contain at least 8 characters, 1 capital letter, 1 number, and 1 special character (!@#$%^&*)";
        signupError.style.display = 'block'; // Ensure the message is visible
        signupError.style.opacity = 1; // Make the message fully visible (if it was previously faded out)

        // Hide the message after 2 seconds with fade-out animation
        const fadeOut = setInterval(function() {
            if (!signupError.style.opacity) {
                signupError.style.opacity = 1;
            }
            if (signupError.style.opacity > 0) {
                signupError.style.opacity -= 0.1;
            } else {
                clearInterval(fadeOut);
                signupError.style.display = 'none'; // Hide the message after fading out
            }
        }, 200);

        setTimeout(function() {
            clearInterval(fadeOut);
            signupError.style.display = 'none'; // Ensure the message is hidden after 2 seconds
        }, 2000); // Show message for 2 seconds

        return;
    } else {
        signupError.innerText = ""; // Clear the error message if password meets requirements
    }

    // Checking if passwords match
    if (password !== confirmPassword) {
        signupError.innerText = "Passwords do not match. Please try again.";
        signupError.style.display = 'block'; // Ensure the message is visible
        signupError.style.opacity = 1; // Make the message fully visible (if it was previously faded out)

        // Hide the message after 2 seconds with fade-out animation
        const fadeOut = setInterval(function() {
            if (!signupError.style.opacity) {
                signupError.style.opacity = 1;
            }
            if (signupError.style.opacity > 0) {
                signupError.style.opacity -= 0.1;
            } else {
                clearInterval(fadeOut);
                signupError.style.display = 'none'; // Hide the message after fading out
            }
        }, 200);

        setTimeout(function() {
            clearInterval(fadeOut);
            signupError.style.display = 'none'; // Ensure the message is hidden after 2 seconds
        }, 2000); // Show message for 2 seconds

        return;
    } else {
        signupError.innerText = ""; // Clear the error message if passwords match
    }

    const storedCredentials = JSON.parse(localStorage.getItem('credentials')) || [];

    // Check if username or email already exists in stored credentials
    const userExists = storedCredentials.some(cred => cred.username === username || cred.email === email);

    if (userExists) {
        loginMessage.innerText = "User already registered. Please log in.";
        loginMessage.style.display = 'block'; // Ensure the message is visible
        loginMessage.style.opacity = 1; // Make the message fully visible (if it was previously faded out)

        // Hide the message after 2 seconds with fade-out animation
        const fadeOut = setInterval(function() {
            if (!loginMessage.style.opacity) {
                loginMessage.style.opacity = 1;
            }
            if (loginMessage.style.opacity > 0) {
                loginMessage.style.opacity -= 0.1;
            } else {
                clearInterval(fadeOut);
                loginMessage.style.display = 'none'; // Hide the message after fading out
            }
        }, 200);

        setTimeout(function() {
            clearInterval(fadeOut);
            loginMessage.style.display = 'none'; // Ensure the message is hidden after 2 seconds
        }, 2000); // Show message for 2 seconds

        return;
    }

    // Proceed with storing credentials if the user is not already registered
    const hashedPassword = hashPassword(password);

    const credentials = {
        username: username,
        email: email,
        password: hashedPassword
    };

    storedCredentials.push(credentials);
    localStorage.setItem('credentials', JSON.stringify(storedCredentials));

    document.getElementById('storedCredentials').innerText = JSON.stringify(storedCredentials, null, 2);

    // Display the "Sign up successful" message only if the user is not already registered
    successMessage.innerText = "Sign up successful!";
    successMessage.style.display = 'block';

    // Optional: Hide success message after 3 seconds
    setTimeout(function() {
        successMessage.style.display = 'none';
    }, 3000);
});



document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;
    const loginMessage = document.getElementById('loginMessage');

    if (checkLogin(loginUsername, loginPassword)) {
        // Set logged-in status to true and store it locally
        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = "secondpage.html"; // Redirecting to the second page upon successful login
    } else {
        loginMessage.innerText = "Invalid credentials. Please try again.";
        loginMessage.style.display = 'block'; // Ensure the message is visible
        loginMessage.style.opacity = 1; // Make the message fully visible (if it was previously faded out)

        const fadeOut = setInterval(function () {
            if (!loginMessage.style.opacity) {
                loginMessage.style.opacity = 1;
            }
            if (loginMessage.style.opacity > 0) {
                loginMessage.style.opacity -= 0.1;
            } else {
                clearInterval(fadeOut);
                loginMessage.style.display = 'none'; // Hide the message after fading out
            }
        }, 200);

        setTimeout(function () {
            clearInterval(fadeOut);
            loginMessage.style.display = 'none'; // Ensure the message is hidden after 2 seconds
        }, 2000); // Show message for 2 seconds
    }
});


window.onload = function () {
    const storedCredentials = JSON.parse(localStorage.getItem('credentials'));
    if (storedCredentials) {
        document.getElementById('storedCredentials').innerText = JSON.stringify(storedCredentials, null, 2);
    }
};

// Rest of the code for slider, form movements, etc.
let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});

function showSignUp() {
    const formSection = document.querySelector(".form-section");
    formSection.classList.add("form-section-move");
    slider.classList.add("moveslider");

}

function showMessage(messageType) {
    const message = document.querySelector(`.${messageType}`);
    message.style.display = "block";
    message.classList.add("fade-in");
    setTimeout(() => {
        message.classList.remove("fade-in");
        message.classList.add("fade-out");
        setTimeout(() => {
            message.style.display = "none";
            message.classList.remove("fade-out");
        }, 2000);
    }, 1000);
}