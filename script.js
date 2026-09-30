

// 1. Canvas Star Particle Background
        const canvas = document.getElementById('space-canvas');
        const ctx = canvas.getContext('2d');
        let stars = [];

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars();
        }

        function initStars() {
            stars = [];
            const count = Math.floor((canvas.width * canvas.height) / 3000);
            for (let i = 0; i < count; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * 1.5 + 0.5,
                    alpha: Math.random(),
                    speed: Math.random() * 0.02 + 0.005
                });
            }
        }

        function drawStars() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach(star => {
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
                ctx.fill();

                star.alpha += star.speed;
                if (star.alpha > 1 || star.alpha < 0) {
                    star.speed = -star.speed;
                }
            });
            requestAnimationFrame(drawStars);
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        drawStars();

        // 2. Enhanced Continuous Scroll Trigger Animation Observer (Up & Down with Staggered Delays)
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -40px 0px'
        };

        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const el = entry.target;
                const delay = el.getAttribute('data-delay') || 0;

                if (entry.isIntersecting) {
                    setTimeout(() => {
                        el.classList.add('reveal-visible');
                    }, parseInt(delay));
                } else {
                    // Remove class when element exits screen so it re-triggers smoothly when scrolling back!
                    el.classList.remove('reveal-visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal-item').forEach(el => {
            revealObserver.observe(el);
        });

        // Auto-update Navigation Bar Active Pill on Scroll
        const sections = document.querySelectorAll('section');
        window.addEventListener('scroll', () => {
            let currentSec = 'home';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                if (window.scrollY >= sectionTop) {
                    currentSec = section.getAttribute('id');
                }
            });

            const targetNavBtn = document.getElementById(`nav-${currentSec}`);
            if (targetNavBtn && !targetNavBtn.classList.contains('active')) {
                setActiveNav(targetNavBtn);
            }
        });

        // 3. Loading Progress Simulation
        let progress = 0;
        const progressBar = document.getElementById('loading-progress');
        const progressText = document.getElementById('loading-text');
        const loadingScreen = document.getElementById('loading-screen');

        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 8) + 2;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                setTimeout(() => {
                    loadingScreen.classList.add('opacity-0', 'pointer-events-none');
                }, 400);
            }
            progressBar.style.width = progress + '%';
            progressText.textContent = progress + '%';
        }, 50);

        // 4. Navbar Mascot Alignment
        function setActiveNav(element) {
            document.querySelectorAll('.nav-btn').forEach(btn => {
                btn.classList.remove('active', 'bg-blue-600/60', 'text-white', 'border', 'border-blue-400/30');
                btn.classList.add('text-slate-300');
            });

            element.classList.add('active', 'bg-blue-600/60', 'text-white', 'border', 'border-blue-400/30');
            element.classList.remove('text-slate-300');

            const mascot = document.getElementById('nav-mascot');
            const rect = element.getBoundingClientRect();
            const parentRect = element.parentElement.getBoundingClientRect();
            const offsetLeft = rect.left - parentRect.left + (rect.width / 2);
            
            mascot.style.left = offsetLeft + 'px';
        }

        // 5. Spotify Music Player Logic
        const songs = [
            { title: "Terbuang Dalam Waktu", artist: "Barasuara", duration: "04:41" },
            { title: "Raindance (feat. Tems)", artist: "Dave, Tems", duration: "03:39" },
            { title: "New Life", artist: "whyu", duration: "03:12" }
        ];
        let currentSongIdx = 2;
        let isPlaying = false;

        const songTitle = document.getElementById('current-song-title');
        const songArtist = document.getElementById('current-song-artist');
        const playBtn = document.getElementById('play-btn');
        const playIcon = document.getElementById('play-icon');
        const equalizer = document.getElementById('equalizer');

        function playSong(idx) {
            currentSongIdx = idx;
            songTitle.textContent = songs[idx].title;
            songArtist.textContent = songs[idx].artist;
            isPlaying = true;
            updatePlayerUI();
        }

        function updatePlayerUI() {
            if (isPlaying) {
                playIcon.className = "fas fa-pause text-sm ml-0";
                equalizer.classList.remove('paused');
            } else {
                playIcon.className = "fas fa-play text-sm ml-0.5";
                equalizer.classList.add('paused');
            }
        }

        playBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            updatePlayerUI();
        });

        document.getElementById('prev-btn').addEventListener('click', () => {
            currentSongIdx = (currentSongIdx - 1 + songs.length) % songs.length;
            playSong(currentSongIdx);
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            currentSongIdx = (currentSongIdx + 1) % songs.length;
            playSong(currentSongIdx);
        });

        // 6. Portfolio Tabs Switching
        function switchPortoTab(tabKey) {
            document.querySelectorAll('.porto-tab').forEach(tab => {
                tab.classList.remove('active', 'bg-blue-600', 'text-white', 'shadow-lg');
                tab.classList.add('text-slate-400');
            });

            const activeBtn = document.getElementById(`tab-${tabKey}`);
            activeBtn.classList.add('active', 'bg-blue-600', 'text-white', 'shadow-lg');
            activeBtn.classList.remove('text-slate-400');

            const views = ['projects', 'certificates', 'awards', 'tech'];
            views.forEach(view => {
                const el = document.getElementById(`porto-${view}-view`);
                if (view === tabKey) {
                    el.classList.remove('hidden');
                } else {
                    el.classList.add('hidden');
                }
            });
        }

        // 7. Universal Detail Preview Modal (Projects, Certificates, Awards, Education)
        const modal = document.getElementById('project-modal');
        const modalBox = document.getElementById('modal-box');

        function openItemDetailModal(title, desc, badge, tech, img) {
            document.getElementById('modal-title').textContent = title;
            document.getElementById('modal-desc').textContent = desc;
            document.getElementById('modal-badge').textContent = badge || "Detail";
            document.getElementById('modal-tech').textContent = tech || "Portfolio";
            document.getElementById('modal-img').src = img || "https://placehold.co/600x400/0a0f26/ffffff?text=Preview";

            modal.classList.remove('opacity-0', 'pointer-events-none');
            modalBox.classList.remove('scale-95');
            modalBox.classList.add('scale-100');
        }

        function closeItemDetailModal() {
            modal.classList.add('opacity-0', 'pointer-events-none');
            modalBox.classList.remove('scale-100');
            modalBox.classList.add('scale-95');
        }

        function showDownloadCVModal() {
            openItemDetailModal("Curriculum Vitae - Eka Wahyu Maulidan", "CV resmi mencakup pengalaman akademik di IT Education Universitas Brawijaya, riwayat organisasi, dan sertifikasi keahlian.", "PDF Resume", "Academic Resume 2026", "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600");
        }

        // 8. Live Guestbook Message Submit
        document.getElementById('contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('form-name').value;
            const message = document.getElementById('form-message').value;

            const guestbookList = document.getElementById('guestbook-list');
            const newComment = document.createElement('div');
            newComment.className = "bg-slate-900/80 p-3 rounded-xl border border-blue-500/40 animate-pulse";
            newComment.innerHTML = `
                <div class="flex justify-between items-center text-slate-400 text-[10px] mb-1">
                    <span class="font-bold text-sky-400">${name}</span>
                    <span>Just now</span>
                </div>
                <p class="text-slate-300">${message}</p>
            `;

            guestbookList.prepend(newComment);
            this.reset();

            setTimeout(() => {
                newComment.classList.remove('animate-pulse');
            }, 1000);
        });
