// 1. CUSTOM CURSOR LOGIC
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

window.addEventListener('mousemove', (e) => {
  if (dot && ring) {
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    
    ring.style.left = `${e.clientX}px`;
    ring.style.top = `${e.clientY}px`;
  }
});

// 2. SKILL PLAYGROUND HOVER INTERACTION
const defaultTitle = "DESI / SKILLS";
const defaultDesc = "TKJ × technical foundation";
const centerTitle = document.getElementById('skillCenterTitle');
const centerDesc = document.getElementById('skillCenterDesc');

document.querySelectorAll('.skill-node').forEach(node => {
  node.addEventListener('mouseenter', () => {
    if (centerTitle && centerDesc) {
      centerTitle.textContent = node.getAttribute('data-title');
      centerDesc.textContent = node.getAttribute('data-desc');
    }
  });

  node.addEventListener('mouseleave', () => {
    if (centerTitle && centerDesc) {
      centerTitle.textContent = defaultTitle;
      centerDesc.textContent = defaultDesc;
    }
  });
});

// 3. PROJECT WORKSPACE DATA & MODAL HANDLER
const projectData = {
  p1: {
    title: "Network Setup & Troubleshooting",
    subthemes: {
      "Topology": "Building and reading a network topology, connecting devices and understanding the role of each component.",
      "Linux Mint": "Installation, desktop configuration, CLI administration, and light server setup using Linux Mint.",
      "UTP Cable": "Crimping Straight and Cross UTP cables, testing connectivity with LAN tester, and cable management.",
      "IP Configuration": "IPv4 Static/DHCP configuration, subnetting, gateway setup, and DNS routing.",
      "Troubleshooting": "Diagnosing network bottlenecks, packet loss analysis using ping/traceroute, and cable repair."
    }
  },
  p2: {
    title: "Service & Administration (BPJS Kesehatan)",
    subthemes: {
      "Mobile JKN": "Assisting users with registration, menu navigation, and troubleshooting the Mobile JKN app during PKL.",
      "Data Administration": "Organizing daily administrative records, managing database inputs, and sorting user files accurately.",
      "Customer Service": "Communicating with diverse visitors, providing patient guidance, and delivering friendly service.",
      "Daily Reports": "Compiling data entry reports using Microsoft Excel and Google Sheets with precision and deadlines."
    }
  },
  p3: {
    title: "Personal Portfolio Playground",
    subthemes: {
      "Web Design": "Crafting organic, playful, non-corporate UI/UX with soft pastel tones and responsive layouts.",
      "Frontend": "Vanilla JavaScript interactive physics, modal overlays, dynamic CSS keyframes, and custom cursors.",
      "Personal Branding": "Establishing the unique 'TKJ × Management' positioning for fresh graduate portfolio."
    }
  }
};

function openProjectModal(id) {
  const proj = projectData[id];
  const overlay = document.getElementById('modalOverlay');
  const body = document.getElementById('modalBody');

  if (!proj || !overlay || !body) return;

  const firstTabKey = Object.keys(proj.subthemes)[0];

  let tabsHTML = `<div class="subtheme-tabs">`;
  Object.keys(proj.subthemes).forEach((tab, index) => {
    tabsHTML += `<button class="tab-btn ${index === 0 ? 'active' : ''}" onclick="switchTab(this, '${id}', '${tab}')">${tab}</button>`;
  });
  tabsHTML += `</div>`;

  body.innerHTML = `
    <span class="tag tag-purple" style="font-size:0.8rem">PROJECT WORKSPACE</span>
    <h2 style="margin-top:0.5rem; font-size: 2rem;">${proj.title}</h2>
    ${tabsHTML}
    <div id="tabContent" style="background:var(--white); padding:1.5rem; border-radius:1rem; border:2px solid var(--ink); margin-top:1rem;">
      <h4 id="tabTitle" style="color:var(--purple); font-size:1.2rem;">${firstTabKey}</h4>
      <p id="tabDesc" style="margin-top:0.5rem;">${proj.subthemes[firstTabKey]}</p>
    </div>
  `;

  overlay.style.display = 'flex';
}

function switchTab(btn, projId, tabKey) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  const tabTitle = document.getElementById('tabTitle');
  const tabDesc = document.getElementById('tabDesc');
  
  if (tabTitle && tabDesc) {
    tabTitle.textContent = tabKey;
    tabDesc.textContent = projectData[projId].subthemes[tabKey];
  }
}

// 4. CERTIFICATE VIEWER MODAL
function openCertModal(title, issuer, year, imgSrc, desc) {
  const overlay = document.getElementById('modalOverlay');
  const body = document.getElementById('modalBody');

  if (!overlay || !body) return;

  body.innerHTML = `
    <span class="tag tag-peach" style="font-size:0.8rem">CERTIFICATE VIEWER</span>
    <h2 style="margin-top:0.5rem; font-size: 1.8rem;">${title}</h2>
    <p style="font-weight:700; color:var(--purple); margin-bottom:1rem;">${issuer} — ${year}</p>
    <div style="width:100%; height:220px; background:var(--white); border:2px solid var(--ink); border-radius:1rem; display:flex; align-items:center; justify-content:center; margin-bottom:1rem; overflow:hidden;">
      <img src="${imgSrc}" alt="${title}" style="max-width:100%; max-height:100%; object-fit:contain;" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
      <p style="display:none; font-weight:700; color:rgba(33,29,37,0.5);">[ Certificate Image Placeholder ]</p>
    </div>
    <p style="font-size:0.95rem;">${desc}</p>
  `;

  overlay.style.display = 'flex';
}

// 5. IMAGE VAULT POPUP MODAL
function openImageModal(imgSrc, caption) {
  const overlay = document.getElementById('modalOverlay');
  const body = document.getElementById('modalBody');

  if (!overlay || !body) return;

  body.innerHTML = `
    <span class="tag tag-lime" style="font-size:0.8rem">PREVIEW GAMBAR</span>
    <h3 style="margin-top:0.5rem; margin-bottom: 1rem; font-size: 1.5rem;">${caption}</h3>
    <div style="width:100%; max-height:60vh; background:var(--white); border:3px solid var(--ink); border-radius:1rem; overflow:hidden; display:flex; align-items:center; justify-content:center;">
      <img src="${imgSrc}" alt="${caption}" style="width:100%; height:100%; object-fit:contain;" onerror="this.src='https://via.placeholder.com/800x500/DCD5FF/211D25?text=Gambar+Gagal+Dimuat';">
    </div>
  `;

  overlay.style.display = 'flex';
}

// 6. CLOSE MODAL FUNCTIONS
function closeModal() {
  const overlay = document.getElementById('modalOverlay');
  if (overlay) overlay.style.display = 'none';
}

// CLOSE VIA KEYBOARD (ESC)
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// CLOSE VIA OVERLAY CLICK
const modalOverlay = document.getElementById('modalOverlay');
if (modalOverlay) {
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
}
