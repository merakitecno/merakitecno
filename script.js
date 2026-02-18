// =========================
// SPLASH SCREEN
// =========================
const splash = document.getElementById("splash");
const whatsButton = document.getElementById("whatsButton");

let auto = false; // só ativa depois da splash

splash.addEventListener("click", () => {
  splash.style.opacity = "0";

  setTimeout(() => {
    splash.style.display = "none";
    auto = true;

    // Exibe o botão do WhatsApp
    whatsButton.style.opacity = "1";
    whatsButton.style.pointerEvents = "auto";

  }, 600);
});

// =========================
// SLIDES
// =========================
const slides = document.querySelectorAll(".slide");
let index = 0;

function showSlide(i){
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
  updateIndicators();
}

showSlide(index);

// =========================
// INDICADORES (BOLINHAS)
// =========================
const indicatorsContainer = document.getElementById("indicators");

slides.forEach((_, i) => {
  const dot = document.createElement("div");
  dot.classList.add("indicator");

  dot.addEventListener("click", () => {
    auto = false;
    index = i;
    showSlide(index);
  });

  indicatorsContainer.appendChild(dot);
});

function updateIndicators(){
  const dots = document.querySelectorAll(".indicator");
  dots.forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });
}

// =========================
// AUTOMÁTICO
// =========================
function nextSlide(){
  if(!auto) return;
  index = (index + 1) % slides.length;
  showSlide(index);
}

setInterval(nextSlide, 6000);

// =========================
// SCROLL
// =========================
let scrollTimeout;

window.addEventListener("wheel", (event
