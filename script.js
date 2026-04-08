document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".slide");
    const indContainer = document.getElementById("indicators");
    let index = 0;
    let isScrolling = false;

    // Inicializa fundos
    slides.forEach(slide => {
        const url = slide.getAttribute("data-bg");
        slide.style.backgroundImage = `linear-gradient(to right, rgba(15,23,42,0.9), rgba(15,23,42,0.3)), url('${url}')`;
    });

    // Cria pontos laterais
    slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.className = "indicator";
        dot.onclick = () => changeSlide(i);
        indContainer.appendChild(dot);
    });

    window.changeSlide = function(newIndex) {
        index = (newIndex + slides.length) % slides.length;
        slides.forEach(s => s.classList.remove("active"));
        document.querySelectorAll(".indicator").forEach(d => d.classList.remove("active"));
        
        slides[index].classList.add("active");
        document.querySelectorAll(".indicator")[index].classList.add("active");
    }

    changeSlide(0);

    // Splash
    document.getElementById("splash").onclick = function() {
        this.style.opacity = "0";
        setTimeout(() => this.style.display = "none", 800);
    }

    // Scroll de mouse
    window.addEventListener("wheel", (e) => {
        if (isScrolling) return;
        isScrolling = true;
        changeSlide(e.deltaY > 0 ? index + 1 : index - 1);
        setTimeout(() => isScrolling = false, 1000);
    }, { passive: true });

    document.getElementById("logoNav").onclick = () => changeSlide(0);
});
