/**
 * Applies feature flags to the legacy menu (sbHeaderMenu923.html).
 * Load this script on any page that includes the header menu via includeHTML.
 * Waits for menu links with data-flag, loads /New/feature-flags.js, then
 * sets each link's href to the React URL when the flag is true.
 */
(function () {
  var REACT_BASE_DEFAULT = '/New';

  function applyFlags() {
    var links = document.querySelectorAll('a[data-flag][data-react-path]');
    if (!links.length) return false;
    var flags = window.FEATURE_FLAGS;
    if (!flags) return true;
    var base = (window.REACT_BASE || REACT_BASE_DEFAULT).replace(/\/$/, '');
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      var flag = a.getAttribute('data-flag');
      if (flags[flag]) {
        a.href = base + a.getAttribute('data-react-path');
      } else {
        var legacyHref = a.getAttribute('data-legacy-href');
        if (legacyHref) a.href = legacyHref;
      }
    }
    return true;
  }

  function run() {
    if (applyFlags()) return;
    var attempts = 0;
    var id = setInterval(function () {
      if (applyFlags() || attempts++ > 40) clearInterval(id);
    }, 100);
  }

  function loadFlagsThenRun() {
    if (window.FEATURE_FLAGS) {
      run();
      return;
    }
    var s = document.createElement('script');
    s.src = (window.REACT_BASE || REACT_BASE_DEFAULT) + '/feature-flags.js';
    s.onload = run;
    s.onerror = run;
    document.head.appendChild(s);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadFlagsThenRun);
  } else {
    loadFlagsThenRun();
  }
})();
