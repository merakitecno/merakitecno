document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const splash = document.getElementById("splash");
  const whatsButton = document.getElementById("whatsButton");
  const indicatorsContainer = document.getElementById("indicators");
  
  let index = 0;
  let auto = false;
  let isScrolling = false;

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

  // Indicadores MERAKI
  const pattern = ["", "", "M", "E", "R", "A", "K", "I", "", ""];
  const indicators = [];

  pattern.forEach((char, i) => {
    const dot = document.createElement("div");
    dot.className = char === "" ? "indicator-default" : "indicator";
    if (char !== "") dot.textContent = char;
    dot.addEventListener("click", () => { auto = false; changeSlide(i); });
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

  changeSlide(0);

  // Autoplay
  setInterval(() => { if (auto && !document.hidden) changeSlide(index + 1); }, 6000);

  // Scroll Mouse
  window.addEventListener("wheel", (e) => {
    if (isScrolling) return;
    auto = false; isScrolling = true;
    changeSlide(e.deltaY > 0 ? index + 1 : index - 1);
    setTimeout(() => { isScrolling = false; }, 800);
  }, { passive: true });

  // Touch Mobile
  let touchStartY = 0;
  window.addEventListener("touchstart", (e) => { touchStartY = e.changedTouches[0].screenY; }, { passive: true });
  window.addEventListener("touchend", (e) => {
    let diff = touchStartY - e.changedTouches[0].screenY;
    if (Math.abs(diff) > 50) { auto = false; changeSlide(diff > 0 ? index + 1 : index - 1); }
  }, { passive: true });

  document.getElementById("logoNav").addEventListener("click", () => { auto = false; changeSlide(0); });
});
