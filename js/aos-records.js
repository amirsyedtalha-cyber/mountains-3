document.addEventListener("DOMContentLoaded", () => {
  if (window.AOS) {
    window.AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
      offset: 80
    });
  }
});
