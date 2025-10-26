// Particle Background Effect
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const particleCount = 100;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = Math.random() > 0.5 ? '#00ffff' : '#ff00ff';
        this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Skill Bar Animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillFills = entry.target.querySelectorAll('.skill-fill');
            skillFills.forEach(fill => {
                const skillLevel = fill.getAttribute('data-skill');
                fill.style.width = skillLevel + '%';
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-card').forEach(card => {
    skillObserver.observe(card);
});

// Typing Effect for Hero Subtitle
const heroSubtitle = document.querySelector('.hero-subtitle');
const text = heroSubtitle.textContent;
heroSubtitle.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        heroSubtitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 50);
    }
}

setTimeout(typeWriter, 1000);

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroShape = document.querySelector('.hero-shape');
    if (heroShape) {
        heroShape.style.transform = `translate(-50%, -50%) translateY(${scrolled * 0.5}px)`;
    }
});

// Hover Effects for Project Cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-15px) rotateX(5deg)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) rotateX(0deg)';
    });
});

// Contact Form Animation
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitButton = contactForm.querySelector('.submit-button');
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            submitButton.textContent = 'Message Sent!';
            submitButton.style.background = 'linear-gradient(45deg, #00ff00, #00ffff)';
            setTimeout(() => {
                submitButton.textContent = 'Send Message';
                submitButton.disabled = false;
                submitButton.style.background = 'linear-gradient(45deg, #00ffff, #ff00ff)';
                contactForm.reset();
            }, 2000);
        }, 1500);
    });
}

// Mouse Follow Effect
document.addEventListener('mousemove', (e) => {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-trail';
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    document.body.appendChild(cursor);

    setTimeout(() => {
        cursor.remove();
    }, 1000);
});

// Add cursor trail styles dynamically
const cursorStyle = document.createElement('style');
cursorStyle.textContent = `
    .cursor-trail {
        position: fixed;
        width: 10px;
        height: 10px;
        background: radial-gradient(circle, #00ffff 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: cursorFade 1s ease-out forwards;
    }

    @keyframes cursorFade {
        to {
            opacity: 0;
            transform: scale(0.5);
        }
    }
`;
document.head.appendChild(cursorStyle);

// Random Color Change for Logo
setInterval(() => {
    const logo = document.querySelector('.logo');
    const colors = ['#00ffff', '#ff00ff', '#ffff00', '#00ff00', '#ff6600'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    logo.style.filter = `drop-shadow(0 0 10px ${randomColor})`;
}, 3000);

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

const scrollProgressStyle = document.createElement('style');
scrollProgressStyle.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, #00ffff, #ff00ff);
        z-index: 1001;
        transition: width 0.3s ease;
    }
`;
document.head.appendChild(scrollProgressStyle);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});
