document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const splash = document.getElementById("splash");
  const whatsButton = document.getElementById("whatsButton");
  const indicatorsContainer = document.getElementById("indicators");
  
  let index = 0;
  let auto = false;
  let isScrolling = false;

  // FUNÇÃO PARA CARREGAR IMAGENS DE FUNDO
  function initBackgrounds() {
    slides.forEach(slide => {
      const bgUrl = slide.getAttribute("data-bg");
      if (bgUrl) {
        // Aplica o fundo com um gradiente escuro para garantir leitura do texto
        slide.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('${bgUrl}')`;
      }
    });
  }

  // Inicializa fundos imediatamente
  initBackgrounds();

  // Splash Screen
  splash.addEventListener("click", () => {
    splash.style.opacity = "0";
    setTimeout(() => {
      splash.style.display = "none";
      auto = true;
      whatsButton.style.opacity = "1";
      whatsButton.style.pointerEvents = "auto";
    }, 600);
  });

  // Criar Indicadores MERAKI
  const pattern = ["", "", "M", "E", "R", "A", "K", "I", "", ""];
  const indicators = [];

  pattern.forEach((char, i) => {
    const dot = document.createElement("div");
    dot.className = char === "" ? "indicator-default" : "indicator";
    if (char !== "") dot.textContent = char;
    dot.addEventListener("click", () => { 
      auto = false; 
      changeSlide(i); 
    });
    indicatorsContainer.appendChild(dot);
    indicators.push(dot);
  });

  function changeSlide(newIndex) {
    index = (newIndex + slides.length) % slides.length;
    slides.forEach(s => s.classList.remove("active"));
    indicators.forEach(d => d.classList.remove("active"));
    
    slides[index].classList.add("active");
    indicators[index].classList.add("active");
  }

  // Primeiro slide ativo
  changeSlide(0);

  // Autoplay (6 segundos)
  setInterval(() => {
    if (auto && !document.hidden) changeSlide(index + 1);
  }, 6000);

  // Navegação por Scroll (com trava de repetição)
  window.addEventListener("wheel", (e) => {
    if (isScrolling) return;
    auto = false;
    isScrolling = true;
    
    if (e.deltaY > 0) changeSlide(index + 1);
    else changeSlide(index - 1);

    setTimeout(() => { isScrolling = false; }, 800);
  }, { passive: true });

  // Navegação por Toque (Mobile)
  let touchStartY = 0;
  window.addEventListener("touchstart", (e) => {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  window.addEventListener("touchend", (e) => {
    let touchEndY = e.changedTouches[0].screenY;
    let diff = touchStartY - touchEndY;
    if (Math.abs(diff) > 50) {
      auto = false;
      changeSlide(diff > 0 ? index + 1 : index - 1);
    }
  }, { passive: true });

  // Clique no Logo volta ao início
  document.getElementById("logoNav").addEventListener("click", () => {
    auto = false;
    changeSlide(0);
  });
});
