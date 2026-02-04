/**
 * Feature flags: switch each section between React (/New/...) and legacy (.aspx / .html).
 * Set to true to use the new React page, false to use the legacy page.
 * Deploy this file to change behaviour without rebuilding the React app.
 */
(function () {
  window.REACT_BASE = '/New';
  window.FEATURE_FLAGS = {
    home: true,
    acharya: true,
    divyajanani: true,
    books: true,
    magazine: true,
    speechesVideos: true,
    photos: true,
    contact: true,
    calendar: true
  };
})();
