
    AOS.init({ once: true, duration: 700, offset: 60 });

    /* ---- THEME ---- */
    const DARK_VIDEO  = 'img/gif.mp4';
    const LIGHT_VIDEO = 'img/gif2.mp4'; // substitua pelo nome real do seu segundo vídeo

    function toggleTheme() {
        const body = document.body;
        body.classList.toggle('light-mode');
        const isLight = body.classList.contains('light-mode');

        // troca ícone (desktop + mobile)
        ['themeIcon','themeIconMobile'].forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            el.classList.toggle('bx-sun',  !isLight);
            el.classList.toggle('bx-moon',  isLight);
        });

        // troca vídeo
        const video = document.getElementById('hero-video');
        const src   = document.getElementById('hero-video-src');
        src.src = isLight ? LIGHT_VIDEO : DARK_VIDEO;
        video.load();
        video.play();
    }

    /* ---- MOBILE MENU ---- */
    function toggleMobileMenu() {
        const menu = document.getElementById('mobile-menu');
        const btn  = document.getElementById('mobileMenuBtn');
        const icon = btn.querySelector('i');
        const open = menu.classList.toggle('active');
        icon.className = open ? 'bx bx-x' : 'bx bx-menu';
        document.body.style.overflow = open ? 'hidden' : '';
    }

    /* ---- HEADER SCROLL ---- */
    let lastY = 0;
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        header.classList.toggle('scrolled', y > 80);
        header.classList.toggle('hidden-nav', y > lastY && y > 200);
        lastY = y;
    }, { passive: true });

    /* ---- SWIPER ---- */
    new Swiper('.mySwiper', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: { rotate: 45, stretch: 0, depth: 100, modifier: 1, slideShadows: true },
        loop: true,
        autoplay: { delay: 20000, disableOnInteraction: false, pauseOnMouseEnter: true },
        speed: 700,
        a11y: { enabled: true }
    });

    /* ---- MODALS ---- */
    function openModal(id)  { document.getElementById(id).classList.add('active'); }
    function closeModal(id) { document.getElementById(id).classList.remove('active'); }

    function openServiceModal(title, price, time, desc) {
        document.getElementById('modalTitle').textContent = title;
        document.getElementById('modalPrice').textContent = price;
        document.getElementById('modalTime').textContent  = time;
        document.getElementById('modalDesc').textContent  = desc;
        openModal('serviceModal');
    }

    // close modal on backdrop click
    document.getElementById('serviceModal').addEventListener('click', function(e) {
        if (e.target === this) closeModal('serviceModal');
    });

    // close modal on ESC
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal('serviceModal');
    });

    /* ---- CONTACT FORM ---- */
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const servico = this.querySelector('input[name="servico"]:checked')?.value || '';
        const desc    = this.querySelector('#desc').value.trim();
        const nome    = this.querySelector('#nome').value.trim();
        const whats   = this.querySelector('#whats').value.trim();

        const msg = encodeURIComponent(
            `Olá Rafael! Tenho interesse em: *${servico.toUpperCase()}*\n\nDescrição: ${desc || '–'}\n\nNome/Empresa: ${nome || '–'}\nWhatsApp: ${whats || '–'}`
        );
        window.open(`https://wa.me/5500000000000?text=${msg}`, '_blank'); // substitua pelo número
    });

    /* ---- PARTICLES ---- */
    const canvas = document.getElementById('particle-canvas');
    const ctx    = canvas.getContext('2d');
    let particles = [];

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener('resize', resize, { passive: true });
    resize();

    class Particle {
        constructor(x, y) {
            this.x = x; this.y = y;
            this.size = Math.random() * 3.2 + 1.2;
            this.vx = (Math.random() - .5) * 1.2;
            this.vy = (Math.random() - .5) * 1.2;
            this.alpha = 0.8;
        }
        update() { this.x += this.vx; this.y += this.vy; this.alpha -= .008; }
        draw() {
            ctx.globalAlpha = Math.max(0, this.alpha);
            ctx.fillStyle = '#00abf0';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    window.addEventListener('mousemove', e => {
        if (particles.length < 200)
            particles.push(new Particle(e.clientX, e.clientY));
    }, { passive: true });

    (function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter(p => p.alpha > 0);
        particles.forEach(p => { p.update(); p.draw(); });
        ctx.globalAlpha = 1;
        requestAnimationFrame(loop);
    })();

    /* ---- WORK CARD ANIMATIONS ---- */
    document.querySelectorAll('.work-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (this.href === '#' || !this.href) {
                e.preventDefault();
                return;
            }
            e.preventDefault();
            const rect = this.getBoundingClientRect();
            
            // Criar pulso de animação
            const pulse = document.createElement('div');
            pulse.style.cssText = `
                position: fixed; 
                left: ${rect.left + rect.width/2}px; 
                top: ${rect.top + rect.height/2}px;
                width: 2rem; height: 2rem;
                transform: translate(-50%, -50%);
                z-index: 999; pointer-events: none;
            `;
            pulse.className = 'spinner';
            document.body.appendChild(pulse);
            
            // Adicionar classe de animação
            pulse.style.animation = 'pulseOut .6s ease-out forwards';
            
            setTimeout(() => {
                window.location.href = this.href;
            }, 300);
        });
    });
