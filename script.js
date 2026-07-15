:root {
  --background: #0f172a;
  --background-dark: #020617;
  --background-light: #111827;
  --card-background: rgba(30, 41, 59, 0.94);
  --primary: #38bdf8;
  --primary-light: #7dd3fc;
  --text-main: #e5e7eb;
  --text-bright: #f8fafc;
  --text-muted: #cbd5e1;
  --text-subtle: #94a3b8;
  --border: #334155;
  --shadow: 0 18px 38px rgba(2, 6, 23, 0.28);
  --radius-large: 18px;
  --radius-medium: 12px;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

body {
  min-height: 100vh;
  font-family:
    Arial,
    Helvetica,
    sans-serif;
  background: var(--background);
  color: var(--text-main);
  line-height: 1.65;
}

button,
input,
select,
textarea {
  font: inherit;
}

button,
a,
select,
input,
textarea {
  -webkit-tap-highlight-color: transparent;
}

a {
  color: var(--primary);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.hero {
  min-height: 100vh;
  padding: 24px 10% 90px;
  background:
    radial-gradient(
      circle at top left,
      rgba(56, 189, 248, 0.22),
      transparent 34%
    ),
    radial-gradient(
      circle at 85% 70%,
      rgba(14, 165, 233, 0.1),
      transparent 28%
    ),
    linear-gradient(
      135deg,
      #0f172a,
      #111827 55%,
      #020617
    );
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 28px;
  max-width: 1500px;
  margin: 0 auto;
  padding: 18px 0;
}

.logo {
  color: var(--text-bright);
  font-size: 1.35rem;
  font-weight: 800;
  white-space: nowrap;
}

.logo:hover {
  color: var(--primary);
  text-decoration: none;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 18px;
}

.nav-links a {
  color: var(--text-muted);
  font-size: 0.96rem;
  font-weight: 600;
}

.nav-links a:hover {
  color: var(--primary);
  text-decoration: none;
}

.mobile-menu-button {
  display: none;
  padding: 9px 14px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: transparent;
  color: var(--text-main);
  font-weight: 700;
  cursor: pointer;
}

.hero-content {
  max-width: 980px;
  margin: 0 auto;
  padding-top: 130px;
}

.eyebrow,
.section-label {
  color: var(--primary);
  font-weight: 800;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.eyebrow {
  margin-bottom: 16px;
}

.hero-content h1 {
  max-width: 950px;
  color: var(--text-bright);
  font-size: clamp(2.6rem, 6vw, 5rem);
  line-height: 1.06;
  margin-bottom: 26px;
}

.hero-description {
  max-width: 790px;
  color: var(--text-muted);
  font-size: 1.1rem;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 32px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 12px 21px;
  border: 1px solid var(--primary);
  border-radius: 999px;
  background: var(--primary);
  color: var(--background-dark);
  font-weight: 800;
  cursor: pointer;
  transition:
    transform 0.18s ease,
    background 0.18s ease,
    color 0.18s ease,
    border-color 0.18s ease,
    opacity 0.18s ease;
}

.btn:hover {
  transform: translateY(-2px);
  text-decoration: none;
}

.btn.secondary {
  background: transparent;
  color: var(--primary);
}

.btn.secondary:hover {
  background: rgba(56, 189, 248, 0.1);
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.45;
  transform: none;
}

.section {
  padding: 80px 10%;
}

.section > * {
  max-width: 1500px;
  margin-left: auto;
  margin-right: auto;
}

.alternate-section {
  background: var(--background-light);
}

.section-heading {
  margin-bottom: 28px;
}

.section-label {
  margin-bottom: 5px;
  font-size: 0.86rem;
}

.section h2 {
  color: var(--primary);
  font-size: clamp(2rem, 4vw, 2.6rem);
  line-height: 1.2;
}

.section-description {
  max-width: 940px;
  color: var(--text-muted);
  font-size: 1.04rem;
}

.card-grid {
  display: grid;
  grid-template-columns:
    repeat(auto-fit, minmax(260px, 1fr));
  gap: 22px;
}

.card {
  padding: 25px;
  border: 1px solid var(--border);
  border-radius: var(--radius-large);
  background: var(--card-background);
  box-shadow: var(--shadow);
}

.card h3 {
  margin-bottom: 11px;
  color: var(--text-bright);
  line-height: 1.3;
}

.card p,
.card li {
  color: var(--text-muted);
}

.card-detail {
  margin-top: 8px;
  color: var(--text-subtle) !important;
  font-weight: 700;
}

.project-launcher {
  max-width: 820px;
  margin-top: 30px;
  margin-left: 0;
  padding: 30px;
  border: 1px solid var(--border);
  border-radius: var(--radius-large);
  background: var(--card-background);
  box-shadow: var(--shadow);
}

.project-launcher > label {
  display: block;
  margin-bottom: 10px;
  color: var(--text-bright);
  font-weight: 800;
}

.project-launcher select {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-medium);
  background: var(--background-dark);
  color: var(--text-main);
  cursor: pointer;
}

.project-launcher select:focus {
  border-color: var(--primary);
  outline: 2px solid rgba(56, 189, 248, 0.2);
}

.project-summary {
  margin-top: 22px;
  padding: 22px;
  border: 1px solid var(--border);
  border-radius: var(--radius-medium);
  background: rgba(2, 6, 23, 0.48);
}

.project-summary h3 {
  margin-bottom: 10px;
  color: var(--text-bright);
  font-size: 1.5rem;
}

.project-summary p {
  color: var(--text-muted);
}

.project-type {
  margin-bottom: 5px;
  color: var(--primary) !important;
  font-size: 0.88rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.project-buttons {
  margin-top: 22px;
}

.project-message {
  margin-top: 18px;
  color: var(--text-subtle);
}

.project-viewer {
  max-width: 1500px;
  margin-top: 34px;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-large);
  background: var(--background-dark);
  box-shadow: var(--shadow);
}

.project-viewer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 18px 22px;
  border-bottom: 1px solid var(--border);
  background: var(--card-background);
}

.project-viewer-header h3 {
  color: var(--text-bright);
}

.project-viewer-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 14px;
}

.repo-link {
  white-space: nowrap;
  font-weight: 700;
}

.viewer-button {
  padding: 9px 15px;
  border: 1px solid var(--primary);
  border-radius: 999px;
  background: transparent;
  color: var(--primary);
  font-weight: 700;
  cursor: pointer;
}

.viewer-button:hover {
  background: rgba(56, 189, 248, 0.1);
}

.project-loading {
  padding: 22px;
  color: var(--text-muted);
  text-align: center;
}

.project-frame {
  display: block;
  width: 100%;
  height: 720px;
  border: 0;
  background: #000;
}

.timeline {
  display: grid;
  gap: 24px;
}

.timeline-item {
  padding: 27px;
  border: 1px solid var(--border);
  border-radius: var(--radius-large);
  background: var(--card-background);
  box-shadow: var(--shadow);
}

.timeline-item h3 {
  margin-bottom: 7px;
  color: var(--text-bright);
}

.date {
  margin-bottom: 16px;
  color: var(--text-subtle);
  font-weight: 700;
}

.timeline-item ul {
  padding-left: 22px;
}

.timeline-item li {
  margin-bottom: 8px;
  color: var(--text-muted);
}

.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin: 26px 0;
}

.contact-links a {
  padding: 10px 17px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: var(--card-background);
  color: var(--text-main);
  font-weight: 700;
}

.contact-links a:hover {
  border-color: var(--primary);
  color: var(--primary);
  text-decoration: none;
}

.contact-form {
  display: grid;
  max-width: 760px;
  gap: 18px;
  margin-top: 25px;
  margin-left: 0;
}

.form-field {
  display: grid;
  gap: 8px;
}

.form-field label {
  color: var(--text-bright);
  font-weight: 700;
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-medium);
  background: var(--background-dark);
  color: var(--text-main);
}

.contact-form textarea {
  resize: vertical;
  min-height: 170px;
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: #64748b;
}

.contact-form input:focus,
.contact-form textarea:focus {
  border-color: var(--primary);
  outline: 2px solid rgba(56, 189, 248, 0.2);
}

.form-submit {
  width: fit-content;
}

.small-note {
  margin-top: 17px;
  color: var(--text-subtle);
  font-size: 0.92rem;
}

footer {
  padding: 34px 10%;
  background: var(--background-dark);
  color: var(--text-subtle);
  text-align: center;
}

@media (max-width: 880px) {
  .navbar {
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .mobile-menu-button {
    display: inline-flex;
    margin-left: auto;
  }

  .nav-links {
    display: none;
    width: 100%;
    justify-content: flex-start;
    padding-top: 10px;
  }

  .nav-links.open {
    display: flex;
  }

  .hero-content {
    padding-top: 80px;
  }

  .hero,
  .section {
    padding-left: 6%;
    padding-right: 6%;
  }

  .project-frame {
    height: 600px;
  }

  .project-viewer-header {
    align-items: flex-start;
    flex-direction: column;
  }
}

@media (max-width: 560px) {
  .hero {
    min-height: auto;
    padding-bottom: 70px;
  }

  .hero-content {
    padding-top: 55px;
  }

  .nav-links {
    flex-direction: column;
    gap: 10px;
  }

  .button-group {
    align-items: stretch;
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .project-launcher {
    padding: 21px;
  }

  .project-buttons {
    flex-direction: column;
  }

  .project-viewer-actions {
    align-items: flex-start;
    flex-direction: column;
  }

  .project-frame {
    height: 500px;
  }
}
