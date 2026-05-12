 <script>
        // --- 1. PARTICLE BACKGROUND ---
        function createParticles() {
            const container = document.getElementById('particles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random position
                const x = Math.random() * 100;
                const duration = Math.random() * 10 + 5; // 5-15s
                const size = Math.random() * 4 + 2;
                
                particle.style.left = `${x}%`;
                particle.style.bottom = `-${size}px`;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.animationDuration = `${duration}s`;
                particle.style.animationDelay = `${Math.random() * 5}s`;
                
                container.appendChild(particle);
            }
        }
        createParticles();

        // --- 2. NAVIGASI & SECTION SWITCHING ---
        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('.content-section');
        const menuBtn = document.getElementById('menuBtn');
        const navLinksContainer = document.getElementById('navLinks');

        function navigateTo(sectionId) {
            // Hide all sections
            sections.forEach(sec => sec.classList.remove('active'));
            // Show target section
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            // Update active link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });

            // Close mobile menu
            navLinksContainer.classList.remove('active');
        }

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-section');
                navigateTo(targetId);
            });
        });

        // Mobile Menu Toggle
        menuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
        });

        // --- 3. TYPEWRITER EFFECT ---
        const textElement = document.querySelector('.typewriter-text');
        const phrases = ["STUDENT", "WEB DEVELOPER", "FUTURE LEADER"];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentPhrase = phrases[phraseIndex];
            
            if (isDeleting) {
                textElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; 
            } else {
                textElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100; 
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                typeSpeed = 2000; 
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500; 
            }

            setTimeout(type, typeSpeed);
        }
        document.addEventListener('DOMContentLoaded', type);

        // --- 4. SKILL ANIMATION ---
        const skillsSection = document.getElementById('skills');
        const progressBars = document.querySelectorAll('.skill-progress');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    });
                }
            });
        }, { threshold: 0.5 });

        if(skillsSection) observer.observe(skillsSection);

        // --- 5. CONTACT FORM & TOAST ---
        const contactForm = document.getElementById('contactForm');
        const toast = document.getElementById('toast');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulasi kirim
            const btn = this.querySelector('button');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Mengirim...';
            
            setTimeout(() => {
                // Show Toast
                toast.className = "toast show";
                setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
                
                // Reset Form
                contactForm.reset();
                btn.innerHTML = originalText;
            }, 1500);
        });
    </script>
