const units=[{"name": "A2", "tower": 3, "beds": 1, "baths": 1, "sqm": 47, "sqft": 506}, {"name": "A4", "tower": 1, "beds": 1, "baths": 1, "sqm": 50, "sqft": 538}, {"name": "A5", "tower": 1, "beds": 1, "baths": 1, "sqm": 55, "sqft": 592}, {"name": "A6", "tower": 2, "beds": 1, "baths": 1, "sqm": 60, "sqft": 646}, {"name": "A7", "tower": 2, "beds": 1, "baths": 1, "sqm": 63, "sqft": 678}, {"name": "A8", "tower": 1, "beds": 1, "baths": 1, "sqm": 65, "sqft": 700}, {"name": "B3", "tower": 1, "beds": 1, "baths": 1, "sqm": 70, "sqft": 753}, {"name": "B2A", "tower": 3, "beds": 1, "baths": 2, "sqm": 75, "sqft": 807}, {"name": "B1-1", "tower": 3, "beds": 2, "baths": 2, "sqm": 77, "sqft": 829}, {"name": "B5", "tower": 2, "beds": 2, "baths": 2, "sqm": 79, "sqft": 850}, {"name": "B10", "tower": 1, "beds": 2, "baths": 2, "sqm": 83, "sqft": 893}, {"name": "B11", "tower": 1, "beds": 2, "baths": 2, "sqm": 81, "sqft": 872}, {"name": "B7", "tower": 1, "beds": 3, "baths": 1, "sqm": 80, "sqft": 861}, {"name": "B14", "tower": 2, "beds": 3, "baths": 2, "sqm": 96, "sqft": 1033}, {"name": "C1-1", "tower": 3, "beds": 3, "baths": 2, "sqm": 86, "sqft": 926}, {"name": "D1-1", "tower": 3, "beds": 3, "baths": 2, "sqm": 100, "sqft": 1076}];
const grid=document.getElementById('units');
const viewer=document.getElementById('viewer');
function enquiryLink(u){
 return "https://wa.me/60128820919?text=" + encodeURIComponent(`你好 Wee Nun，我想了解海湾公寓 Tower ${u.tower} 的 Type ${u.name}（${u.sqft} sqft / ${u.sqm} sq.m.）。请发我这个户型的价钱、配套和可售单位，谢谢！`);
}
function render(filter=0){
 const shown=units.filter(u=>!filter||u.beds===filter);
 document.getElementById('count').textContent=`展示 ${shown.length} 种精选标准户型 · 可售状态请咨询`;
 grid.innerHTML=shown.map(u=>`<article class="unit"><button class="planbtn" data-plan="${u.name}" aria-label="放大 Type ${u.name} 平面图"><img src="assets/${u.name}.webp" alt="Type ${u.name} 户型图" loading="lazy"><span class="zoom">放大查看</span></button><div class="unitbody"><div class="unitline"><h3>Type ${u.name}</h3><span>TOWER ${u.tower}</span></div>${["A2","A5","A6"].includes(u.name)?'<div class="furnished">Fully Furnished · 全套家私</div>':''}<p>${u.beds===3?'两房＋书房':u.beds===2?'两房':'一房'} · ${u.baths} 浴室</p><div class="size">${u.sqft.toLocaleString()} <small>sqft / ${u.sqm} sq.m.</small></div><a class="unitcta" href="${enquiryLink(u)}" target="_blank" rel="noopener">WhatsApp 查询 Type ${u.name}</a></div></article>`).join('');
}
render();
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('active',x===b);x.setAttribute('aria-pressed',String(x===b))});render(Number(b.dataset.filter))}));
grid.addEventListener('click',e=>{const b=e.target.closest('[data-plan]');if(!b)return;const name=b.dataset.plan;document.getElementById('viewtitle').textContent='Type '+name;const img=document.getElementById('viewimg');img.src='assets/'+name+'.webp';img.alt='Type '+name+' 平面图';viewer.showModal()});
document.getElementById('close').addEventListener('click',()=>viewer.close());viewer.addEventListener('click',e=>{if(e.target===viewer){const r=viewer.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)viewer.close()}});

const seaVideo=document.getElementById('sea-video');
document.getElementById('video-quality').addEventListener('change',e=>{
 const t=seaVideo.currentTime||0;const resume=!seaVideo.paused;
 seaVideo.pause();seaVideo.src=e.target.value==='4k'?'assets/seaview-v2-4k.mp4':'assets/seaview-v2-hd.mp4';
 seaVideo.addEventListener('loadedmetadata',()=>{seaVideo.currentTime=Math.min(t,seaVideo.duration||t);if(resume)seaVideo.play().catch(()=>{});},{once:true});seaVideo.load();
});
