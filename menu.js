// Shared menu behaviour — included on every sub-page
(function() {
  function toggleMenu() {
    const overlay = document.getElementById("menuOverlay");
    const icon    = document.getElementById("menuIcon");
    const back    = document.getElementById("backArrow");
    overlay.classList.toggle("open");
    icon.textContent = overlay.classList.contains("open") ? "" : "☰";
  }
  window.toggleMenu = toggleMenu;

  document.addEventListener("DOMContentLoaded", function() {
    const links     = document.querySelectorAll('.menu-link');
    const leftPanel = document.getElementById('menuLeft');

    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const img = link.getAttribute('data-img');
        if (img) leftPanel.style.backgroundImage = `url('${img}')`;
      });
      link.addEventListener('click', e => {
        const href = link.getAttribute('href');
        if (!href || href === '#') e.preventDefault();
      });
    });

    // Hide/show back arrow & menu icon on scroll
    let lastScroll = 0;
    const menuIcon  = document.getElementById("menuIcon");
    const backArrow = document.getElementById("backArrow");
    window.addEventListener("scroll", () => {
      const cur = window.scrollY;
      const hide = cur > lastScroll;
      if (menuIcon)  { menuIcon.style.top  = hide ? "-60px" : "20px"; menuIcon.style.opacity  = hide ? "0" : "1"; }
      if (backArrow) { backArrow.style.top  = hide ? "-60px" : "20px"; backArrow.style.opacity  = hide ? "0" : "1"; }
      lastScroll = Math.max(cur, 0);
    });
  });
})();
