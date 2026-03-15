/* shared-nav.js — inject the full-page menu overlay on every sub-page */
(function () {
  const MENU_HTML = `
  <div class="menu-icon" id="menuIcon" onclick="toggleMenu()">☰</div>
  <div class="menu-overlay" id="menuOverlay">
    <div class="menu-left" id="menuLeft" style="background-image:url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800')"></div>
    <div class="menu-right">
      <div class="close-btn" onclick="toggleMenu()">✕</div>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:28px;padding-bottom:20px;border-bottom:1px solid rgba(255,255,255,0.08);">
        <img src="logo.jpg" alt="SafarSathi4U" style="height:52px;width:52px;border-radius:50%;object-fit:cover;box-shadow:0 0 0 2px rgba(201,151,58,0.45);"/>
        <div>
          <div style="font-family:'Cormorant Garamond',serif;font-size:1.3rem;color:#e8c97a;letter-spacing:0.06em;line-height:1;">SafarSathi4U</div>
          <div style="font-size:0.6rem;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-top:3px;">Udaipur · City of Lakes</div>
        </div>
      </div>
      <a href="Sarafsathi.html" class="menu-link" data-img="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800">Home</a>
      <a href="About.html"       class="menu-link" data-img="https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=800">About Us</a>
      <a href="ourservices.html" class="menu-link" data-img="https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?w=800">Services</a>
      <a href="Packages.html"    class="menu-link" data-img="https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=800">Packages</a>
      <a href="adventures.html"  class="menu-link" data-img="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800">Adventure</a>
      <a href="booking_details.html" class="menu-link" data-img="https://images.unsplash.com/photo-1548013146-72479768bada?w=800">Booking</a>
      <div class="social-icons">
        <a href="https://www.instagram.com/safarsathi4u_?igsh=MXJhamtyOWJsODB1OA==" target="_blank"><i class="fab fa-instagram"></i></a>
        <a href="https://www.facebook.com/share/1LahXfP9co/" target="_blank"><i class="fab fa-facebook-f"></i></a>
        <a href="https://wa.me/919876543210" target="_blank"><i class="fab fa-whatsapp"></i></a>
        <a href="#"><i class="fab fa-youtube"></i></a>
      </div>
      <div class="popup" id="popupMsg"></div>
    </div>
  </div>`;

  const FOOTER_HTML = `
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-column">
        <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
          <img src="logo.jpg" alt="SafarSathi4U" style="height:52px;width:52px;border-radius:50%;object-fit:cover;border:2px solid rgba(201,151,58,0.4);"/>
          <h3 style="margin-bottom:0;border-bottom:none;padding-bottom:0;">SafarSathi4U</h3>
        </div>
        <p>SafarSathi4U is your trusted travel companion in Udaipur and beyond — crafting unforgettable journeys with local expertise.</p>
      </div>
      <div class="footer-column">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="Sarafsathi.html">Home</a></li>
          <li><a href="About.html">About Us</a></li>
          <li><a href="ourservices.html">Services</a></li>
          <li><a href="adventures.html">Adventures</a></li>
          <li><a href="Packages.html">Packages</a></li>
          <li><a href="booking_details.html">Booking</a></li>
        </ul>
      </div>
      <div class="footer-column">
        <h3>Contact Us</h3>
        <p>Email: support@safarsathi4u.com</p>
        <p>Phone: +91 98765 43210</p>
        <p>Udaipur, Rajasthan, India</p>
      </div>
      <div class="footer-column">
        <h3>Follow Us</h3>
        <div class="social-icons">
          <a href="https://www.instagram.com/safarsathi4u_?igsh=MXJhamtyOWJsODB1OA==" target="_blank"><i class="fab fa-instagram"></i></a>
          <a href="https://www.facebook.com/share/1LahXfP9co/" target="_blank"><i class="fab fa-facebook-f"></i></a>
          <a href="https://wa.me/919876543210" target="_blank"><i class="fab fa-whatsapp"></i></a>
          <a href="#"><i class="fab fa-youtube"></i></a>
        </div>
      </div>
    </div>
    <div class="footer-bottom"><p>© 2025 SafarSathi4U. All Rights Reserved.</p></div>
  </footer>`;

  document.addEventListener("DOMContentLoaded", function () {
    // inject menu
    const menuDiv = document.createElement('div');
    menuDiv.innerHTML = MENU_HTML;
    document.body.prepend(menuDiv);

    // inject footer if placeholder exists
    const fp = document.getElementById('footer-placeholder');
    if (fp) { fp.outerHTML = FOOTER_HTML; }

    // wire up menu interactions
    function toggleMenu() {
      const overlay = document.getElementById("menuOverlay");
      const icon    = document.getElementById("menuIcon");
      overlay.classList.toggle("open");
      icon.textContent = overlay.classList.contains("open") ? "" : "☰";
    }
    window.toggleMenu = toggleMenu;

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
