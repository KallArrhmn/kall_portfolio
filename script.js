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

function scrollToHome() {
    const homeSection = document.getElementById('home');
    homeSection.scrollIntoView({
        behavior: 'smooth'
    });
}

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