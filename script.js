// =========================
// SPLASH
// =========================
const splash = document.getElementById("splash");
const whatsButton = document.getElementById("whatsButton");

let auto = false;

splash.addEventListener("click", () => {
  splash.style.opacity = "0";

  setTimeout(() => {
    splash.style.display = "none";
    auto = true;

    whatsButton.style.opacity = "1";
    whatsButton.style.pointerEvents = "auto";
    whatsButton.style.zIndex = "9000";
  }, 600);
});

// =========================
// SLIDES
// =========================
const slides = document.querySelectorAll(".slide");
let index = 0;

// aplica as imagens de fundo com base no data-bg
slides.forEach(slide => {
  let bg = slide.getAttribute("data-bg");

  if (bg) {
    if (!bg.includes("?")) {
      bg += "?auto=format&fit=crop&w=1920&q=80";
    }
    slide.style.backgroundImage = `url('${bg}')`;
  }
});

function showSlide(i){
  slides.forEach(s => s.classList.remove("active"));
  slides[i].classList.add("active");
  updateIndicators();
}

showSlide(index);

// =========================
// INDICADORES COM LETRAS + PADRÃO MERAKI
// =========================
const indicatorsContainer = document.getElementById("indicators");

// Letras do nome da empresa
const letters = ["M", "E", "R", "A", "K", "I"];

const indicators = []; // armazenar todos os marcadores

slides.forEach((_, i) => {
  const dot = document.createElement("div");

  // Se existir letra → marcador com letra
  if (i < letters.length) {
    dot.classList.add("indicator");
    dot.textContent = letters[i];
  } else {
    // Marcadores extras → pequenos e azuis
    dot.classList.add("indicator-default");
  }

  indicators.push(dot);

  dot.addEventListener("click", () => {
    auto = false;
    index = i;
    showSlide(index);
  });

  indicatorsContainer.appendChild(dot);
});

// Atualiza o estado visual dos marcadores
function updateIndicators(){
  indicators.forEach((dot, i) => {
    dot.classList.remove("active");

    if (i === index) {
      dot.classList.add("active");
    }
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

// =========================
// LOGO NAVBAR → VOLTAR AO SLIDE 0
// =========================
document.getElementById("logoNav").addEventListener("click", () => {
  auto = false;
  index = 0;
  showSlide(0);
});

// =========================
// Hiperlink direto para slide
// =========================
function goToSlide(n){
  auto = false;
  index = n;
  showSlide(index);
}
