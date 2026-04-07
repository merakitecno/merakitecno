document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // ESTADO GLOBAL
  // =========================
  const slides = document.querySelectorAll(".slide");
  const whatsButton = document.getElementById("whatsButton");
  const splash = document.getElementById("splash");
  const indicatorsContainer = document.getElementById("indicators");
  
  let index = 0;
  let auto = false;
  let isScrolling = false; // Trava para evitar múltiplos disparos no scroll

  // =========================
  // SPLASH & INICIALIZAÇÃO
  // =========================
  splash.addEventListener("click", () => {
    splash.style.opacity = "0";
    setTimeout(() => {
      splash.style.display = "none";
      auto = true;
      
      // Ativa o botão de contato com transição suave
      whatsButton.style.opacity = "1";
      whatsButton.style.pointerEvents = "auto";
    }, 600);
  });

  // Carregamento inteligente das imagens de fundo
  slides.forEach((slide, i) => {
    let bg = slide.getAttribute("data-bg");
    if (bg) {
      // Otimização de query para Unsplash (WebP e compressão 80)
      const optimizedBg = bg.includes("?") 
        ? bg 
        : `${bg}?auto=format,compress&q=80&w=1920`;
      
      // Pré-carrega a primeira imagem, deixa as outras para o navegador gerenciar
      if (i === 0) {
        slide.style.backgroundImage = `url('${optimizedBg}')`;
      } else {
        // Lazy load simples usando Intersection Observer ou apenas timeout
        setTimeout(() => {
          slide.style.backgroundImage = `url('${optimizedBg}')`;
        }, 1000 * i); 
      }
    }
  });

  // =========================
  // INDICADORES (M-E-R-A-K-I)
  // =========================
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

  // =========================
  // LÓGICA DE NAVEGAÇÃO
  // =========================
  function changeSlide(newIndex) {
    // Garante que o índice esteja dentro dos limites
    index = (newIndex + slides.length) % slides.length;
    
    slides.forEach(s => s.classList.remove("active"));
    indicators.forEach(d => d.classList.remove("active"));
    
    slides[index].classList.add("active");
    indicators[index].classList.add("active");
  }

  // Inicializa o primeiro slide
  changeSlide(0);

  // Autoplay com verificação de visibilidade
  setInterval(() => {
    if (auto && !document.hidden) {
      changeSlide(index + 1);
    }
  }, 6000);

  // =========================
  // CONTROLE DE MOUSE WHEEL (Debounce)
  // =========================
  window.addEventListener("wheel", (e) => {
    if (isScrolling) return;
    
    auto = false;
    isScrolling = true;

    if (e.deltaY > 0) {
      changeSlide(index + 1);
    } else {
      changeSlide(index - 1);
    }

    // Tempo de espera para o próximo scroll (evita pular 2 slides de uma vez)
    setTimeout(() => { isScrolling = false; }, 800);
  }, { passive: true });

  // =========================
  // SUPORTE A TOUCH (Mobile Swipe)
  // =========================
  let touchStartY = 0;
  window.addEventListener("touchstart", (e) => {
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  window.addEventListener("touchend", (e) => {
    let touchEndY = e.changedTouches[0].screenY;
    auto = false;
    
    if (touchStartY - touchEndY > 50) { // Deslizou para cima
      changeSlide(index + 1);
    } else if (touchEndY - touchStartY > 50) { // Deslizou para baixo
      changeSlide(index - 1);
    }
  }, { passive: true });

  // =========================
  // EXTRAS
  // =========================
  document.getElementById("logoNav").addEventListener("click", () => {
    auto = false;
    changeSlide(0);
  });

  // Global para uso em links externos ou botões
  window.goToSlide = (n) => {
    auto = false;
    changeSlide(n);
  };
});
