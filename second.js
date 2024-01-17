function checkLoggedInStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn || isLoggedIn === 'false') {
        window.location.href = 'index.html';
    }
}

window.onload = function() {
    checkLoggedInStatus(); // Check the logged-in status when the page loads

    // Set up beforeunload event to handle window/tab close
    window.addEventListener('beforeunload', function() {
        // Reset logged-in status to false when the window is closed
        localStorage.setItem('isLoggedIn', 'false');
    });
}

// Logout functionality
function confirmLogout() {
    var confirmationModal = document.getElementById('confirmationModal');
    confirmationModal.style.display = 'block';
  }
  
  function closeConfirmation() {
    var confirmationModal = document.getElementById('confirmationModal');
    confirmationModal.style.display = 'none';
  }
  
  function logout() {
    // Reset logged-in status to false
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href = 'index.html'; // Redirect to the login page after logout
  }
  
// Invoke checkLoggedInStatus when the page loads
checkLoggedInStatus();
