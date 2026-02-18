// SPLASH SCREEN
const splash = document.getElementById("splash");

splash.addEventListener("click", () => {
  splash.style.opacity = "0";
  setTimeout(() => splash.style.display = "none", 600);
});

const slides = document.querySelectorAll(".slide");
let index = 0;
let auto = true;

function showSlide(i){
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
}

showSlide(index);

function nextSlide(){
  if(!auto) return;
  index = (index + 1) % slides.length;
  showSlide(index);
}

setInterval(nextSlide, 6000);

["wheel","touchstart","keydown","mousedown"].forEach(evt=>{
  window.addEventListener(evt,()=>auto=false,{once:true});
});

document.getElementById("logoNav").addEventListener("click",()=>{
  index = 0;
  auto = true;
  showSlide(0);
});
