// 6. IMAGE VAULT POPUP MODAL
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
