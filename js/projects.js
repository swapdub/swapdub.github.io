/* projects.js — renders projects.json into card grid on projects.html */

const CATEGORY_ICONS = {
  'Full-Stack & DevOps':                 '🗄️',
  'Embedded & Hardware':                 '⚙️',
  'Python':                              '🐍',
  'Computer Vision & Signal Processing': '👁️',
  'Windows Scripting':                   '🖥️',
  'Web Development':                     '🌐',
  'LabVIEW':                             '📡',
};

fetch('/pages/projects.json')
  .then(r => r.json())
  .then(renderProjects);

function renderProjects(data) {
  const container = document.getElementById('projects-container');
  if (!container) return;

  let html = '';

  // ── Personal / self-devised projects ──
  html += `
    <div class="projects-band reveal">
      <h2 class="projects-band__title">Personal Projects</h2>
      <p class="projects-band__desc">Self-devised work — problems I identified and built solutions for.</p>
    </div>
  `;
  html += renderCategories(data.personal, 0);

  // ── Visual divider ──
  html += `<div class="projects-divider reveal"></div>`;

  // ── Practice / tutorial projects ──
  html += `
    <div class="projects-band reveal">
      <h2 class="projects-band__title">Learning &amp; Practice</h2>
      <p class="projects-band__desc">Course assignments and guided exercises — kept for completeness.</p>
    </div>
  `;
  html += renderCategories(data.practice, data.personal.length);

  container.innerHTML = html;

  if (window.feather) feather.replace();

  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    obs.observe(el);
  });
}

function renderCategories(categories, indexOffset) {
  return categories.map((category, i) => {
    const icon = CATEGORY_ICONS[category.title] || '📁';
    const delay = (i + indexOffset) * 40;

    const cards = category.projects.map(p => `
      <a href="${p.URL}" target="_blank" rel="noopener noreferrer"
         class="proj-card glass-card reveal"
         style="transition-delay:${delay}ms; text-decoration:none;">
        <div class="proj-card__top">
          <i data-feather="folder" style="width:14px;height:14px;color:var(--color-gold);"></i>
          <i data-feather="external-link" style="width:14px;height:14px;color:var(--color-text3);"></i>
        </div>
        <h4 class="proj-card__name">${p.Name}</h4>
        <p class="proj-card__desc">${p.Description}</p>
      </a>
    `).join('');

    return `
      <section class="proj-section" style="margin-bottom: 44px;">
        <h3 class="section-title section-title--sm reveal">
          <span style="margin-right:8px;">${icon}</span>${category.title}
        </h3>
        <div class="proj-grid">${cards}</div>
      </section>
    `;
  }).join('');
}
