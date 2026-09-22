const dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});
function cursorLoop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(cursorLoop)}cursorLoop();

document.querySelectorAll('a,button,.project,.skill').forEach(el=>{
 el.addEventListener('mouseenter',()=>document.body.classList.add('is-hover'));
 el.addEventListener('mouseleave',()=>document.body.classList.remove('is-hover'));
});

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(x=>observer.observe(x));

const progress=document.querySelector('.scroll-line span');
window.addEventListener('scroll',()=>{
 const max=document.documentElement.scrollHeight-innerHeight;
 progress.style.height=(scrollY/max*100)+'%';
});

document.querySelectorAll('.magnetic').forEach(el=>{
 el.addEventListener('mousemove',e=>{
   const r=el.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.16,y=(e.clientY-r.top-r.height/2)*.16;
   el.style.transform=`translate(${x}px,${y}px)`;
 });
 el.addEventListener('mouseleave',()=>el.style.transform='');
});

document.querySelectorAll('.project').forEach(card=>{
 card.addEventListener('mousemove',e=>{
   const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
   card.style.transform=`perspective(900px) rotateX(${y*-3}deg) rotateY(${x*3}deg)`;
 });
 card.addEventListener('mouseleave',()=>card.style.transform='');
});

const skills=[...document.querySelectorAll('.skill')];
skills.forEach((s,i)=>{
 s.addEventListener('click',()=>{s.animate([{transform:'scale(1.18) rotate(-3deg)'},{transform:'scale(1) rotate(0)'}],{duration:500})});
});

window.addEventListener('mousemove',e=>{
 const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;
 document.querySelectorAll('.sticker,.scribble').forEach((el,i)=>{
   el.style.translate=`${x*(i+1)*5}px ${y*(i+1)*5}px`;
 });
});
