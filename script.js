// Language toggle: EN <-> JA
// Elements should wrap text in <span data-en>...</span><span data-jp>...</span>
(function () {
  function setLang(lang) {
    document.documentElement.setAttribute('lang', lang);
    const btn = document.getElementById('langToggle');
    if (btn) btn.textContent = lang === 'ja' ? 'EN' : '日本語';
  }

  function toggleLang() {
    const current = document.documentElement.getAttribute('lang') === 'ja' ? 'ja' : 'en';
    setLang(current === 'ja' ? 'en' : 'ja');
  }

  document.addEventListener('DOMContentLoaded', function () {
    setLang('en');
    const btn = document.getElementById('langToggle');
    if (btn) btn.addEventListener('click', toggleLang);

    // mark active nav link
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a[href]').forEach(function (a) {
      if (a.getAttribute('href') === path) a.classList.add('active');
    });
  });
})();
