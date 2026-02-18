// SPLASH SCREEN
const splash = document.getElementById("splash");

splash.addEventListener("click", () => {
  splash.style.opacity = "0";
  setTimeout(() => {
    splash.style.display = "none";
    auto = true; // ativa o automático só depois da splash
  }, 600);
});
// MOSTRAR BOTÃO DO WHATSAPP APÓS A SPLASH
const whatsButton = document.getElementById("whatsButton");

splash.addEventListener("click", () => {
  splash.style.opacity = "0";
  setTimeout(() => {
    splash.style.display = "none";
    auto = true;

    // Exibe o botão
    whatsButton.style.opacity = "1";
    whatsButton.style.pointerEvents = "auto";

  }, 600);
});

// --- SLIDES ---
const slides = document.querySelectorAll(".slide");
let index = 0;
let auto = true;

// --- CRIAÇÃO DOS INDICADORES ---
const indicatorsContainer = document.getElementById("indicators");

slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("indicator");
  dot.addEventListener("click", () => {
    auto = false;
    index = i;
    showSlide(index);
    updateIndicators();
  });
  indicatorsContainer.appendChild(dot);
});

function updateIndicators(){
  const dots = document.querySelectorAll(".indicator");
  dots.forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
}

// --- MOSTRAR SLIDE ---
function showSlide(i){
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
  updateIndicators();
}

showSlide(index);

// --- AUTOMÁTICO ---
function nextSlide(){
  if(!auto) return;
  index = (index + 1) % slides.length;
  showSlide(index);
}

setInterval(nextSlide, 6000);

// --- SCROLL ---
let scrollTimeout;

window.addEventListener("wheel", (event) => {
  auto = false;
  clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    if (event.deltaY > 0) {
      index = (index + 1) % slides.length;
    } else {
      index = (index - 1 + slides.length) % slides.length;
    }
    showSlide(index);
  }, 80);
});

// --- SPLASH SCREEN ---
const splash = document.getElementById("splash");

splash.addEventListener("click", () => {
  splash.style.opacity = "0";
  setTimeout(() => {
    splash.style.display = "none";
    auto = true;
  }, 600);
});
