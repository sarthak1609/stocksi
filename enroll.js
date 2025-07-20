
async function saveEmailAndRedirect(email) {
    const submitButton = document.querySelector('#enrollForm button');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    try {
        // Use the compatibility API to add a document
        const docRef = await db.collection("early_access_users").add({
            email: email,
            submittedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
        window.location.href = 'thankyou.html';

    } catch (e) {
        console.error("Error adding document: ", e);
        alert("There was an error submitting your email. Please check the console and try again.");
        submitButton.disabled = false;
        submitButton.textContent = 'Submit';
    }
}

function handleLogin(event) {
    event.preventDefault();
    const emailInput = document.getElementById('email');
    const email = emailInput.value;

    if (email && email.includes('@')) {
        saveEmailAndRedirect(email);
    } else {
        alert("Please enter a valid email address.");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    
    const loginForm = document.getElementById('enrollForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

});