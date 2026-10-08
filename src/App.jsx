import { BrowserRouter, Link, Route, Routes, useLocation } from 'react-router-dom'
import { useEffect, useLayoutEffect } from 'react'
import './App.css'
import nourivaMainVideo from './assets/videos/nouriva-main.mp4'
import homeHeroImage from './assets/images/ayeza-home-hero.png'
import nutrivixeaPack01 from './assets/images/nutrivixea/nutrivixea-pack-01.png'
import nutrivixeaPack02 from './assets/images/nutrivixea/nutrivixea-pack-02.png'
import nutrivixeaPack03 from './assets/images/nutrivixea/nutrivixea-pack-03.png'
import nutrivixeaBars from './assets/images/nutrivixea/nutrivixea-bars.png'
import nutrivixeaHomePreview from './assets/images/nutrivixea/nutrivixea-home-preview.png'

const projectLinks = {
  nouriva: 'https://nouriva-sigma.vercel.app',
  instagram: 'https://www.instagram.com/getfitwithayeza',
  email: 'dn.ayezaazhar@gmail.com',
}

const currentYear = new Date().getFullYear()

const whyBuildCards = [
  {
    number: '01',
    title: 'Understand',
    text: 'Starting from real health and everyday user needs.',
  },
  {
    number: '02',
    title: 'Build',
    text: 'Turning ideas into practical digital experiences.',
  },
  {
    number: '03',
    title: 'Improve',
    text: 'Making those experiences simpler, clearer and more useful.',
  },
]

const featuredProjects = [
  {
    id: 'nouriva',
    title: 'Nouriva Health & Fitness',
    category: 'Wellness Platform',
    description:
      'A wellness platform designed to make everyday nutrition tracking, meal planning and healthy routines more practical and accessible.',
    reason: 'To make daily nutrition easier.',
    visual: nourivaMainVideo,
    imageAlt: 'Nouriva wellness planning with a nutrition app, food and notes',
    type: 'video',
    path: '/projects/nouriva',
    buttonLabel: 'Explore Nouriva',
  },
  {
    id: 'nutrivixea',
    title: 'NutriVixea Wellness',
    category: 'Premium Wellness Brand',
    description:
      'A premium digital experience for a wholesome food and wellness brand.',
    reason: 'To make wholesome shopping easier.',
    visual: nutrivixeaHomePreview,
    imageAlt: 'NutriVixea granola bars with oats, nuts, seeds and dried fruit',
    type: 'image',
    path: '/projects/nutrivixea',
    buttonLabel: 'Explore NutriVixea',
  },
]

function AppShell({ children, compact = false }) {
  useEffect(() => {
    const revealElements = document.querySelectorAll(
      'main > section, .why-card, .project-preview-card, .project-story-block, .project-info-card, .project-gallery-grid > *',
    )
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((element) => element.classList.add('reveal-visible'))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' },
    )

    revealElements.forEach((element) => {
      element.classList.add('reveal')
      element.style.setProperty('--reveal-delay', `${(Array.from(element.parentElement.children).indexOf(element) % 4) * 80}ms`)
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="portfolio-shell">
      <header className="site-header">
        <div className="container nav-wrap">
          <Link to="/" className="brand" aria-label="Ayeza home">
            <span className="brand-mark">A</span>
            <span className="brand-text">AYEZA</span>
          </Link>

          <nav className="site-nav" aria-label="Main navigation">
            <Link
              to="/"
              onClick={() => {
                if (window.location.pathname === '/') {
                  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
                }
              }}
            >
              Home
            </Link>
            <a href="/#work">
              Work
            </a>
            <a href="/#contact">
              Contact
            </a>
          </nav>
        </div>
      </header>

      <main className={compact ? 'compact-page' : undefined}>{children}</main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <Link to="/" className="footer-brand">Ayeza</Link>
          <p className="footer-tagline">Nutrition • Digital Design • Wellness</p>
          <div className="footer-links">
            <a href={`mailto:${projectLinks.email}`} aria-label={`Email Ayeza at ${projectLinks.email}`}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3.5 6.5h17v11h-17zM4 7l8 6 8-6" />
              </svg>
              <span>{projectLinks.email}</span>
            </a>
            <a href={projectLinks.instagram} target="_blank" rel="noreferrer" aria-label="Visit Ayeza on Instagram">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle className="icon-dot" cx="17.6" cy="6.8" r="0.8" />
              </svg>
              <span>Instagram</span>
            </a>
          </div>
          <small className="footer-copyright">© {currentYear} Ayeza. All rights reserved.</small>
        </div>
      </footer>
    </div>
  )
}

function ScrollToRoute() {
  const { pathname, hash } = useLocation()

  useLayoutEffect(() => {
    if (hash) {
      document.querySelector(hash)?.scrollIntoView()
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [pathname, hash])

  return null
}

function HomePage() {
  return (
    <>
      <section id="home" className="hero-section section-spacing">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">DIETITIAN &amp; WELLNESS COACH</p>
            <h1>
              Beyond Nutrition Advice.
              <span>Building <em>Practical</em> Health Solutions.</span>
            </h1>
            <p className="hero-text">
              I combine my background in nutrition with technology to create practical digital experiences for health, wellness and everyday living.
            </p>

            <div className="cta-row">
              <a href="#work" className="primary-btn">
                Explore My Work
              </a>
              <a href="#contact" className="secondary-btn">
                Let&apos;s Connect
              </a>
            </div>

            <div className="credibility-line">NUTRITION GUIDANCE • WELLNESS SOLUTIONS</div>
          </div>

          <div className="hero-visual" aria-label="Ayeza in her wellness workspace">
            <div className="hero-card">
              <img src={homeHeroImage} alt="Ayeza seated with nutrition planning materials" />
              <div className="hero-badge">Nutrition • Web • Wellness</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing story-section">
        <div className="container story-layout">
          <div className="section-header">
            <p className="eyebrow">MY STORY</p>
            <h2>Why I Build Practical Health Solutions</h2>
          </div>

          <div className="story-copy">
            <p>
              My background in Human Nutrition &amp; Dietetics showed me how important simple, practical health choices can be in everyday life. I became interested in using technology to turn those ideas into digital experiences that people can actually use.
            </p>
            <p>
              That led me to explore digital product building and create projects that combine my understanding of nutrition with technology, design and practical user experiences.
            </p>
          </div>

          <div className="story-visual-statement">From Nutrition Knowledge → To Digital Solutions</div>
        </div>
      </section>

      <section className="section-spacing why-section">
        <div className="container">
          <div className="section-header center">
            <p className="eyebrow">WHY I BUILD</p>
            <h2>Practical Ideas, Built With Purpose</h2>
          </div>

          <div className="why-grid">
            {whyBuildCards.map((card) => (
              <article key={card.number} className="why-card">
                <span className="card-number">{card.number}</span>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="work" className="section-spacing work-section">
        <div className="container">
          <div className="section-header center">
            <p className="eyebrow">SELECTED WORK</p>
            <h2>Projects Built With Purpose</h2>
            <p className="section-subtitle">Each project started with an idea, a problem or an experience I wanted to make better.</p>
          </div>

          <div className="featured-projects">
            {featuredProjects.map((project) => (
              <article key={project.id} className="project-preview-card">
                <div className={`project-preview-visual${project.type === 'video' ? ' video-frame' : ''}`}>
                  {project.type === 'video' ? (
                    <video
                      controls
                      className="project-video"
                      preload="metadata"
                      playsInline
                      src={project.visual}
                      aria-label={`${project.title} video preview`}
                    />
                  ) : (
                    <img src={project.visual} alt={project.imageAlt} loading="lazy" />
                  )}
                </div>

                <div className="project-preview-copy">
                  <p className="project-kicker">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>

                  <div className="project-reason">
                    <span>Why I Built It</span>
                    <p>{project.reason}</p>
                  </div>

                  <div className="feature-actions">
                    <Link to={project.path} className="primary-btn">
                      {project.buttonLabel}
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-spacing contact-section">
        <div className="container">
          <div className="contact-card">
            <p className="eyebrow">LET&apos;S CONNECT</p>
            <h2>Let&apos;s Connect</h2>

            <div className="contact-list">
              <div className="contact-item">
                <span className="contact-label">Email</span>
                <a href={`mailto:${projectLinks.email}`}>{projectLinks.email}</a>
              </div>

              <div className="contact-item">
                <span className="contact-label">Instagram</span>
                <a href={projectLinks.instagram} target="_blank" rel="noreferrer">
                  {projectLinks.instagram}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function ProjectDetailPage({ slug }) {
  const projectMap = {
    nouriva: {
      title: 'Nouriva Health & Fitness',
      subtitle: 'A digital wellness experience focused on practical nutrition and everyday health management.',
      intro: 'I created Nouriva to make nutrition and everyday wellness easier to understand and manage. I wanted to bring meal planning, nutrition tracking, and simple wellness tools together in one supportive digital experience.',
      sections: [],
      gallery: [
        {
          type: 'video',
          src: nourivaMainVideo,
          alt: 'Nouriva wellness platform video preview',
        },
      ],
      actionLabel: 'Visit Nouriva',
      actionUrl: projectLinks.nouriva,
      kind: 'video',
    },
    nutrivixea: {
      title: 'NutriVixea Wellness',
      subtitle: 'A premium digital experience for a wholesome food and wellness brand.',
      intro: 'I wanted to create a modern digital experience around wholesome everyday food choices, where the products, ingredients and brand story could be presented in a simple and visually engaging way.',
      sections: [
        ['Brand Concept', 'Premium, warm and approachable wellness storytelling built around natural ingredients and everyday healthy habits.'],
        ['Product Story', 'Highlighting the balance between nourishment, taste and a calm, thoughtful lifestyle.'],
        ['Website Experience', 'Designing a clear shopping journey and visual brand language that feels refined but easy to trust.'],
      ],
      gallery: [
        {
          type: 'image',
          src: nutrivixeaPack03,
          alt: 'NutriVixea Almond Cranberry Granola Mix box, 450 g',
          title: 'Almond Cranberry Granola Mix',
          description:
            'Crunchy oats, almonds and tangy dried cranberries, a nutty and wholesome start to your morning. Enjoy with milk, yogurt or honey.',
        },
        {
          type: 'image',
          src: nutrivixeaPack02,
          alt: 'NutriVixea Chocolate Hazelnut Granola Mix box, 450 g',
          title: 'Chocolate Hazelnut Granola Mix',
          description:
            'Rich chocolate pieces and roasted hazelnuts with oats and seeds, for a little indulgence in a wholesome bowl.',
        },
        {
          type: 'image',
          src: nutrivixeaPack01,
          alt: 'NutriVixea Mixed 5 Bars box, 250 g',
          title: 'Mixed 5 Bars',
          description:
            'Five flavours in one box: Almond Cranberry, Chocolate Hazelnut, Oats & Seeds, Coconut Almond and Dark Chocolate. Natural energy for on-the-go days.',
        },
        {
          type: 'image',
          src: nutrivixeaBars,
          alt: 'Five NutriVixea wrapped granola bars beside a Small Bars Big Wellness card',
          title: 'Granola Bars',
          description:
            'Small bars, big wellness. Made with nuts, fruits and seeds in earthy, beautifully wrapped flavours.',
        },
      ],
      actionLabel: 'View Brand Story',
      actionUrl: '#',
      kind: 'mixed',
    },
  }

  const project = projectMap[slug]

  if (!project) {
    return (
      <AppShell compact>
        <section className="section-spacing">
          <div className="container">
            <div className="project-page-empty">
              <h2>Project not found.</h2>
              <Link to="/" className="primary-btn">
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </AppShell>
    )
  }

  const projectGallery = (
    <div className={`project-gallery-grid${slug === 'nutrivixea' ? ' nutrivixea-product-grid' : ''}`}>
      {project.gallery.map((item, index) => {
        if (slug === 'nutrivixea') {
          return (
            <article className="nutrivixea-product-card" key={`${slug}-product-${index}`}>
              <div className="nutrivixea-product-image">
                <img src={item.src} alt={item.alt} loading="lazy" />
              </div>
              <div className="nutrivixea-product-copy">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          )
        }

        return item.type === 'video' ? (
          <video
            key={`${slug}-video-${index}`}
            controls
            className="project-video"
            preload="metadata"
            playsInline
            src={item.src}
            aria-label={item.alt}
          />
        ) : (
          <img key={`${slug}-image-${index}`} src={item.src} alt={item.alt} loading="lazy" />
        )
      })}
    </div>
  )

  const projectDescription = (
    <>
      <div className={`project-story-block${slug === 'nouriva' ? ' project-story-block--nouriva' : ''}`}>
        <p className="detail-label">Why I Built It</p>
        <p>{project.intro}</p>
      </div>

      {project.sections.length > 0 ? (
        <div className="project-section-grid">
          {project.sections.map(([title, text]) => (
            <article key={title} className="project-info-card">
              <p className="detail-label">{title}</p>
              <p>{text}</p>
            </article>
          ))}
        </div>
      ) : null}
    </>
  )

  return (
    <AppShell compact>
      <section className="project-page section-spacing">
        <div className="container">
          <div className="project-page-header">
            <p className="eyebrow">{slug.toUpperCase()}</p>
            <h1>{project.title}</h1>
            <p className="project-page-subtitle">{project.subtitle}</p>
            <Link to="/" className="secondary-btn project-back-link">
              ← Back to Home
            </Link>
          </div>

          {projectGallery}
          {projectDescription}

          {project.actionUrl && project.actionUrl !== '#' ? (
            <div className="project-actions">
              <a href={project.actionUrl} className="primary-btn" target="_blank" rel="noreferrer">
                {project.actionLabel}
              </a>
            </div>
          ) : null}
        </div>
      </section>
    </AppShell>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToRoute />
      <Routes>
        <Route path="/" element={<AppShell><HomePage /></AppShell>} />
        <Route path="/projects/nouriva" element={<ProjectDetailPage slug="nouriva" />} />
        <Route path="/projects/nutrivixea" element={<ProjectDetailPage slug="nutrivixea" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
