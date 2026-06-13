// Scroll Reveal Animation
const observeElements = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  document.querySelectorAll(".fade-in").forEach((element) => {
    observer.observe(element);
  });
};

// Navbar background on scroll
const handleNavbar = () => {
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(10, 10, 15, 0.8)";
      navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.5)";
    } else {
      navbar.style.background = "var(--glass-bg)";
      navbar.style.boxShadow = "var(--glass-shadow)";
    }
  });
};

// Show Toast Notification
const showToast = (message, type = "success") => {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Remove after 4 seconds
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
};

// Handle Contact Form Submission
const handleContactForm = () => {
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Sending...";
      submitBtn.disabled = true;

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        // Try to parse response safely
        let result = { message: "Message sent successfully." };
        try {
          result = await response.json();
        } catch (err) {
          // ignore JSON parse errors
        }

        if (response.ok) {
          showToast(result.message || "Message sent successfully.", "success");
          form.reset();
        } else {
          // Server returned an error - fall back to mailto so user can still reach you
          fallbackToMailClient(data);
          showToast(
            "Opened your mail client as a fallback. Please send the message.",
            "success",
          );
          form.reset();
        }
      } catch (error) {
        // Network or other error - gracefully fallback to opening user's mail client
        fallbackToMailClient(data);
        showToast(
          "Opened your mail client as a fallback. Please send the message.",
          "success",
        );
      } finally {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }
};

// Fallback: open user's default mail client with prefilled content
const fallbackToMailClient = (data) => {
  const to = "hello@lemuelackahblay.com";
  const subject = `Website message from ${data.name || "Visitor"}`;
  const bodyLines = [
    `Name: ${data.name || ""}`,
    `Email: ${data.email || ""}`,
    "",
    `${data.message || ""}`,
  ];
  const body = bodyLines.join("\n");
  const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  // Use window.open so the user sees the compose window; some browsers require a user gesture
  window.open(mailto, "_self");
};

// Typing Effect for Hero
const handleTypingEffect = () => {
  const words = [
    "Software Engineer",
    "Full-Stack Developer",
    "Creative Problem Solver",
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingElement = document.getElementById("typing-text");

  const type = () => {
    if (!typingElement) return;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 2000; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400; // Pause before typing next word
    }

    setTimeout(type, typeSpeed);
  };

  type();
};

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  observeElements();
  handleNavbar();
  handleContactForm();
  handleTypingEffect();
  handleProjectModals();
  initCustomCursor();
});

// ── Project Data ──
const projectData = {
  nexus: {
    tag: "Web App",
    title: "Nexus Productivity",
    subtitle:
      "A gamified, glassmorphic productivity platform that transforms your daily tasks into an engaging experience.",
    banner: "linear-gradient(135deg, #FF6B6B 0%, #556270 100%)",
    role: "Lead Frontend Developer — responsible for the complete UI/UX design and implementation including the glassmorphic component system, animated splash screen, onboarding tour, task management interface, and user profile customisation.",
    challenges:
      "The primary challenge was achieving a smooth, authentic glassmorphism effect that worked across browsers while maintaining high performance. A secondary challenge was designing an onboarding tour that correctly overlaid on top of glassmorphic elements without visual artifacts.",
    arch: "Single-page application built with vanilla HTML, CSS, and JavaScript. State is persisted in localStorage with a custom reactive state manager. The UI layer is decoupled from the data layer, enabling clean feature additions without refactoring.",
    tech: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "LocalStorage",
      "IntersectionObserver API",
    ],
    github: "https://github.com",
    demo: "#",
  },
  ecommerce: {
    tag: "Full Stack",
    title: "E-Commerce Dashboard",
    subtitle:
      "A real-time analytics and management dashboard for e-commerce businesses, featuring live data visualisation and order management.",
    banner: "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)",
    role: "Full-Stack Developer — designed the NestJS REST API architecture, built the React frontend with real-time chart components, and managed the PostgreSQL schema design and query optimisation.",
    challenges:
      "Achieving real-time data updates without overloading the server required implementing a debouncing strategy for socket events. Rendering hundreds of chart data points smoothly required virtualising the dataset using a sliding-window approach.",
    arch: "NestJS backend exposing a REST + WebSocket API. React frontend consuming data via React Query for server state. PostgreSQL database with indexed aggregations for dashboard metrics. Docker Compose for local and staging environments.",
    tech: [
      "NestJS",
      "React",
      "PostgreSQL",
      "WebSockets",
      "TypeScript",
      "Docker",
    ],
    github: "https://github.com",
    demo: "#",
  },
  social: {
    tag: "Social Platform",
    title: "Social Connect App",
    subtitle:
      "A community-first social networking application featuring real-time messaging, group channels, and rich user profiles.",
    banner: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    role: "Backend Developer & System Architect — designed the WebSocket event architecture for real-time chat, implemented the user authentication flow with JWT, and set up the MongoDB schema with optimised query patterns for feed generation.",
    challenges:
      "The main challenge was implementing an efficient, scalable real-time presence system (online/offline indicators) that updated instantly without polling. A secondary challenge was designing the notification fanout system for group channels with many members.",
    arch: "Node.js + Express backend with Socket.IO for real-time bidirectional communication. MongoDB for flexible document storage of posts, profiles, and messages. JWT-based stateless auth with refresh token rotation. Redis for session caching and pub/sub.",
    tech: ["Node.js", "Express", "Socket.IO", "MongoDB", "Redis", "JWT"],
    github: "https://github.com",
    demo: "#",
  },
};

// ── Modal Logic ──
const handleProjectModals = () => {
  const modal = document.getElementById("projectModal");
  const backdrop = modal.querySelector(".modal-backdrop");
  const closeBtn = document.getElementById("modalClose");

  const openModal = (projectKey) => {
    const p = projectData[projectKey];
    if (!p) return;

    // Populate
    document.getElementById("modalBanner").style.background = p.banner;
    document.getElementById("modalTag").textContent = p.tag;
    document.getElementById("modalTitle").textContent = p.title;
    document.getElementById("modalSubtitle").textContent = p.subtitle;
    document.getElementById("modalRole").textContent = p.role;
    document.getElementById("modalChallenges").textContent = p.challenges;
    document.getElementById("modalArch").textContent = p.arch;
    document.getElementById("modalGithub").href = p.github;
    document.getElementById("modalDemo").href = p.demo;

    const techContainer = document.getElementById("modalTech");
    techContainer.innerHTML = p.tech.map((t) => `<span>${t}</span>`).join("");

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  // Attach click to each project card
  document.querySelectorAll(".project-card[data-project]").forEach((card) => {
    card.addEventListener("click", () => openModal(card.dataset.project));
  });

  // Close triggers
  closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", closeModal);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
};

const initCustomCursor = () => {
  const cursor = document.getElementById("customCursor");
  const ring = cursor?.querySelector(".cursor-ring");
  const dot = cursor?.querySelector(".cursor-dot");
  if (!cursor || !ring || !dot) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  const ease = 0.16;

  const updateDot = (x, y) => {
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
  };

  const animateRing = () => {
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;
    requestAnimationFrame(animateRing);
  };

  document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    updateDot(mouseX, mouseY);
    cursor.style.opacity = "1";
  });

  const interactiveElements = document.querySelectorAll(
    "a, button, .btn, .card-icon-btn, .nav-links a, .social-bar-link, input, textarea",
  );

  interactiveElements.forEach((element) => {
    element.addEventListener("mouseenter", () =>
      cursor.classList.add("cursor-hover"),
    );
    element.addEventListener("mouseleave", () =>
      cursor.classList.remove("cursor-hover"),
    );
  });

  animateRing();
};


document.addEventListener('DOMContentLoaded',()=>{
 const t=document.querySelector('.nav-toggle');
 const n=document.querySelector('.nav-links');
 if(t && n){t.addEventListener('click',()=>n.classList.toggle('open'));}
});
