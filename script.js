const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
const menu=$('.menu-toggle'), nav=$('.nav-links');
menu?.addEventListener('click',()=>nav.classList.toggle('open'));
$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));

function openModal(id){const m=document.getElementById(id); if(m)m.classList.add('open')}
function closeModal(m){m.classList.remove('open')}
$$('[data-modal]').forEach(el=>el.addEventListener('click',e=>{
  if(e.target.closest('button') && !e.target.closest('.project-body button') && !e.target.closest('.cert-info button')) return;
  const id=el.dataset.modal;
  if(id==='cert-modal'){ $('#certTitle').textContent=el.dataset.title; $('#certOrg').textContent=el.dataset.org; $('#certYear').textContent=el.dataset.year; }
  if(id==='project-modal'){ $('#projectTitle').textContent=el.dataset.title; $('#projectTech').textContent=el.dataset.tech; }
  openModal(id);
}));
$$('.close').forEach(b=>b.addEventListener('click',()=>closeModal(b.closest('.modal'))));
$$('.modal').forEach(m=>m.addEventListener('click',e=>{if(e.target===m)closeModal(m)}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.modal.open').forEach(closeModal)});

$$('.filters button').forEach(btn=>btn.addEventListener('click',()=>{
  $$('.filters button').forEach(b=>b.classList.remove('active')); btn.classList.add('active');
  const filter=btn.dataset.filter;
  $$('.project-card').forEach(card=>{
    const show=filter==='all'||card.dataset.category.split(' ').includes(filter);
    card.classList.toggle('hidden',!show);
  });
}));

// Placeholder links are intentionally left editable until real URLs are supplied.
