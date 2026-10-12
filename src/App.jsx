import { useEffect, useState } from 'react';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#education', label: 'Education' },
  { href: '#contact', label: 'Contact' },
];

const projects = [
  {
    number: '01',
    title: 'E-Commerce Platform',
    description:
      'Responsive full-stack e-commerce application with product listings, cart functionality and order management.',
    tags: 'Next.js · NestJS · PostgreSQL · REST API',
  },
  {
    number: '02',
    title: 'Library Management System',
    description:
      'Role-based system for Admin, Manager and Customer users to manage books, users and transactions.',
    tags: 'HTML · CSS · JavaScript · PHP',
  },
  {
    number: '03',
    title: 'Pet Care Management System',
    description:
      'Designed and documented a software testing and quality assurance model for pet health records and appointments.',
    tags: 'QA · Test Planning · Documentation',
  },
  {
    number: '04',
    title: 'Air Quality Index Monitoring',
    description:
      'Web platform for monitoring air quality with dynamic data visualization, validation and a clean interface.',
    tags: 'PHP · HTML · CSS · JavaScript',
  },
  {
    number: 'THESIS',
    title: 'Reliability-Aware Hybrid ML Framework',
    description:
      'IoT-enabled multi-output weather forecasting framework combining hybrid neural architecture with reliability-aware prediction.',
    tags: 'Machine Learning · CNN-LSTM · Weather Forecasting',
    featured: true,
  },
];

const skills = [
  { title: 'Programming', items: ['HTML5', 'CSS3', 'JavaScript (ES6+)'] },
  { title: 'Frameworks', items: ['React.js', 'Next.js', 'NestJS'] },
  { title: 'Databases', items: ['MySQL', 'Oracle', 'PostgreSQL'] },
  { title: 'Tools', items: ['Figma', 'Canva', 'Postman', 'Git'] },
  { title: 'Familiar With', items: ['Python', 'Tailwind CSS'] },
  { title: 'Core Strengths', items: ['Responsive UI', 'UI/UX', 'API testing', 'Cross-browser compatibility'] },
];

const education = [
  {
    period: '2021 — 2025',
    title: 'B.Sc. in Computer Science & Engineering',
    info: 'American International University–Bangladesh (AIUB)\nMajor in Software',
  },
  {
    period: '2019 — 2020',
    title: 'Higher Secondary Certificate (HSC)',
    info: 'Islamia Govt. College, Sirajgonj\nDiscipline — Science',
  },
];

function ThemeIcon({ darkMode }) {
  if (darkMode) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = window.localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : false;
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [formMessage, setFormMessage] = useState('');
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const movePointer = (event) => {
      setPointer({ x: event.clientX, y: event.clientY });
      setCursorVisible(true);
    };

    const hidePointer = () => setCursorVisible(false);

    window.addEventListener('pointermove', movePointer);
    window.addEventListener('pointerleave', hidePointer);

    return () => {
      window.removeEventListener('pointermove', movePointer);
      window.removeEventListener('pointerleave', hidePointer);
    };
  }, []);

  useEffect(() => {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const revealTargets = document.querySelectorAll('.reveal-target');
    revealTargets.forEach((target, index) => {
      target.style.transitionDelay = `${(index % 3) * 90}ms`;
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormMessage('Please fill in your name, email and message.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormMessage('Please enter a valid email address.');
      return;
    }

    setFormMessage('Thanks! Your message has been validated. Connect with me by email to send it.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <>
      <div
        aria-hidden="true"
        className={`cursor-dot ${cursorVisible ? 'visible' : ''}`}
        style={{
          transform: `translate(${pointer.x - 9}px, ${pointer.y - 9}px)`,
        }}
      />
      <header className="header">
        <a className="logo" href="#home">
          NURE<span>.</span>
        </a>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMenuOpen((state) => !state)}>
          ☰
        </button>
        <nav className={`nav ${menuOpen ? 'open' : ''}`} id="nav">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
          <button
            id="themeToggle"
            className="theme-btn"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            type="button"
            onClick={() => setDarkMode((state) => !state)}
          >
            <span id="themeIcon" aria-hidden="true">
              <ThemeIcon darkMode={darkMode} />
            </span>
          </button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero section relative overflow-hidden">
          <div className="hero-glow" />
          <div className="hero-text">
            <p className="eyebrow">HELLO, I'M</p>
            <h1>
              MD. NURE <span>AMIN</span>
            </h1>
            <h2>Front-End Developer</h2>
            <p className="lead">
              CSE graduate focused on building responsive, user-friendly web interfaces with clean and maintainable code.
            </p>
            <div className="actions">
              <a className="btn primary" href="#projects">
                View My Work
              </a>
              <a className="btn secondary" href="#contact">
                Contact Me
              </a>
              <a className="btn secondary" href="./cv.html" target="_blank" rel="noreferrer">
                View CV
              </a>
              <a className="btn primary" href="./cv.pdf" download>
                Download CV
              </a>
              <a
                className="btn whatsapp"
                href="https://wa.me/8801707597797?text=Hello%20Nure%20Amin%2C%20I%20want%20to%20discuss%20a%20project."
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
            <div className="socials" aria-label="Social profiles">
              <a className="social-link" href="https://github.com/Sojol7" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="social-link" href="https://www.linkedin.com/in/md-nure-amin-1a19a7341/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>

          <div className="hero-card animate-float">
            <img className="avatar animate-pulse-soft" src="./Profile.jpg" alt="MD. Nure Amin portrait" />
            <div>
              <strong>CSE</strong>
              <small>Major in Software</small>
            </div>
            <div className="availability">● Open to opportunities</div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-head">
            <p className="eyebrow">01 — ABOUT</p>
            <h2>Building interfaces that feel simple.</h2>
          </div>
          <div className="about-grid">
            <p>
              I am a Computer Science &amp; Engineering graduate from American International University–Bangladesh, majoring in
              Software. I enjoy turning ideas into responsive, accessible and visually polished web experiences.
            </p>
            <p>
              My academic work includes full-stack applications, software testing, data-driven web systems and a thesis on a
              reliability-aware hybrid machine learning framework for IoT-enabled multi-output weather forecasting.
            </p>
          </div>
          <div className="facts">
            <div>
              <strong>2025</strong>
              <span>CSE Graduation</span>
            </div>
            <div>
              <strong>4+</strong>
              <span>Academic Projects</span>
            </div>
            <div>
              <strong>3</strong>
              <span>Languages</span>
            </div>
          </div>
        </section>

        <section id="skills" className="section dark-section">
          <div className="section-head">
            <p className="eyebrow">02 — SKILLS</p>
            <h2>Tools I work with.</h2>
          </div>
          <div className="skills-grid">
            {skills.map((skill) => (
              <div className="skill-group reveal-target" key={skill.title}>
                <h3>{skill.title}</h3>
                <p>
                  {skill.items.map((item) => (
                    <span className="skill-chip" key={item}>
                      {item}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-head">
            <p className="eyebrow">03 — PROJECTS</p>
            <h2>Selected academic &amp; personal work.</h2>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className={`project reveal-target ${project.featured ? 'featured' : ''}`} key={project.title}>
                <span>{project.number}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <small>{project.tags}</small>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section dark-section">
          <div className="section-head">
            <p className="eyebrow">04 — EDUCATION &amp; ACTIVITIES</p>
            <h2>My academic journey.</h2>
          </div>
          <div className="timeline">
            {education.map((item) => (
              <div className="timeline-item reveal-target" key={item.title}>
                <span>{item.period}</span>
                <h3>{item.title}</h3>
                <p>
                  {item.info.split('\n').map((line, index) => (
                    <span key={`${item.title}-${index}`}>
                      {index > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>

          <div className="extras reveal-target">
            <h3>Additional Information</h3>
            <p>
              <b>Languages:</b> Bangla, English, Hindi
            </p>
            <p>
              <b>Mentoring:</b> Bangladesh Innovation Forum
            </p>
            <p>
              <b>Competition:</b> North Western University IUPC (2023), Team AIUBSearching
            </p>
            <p>
              <b>Seminars:</b> AI in Healthcare (AIUB); The Growth of CSE Education in Bangladesh (ISU, 2024); IEB Digital
              Transformation seminar (Oct. 7, 2023)
            </p>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-head">
            <p className="eyebrow">05 — CONTACT</p>
            <h2>Let's build something useful.</h2>
          </div>
          <div className="contact-grid">
            <div>
              <p>If you have an opportunity, project, or collaboration in mind, feel free to reach out.</p>
              <div className="contact-list">
                <a href="mailto:ksajol0@gmail.com">ksajol0@gmail.com</a>
                <a href="tel:+8801707597797">+880 1707 597797</a>
                <a href="https://wa.me/8801707597797" target="_blank" rel="noreferrer">
                  WhatsApp: +880 1707 597797
                </a>
                <span>Nikunja 2, Khilkhet, Dhaka</span>
              </div>
            </div>

            <form id="contactForm" noValidate onSubmit={handleSubmit}>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleInputChange}
              />
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Your message"
                value={formData.message}
                onChange={handleInputChange}
              />
              <p id="formMessage" className="form-message">
                {formMessage}
              </p>
              <button className="btn primary" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <p>
          © <span id="year">{new Date().getFullYear()}</span> MD. Nure Amin. Built with HTML, CSS &amp; JavaScript.
        </p>
        <a href="#home">Back to top ↑</a>
      </footer>
    </>
  );
}

export default App;
