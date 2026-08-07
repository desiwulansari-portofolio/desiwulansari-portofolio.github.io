const menuBtn=document.getElementById("menuBtn");
const navMenu=document.getElementById("navMenu");
menuBtn?.addEventListener("click",()=>navMenu.classList.toggle("open"));
navMenu?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>navMenu.classList.remove("open")));

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting) entry.target.classList.add("show")});
},{threshold:.08});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const orb=document.querySelector(".cursor-orb");
window.addEventListener("pointermove",e=>{
  if(orb){orb.style.left=e.clientX+"px";orb.style.top=e.clientY+"px";}
});

const openModal=(modal)=>modal?.classList.add("open");
const closeModal=(modal)=>modal?.classList.remove("open");

document.querySelectorAll(".modal-close").forEach(btn=>{
  btn.addEventListener("click",()=>closeModal(btn.closest(".modal")));
});
document.querySelectorAll(".modal").forEach(modal=>{
  modal.addEventListener("click",e=>{if(e.target===modal) closeModal(modal)});
});
document.addEventListener("keydown",e=>{
  if(e.key==="Escape") document.querySelectorAll(".modal.open").forEach(closeModal);
});

document.querySelectorAll('[data-modal]').forEach(card=>{
  card.addEventListener("click",()=>openModal(document.getElementById(card.dataset.modal)));
});

const detailModal=document.getElementById("detailModal");
document.querySelectorAll(".credential-card").forEach(card=>{
  card.addEventListener("click",()=>{
    document.getElementById("detailCategory").textContent=`${card.dataset.category} • ${card.dataset.year}`;
    document.getElementById("detailTitle").textContent=card.dataset.title;
    document.getElementById("detailDescription").textContent=card.dataset.description;
    const image=document.getElementById("detailImage");
    image.textContent=card.dataset.image ? `IMAGE: ${card.dataset.image}` : "CERTIFICATE IMAGE";
    image.style.display="grid";
    openModal(detailModal);
  });
});

document.querySelectorAll(".project-card").forEach(card=>{
  card.addEventListener("click",()=>{
    document.getElementById("detailCategory").textContent=card.querySelector("small").textContent;
    document.getElementById("detailTitle").textContent=card.dataset.title;
    document.getElementById("detailDescription").textContent=card.dataset.description;
    const tech=document.getElementById("detailTech");
    tech.innerHTML="";
    (card.dataset.tech||"").split(" • ").filter(Boolean).forEach(t=>{
      const span=document.createElement("span");span.textContent=t;tech.appendChild(span);
    });
    document.getElementById("detailImage").style.display="none";
    openModal(detailModal);
  });
});

document.querySelectorAll(".project-tabs button").forEach(button=>{
  button.addEventListener("click",()=>{
    document.querySelectorAll(".project-tabs button").forEach(b=>b.classList.remove("active"));
    button.classList.add("active");
    const filter=button.dataset.filter;
    document.querySelectorAll(".project-card").forEach(card=>{
      const categories=card.dataset.category.split(" ");
      card.classList.toggle("hidden",filter!=="all"&&!categories.includes(filter));
    });
  });
});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    const target=document.querySelector(a.getAttribute("href"));
    if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});}
  });
});
