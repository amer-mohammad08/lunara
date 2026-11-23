const getLang=()=>localStorage.getItem("lunara-lang")||"ar";
let currentLang=getLang();
const t=(key)=>TRANSLATIONS[currentLang]?.[key]||TRANSLATIONS.ar[key]||key;
const localized=(obj)=>obj?.[currentLang]||obj?.ar||"";
function applyTranslations(){
 document.documentElement.lang=currentLang;document.documentElement.dir=currentLang==="ar"?"rtl":"ltr";
 document.querySelectorAll("[data-i18n]").forEach(el=>{const key=el.dataset.i18n;if(t(key))el.innerHTML=t(key)});
}
function header(){const active=location.pathname.split("/").pop()||"index.html";return `<header class="site-header"><div class="container nav-wrap"><a class="brand" href="index.html"><span class="brand-symbol">L</span><span class="brand-name">LUNARA<small>CARE IN EVERY DETAIL</small></span></a><button class="menu-toggle" aria-label="Menu" aria-expanded="false">☰</button><nav class="main-nav"><a class="${active==="index.html"?"active":""}" href="index.html" data-i18n="navHome">الرئيسية</a><a class="${active==="about.html"?"active":""}" href="about.html" data-i18n="navAbout">من نحن</a><a class="${active.includes("product")?"active":""}" href="products.html" data-i18n="navProducts">منتجاتنا</a><a class="${active==="contact.html"?"active":""}" href="contact.html" data-i18n="navContact">تواصل معنا</a></nav><button class="lang-switch" id="lang-switch"><span>◎</span> ${currentLang==="ar"?"TR":"عربي"}</button></div></header>`}
function footer(){return `<footer class="site-footer"><div class="container footer-main"><div class="footer-brand"><a class="brand brand-light" href="index.html"><span class="brand-symbol">L</span><span class="brand-name">LUNARA<small>CARE IN EVERY DETAIL</small></span></a><p data-i18n="footerText">${t("footerText")}</p></div><div><h4 data-i18n="footerExplore">${t("footerExplore")}</h4><a href="about.html" data-i18n="navAbout">${t("navAbout")}</a><a href="products.html" data-i18n="navProducts">${t("navProducts")}</a></div><div><h4 data-i18n="footerContact">${t("footerContact")}</h4><a href="contact.html" data-i18n="navContact">${t("navContact")}</a><span>İstanbul, Türkiye</span><span data-i18n="emailLabel">البريد الإلكتروني</span></div></div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} LUNARA</span><span data-i18n="rights">${t("rights")}</span><span>ISTANBUL · TÜRKİYE</span></div></footer>`}
document.getElementById("site-header").innerHTML=header();document.getElementById("site-footer").innerHTML=footer();
function refresh(){applyTranslations();document.getElementById("site-header").innerHTML=header();document.getElementById("site-footer").innerHTML=footer();wireHeader();renderPage();}
function wireHeader(){document.getElementById("lang-switch")?.addEventListener("click",()=>{currentLang=currentLang==="ar"?"tr":"ar";localStorage.setItem("lunara-lang",currentLang);refresh()});const toggle=document.querySelector(".menu-toggle");toggle?.addEventListener("click",()=>{const nav=document.querySelector(".main-nav");nav.classList.toggle("open");toggle.setAttribute("aria-expanded",nav.classList.contains("open"))})}
function productCard(p){return `<article class="product-card"><a class="product-photo" href="product-details.html?id=${p.id}"><img src="${p.image}" alt="${localized(p.name)}" loading="lazy"><span class="photo-arrow">↗</span></a><div class="product-meta"><span>${t(p.category==="laundry"?"categoryLaundry":p.category==="kitchen"?"categoryKitchen":"categoryHome")}</span><span>0${PRODUCTS.indexOf(p)+1}</span></div><h3><a href="product-details.html?id=${p.id}">${localized(p.name)}</a></h3><p>${localized(p.desc)}</p><a class="under-link" href="product-details.html?id=${p.id}">${t("viewDetails")} <span>↗</span></a></article>`}
function renderFeatured(){const el=document.getElementById("featured-products");if(el)el.innerHTML=PRODUCTS.slice(0,3).map(productCard).join("")}
function renderCatalog(){const grid=document.getElementById("all-products");if(!grid)return;let filter="all";const filters=[["all","filterAll"],["laundry","filterLaundry"],["kitchen","filterKitchen"],["home","filterHome"]];const tabs=document.getElementById("category-filters");function draw(){const list=PRODUCTS.filter(p=>filter==="all"||p.category===filter);grid.innerHTML=list.length?list.map(productCard).join(""):`<p>${t("emptyProducts")}</p>`;document.getElementById("result-count").textContent=`${list.length} / ${PRODUCTS.length}`;tabs.innerHTML=filters.map(([id,key])=>`<button class="filter-btn ${filter===id?"selected":""}" data-filter="${id}">${t(key)}</button>`).join("");tabs.querySelectorAll("button").forEach(b=>b.addEventListener("click",()=>{filter=b.dataset.filter;draw()}))}draw()}
function renderDetail(){const el=document.getElementById("product-detail");if(!el)return;const id=new URLSearchParams(location.search).get("id");const p=PRODUCTS.find(x=>x.id===id);if(!p){el.innerHTML=`<div class="not-found">${t("productNotFound")} <a href="products.html">${t("backProducts")}</a></div>`;return}el.innerHTML=`<a class="back-link" href="products.html">← ${t("backProducts")}</a><div class="detail-grid"><div class="detail-image"><img src="${p.image}" alt="${localized(p.name)}"></div><div class="detail-copy"><span class="eyebrow">${t("detailLabel")}</span><h1>${localized(p.name)}</h1><p class="detail-lead">${localized(p.desc)}</p><p>${localized(p.detail)}</p><div class="size-box"><small>${t("productSizes")}</small><strong>${p.size}</strong></div><p class="form-note">${t("productNote")}</p><a class="btn btn-primary" href="contact.html">${t("contactUs")} ↗</a></div></div>`}
function renderPage(){renderFeatured();renderCatalog();renderDetail()}
wireHeader();refresh();

const CONTACT_EMAIL="luunara1.sy@gmail.com";
document.getElementById("contact-form")?.addEventListener("submit",async e=>{
 e.preventDefault();
 const form=e.currentTarget, status=document.getElementById("form-status"), button=form.querySelector('button[type="submit"]');
 if(CONTACT_EMAIL==="YOUR_EMAIL_HERE" || !CONTACT_EMAIL.includes("@")){
   status.textContent=currentLang==="ar"?"أضف بريد الشركة في إعدادات النموذج أولاً حتى تصلك الرسائل.":"Önce şirket e-posta adresini form ayarlarına ekleyin.";
   status.className="form-status error"; return;
 }
 const original=button.innerHTML; button.disabled=true; button.innerHTML=currentLang==="ar"?"جارٍ الإرسال…":"Gönderiliyor…";
 try{
   const payload=Object.fromEntries(new FormData(form).entries());
   payload._subject=`LUNARA Website — ${payload.subject}`;
   payload._template="table"; payload._captcha="false";
   const response=await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`,{
     method:"POST",headers:{"Content-Type":"application/json","Accept":"application/json"},body:JSON.stringify(payload)
   });
   const result=await response.json();
   if(!response.ok || result.success===false) throw new Error(result.message||"Send failed");
   status.textContent=currentLang==="ar"?"تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.":"Mesajınız başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.";
   status.className="form-status success"; form.reset();
 }catch(err){
   status.textContent=currentLang==="ar"?"تعذّر إرسال الرسالة حالياً. تحقق من الاتصال وحاول مرة أخرى.":"Mesaj şu anda gönderilemedi. Bağlantınızı kontrol edip tekrar deneyin.";
   status.className="form-status error";
 }finally{button.disabled=false;button.innerHTML=original;}
});

function initMotion(){
 const targets=document.querySelectorAll(".section-pad,.product-card,.mission-grid article,.contact-info,.contact-form,.page-hero,.cta-inner");
 targets.forEach((el,i)=>{el.classList.add("reveal");el.style.setProperty("--reveal-delay",`${(i%4)*90}ms`)});
 if(!("IntersectionObserver" in window)){targets.forEach(el=>el.classList.add("is-visible"));return}
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
   if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}
 }),{threshold:.12});
 targets.forEach(el=>observer.observe(el));
}
initMotion();

