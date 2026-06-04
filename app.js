const sections = {
  practice: {
    name: "Practice",
    icon: "P",
    complete: 50,
    ready: "5/23",
    total: "215 min total",
    leftTime: "~211 min left",
    detail: "Locations, departments, providers",
    left: 18,
    estimate: "~3hr 31m",
    counts: { done: 5, confirm: 9, pending: 9 },
  },
  patient: {
    name: "Patient",
    icon: "P",
    complete: 23,
    ready: "2/11",
    total: "121 min total",
    leftTime: "~119 min left",
    detail: "Names, messaging, portal",
    left: 9,
    estimate: "~1hr 59m",
    counts: { done: 2, confirm: 4, pending: 5 },
  },
  financial: {
    name: "Financial",
    icon: "F",
    complete: 23,
    ready: "2/16",
    total: "166 min total",
    leftTime: "~164 min left",
    detail: "Billing, claims, payer enrollment",
    left: 14,
    estimate: "~2hr 44m",
    counts: { done: 3, confirm: 6, pending: 7 },
  },
  clinical: {
    name: "Clinical",
    icon: "C",
    complete: 44,
    ready: "3/11",
    total: "105 min total",
    leftTime: "~103 min left",
    detail: "Specialties, records, quality programs",
    left: 8,
    estimate: "~1hr 43m",
    counts: { done: 4, confirm: 2, pending: 5 },
  },
};

const pathOrder = ["practice", "patient", "financial", "clinical"];

function setRoute(route) {
  window.location.hash = route === "overview" ? "" : route;
}

function getRoute() {
  const hash = window.location.hash.replace("#", "");
  return sections[hash] ? hash : "overview";
}

function topbar(crumb = "/ Overview", compact = false) {
  return `
    <header class="topbar ${compact ? "compact" : ""}">
      <div class="brand-row">
        ${compact ? `<button class="menu-button" data-route="overview" aria-label="Back to overview">[]</button>` : ""}
        <span class="app-logo">a</span>
        <span class="brand">athenaLaunch</span>
        <span class="crumb">${crumb}</span>
      </div>
      <div class="nav-row">
        <button class="top-button active" data-route="overview">Overview</button>
        <span class="ready">33% ready</span>
        <span class="avatar">SR</span>
      </div>
    </header>
  `;
}

function segmentedBar() {
  return `
    <div class="segmented-bar">
      <div class="segment confirmed"></div>
      <div class="segment prefilled"></div>
      <div class="segment needs"></div>
    </div>
  `;
}

function legend() {
  return `
    <div class="legend">
      <span class="legend-item"><span class="dot confirmed"></span>Confirmed</span>
      <span class="legend-item"><span class="dot prefilled"></span>AI pre-filled</span>
      <span class="legend-item"><span class="dot needs"></span>Needs input</span>
    </div>
  `;
}

function simpleBar(percent) {
  return `<div class="simple-bar"><div class="simple-fill" style="width: ${percent}%"></div></div>`;
}

function askBar() {
  return `
    <div class="ask-bar">
      <span class="assistant-dot">*</span>
      <span>Ask anything...</span>
      <button class="send-button" aria-label="Send">^</button>
    </div>
  `;
}

function overview() {
  const pathCards = pathOrder.map((key, index) => {
    const section = sections[key];
    return `
      <button class="path-card ${index === 0 ? "active" : ""}" data-route="${key}">
        <div class="path-top">
          <span class="section-icon">${section.icon}</span>
          <span class="path-percent">${section.complete}%</span>
        </div>
        <div class="path-name">${section.name}</div>
        <div class="path-detail">${section.detail}</div>
        ${simpleBar(section.complete)}
      </button>
    `;
  }).join("");

  return `
    <div class="app-shell overview-view">
      ${topbar()}
      <div class="top-progress"></div>
      <main class="overview-content">
        <section class="hero-row">
          <div class="intro">
            <span class="spark-icon">*</span>
            <div>
              <p class="eyebrow">Olive / Launch Guide</p>
              <h1 class="hero-title">Good afternoon, Dr. Richardson.</h1>
              <p class="hero-copy">I prepared the next launch moves and the risks to clear first.</p>
            </div>
          </div>
          <aside class="progress-card">
            <div class="progress-head">
              <span class="big-number">72%</span>
              <div>
                <p class="progress-title">OVERALL PROGRESS</p>
                <span class="progress-subtitle">~15m remaining</span>
              </div>
            </div>
            ${segmentedBar()}
            ${legend()}
          </aside>
        </section>

        <section class="metrics">
          <article class="metric-card"><span class="dot confirmed"></span><div class="metric-value">45%</div><div class="metric-label">Confirmed</div></article>
          <article class="metric-card"><span class="dot prefilled"></span><div class="metric-value">18%</div><div class="metric-label">AI pre-filled</div></article>
          <article class="metric-card"><span class="dot" style="background: var(--blue-700)"></span><div class="metric-value">10</div><div class="metric-label">Open tasks</div></article>
          <article class="metric-card"><span class="dot warning"></span><div class="metric-value">3</div><div class="metric-label">Blockers</div></article>
        </section>

        <section class="middle-grid">
          <div>
            <p class="section-label">Continue where you left off</p>
            <article class="resume-card">
              <div class="resume-head">
                <span class="small-tile">P</span>
                <div><h2 class="resume-title">Resume Practice Setup</h2><span class="resume-time">Last active 2 hours ago</span></div>
                <span class="badge">+10%</span>
              </div>
              <div class="completion">50% complete</div>
              ${simpleBar(50)}
            </article>
          </div>
          <div>
            <p class="section-label">Top priorities</p>
            <article class="priority-list">
              <div class="priority-item">Submit your W-9 form.<span class="badge">+10%</span></div>
              <div class="priority-item">Upload legal name and address<span class="badge">+5%</span></div>
              <div class="priority-item">Provide Medicare Welcome Letter<span class="badge">+10%</span></div>
            </article>
          </div>
        </section>

        <div class="divider"></div>
        <h2 class="path-header">Pick your launch path</h2>
        <section class="path-grid">${pathCards}</section>
      </main>
      ${askBar()}
    </div>
  `;
}

function sideStatuses(section) {
  return `
    <div class="side-status-list">
      <div class="side-status"><span class="dot prefilled"></span><span>Pre-Filled</span><strong>${section.counts.done}/15</strong></div>
      <div class="side-status"><span class="dot warning"></span><span>Review & Confirm</span><strong>04/18</strong></div>
      <div class="side-status"><span class="dot danger"></span><span>Pending</span><strong>10/18</strong></div>
    </div>
  `;
}

function sidebar(activeKey) {
  const items = pathOrder.map((key) => {
    const section = sections[key];
    const active = key === activeKey;
    return `
      <section class="side-section ${active ? "active" : ""}">
        <div class="side-main-row">
          <span class="chev">${active ? "v" : ">"}</span>
          <span>${section.icon}</span>
          <span>${section.name}</span>
          <strong>${section.ready}</strong>
          <span class="side-progress">${section.complete}%</span>
        </div>
        <div class="side-meta"><span>${section.total}</span><span>${section.leftTime}</span></div>
        <div class="side-bar"><div class="side-fill" style="width: ${section.complete}%"></div></div>
        ${active ? sideStatuses(section) : ""}
      </section>
    `;
  }).join("");

  return `
    <aside class="sidebar">
      <div class="sidebar-inner">${items}<div class="review-live"><span>=</span><span>Review & Go-Live</span></div></div>
      <div class="forge">Forge v21.7 / athenahealth</div>
    </aside>
  `;
}

function task(tone, title, subtitle, count) {
  const dot = tone === "success" ? "prefilled" : title.startsWith("Review") ? "warning" : "danger";
  return `
    <article class="task-row ${tone}">
      <span class="dot ${dot}"></span>
      <div class="task-copy"><div class="task-title">${title}</div><div class="task-subtitle">${subtitle}</div></div>
      <span class="count-pill">${count}</span><span class="task-chevron">^</span>
    </article>
  `;
}

function detail(key) {
  const section = sections[key];
  return `
    <div class="app-shell detail-view">
      ${topbar(`/ ${section.name}`, true)}
      <div class="detail-layout">
        ${sidebar(key)}
        <main class="detail-main">
          <section class="detail-summary">
            <div>
              <div class="detail-stat"><span class="big-number">${section.complete}%</span><span class="stat-label">Overall progress</span></div>
              ${segmentedBar()}
              ${legend()}
            </div>
            <div class="detail-stat"><span class="big-number">${section.left}</span><span class="stat-label">Left</span></div>
            <div class="detail-stat"><span class="big-number">${section.estimate}</span><span class="stat-label">Est. time</span></div>
          </section>
          <h1 class="detail-section-title">${section.name}</h1>
          <section class="task-stack">
            ${task("success", "Pre-Filled", `${section.counts.done} completed`, section.counts.done)}
            ${task("", "Review & confirm", `${section.counts.confirm} to confirm`, section.counts.confirm)}
            ${task("", "Pending input", `${section.counts.pending} to add`, section.counts.pending)}
          </section>
          <div class="detail-actions"><span class="skip">Skip this section</span><button class="continue-button">Continue -></button></div>
        </main>
      </div>
      ${askBar()}
    </div>
  `;
}

function render() {
  const route = getRoute();
  const app = document.querySelector("#app");
  app.innerHTML = route === "overview" ? overview() : detail(route);
  app.querySelectorAll("[data-route]").forEach((element) => {
    element.addEventListener("click", () => setRoute(element.dataset.route));
  });
}

window.addEventListener("hashchange", render);
render();
