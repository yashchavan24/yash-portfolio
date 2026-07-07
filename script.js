// Language toggle (EN <-> JA) with persistence + mobile nav menu.
// Text is wrapped in <span data-en>...</span><span data-jp>...</span>.
(function () {
  var STORAGE_KEY = 'portfolio-lang';

  function setLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    var btn = document.getElementById('langToggle');
    if (btn) btn.textContent = lang === 'ja' ? 'EN' : '日本語';
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function toggleLang() {
    var current = document.documentElement.getAttribute('lang') === 'ja' ? 'ja' : 'en';
    setLang(current === 'ja' ? 'en' : 'ja');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var saved = 'en';
    try { saved = localStorage.getItem(STORAGE_KEY) || 'en'; } catch (e) {}
    setLang(saved === 'ja' ? 'ja' : 'en');

    var langBtn = document.getElementById('langToggle');
    if (langBtn) langBtn.addEventListener('click', toggleLang);

    // Mobile navigation toggle
    var navToggle = document.getElementById('navToggle');
    var pageLinks = document.getElementById('pageLinks');
    if (navToggle && pageLinks) {
      navToggle.addEventListener('click', function () {
        var open = pageLinks.classList.toggle('open');
        navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      // Close menu after choosing a destination
      pageLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          pageLinks.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Mark the active nav link
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a[href]').forEach(function (a) {
      if (a.getAttribute('href') === path) a.classList.add('active');
    });
  });
})();
