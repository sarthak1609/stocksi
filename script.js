const mockItems = [
    { id: 1, title: 'Real Time Stock Data', category: 'Dresses', size: 'M', points: 120, uploader: 'Jane Doe', imageUrl: 'real.jpg', status: 'available', description: 'Play with real time values of stock Market, create portfolio daily or use previous one.'},
    { id: 2, title: 'Create Desired Portfolio', category: 'Bottoms', size: '32', points: 100, uploader: 'John Smith', imageUrl: 'port\'.jpg', status: 'available', description: 'Create your Portfolio without Money & add any stock you like without using real money.'},
    { id: 3, title: 'Join Paid Contests', category: 'Tops', size: 'L', points: 150, uploader: 'Emily White', imageUrl: 'contest.jpg', status: 'available', description: 'Invest your money in contest not in stock market, win more in large contests by skill not luck.'},
    { id: 4, title: 'Winning in loss', category: 'Outerwear', size: 'M', points: 250, uploader: 'Chris Green', imageUrl: 'win.jpg', status: 'available', description: 'Even if your portfolio is in loss or market crashed, you will win if you are first in your contest.'},
];



// --- AUTH SIMULATION ---
function checkLoginState() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

async function saveEmailAndRedirect(email) {
    const submitButton = document.querySelector('#login-form button');
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    try {
        // Use the compatibility API to add a document
        const docRef = await db.collection("early_access_users").add({
            email: email,
            submittedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log("Document written with ID: ", docRef.id);
        
        window.location.href = 'index.html';

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




// --- NAVIGATION RENDERING ---
function renderNav() {
    const navContainer = document.getElementById('main-nav');
    if (!navContainer) return;

    const isLoggedIn = checkLoginState();
    
    let navLinks = `
            <a href="login.html" class="bg-accent-primary text-white px-5 py-2 rounded-full hover:bg-accent-primary-dark transition duration-300 shadow-sm">Join Now</a>
        `;
    
    navContainer.innerHTML = navLinks;
}

// --- DYNAMIC CONTENT RENDERING ---
function renderFeaturedItems() {
    const container = document.getElementById('featured-items-container');
    if (!container) return; 

    container.innerHTML = '';
    mockItems.forEach(item => {
        const card = `
            <div class="bg-white rounded-xl shadow-md overflow-hidden block transform hover:-translate-y-2 transition-transform duration-300 group">
                <div class="overflow-hidden h-64">
                    <img src="${item.imageUrl}" alt="${item.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div class="p-5">
                    <h4 class="text-xl font-bold text-primary truncate">${item.title}</h4>
                    <p class="text-gray-500 mt-1">${item.description}</p>
                </div>
            </div>
        `;
        container.innerHTML += card;
    });
}


// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    // This function runs on every page that includes this script
    renderNav();
    
    // Page-specific render functions
    renderFeaturedItems();
    // Form-specific event listeners
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

});

