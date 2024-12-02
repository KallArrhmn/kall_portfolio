// Scroll animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            entry.target.classList.remove('hidden');
        } else {
            entry.target.classList.remove('visible');
            entry.target.classList.add('hidden');
        }
    });
});

document.querySelectorAll('.container').forEach(container => {
    observer.observe(container);
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        setActiveLink(this);
    });
});

window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section'); // Ganti dengan selector yang sesuai untuk bagian halaman Anda
    const navLinks = document.querySelectorAll('.nav-links a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.scrollY >= sectionTop - sectionHeight / 3 && window.scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${section.id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Toggle menu
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Set active link
function setActiveLink(link) {
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.classList.remove('active');
    });
    link.classList.add('active');
}

// Send email using mailto
function sendEmail() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !phone || !email || !message) {
        const modal = document.getElementById('errorModal');
        modal.style.display = 'block';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 3000);
        return;
    }

    const subject = `Contact Form Submission from ${name}`;
    const body = `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.location.href =
        `mailto:haikalarrahman4@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Function to send message
function sendMessage() {
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    if (name && message) {
        const chatBox = document.getElementById('chat-box');
        const messageItem = document.createElement('div');
        messageItem.textContent = `${name}: ${message}`;
        chatBox.appendChild(messageItem);

        // Save message to local storage
        saveMessage(name, message);

        // Clear input fields
        document.getElementById('message').value = '';
    }
}

// Function to save message to local storage
function saveMessage(name, message) {
    let messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    messages.push({
        name,
        message
    });
    localStorage.setItem('chatMessages', JSON.stringify(messages));
}

// Function to load messages from local storage
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('chatMessages')) || [];
    const chatBox = document.getElementById('chat-box');
    messages.forEach(msg => {
        const messageItem = document.createElement('div');
        messageItem.textContent = `${msg.name}: ${msg.message}`;
        chatBox.appendChild(messageItem);
    });
}

// Load messages on page load
window.onload = loadMessages;

let currentRating = 0;

function setRating(rating) {
    currentRating = rating;
    document.getElementById("rating-value").innerText = rating;

    // Menandai bintang yang dipilih
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.style.color = index < rating ? '#FFD700' : '#ccc'; // Warna bintang yang dipilih
    });
}