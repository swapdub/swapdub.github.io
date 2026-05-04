// Analytics loader: injects Umami and Google Analytics (gtag)
(function () {
  'use strict';

  // Umami
  try {
    const UMAMI_ID = '89da9a10-a1c1-474a-9357-9c749c8687df';
    const umamiSelector = 'script[src^="https://umami.swapdub.com/script.js"][data-website-id="' + UMAMI_ID + '"]';
    if (!document.querySelector(umamiSelector)) {
      const s = document.createElement('script');
      s.defer = true;
      s.src = 'https://umami.swapdub.com/script.js';
      s.setAttribute('data-website-id', UMAMI_ID);
      document.head.appendChild(s);

      const r = document.createElement('script');
      r.defer = true;
      r.src = 'https://umami.swapdub.com/recorder.js';
      r.setAttribute('data-website-id', UMAMI_ID);
      r.setAttribute('data-sample-rate', '0.15');
      r.setAttribute('data-mask-level', 'moderate');
      r.setAttribute('data-max-duration', '300000');
      document.head.appendChild(r);
    }
  } catch (e) {
    console.error('analytics: Umami load failed', e);
  }

  // Google Analytics (gtag)
  try {
    const GA_ID = 'G-CV7J12V13X';
    const existingGAScript = document.querySelector('script[src*="gtag/js?id=' + GA_ID + '"]');
    if (!existingGAScript) {
      const ga = document.createElement('script');
      ga.async = true;
      ga.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
      document.head.appendChild(ga);
      ga.addEventListener('load', function () {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        window.gtag = window.gtag || gtag;
        gtag('js', new Date());
        gtag('config', GA_ID);
      });
    } else {
      if (!window.dataLayer) {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        window.gtag = window.gtag || gtag;
        window.gtag('js', new Date());
        window.gtag('config', GA_ID);
      }
    }
  } catch (e) {
    console.error('analytics: GA load failed', e);
  }
})();
