import { useState } from 'react';

type PageKey = 'home' | 'projects' | 'experience' | 'resume';

type CarouselPhoto = { src: string; alt: string };

type Project = {
  orgCourse: string;
  title: string;
  tags: string;
  concept: string;
  design: string;
  electrical: string;
  software: string;
  result: string;
  images: {
    concept: CarouselPhoto[];
    design: CarouselPhoto[];
    team: string;
  };
};

const awards = [
  'Chinese National Scholarship (Top 1%)',
  '2024 Mathematical Contest in Modeling — Honorable Mention',
];

const aboutMeParagraphs = [
  'I am a graduate student in Mechanics and Computation at Stanford University with experience in mechanical design, robotics systems, and simulation-driven engineering. My work spans finite element analysis (FEA), geometry-aware meshing algorithm development, and hands-on robotic system integration. I am particularly interested in mechanical engineering roles focused on hardware systems, including robotics, reliability, testing, and product development.',
  'Before Stanford, I completed a dual B.S. in Structural Engineering through Hohai University and Polytech Lille, where I built a strong foundation in mechanics, numerical simulation, and engineering analysis. During my undergraduate studies, I began working on FEA modeling and meshing methods, which led to research experience in developing geometry-aware meshing algorithms and Abaqus-based structural simulations.',
  'At Stanford, I have expanded this background toward more hardware-oriented engineering through robotics system design and implementation, integrating mechanical structures, sensors, and control logic into end-to-end systems. This transition reflects my growing focus on applying simulation and analysis to real-world mechanical and hardware problems.',
];

const education = [
  {
    school: 'Stanford University',
    degree: 'M.S. in Mechanics and Computation',
    location: 'Palo Alto, CA',
    period: 'Sept. 2025 – Jun. 2027',
    details: ['GPA: 3.71/4.0'],
  },
  {
    school: 'Hohai University & Polytech Lille',
    degree: 'Dual B.S. in Structural Engineering (Joint Program)',
    location: 'Nanjing, China & Lille, France',
    period: 'Sept. 2021 – Jun. 2025',
    details: ['GPA: 3.78/4.0', 'Rank: 1/75'],
  },
];

const projects: Project[] = [
  {
    orgCourse: 'Stanford University - ME210',
    title: '"Joy of Curling" Autonomous DRIOD',
    tags: 'Mechanical Design · Prototyping · Mechatronics · Sensor Integration · Control',
    concept:
      'An autonomous robot designed to complete a full task cycle: orient from a randomized start, follow taped paths using IR sensors, navigate to a target zone, launch pucks with a servo-actuated mechanism, and return to the starting line for reload. The system integrates drivetrain control, multi-sensor perception, and onboard Arduino control to achieve reliable task execution under competition constraints.',
    design:
      'The system uses a compact multi-layer chassis with four omni-wheels enabling omnidirectional motion (lateral, longitudinal, and in-place rotation). IR sensors are placed at the front, center, and rear for line following, while ultrasonic sensors are mounted on the left and rear for navigation. A rotating servo feeds pucks into a curved slide that converts rotation into a controlled release, improving stability and repeatability; the structure is simplified for fast prototyping and reliable assembly.',
    electrical:
      'Arduino-based system integrating ultrasonic sensors for orientation and IR sensors for line following. Motor drivers and servo actuation are coordinated for closed-loop navigation and timed puck release.',
    software:
      'State-machine control with four stages: orientation (ultrasonic alignment), line acquisition, line following with shooting, and return-to-start. Designed for robustness and repeatability under competition constraints.',
    result:
      'Completed full autonomous pipeline within the 2-minute limit, including orientation, line following, puck dispensing, and return. Ranked 5th out of 20 teams in the final checkoff.',
    images: {
      concept: [
        { src: '/robot-closeup.JPG', alt: 'Competition close-up of the robot' },
        { src: '/robot-cad.png', alt: 'Overall CAD model of the robot' },
      ],
      design: [
        { src: '/dispensing.png', alt: 'Servo dispensing mechanism CAD view' },
        { src: '/slide.png', alt: 'Curved slide CAD view' },
        { src: '/bottom-view.png', alt: 'Bottom view showing sensor layout' },
      ],
      team: '/team.jpg',
    },
  },
];

const experiences = [
  {
    title: 'Research Intern — Structural Modeling & FEA',
    org: 'PowerChina Co., Ltd',
    period: 'Feb 2025 – Jun 2025',
    bullets: [
      'Supported end-to-end engineering workflows by building an automated platform for 3D model generation, meshing, and FEA setup.',
      'Applied geometry-aware algorithms such as convex hull recognition and Douglas–Peucker smoothing to identify physical boundaries and reduce redundant meshing nodes.',
      'Deployed the workflow on active national projects, reducing redesign iteration time, lowering input errors, and improving robustness of the simulation process.',
    ],
  },
  {
    title: 'Research Assistant — Mechanical Stability Analysis & FEA Meshing Algorithms',
    org: 'Hohai University Research Group',
    period: 'Jun 2024 – Oct 2024',
    bullets: [
      'Developed a Python-based multi-layer meshing pipeline for complex polygonal geometries and improved robustness compared with commercial meshing plugins.',
      'Performed Abaqus-based structural stability analysis under hydrodynamic loading conditions and iterated mesh and model assumptions for reliable results.',
      'Packaged the algorithm into a reusable software module, contributing to cross-project reuse and supporting three granted invention patents in FEA meshing.',
    ],
  },
];

const contacts = [
  {
    label: 'Email',
    value: 'liwenfan2003@gmail.com',
    href: 'mailto:liwenfan2003@gmail.com',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/liwen-fan',
    href: 'https://www.linkedin.com/in/liwen-fan',
  },
];

const navItems: { key: PageKey; label: string }[] = [
  { key: 'home', label: 'Homepage' },
  { key: 'projects', label: 'Projects' },
  { key: 'experience', label: 'Experience' },
  { key: 'resume', label: 'Resume' },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="section-title">{children}</h2>;
}

function ImageCarousel({
  photos,
  currentIndex,
  onChange,
  heightClass,
}: {
  photos: CarouselPhoto[];
  currentIndex: number;
  onChange: (index: number) => void;
  heightClass: string;
}) {
  const total = photos.length;
  const safeIndex = total > 0 ? ((currentIndex % total) + total) % total : 0;
  const currentPhoto = photos[safeIndex];

  if (!currentPhoto) {
    return <div className={`carousel-frame ${heightClass} empty`}>No images available.</div>;
  }

  return (
    <div className="carousel-block">
      <div className={`carousel-frame ${heightClass}`}>
        <img src={currentPhoto.src} alt={currentPhoto.alt} className="carousel-image" />
        {total > 1 && (
          <>
            <button
              type="button"
              className="carousel-button left"
              onClick={() => onChange((safeIndex - 1 + total) % total)}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              className="carousel-button right"
              onClick={() => onChange((safeIndex + 1) % total)}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>
      {total > 1 && (
        <div className="carousel-dots">
          {photos.map((photo, index) => (
            <button
              type="button"
              key={photo.src}
              className={`carousel-dot ${index === safeIndex ? 'active' : ''}`}
              onClick={() => onChange(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PageShell({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="page-shell">
      <div className="page-header">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="page-title">{title}</h1>
        {description ? <p className="page-description">{description}</p> : null}
      </div>
      <div className="page-content">{children}</div>
    </section>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageKey>('home');
  const [conceptImageIndex, setConceptImageIndex] = useState(0);
  const [designImageIndex, setDesignImageIndex] = useState(0);

  function HomePage() {
    return (
      <PageShell eyebrow="Homepage" title="Liwen Fan">
        <div className="stack-layout">
          <div className="hero-grid">
            <div>
              <img src="/profile.jpg" alt="Liwen Fan" className="profile-image" />
            </div>
            <div>
              <p className="meta-text">Stanford University · M.S. in Mechanics and Computation</p>
              <p className="sub-meta-text">
                Seeking internships in mechanical engineering, robotics hardware, reliability, and testing.
              </p>
              <div className="content-section bordered-top">
                <SectionTitle>About Me</SectionTitle>
                <div className="paragraph-stack">
                  {aboutMeParagraphs.map((paragraph) => (
                    <p key={paragraph} className="body-text">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="content-section bordered-top">
            <SectionTitle>Education</SectionTitle>
            <div className="entry-stack">
              {education.map((item) => (
                <div key={item.school}>
                  <div className="entry-header">
                    <div>
                      <h3 className="entry-title">{item.school}</h3>
                      <p className="body-text compact">{item.degree}</p>
                      <p className="muted-text">{item.location}</p>
                    </div>
                    <div className="muted-text">{item.period}</div>
                  </div>
                  <div className="detail-row">
                    {item.details.map((detail) => (
                      <span key={detail} className="compact-text">
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="content-section bordered-top">
            <SectionTitle>Awards</SectionTitle>
            <ul className="simple-list">
              {awards.map((award) => (
                <li key={award} className="body-text compact">
                  {award}
                </li>
              ))}
            </ul>
          </div>

          <div className="content-section bordered-top">
            <SectionTitle>Contact Info</SectionTitle>
            <div className="contact-stack">
              {contacts.map((contact) => (
                <div key={contact.label} className="body-text compact">
                  <span className="contact-label">{contact.label}: </span>
                  <a href={contact.href} className="inline-link">
                    {contact.value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PageShell>
    );
  }

  function ProjectsPage() {
    return (
      <PageShell eyebrow="" title="Project">
        <div className="stack-layout large-gap">
          {projects.map((project) => (
            <div key={project.title} className="stack-layout medium-gap">
              <div>
                <p className="eyebrow">{project.orgCourse}</p>
                <h2 className="project-title">{project.title}</h2>
                <p className="muted-text">{project.tags}</p>
              </div>

              <div className="content-section bordered-top">
                <div className="two-column-grid">
                  <div>
                    <SectionTitle>Concept</SectionTitle>
                    <p className="body-text">{project.concept}</p>
                  </div>
                  <ImageCarousel
                    photos={project.images.concept}
                    currentIndex={conceptImageIndex}
                    onChange={setConceptImageIndex}
                    heightClass="carousel-medium"
                  />
                </div>
              </div>

              <div className="content-section bordered-top">
                <div className="two-column-grid">
                  <div>
                    <SectionTitle>Design</SectionTitle>
                    <p className="body-text">{project.design}</p>
                  </div>
                  <ImageCarousel
                    photos={project.images.design}
                    currentIndex={designImageIndex}
                    onChange={setDesignImageIndex}
                    heightClass="carousel-large"
                  />
                </div>
              </div>

              <div className="content-section bordered-top">
                <div className="two-column-grid">
                  <div>
                    <img
                      src={project.images.team}
                      alt="Team working with the robot during competition"
                      className="full-image"
                    />
                  </div>
                  <div className="stack-layout medium-gap">
                    <div>
                      <SectionTitle>Electrical Design</SectionTitle>
                      <p className="body-text">{project.electrical}</p>
                    </div>
                    <div>
                      <SectionTitle>Software Design</SectionTitle>
                      <p className="body-text">{project.software}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="content-section bordered-top">
                <SectionTitle>Result</SectionTitle>
                <p className="body-text">{project.result}</p>
              </div>
            </div>
          ))}
        </div>
      </PageShell>
    );
  }

  function ExperiencePage() {
    return (
      <PageShell
        eyebrow="Experience"
        title="Research and Engineering Experience"
        description="Work focused on simulation workflow automation, meshing algorithms, structural analysis, and reusable engineering tools."
      >
        <div className="entry-stack">
          {experiences.map((exp) => (
            <div key={exp.title} className="content-section bordered-top first-reset">
              <div className="entry-header">
                <div>
                  <h2 className="entry-title">{exp.title}</h2>
                  <p className="body-text compact">{exp.org}</p>
                </div>
                <div className="muted-text">{exp.period}</div>
              </div>
              <ul className="simple-list spaced-list">
                {exp.bullets.map((bullet) => (
                  <li key={bullet} className="body-text compact">
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </PageShell>
    );
  }

  function ResumePage() {
    return (
      <PageShell eyebrow="Resume" title="Resume" description="PDF version of my resume.">
        <div className="content-section bordered-top">
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="inline-link strong-link">
            Open Resume PDF
          </a>
        </div>
      </PageShell>
    );
  }

  function renderCurrentPage() {
    switch (currentPage) {
      case 'projects':
        return <ProjectsPage />;
      case 'experience':
        return <ExperiencePage />;
      case 'resume':
        return <ResumePage />;
      case 'home':
      default:
        return <HomePage />;
    }
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header-inner">
          <div>
            <div className="site-name">Liwen Fan</div>
            <div className="site-subtitle">Mechanical Design · FEA · Robotics</div>
          </div>
          <nav className="nav-row">
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setCurrentPage(item.key)}
                className={`nav-button ${currentPage === item.key ? 'active' : ''}`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>{renderCurrentPage()}</main>
    </div>
  );
}
