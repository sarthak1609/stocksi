
const firebaseConfig = {
    apiKey: "AIzaSyC_aDNfIyFcrvg1eaJlDYeil0eZqHBnbkk",
    authDomain: "rewear-44637.firebaseapp.com",
    projectId: "rewear-44637",
    storageBucket: "rewear-44637.firebasestorage.app",
    messagingSenderId: "948075010395",
    appId: "1:948075010395:web:7e24083c7c6e468a15e27e",
    measurementId: "G-TFCZ5D4VNV"
};


firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();



async function saveEmailAndRedirect(email, feedback) {
    const submitButton = document.querySelector('#enrollForm button');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    try {
        // Use the compatibility API to add a document
        if (feedback != null) {
            const docRef = await db.collection("early_access_users").add({
                email: email,
                feedback: feedback,
                submittedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            console.log("Document written with ID: ", docRef.id);
        }
        else {
            const docRef = await db.collection("early_access_users").add({
                email: email,
                submittedAt: firebase.firestore.FieldValue.serverTimestamp()
            }); console.log("Document written with ID: ", docRef.id);
        }

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
    const feed = document.getElementById('feedback');
    const feedback = feed.value;
    const emailInput = document.getElementById('email');
    const email = emailInput.value;


    if (email && email.includes('@')) {
        saveEmailAndRedirect(email);
    } else  {
        alert("Please enter a valid email address.");
    }

    if(feedback){
        saveEmailAndRedirect(email,feedback);
    }
}

// 
//https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop
//https://images.unsplash.com/photo-1624953587687-e2712776c1b5?q=80&w=2070&auto=format&fit=crop


document.addEventListener('DOMContentLoaded', () => {
    // const feedback = document.getElementById('feedback');
    const loginForm = document.getElementById('enrollForm');
    // if (feedback) {
    //     feedback.addEventListener('submit', handleLoginwithfeedback)
    // }
    // else
     if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    // A safety check to ensure both elements exist before trying to add functionality.
    if (mobileMenuButton && mobileMenu) {
        // Add a 'click' event listener to the button.
        mobileMenuButton.addEventListener('click', () => {
            // When the button is clicked, this function runs.
            // It toggles the 'hidden' class on the menu panel, making it appear or disappear.
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Intersection Observer for Scroll Animations ---
    // This makes the feature cards fade in as you scroll down the page.
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Check if the element is now visible in the viewport.
            if (entry.isIntersecting) {
                // Add the animation class.
                entry.target.classList.add('animate-fade-in');
                // Stop observing the element after the animation has triggered once.
                observer.unobserve(entry.target);
            }
        });
    }, {
      // Trigger the animation when at least 10% of the element is visible.
      threshold: 0.1 
    });

    // Find all the elements with the 'feature-card' class and tell the observer to watch them.
    document.querySelectorAll('.feature-card').forEach(el => {
        observer.observe(el);
    });



});
