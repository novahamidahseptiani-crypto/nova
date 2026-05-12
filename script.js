               /* ===== NAVIGASI SECTION ===== */
        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('.content-section');
        const navLinksContainer = document.getElementById('navLinks');
        const menuBtn = document.getElementById('menuBtn');
        const navOverlay = document.getElementById('navOverlay');

        function navigateTo(sectionId) {
            // Sembunyikan semua section
            sections.forEach(sec => sec.classList.remove('active'));
            // Tampilkan section yang dipilih
            const target = document.getElementById(sectionId);
            if (target) {
                target.classList.add('active');
            }

            // Update active state di nav
            navLinks.forEach(link => {
                link.classList.toggle('active', link.dataset.section === sectionId);
            });

            // Animasi skill bar jika section skills
            if (sectionId === 'skills') {
                setTimeout(animateSkillBars, 200);
            }

            // Tutup mobile menu
            closeMobileMenu();
        }

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                navigateTo(link.dataset.section);
            });
        });

        /* ===== MOBILE MENU ===== */
        menuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
            navOverlay.classList.toggle('show');
            const icon = menuBtn.querySelector('i');
            if (navLinksContainer.classList.contains('open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        function closeMobileMenu() {
            navLinksContainer.classList.remove('open');
            navOverlay.classList.remove('show');
            menuBtn.querySelector('i').className = 'fas fa-bars';
        }

        navOverlay.addEventListener('click', closeMobileMenu);

        /* ===== TYPEWRITER EFFECT ===== */
        const typewriterEl = document.querySelector('.typewriter-text');
        const words = ['Student'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeWriter() {
            const currentWord = words[wordIndex];

            if (isDeleting) {
                typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                // Jeda setelah selesai mengetik
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400;
            }

            setTimeout(typeWriter, typeSpeed);
        }

        typeWriter();

        /* ===== ANIMASI SKILL BAR ===== */
        function animateSkillBars() {
            document.querySelectorAll('.skill-progress').forEach(bar => {
                const width = bar.dataset.width || bar.style.width;
                // Reset dulu
                bar.style.width = '0%';
                // Trigger reflow
                void bar.offsetWidth;
                // Animasi
                bar.style.width = width + '%';
            });
        }

        /* ===== CONTACT FORM ===== */
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            showToast('Pesan berhasil dikirim! Terima kasih.');
            contactForm.reset();
        });

        /* ===== TOAST NOTIFICATION ===== */
        function showToast(message) {
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toastMessage');
            toastMsg.textContent = message;
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3500);
        }

        /* ===== PARTIKEL LATAR BELAKANG ===== */
        function createParticles() {
            const container = document.getElementById('particles');
            const count = 25;

            for (let i = 0; i < count; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                particle.style.left = Math.random() * 100 + '%';
                particle.style.width = (Math.random() * 3 + 1) + 'px';
                particle.style.height = particle.style.width;
                particle.style.animationDuration = (Math.random() * 12 + 8) + 's';
                particle.style.animationDelay = (Math.random() * 10) + 's';
                particle.style.opacity = 0;

                // Warna acak dari tema
                const colors = ['var(--accent)', 'var(--accent2)', 'var(--accent3)'];
                particle.style.background = colors[Math.floor(Math.random() * colors.length)];

                container.appendChild(particle);
            }
        }

        createParticles();

        /* ===== INISIALISASI SKILL BAR PADA LOAD ===== */
        // Jangan animasi saat load karena section home yang aktif
        // Skill bar akan animasi saat user klik section Skills
        
