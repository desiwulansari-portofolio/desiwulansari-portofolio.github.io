function openAwardModal(data) {
            document.getElementById('awardModalYear').innerText = data.year;
            document.getElementById('awardModalTitle').innerText = data.title;
            document.getElementById('awardModalSubtitle').innerText = data.subtitle;

            document.getElementById('certModalHeader').innerText = data.certTitle || 'SERTIFIKAT PENGHARGAAN';
            document.getElementById('certModalName').innerText = data.certRecipient || 'DESI WULANSARI';
            document.getElementById('certModalSub').innerText = data.certSub || '';
            document.getElementById('certModalMajor').innerText = data.certMajor || '';
            document.getElementById('certModalScore').innerText = data.certScore || '';

            document.getElementById('awardModalDesc').innerText = data.desc;
            document.getElementById('awardModalCategory').innerText = data.category;

            const tagsContainer = document.getElementById('awardModalTags');
            tagsContainer.innerHTML = '';
            if (data.tags && data.tags.length > 0) {
                data.tags.forEach(tag => {
                    const span = document.createElement('span');
                    span.className = 'px-2.5 py-1 bg-slate-800/90 text-gray-300 border border-slate-700/60 rounded-md text-[10px] font-medium';
                    span.innerText = tag;
                    tagsContainer.appendChild(span);
                });
            }

            document.getElementById('awardModal').classList.remove('hidden');
        }

        function closeAwardModal() {
            document.getElementById('awardModal').classList.add('hidden');
        }

        // Open Project Detail Modal
        function openProjectModal(data) {
            document.getElementById('projModalBreadcrumb').innerText = data.title;
            document.getElementById('projModalTitle').innerText = data.title;
            document.getElementById('projModalDesc').innerText = data.desc;
            document.getElementById('projModalBadge').innerText = data.statusText || 'LIVE NOW!';
            document.getElementById('projModalCardTitle').innerText = data.typeTag || 'PROJECT PORTOFOLIO';
            document.getElementById('projModalMockupTitle').innerText = data.title;

            document.getElementById('projectModal').classList.remove('hidden');
        }

        function closeProjectModal() {
            document.getElementById('projectModal').classList.add('hidden');
        }

        // Open Skill Modal
        function openSkillModal(data) {
            document.getElementById('modalTitle').innerText = data.title;
            document.getElementById('modalDescription').innerText = data.desc;
            
            const techContainer = document.getElementById('modalTechContainer');
            techContainer.innerHTML = '';
            data.techs.forEach(tech => {
                const badge = document.createElement('span');
                badge.className = 'px-3 py-1.5 bg-gray-900/90 border border-gray-800 rounded-xl text-xs text-gray-300 flex items-center gap-1.5 font-medium';
                badge.innerHTML = `<span class="text-cyan-400 text-xs">❖</span> ${tech}`;
                techContainer.appendChild(badge);
            });
            document.getElementById('modalTechCount').innerText = data.techs.length;

            const featureList = document.getElementById('modalFeatureList');
            featureList.innerHTML = '';
            data.features.forEach(feat => {
                const li = document.createElement('li');
                li.className = 'text-xs text-gray-300 leading-relaxed';
                li.innerText = feat;
                featureList.appendChild(li);
            });
            document.getElementById('modalFeatureCount').innerText = data.features.length;

            document.getElementById('modalPreviewTitle').innerText = data.previewTitle || data.title;
            document.getElementById('modalPreviewDesc').innerText = data.previewDesc || data.desc;

            document.getElementById('skillModal').classList.remove('hidden');
        }

        function closeSkillModal() {
            document.getElementById('skillModal').classList.add('hidden');
        }

        function openGalleryModal(data) {
            document.getElementById('galleryModalTitle').innerText = data.title;
            document.getElementById('galleryModalLocation').innerText = data.location;
            document.getElementById('galleryModalDesc').innerText = data.desc;
            
            const badge = document.getElementById('galleryModalBadge');
            badge.innerText = data.category;
            badge.className = `inline-block px-3 py-1 text-white text-xs font-bold rounded-full shadow ${data.catColor}`;

            document.getElementById('galleryModal').classList.remove('hidden');
        }

        function closeGalleryModal() {
            document.getElementById('galleryModal').classList.add('hidden');
        }

        function sendWhatsAppMessage(event) {
            event.preventDefault();
            const name = document.getElementById('senderName').value;
            const email = document.getElementById('senderEmail').value;
            const message = document.getElementById('senderMessage').value;

            const text = `Halo Desi, perkenalkan saya *${name}* (${email}).\n\nPesan:\n${message}`;
            const encodedText = encodeURIComponent(text);
            
            const phoneNumber = "6281234567890"; 
            window.open(`https://wa.me/${phoneNumber}?text=${encodedText}`, '_blank');
        }

        // --- TAMBAHAN SCRIPT ANIMASI (Scroll Atas-Bawah & Efek Per Kata) ---
        document.addEventListener("DOMContentLoaded", () => {
            const pandaCompanion = document.getElementById('pandaCompanion');
            const pandaPet = document.getElementById('pandaPet');
            const pandaSpeech = document.getElementById('pandaSpeech');
            const projectsSection = document.getElementById('projects');
            const pandaGreetings = ['Halo, Desi!', 'Aku temani scroll ya!', 'Semangat hari ini!', 'Paw paw!'];
            let pandaGreetingIndex = 0;
            let pandaSpeechTimeout;

            pandaPet?.addEventListener('click', () => {
                pandaSpeech.textContent = pandaGreetings[pandaGreetingIndex % pandaGreetings.length];
                pandaGreetingIndex++;
                pandaCompanion.classList.add('is-happy', 'is-talking');
                pandaPet.setAttribute('aria-expanded', 'true');
                window.clearTimeout(pandaSpeechTimeout);
                pandaSpeechTimeout = window.setTimeout(() => {
                    pandaCompanion.classList.remove('is-happy', 'is-talking');
                    pandaPet.setAttribute('aria-expanded', 'false');
                }, 2600);
            });

            pandaPet?.addEventListener('pointermove', event => {
                const bounds = pandaPet.getBoundingClientRect();
                const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
                const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;
                pandaPet.style.setProperty('--panda-look-x', `${(horizontal * 3).toFixed(1)}px`);
                pandaPet.style.setProperty('--panda-look-y', `${(vertical * 2).toFixed(1)}px`);
            });

            pandaPet?.addEventListener('pointerleave', () => {
                pandaPet.style.removeProperty('--panda-look-x');
                pandaPet.style.removeProperty('--panda-look-y');
            });

            if (projectsSection && pandaCompanion && 'IntersectionObserver' in window) {
                const pandaVisibilityObserver = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        pandaCompanion.classList.toggle('is-project-view', entry.isIntersecting);
                    });
                }, { threshold: 0.08 });
                pandaVisibilityObserver.observe(projectsSection);
            }

            const mobileMenu = document.querySelector('.mobile-menu');
            mobileMenu?.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.open = false;
                });
            });

            document.querySelectorAll('.content-expander').forEach(button => {
                const grid = document.getElementById(button.getAttribute('aria-controls'));
                if (!grid) return;

                const items = Array.from(grid.children);
                const initialCount = Number(grid.dataset.initialCount) || items.length;
                const desktopCount = Number(grid.dataset.desktopCount) || initialCount;
                const label = button.querySelector('span');
                const showAllLabel = button.dataset.showAll;
                const showLessLabel = button.dataset.showLess;
                let expanded = false;
                const hasOverflow = items.length > Math.max(initialCount, desktopCount);

                if (!hasOverflow) {
                    button.hidden = false;
                    button.addEventListener('click', () => {
                        label.textContent = 'Semua item sudah ditampilkan';
                        window.setTimeout(() => {
                            label.textContent = showAllLabel;
                        }, 1800);
                    });
                    return;
                }

                const updateVisibleItems = () => {
                    const responsiveCount = window.matchMedia('(min-width: 1024px)').matches ? desktopCount : initialCount;
                    const visibleCount = expanded ? items.length : responsiveCount;

                    items.forEach((item, index) => {
                        item.hidden = index >= visibleCount;
                        if (item.hidden) item.classList.remove('active');
                    });
                    button.hidden = !expanded && visibleCount >= items.length;
                    button.setAttribute('aria-expanded', String(expanded));
                    label.textContent = expanded ? showLessLabel : showAllLabel;
                };

                button.addEventListener('click', () => {
                    expanded = !expanded;
                    updateVisibleItems();
                });

                window.addEventListener('resize', updateVisibleItems, { passive: true });
                updateVisibleItems();
            });

            const siteHeader = document.querySelector('.site-header');
            let lastScrollY = window.scrollY;
            let wheelDirection = null;
            let wheelDirectionTimeout;
            window.addEventListener('wheel', event => {
                if (Math.abs(event.deltaY) < 3) return;

                wheelDirection = event.deltaY > 0 ? 'down' : 'up';
                if (window.matchMedia('(min-width: 768px)').matches) {
                    if (window.scrollY <= 80) {
                        siteHeader?.classList.remove('nav-hidden');
                    } else {
                        siteHeader?.classList.toggle('nav-hidden', wheelDirection === 'down');
                    }
                }

                window.clearTimeout(wheelDirectionTimeout);
                wheelDirectionTimeout = window.setTimeout(() => {
                    wheelDirection = null;
                }, 1400);
            }, { passive: true });

            const updateHeaderOnScroll = () => {
                const currentScrollY = Math.max(0, window.scrollY);
                const scrollDelta = currentScrollY - lastScrollY;
                const desktopViewport = window.matchMedia('(min-width: 768px)').matches;
                document.documentElement.dataset.scrollDirection = scrollDelta >= 0 ? 'down' : 'up';

                if (!desktopViewport || currentScrollY <= 80) {
                    siteHeader?.classList.remove('nav-hidden');
                } else if (wheelDirection) {
                    siteHeader?.classList.toggle('nav-hidden', wheelDirection === 'down');
                } else if (scrollDelta < -4) {
                    siteHeader?.classList.remove('nav-hidden');
                } else if (scrollDelta > 4) {
                    siteHeader?.classList.add('nav-hidden');
                }

                lastScrollY = currentScrollY;
            };
            window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
            window.addEventListener('resize', () => {
                if (window.innerWidth < 768) {
                    siteHeader?.classList.remove('nav-hidden');
                }
            }, { passive: true });

            const revealSections = document.querySelectorAll('.reveal-section');
            const revealGroups = document.querySelectorAll(
                '#about .grid, #skills .grid, #projects .grid, #resume .grid, #resume .space-y-8, #organization .grid, #organization .space-y-4, #awards .grid, #gallery .grid, #contact > .grid, #contact .grid.grid-cols-2'
            );
            const revealItems = [];

            revealGroups.forEach(group => {
                Array.from(group.children).forEach((item, index) => {
                    item.classList.add('reveal-item');
                    item.dataset.revealFrom = index % 2 === 0 ? 'left' : 'right';
                    item.style.setProperty('--reveal-index', Math.min(index, 5));

                    if (group.matches('#resume .space-y-8, #organization .space-y-4')) {
                        item.classList.add('timeline-entry');
                        item.querySelector('.absolute')?.classList.add('timeline-dot');
                    }

                    revealItems.push(item);
                });
            });

            const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            if (!reducedMotion && 'IntersectionObserver' in window) {
                document.documentElement.classList.add('motion-ready');

                const sectionObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        entry.target.dataset.scrollDirection = document.documentElement.dataset.scrollDirection || 'down';
                        entry.target.classList.toggle('active', entry.isIntersecting);
                    });
                }, { threshold: 0.12 });

                revealSections.forEach(section => sectionObserver.observe(section));

                const itemObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        entry.target.classList.toggle('active', entry.isIntersecting);
                    });
                }, { threshold: 0.18 });

                revealItems.forEach(item => itemObserver.observe(item));
            }

            if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
                const tiltCards = document.querySelectorAll(
                    '#skills .grid > button, #projects .grid > .glass-card, #awards .grid > button, #gallery .grid > [onclick]'
                );

                tiltCards.forEach(card => {
                    card.classList.add('tilt-card');
                    card.addEventListener('pointermove', event => {
                        const bounds = card.getBoundingClientRect();
                        const horizontalPosition = (event.clientX - bounds.left) / bounds.width - 0.5;
                        const verticalPosition = (event.clientY - bounds.top) / bounds.height - 0.5;
                        card.style.setProperty('--tilt-x', `${(horizontalPosition * 8).toFixed(2)}deg`);
                        card.style.setProperty('--tilt-y', `${(verticalPosition * -8).toFixed(2)}deg`);
                    });
                    card.addEventListener('pointerleave', () => {
                        card.style.removeProperty('--tilt-x');
                        card.style.removeProperty('--tilt-y');
                    });
                });
            }

            const heroHeading = document.getElementById('heroHeading');
            if (heroHeading) {
                const originalHTML = heroHeading.innerHTML;
                // Memecah teks per kata/tag dengan tetap mempertahankan format <br> dan span warna
                const parts = originalHTML.split(/(<br\s*\/?>)/gi);
                
                let newHTML = '';
                parts.forEach(part => {
                    if (part.toLowerCase().includes('br')) {
                        newHTML += part;
                    } else {
                        // Bungkus teks ke dalam elemen span kata dengan jeda waktu (stagger)
                        const tempDiv = document.createElement('div');
                        tempDiv.innerHTML = part;
                        
                        // Proses node anak untuk memecah teks perkata
                        const processNode = (node) => {
                            if (node.nodeType === Node.TEXT_NODE) {
                                const words = node.nodeValue.split(' ');
                                let wordHTML = '';
                                words.forEach((word, idx) => {
                                    if (word.trim() !== '') {
                                        wordHTML += `<span class="animate-word" style="animation-delay: ${idx * 0.04}s;">${word}&nbsp;</span>`;
                                    }
                                });
                                return wordHTML;
                            } else if (node.nodeType === Node.ELEMENT_NODE) {
                                let inner = '';
                                node.childNodes.forEach(child => {
                                    inner += processNode(child);
                                });
                                node.innerHTML = inner;
                                return node.outerHTML;
                            }
                            return '';
                        };
                        
                        newHTML += processNode(tempDiv);
                    }
                });
                heroHeading.innerHTML = newHTML;
            }
        });