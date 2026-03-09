document.addEventListener("DOMContentLoaded", () => {

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

  slides.forEach(slide => {
    let bg = slide.getAttribute("data-bg");

    if (bg) {
      if (!bg.includes("?")) {
        bg += "?auto=format&fit=crop&w=1920&q=80";
      }
      slide.style.backgroundImage = `url('${bg}')`;
    }
  });


// =========================
// INDICADORES: 2 vazios + MERAKI + 2 vazios
// =========================
const indicatorsContainer = document.getElementById("indicators");
const pattern = ["", "", "M", "E", "R", "A", "K", "I", "", ""];
const indicators = [];

pattern.forEach((char, i) => {
  const dot = document.createElement("div");

  if (char === "") {
    dot.classList.add("indicator-default");
  } else {
    dot.classList.add("indicator");
    dot.textContent = char;
  }

  indicators.push(dot);

  dot.addEventListener("click", () => {
    auto = false;
    index = i;
    showSlide(index);
  });

  indicatorsContainer.appendChild(dot);
});



  function updateIndicators() {
    indicators.forEach((dot, i) => {
      dot.classList.remove("active");
      if (i === index) dot.classList.add("active");
    });
  }


  // =========================
  // FUNÇÃO PRINCIPAL DE SLIDE
  // =========================
  function showSlide(i) {
    slides.forEach(s => s.classList.remove("active"));
    slides[i].classList.add("active");
    updateIndicators();
  }

  // Agora sim: chamamos depois que indicators existe
  showSlide(index);


  // =========================
  // AUTOPLAY
  // =========================
  function nextSlide() {
    if (!auto) return;
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
  // LOGO NAVBAR
  // =========================
  document.getElementById("logoNav").addEventListener("click", () => {
    auto = false;
    index = 0;
    showSlide(0);
  });


  // =========================
  // LINK DIRETO
  // =========================
  window.goToSlide = function(n) {
    auto = false;
    index = n;
    showSlide(index);
  };

});
