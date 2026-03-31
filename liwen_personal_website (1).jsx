import { useState, type ReactNode } from "react";

export default function LiwenPersonalWebsite() {
  const profileImage = "/mnt/data/biggame_profile.JPG";
  const resumeFile = "/mnt/data/Liwen Fan Resume3.27ME+hands-on.pdf";

  const [currentPage, setCurrentPage] = useState("home");
  const [conceptImageIndex, setConceptImageIndex] = useState(0);
  const [designImageIndex, setDesignImageIndex] = useState(0);

  const awards = [
    "Chinese National Scholarship (Top 1%)",
    "2024 Mathematical Contest in Modeling — Honorable Mention",
  ];

  const aboutMeParagraphs = [
    "I am a graduate student in Mechanics and Computation at Stanford University with experience in mechanical design, robotics systems, and simulation-driven engineering. My work spans finite element analysis (FEA), geometry-aware meshing algorithm development, and hands-on robotic system integration. I am particularly interested in mechanical engineering roles focused on hardware systems, including robotics, reliability, testing, and product development.",
    "Before Stanford, I completed a dual B.S. in Structural Engineering through Hohai University and Polytech Lille, where I built a strong foundation in mechanics, numerical simulation, and engineering analysis. During my undergraduate studies, I began working on FEA modeling and meshing methods, which led to research experience in developing geometry-aware meshing algorithms and Abaqus-based structural simulations.",
    "At Stanford, I have expanded this background toward more hardware-oriented engineering through robotics system design and implementation, integrating mechanical structures, sensors, and control logic into end-to-end systems. This transition reflects my growing focus on applying simulation and analysis to real-world mechanical and hardware problems.",
  ];

  const education = [
    {
      school: "Stanford University",
      degree: "M.S. in Mechanics and Computation",
      location: "Palo Alto, CA",
      period: "Sept. 2025 – Jun. 2027",
      details: ["GPA: 3.71/4.0"],
    },
    {
      school: "Hohai University & Polytech Lille",
      degree: "Dual B.S. in Structural Engineering (Joint Program)",
      location: "Nanjing, China & Lille, France",
      period: "Sept. 2021 – Jun. 2025",
      details: ["GPA: 3.78/4.0", "Rank: 1/75"],
    },
  ];

  const projects = [
    {
      orgCourse: "Stanford University - ME210",
      title: '"Joy of Curling" Autonomous DRIOD',
      tags: "Mechanical Design · Prototyping · Mechatronics · Sensor Integration · Control",
      concept:
        "An autonomous robot designed to complete a full task cycle: orient from a randomized start, follow taped paths using IR sensors, navigate to a target zone, launch pucks with a servo-actuated mechanism, and return to the starting line for reload. The system integrates drivetrain control, multi-sensor perception, and onboard Arduino control to achieve reliable task execution under competition constraints.",
      design:
        "The system uses a compact multi-layer chassis with four omni-wheels enabling omnidirectional motion (lateral, longitudinal, and in-place rotation). IR sensors are placed at the front, center, and rear for line following, while ultrasonic sensors are mounted on the left and rear for navigation. A rotating servo feeds pucks into a curved slide that converts rotation into a controlled release, improving stability and repeatability; the structure is simplified for fast prototyping and reliable assembly.",
      electrical:
        "Arduino-based system integrating ultrasonic sensors for orientation and IR sensors for line following. Motor drivers and servo actuation are coordinated for closed-loop navigation and timed puck release.",
      software:
        "State-machine control with four stages: orientation (ultrasonic alignment), line acquisition, line following with shooting, and return-to-start. Designed for robustness and repeatability under competition constraints.",
      result:
        "Completed full autonomous pipeline within the 2-minute limit, including orientation, line following, puck dispensing, and return. Ranked 5th out of 20 teams in the final checkoff.",
      images: {
        concept: [
          {
            src: "/mnt/data/1.JPG",
            alt: "Competition close-up of the robot",
          },
          {
            src: "/mnt/data/小车建模图.png",
            alt: "Overall CAD model of the robot",
          },
        ],
        design: [
          {
            src: "/mnt/data/dispensing图.png",
            alt: "Servo dispensing mechanism CAD view",
          },
          {
            src: "/mnt/data/slide图.png",
            alt: "Curved slide CAD view",
          },
          {
            src: "/mnt/data/底面图.png",
            alt: "Bottom view showing sensor layout",
          },
        ],
        team: "/mnt/data/3.jpg",
      },
    },
  ];

  const experiences = [
    {
      title: "Research Intern — Structural Modeling & FEA",
      org: "PowerChina Co., Ltd",
      period: "Feb 2025 – Jun 2025",
      bullets: [
        "Supported end-to-end engineering workflows by building an automated platform for 3D model generation, meshing, and FEA setup.",
        "Applied geometry-aware algorithms such as convex hull recognition and Douglas–Peucker smoothing to identify physical boundaries and reduce redundant meshing nodes.",
        "Deployed the workflow on active national projects, reducing redesign iteration time, lowering input errors, and improving robustness of the simulation process.",
      ],
    },
    {
      title: "Research Assistant — Mechanical Stability Analysis & FEA Meshing Algorithms",
      org: "Hohai University Research Group",
      period: "Jun 2024 – Oct 2024",
      bullets: [
        "Developed a Python-based multi-layer meshing pipeline for complex polygonal geometries and improved robustness compared with commercial meshing plugins.",
        "Performed Abaqus-based structural stability analysis under hydrodynamic loading conditions and iterated mesh and model assumptions for reliable results.",
        "Packaged the algorithm into a reusable software module, contributing to cross-project reuse and supporting three granted invention patents in FEA meshing.",
      ],
    },
  ];

  const contacts = [
    {
      label: "Email",
      value: "liwenfan2003@gmail.com",
      href: "mailto:liwenfan2003@gmail.com",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/liwen-fan",
      href: "https://www.linkedin.com/in/liwen-fan",
    },
  ];

  const navItems = [
    { key: "home", label: "Homepage" },
    { key: "projects", label: "Projects" },
    { key: "experience", label: "Experience" },
    { key: "resume", label: "Resume" },
  ];

  function NavButton({ pageKey, label }: { pageKey: string; label: string }) {
    const active = currentPage === pageKey;
    return (
      <button
        onClick={() => setCurrentPage(pageKey)}
        className={`border-b-2 px-1 pb-1 text-sm transition ${
          active
            ? "border-red-700 text-red-700"
            : "border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
        }`}
      >
        {label}
      </button>
    );
  }

  function SectionTitle({ children }: { children: ReactNode }) {
    return <h2 className="text-xl font-semibold text-neutral-900">{children}</h2>;
  }

  function ImageCarousel({
    photos,
    currentIndex,
    onChange,
    heightClass = "h-[360px]",
  }: {
    photos: Array<{ src: string; alt: string }>;
    currentIndex: number;
    onChange: (index: number) => void;
    heightClass?: string;
  }) {
    const total = photos.length;
    const safeIndex = total > 0 ? currentIndex % total : 0;
    const currentPhoto = photos[safeIndex];

    function goPrev() {
      onChange((safeIndex - 1 + total) % total);
    }

    function goNext() {
      onChange((safeIndex + 1) % total);
    }

    if (total === 0 || !currentPhoto) {
      return (
        <div
          className={`flex items-center justify-center rounded-sm border border-neutral-200 bg-neutral-50 text-sm text-neutral-500 ${heightClass}`}
        >
          No images available.
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className={`relative overflow-hidden rounded-sm border border-neutral-200 bg-white ${heightClass}`}>
          <img src={currentPhoto.src} alt={currentPhoto.alt} className="h-full w-full object-contain" />

          {total > 1 ? (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full border border-neutral-300 bg-white/90 px-3 py-2 text-sm text-neutral-700 shadow-sm transition hover:bg-white"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full border border-neutral-300 bg-white/90 px-3 py-2 text-sm text-neutral-700 shadow-sm transition hover:bg-white"
              >
                ›
              </button>
            </>
          ) : null}
        </div>

        {total > 1 ? (
          <div className="flex items-center justify-center gap-2">
            {photos.map((photo, index) => {
              const active = index === safeIndex;
              return (
                <button
                  key={photo.src}
                  type="button"
                  aria-label={`Go to image ${index + 1}`}
                  onClick={() => onChange(index)}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    active ? "bg-neutral-800" : "bg-neutral-300 hover:bg-neutral-400"
                  }`}
                />
              );
            })}
          </div>
        ) : null}
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
    children: ReactNode;
  }) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-12 md:py-16">
        <div className="max-w-3xl">
          <p className="text-sm text-neutral-500">{eyebrow}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">{title}</h1>
          {description ? <p className="mt-3 leading-8 text-neutral-700">{description}</p> : null}
        </div>
        <div className="mt-10">{children}</div>
      </section>
    );
  }

  function HomePage() {
    return (
      <PageShell eyebrow="Homepage" title="Liwen Fan">
        <div className="space-y-12">
          <div className="grid gap-8 md:grid-cols-[260px_minmax(0,1fr)] md:items-start">
            <div>
              <img
                src={profileImage}
                alt="Liwen Fan"
                className="w-full rounded-sm border border-neutral-200 object-cover"
              />
            </div>
            <div>
              <p className="text-sm text-neutral-600">
                Stanford University · M.S. in Mechanics and Computation
              </p>
              <p className="mt-3 text-sm text-neutral-700">
                Seeking internships in mechanical engineering, robotics hardware, reliability, and testing.
              </p>
              <div className="mt-6 border-t border-neutral-200 pt-6">
                <SectionTitle>About Me</SectionTitle>
                <div className="mt-4 space-y-4 text-neutral-700">
                  {aboutMeParagraphs.map((paragraph) => (
                    <p key={paragraph} className="leading-8">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-8">
            <SectionTitle>Education</SectionTitle>
            <div className="mt-6 space-y-8">
              {education.map((item) => (
                <div key={item.school}>
                  <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-neutral-900">{item.school}</h3>
                      <p className="mt-1 text-neutral-700">{item.degree}</p>
                      <p className="mt-1 text-sm text-neutral-500">{item.location}</p>
                    </div>
                    <div className="text-sm text-neutral-600">{item.period}</div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-4 text-sm text-neutral-700">
                    {item.details.map((detail) => (
                      <span key={detail}>{detail}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-neutral-200 pt-8">
            <SectionTitle>Awards</SectionTitle>
            <ul className="mt-5 space-y-2 text-neutral-700">
              {awards.map((award) => (
                <li key={award}>{award}</li>
              ))}
            </ul>
          </div>

          <div className="border-t border-neutral-200 pt-8">
            <SectionTitle>Contact Info</SectionTitle>
            <div className="mt-5 space-y-3 text-neutral-700">
              {contacts.map((contact) => (
                <div key={contact.label}>
                  <span className="font-medium text-neutral-900">{contact.label}: </span>
                  <a href={contact.href} className="underline underline-offset-4 hover:text-red-700">
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
        <div className="space-y-14">
          {projects.map((project) => (
            <div key={project.title} className="space-y-10">
              <div>
                <p className="text-sm text-neutral-500">{project.orgCourse}</p>
                <h2 className="mt-2 text-2xl font-semibold text-neutral-900">{project.title}</h2>
                <p className="mt-2 text-sm text-neutral-600">{project.tags}</p>
              </div>

              <div className="border-t border-neutral-200 pt-6">
                <div className="grid gap-8 md:grid-cols-2 md:items-start">
                  <div>
                    <SectionTitle>Concept</SectionTitle>
                    <p className="mt-4 leading-8 text-neutral-700">{project.concept}</p>
                  </div>
                  <div>
                    <ImageCarousel
                      photos={project.images.concept}
                      currentIndex={conceptImageIndex}
                      onChange={setConceptImageIndex}
                      heightClass="h-[360px] md:h-[390px]"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-8">
                <div className="grid gap-8 md:grid-cols-2 md:items-start">
                  <div>
                    <SectionTitle>Design</SectionTitle>
                    <p className="mt-4 leading-8 text-neutral-700">{project.design}</p>
                  </div>
                  <div>
                    <ImageCarousel
                      photos={project.images.design}
                      currentIndex={designImageIndex}
                      onChange={setDesignImageIndex}
                      heightClass="h-[420px] md:h-[460px]"
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-8">
                <div className="grid gap-8 md:grid-cols-2 md:items-start">
                  <div>
                    <img
                      src={project.images.team}
                      alt="Team working with the robot during competition"
                      className="w-full rounded-sm border border-neutral-200"
                    />
                  </div>
                  <div className="space-y-8">
                    <div>
                      <SectionTitle>Electrical Design</SectionTitle>
                      <p className="mt-4 leading-8 text-neutral-700">{project.electrical}</p>
                    </div>

                    <div>
                      <SectionTitle>Software Design</SectionTitle>
                      <p className="mt-4 leading-8 text-neutral-700">{project.software}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-8">
                <SectionTitle>Result</SectionTitle>
                <p className="mt-4 leading-8 text-neutral-700">{project.result}</p>
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
        <div className="space-y-10">
          {experiences.map((exp) => (
            <div key={exp.title} className="border-t border-neutral-200 pt-8 first:border-t-0 first:pt-0">
              <div className="flex flex-col gap-1 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900">{exp.title}</h2>
                  <p className="mt-1 text-neutral-700">{exp.org}</p>
                </div>
                <div className="text-sm text-neutral-600">{exp.period}</div>
              </div>
              <ul className="mt-5 space-y-3 text-neutral-700">
                {exp.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
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
        <div className="border-t border-neutral-200 pt-8">
          <a
            href={resumeFile}
            target="_blank"
            rel="noreferrer"
            className="text-neutral-900 underline underline-offset-4 hover:text-red-700"
          >
            Open Resume PDF
          </a>
        </div>
      </PageShell>
    );
  }

  function renderCurrentPage() {
    switch (currentPage) {
      case "projects":
        return <ProjectsPage />;
      case "experience":
        return <ExperiencePage />;
      case "resume":
        return <ResumePage />;
      case "home":
      default:
        return <HomePage />;
    }
  }

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 px-6 py-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="text-2xl font-semibold">Liwen Fan</div>
            <div className="mt-1 text-sm text-neutral-600">Mechanical Design · FEA · Robotics</div>
          </div>
          <nav className="flex flex-wrap gap-5">
            {navItems.map((item) => (
              <NavButton key={item.key} pageKey={item.key} label={item.label} />
            ))}
          </nav>
        </div>
      </header>

      <main>{renderCurrentPage()}</main>
    </div>
  );
}
