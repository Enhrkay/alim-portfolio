import type {
  AnalyticsProject,
  Playlist,
  Profile,
  Project,
  SectionSetting,
  ShowcaseMedia,
  Theme,
} from "@/lib/types";
import { PublicNav } from "./PublicNav";
import { LiveProjectPreview } from "./LiveProjectPreview";
import { WorkflowCarousel } from "./WorkflowCarousel";
import { YouTubePlaylistEmbed } from "./YouTubePlaylistEmbed";

function cssVars(theme: Theme | null): React.CSSProperties {
  return {
    ["--p-primary" as any]: theme?.primary_color || "#0F7A4A",
    ["--p-secondary" as any]: theme?.secondary_color || "#111827",
    ["--p-accent" as any]: theme?.accent_color || "#C8A96B",
    ["--p-bg" as any]: theme?.background_color || "#F4F1EA",
    ["--p-surface" as any]: theme?.surface_color || "#FFFFFF",
    ["--p-text" as any]: theme?.text_color || "#151A17",
    ["--p-muted" as any]: theme?.muted_color || "#69726C",
    ["--p-border" as any]: theme?.border_color || "#DEDAD0",
  };
}

function number(index: number) {
  return String(index + 1).padStart(2, "0");
}

function externalUrl(value?: string | null) {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (/^(https?:\/\/|mailto:|tel:)/i.test(trimmed)) return trimmed;
  return `https://${trimmed.replace(/^\/+/, "")}`;
}

export function PublicPortfolio({
  profile,
  theme,
  projects,
  playlists,
  analytics,
  showcase,
  sections,
}: {
  profile: Profile;
  theme: Theme | null;
  projects: Project[];
  playlists: Playlist[];
  analytics: AnalyticsProject[];
  showcase: ShowcaseMedia[];
  sections: SectionSetting[];
}) {
  const enabled = new Set(sections.filter((x) => x.enabled).map((x) => x.section_key));
  const defined = new Set(sections.map((x) => x.section_key));
  const show = (key: string) => sections.length === 0 || !defined.has(key) || enabled.has(key);

  const training = playlists.filter((x) => x.type === "training");
  const student = playlists.filter((x) => x.type === "student");
  const featuredProject = projects.find((project) => project.featured) ?? projects[0];

  return (
    <div
      className={`portfolio-shell radius-${theme?.radius || "rounded"} cards-${theme?.card_style || "elevated"} motion-${theme?.animation_level || "elegant"}`}
      style={cssVars(theme)}
    >
      <PublicNav name={profile.full_name} logoUrl={profile.logo_url} />

      <main id="top">
        {show("hero") && (
          <section className="portfolio-hero cinematic-hero">
            <div className="hero-noise" />
            <div className="hero-grid-lines" />
            <div className="hero-orb hero-orb-one" />
            <div className="hero-orb hero-orb-two" />
            <div className="cinematic-beam beam-one" />
            <div className="cinematic-beam beam-two" />

            <div className="container portfolio-hero-grid">
              <div className="hero-copy-block">
                <div className="hero-status"><span className="status-dot" /> AVAILABLE FOR HIGH-IMPACT BUILDS & COLLABORATIONS</div>
                <p className="portfolio-kicker">AI AUTOMATION / DATA STRATEGY / PRACTICAL LEARNING</p>
                <h1>I build systems that turn <span>complexity into momentum.</span></h1>
                <p className="hero-role">{profile.role}</p>
                <p className="portfolio-lead">{profile.tagline}</p>

                <div className="portfolio-actions">
                  <a className="primary-action" href="#work">Explore My Work <span>↗</span></a>
                  <a className="secondary-action" href="#data">See Data Intelligence <span>+</span></a>
                </div>

                <div className="hero-proof-row">
                  <div><strong>BUILD</strong><span>AI, automation and digital products</span></div>
                  <div><strong>ANALYSE</strong><span>Dashboards, insight and data strategy</span></div>
                  <div><strong>TEACH</strong><span>Learning anchored in visible work</span></div>
                </div>
              </div>

              <div className="hero-stage">
                <div className="hero-stage-frame">
                  <div className="hero-stage-topline"><span>PORTFOLIO / 2026</span><span className="stage-live"><i /> LIVE</span></div>
                  <div className="hero-portrait">
                    {profile.headshot_url ? <img src={profile.headshot_url} alt={profile.full_name} /> : (
                      <div className="portrait-placeholder"><span>AA</span><small>Add your headshot in Admin / Content</small></div>
                    )}
                    <div className="portrait-vignette" />
                    <div className="portrait-caption"><small>PROBLEM / PROCESS / AUTOMATION / IMPACT</small><strong>{profile.full_name}</strong></div>
                  </div>
                  {featuredProject && <div className="floating-card floating-project-card"><span className="floating-label">FEATURED BUILD</span><strong>{featuredProject.title}</strong><small>{featuredProject.category}</small></div>}
                  <div className="floating-card floating-system-card"><span className="system-icon">+</span><div><strong>Systems thinking</strong><small>Design / Automate / Measure</small></div></div>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="portfolio-strip">
          <div className="container portfolio-strip-grid">
            <article><small>01</small><strong>I BUILD</strong><p>Automation systems, AI workflows and digital products.</p></article>
            <article><small>02</small><strong>I ANALYSE</strong><p>Business data, performance and operational intelligence.</p></article>
            <article><small>03</small><strong>I TEACH</strong><p>Practical technology through real-world execution.</p></article>
          </div>
        </section>

        {show("projects") && (
          <section className="portfolio-section portfolio-work" id="work">
            <div className="container">
              <div className="portfolio-heading editorial-heading">
                <div><p className="portfolio-kicker">SELECTED WORK</p><h2>Not case studies in theory. <span>Working products.</span></h2></div>
                <p>Explore live applications inside the portfolio, then open the full experience when you want to go deeper.</p>
              </div>

              <div className="portfolio-project-list">
                {projects.map((project, index) => (
                  <article className={`project-feature ${index % 2 ? "project-reverse" : ""}`} key={project.id}>
                    <div className="project-visual-shell project-live-shell">
                      <div className="project-browser-bar"><div><i /><i /><i /></div><span>{project.live_url ? project.live_url.replace(/^https?:\/\//, "") : project.title}</span><b>LIVE PREVIEW</b></div>
                      <div className="portfolio-project-media live-media">
                        {project.preview_mode === "live" && project.live_url ? (
                          <LiveProjectPreview title={project.title} liveUrl={project.live_url} imageUrl={project.image_url} />
                        ) : project.image_url ? (
                          <img src={project.image_url} alt={project.title} />
                        ) : (
                          <div className="project-placeholder"><span>{number(index)}</span><strong>{project.title}</strong></div>
                        )}
                        <small className="project-category-chip">{project.category}</small>
                      </div>
                    </div>

                    <div className="portfolio-project-body">
                      <div className="project-index-line"><span>{number(index)}</span><i /><span>{project.year || "PROJECT"}</span></div>
                      <h3>{project.title}</h3>
                      <p>{project.description}</p>
                      {(project.problem || project.solution) && (
                        <div className="project-insight-grid">
                          {project.problem && <div><small>THE PROBLEM</small><p>{project.problem}</p></div>}
                          {project.solution && <div><small>THE SOLUTION</small><p>{project.solution}</p></div>}
                        </div>
                      )}
                      <div className="portfolio-tags">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
                      <div className="portfolio-links">
                        {project.live_url && <a className="project-primary-link" href={externalUrl(project.live_url)} target="_blank" rel="noreferrer">Open Live Project ↗</a>}
                        {project.video_url && <a href={externalUrl(project.video_url)} target="_blank" rel="noreferrer">Watch Demo</a>}
                        {project.github_url && <a href={externalUrl(project.github_url)} target="_blank" rel="noreferrer">GitHub</a>}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {show("data") && (
          <section className="portfolio-data" id="data">
            <div className="data-ambient" />
            <div className="container">
              <div className="portfolio-heading data-heading">
                <div><p className="portfolio-kicker light">DATA INTELLIGENCE</p><h2>From raw data to <span>decision-ready insight.</span></h2></div>
                <p>Live dashboards, analytical products and business questions translated into measurable intelligence.</p>
              </div>

              {analytics.length ? (
                <div className="analytics-grid">
                  {analytics.map((item, index) => (
                    <article className={`analytics-card ${item.featured ? "analytics-featured" : ""}`} key={item.id}>
                      <div className="analytics-visual">
                        <div className="analytics-browser-bar"><span>DATA / {number(index)}</span><b>{item.tools.slice(0, 3).join(" / ")}</b></div>
                        {item.embed_url ? (
                          <iframe src={item.embed_url} title={`${item.title} dashboard`} loading="lazy" allowFullScreen />
                        ) : item.image_url ? (
                          <img src={item.image_url} alt={item.title} />
                        ) : (
                          <div className="analytics-placeholder"><span>LIVE DATA</span><strong>Add a Power BI embed or dashboard screenshot</strong></div>
                        )}
                      </div>
                      <div className="analytics-copy">
                        <small>{item.subtitle || "ANALYTICS PROJECT"}</small>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        <div className="analytics-facts">
                          {item.business_question && <div><span>BUSINESS QUESTION</span><p>{item.business_question}</p></div>}
                          {item.key_insight && <div><span>KEY INSIGHT</span><p>{item.key_insight}</p></div>}
                        </div>
                        <div className="portfolio-tags dark-tags">{item.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
                        {item.live_url && <a className="analytics-link" href={item.live_url} target="_blank" rel="noreferrer">View full dashboard ↗</a>}
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="data-empty-state">
                  <div className="data-capabilities" aria-label="Analytics tools">
                    <span>POWER BI</span>
                    <span>SQL</span>
                    <span>PYTHON</span>
                    <span>EXCEL</span>
                  </div>
                  <h3>Your Data Intelligence gallery is ready.</h3>
                  <p>Add dashboard embeds or screenshots from Admin / Analytics.</p>
                </div>
              )}
            </div>
          </section>
        )}

        {show("process") && (
          <section className="portfolio-process" id="process">
            <div className="process-aurora" />
            <div className="container">
              <div className="process-heading-row">
                <div><p className="portfolio-kicker light">MY SIGNATURE PROCESS</p><h2>Five steps from <span>problem to impact.</span></h2></div>
                <p>Business context first. Technology second. Measurement throughout.</p>
              </div>
              <div className="portfolio-process-grid">
                {[
                  ["01", "Discover", "Understand the real problem, people, constraints and desired outcome."],
                  ["02", "Map", "Break the process into triggers, decisions, data and actions."],
                  ["03", "Design", "Choose the right architecture, tools and integration logic."],
                  ["04", "Build", "Implement the workflow, AI logic and connected systems."],
                  ["05", "Measure", "Evaluate results, value and opportunities to improve."],
                ].map(([n, title, text]) => <article key={n}><div className="process-step-top"><small>{n}</small><span>{n}</span></div><h3>{title}</h3><p>{text}</p></article>)}
              </div>
            </div>
          </section>
        )}

        {show("showcase") && (showcase.length > 0 || training.length > 0 || student.length > 0) && (
          <section className="portfolio-showcase" id="showcase">
            <div className="showcase-glow" />
            <div className="container">
              <div className="portfolio-heading showcase-heading">
                <div><p className="portfolio-kicker light">BUILD / TEACH / SHOW</p><h2>Workflows, learning and <span>visible outcomes.</span></h2></div>
                <p>A visual record of the systems I build, the way I teach, and the work learners go on to produce.</p>
              </div>

              {showcase.length > 0 && (
                <div className="workflow-showcase-block">
                  <div className="showcase-subhead"><span>WORKFLOW GALLERY</span><p>Architecture, automation canvases, dashboards and behind-the-scenes build screenshots.</p></div>
                  <WorkflowCarousel items={showcase} />
                </div>
              )}

              {(training.length > 0 || student.length > 0) && (
                <div className="learning-grid">
                  {[...training, ...student].map((item, index) => (
                    <article key={item.id} className={`learning-evidence-card ${item.type === "student" ? "student-evidence" : "training-evidence"}`}>
                      <div className="learning-card-copy">
                        <div className="learning-number">{number(index)}</div>
                        <small>{item.label}</small>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                        {item.playlist_url && <a href={item.playlist_url} target="_blank" rel="noreferrer">Open full playlist ↗</a>}
                      </div>
                      {item.playlist_url && (
                        <YouTubePlaylistEmbed title={item.title} playlistUrl={item.playlist_url} />
                      )}
                    </article>
                  ))}
                </div>
              )}

              <div className="outcomes-ribbon">
                <span>LEARNING THAT PRODUCES VISIBLE WORK</span>
                <div><strong>REAL PROJECTS</strong><strong>PRACTICAL PROBLEM-SOLVING</strong><strong>PORTFOLIO-READY OUTPUTS</strong><strong>CAREER CONFIDENCE</strong></div>
              </div>
            </div>
          </section>
        )}

        {show("about") && (
          <section className="portfolio-section portfolio-about" id="about">
            <div className="container portfolio-about-grid">
              <div className="about-visual">
                <div className="about-photo">{profile.headshot_url ? <img src={profile.headshot_url} alt={profile.full_name} /> : <span>{profile.full_name}</span>}</div>
                <div className="about-stamp"><small>FOCUS</small><strong>Problem / Solution</strong></div>
              </div>
              <div className="about-copy-wrap">
                <p className="portfolio-kicker">PROFESSIONAL PROFILE</p>
                <h2>I work at the intersection of <span>automation, data and practical learning.</span></h2>
                <p className="about-copy">{profile.bio}</p>
                <div className="about-pill-row"><span>AI Automation</span><span>Data Strategy</span><span>Workflow Design</span><span>Technical Training</span></div>
              </div>
            </div>
          </section>
        )}

        {show("contact") && (
          <section className="portfolio-contact" id="contact">
            <div className="contact-glow" />
            <div className="container portfolio-contact-grid">
              <div><p className="portfolio-kicker light">LET&apos;S BUILD SOMETHING USEFUL</p><h2>Have a process, product or <span>data challenge?</span></h2><p className="contact-copy">Let&apos;s turn it into something clear, useful and measurable.</p></div>
              <div className="portfolio-socials">
                {profile.email && <a href={`mailto:${profile.email}`}>Email <span>↗</span></a>}
                {profile.linkedin_url && <a href={externalUrl(profile.linkedin_url)} target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>}
                {profile.github_url && <a href={externalUrl(profile.github_url)} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>}
                {profile.youtube_url && <a href={externalUrl(profile.youtube_url)} target="_blank" rel="noreferrer">YouTube <span>↗</span></a>}
                {profile.cv_url && <a href={externalUrl(profile.cv_url)} target="_blank" rel="noreferrer">View CV <span>↗</span></a>}
              </div>
            </div>
          </section>
        )}
      </main>

      <footer className="portfolio-footer"><div className="container"><strong>{profile.full_name}</strong><span>AI AUTOMATION / DATA STRATEGY / TRAINING</span><a href="#top">BACK TO TOP ↑</a></div></footer>
    </div>
  );
}
