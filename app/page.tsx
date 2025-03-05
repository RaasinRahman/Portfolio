"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import { TypeAnimation } from "react-type-animation"
import { ChevronDown, Github, Linkedin, Mail, Moon, Sun, ArrowRight } from "lucide-react"
import { Phone } from "lucide-react"
import { useTheme } from "next-themes"

// Custom cursor component
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).tagName === "A" ||
        (e.target as HTMLElement).tagName === "BUTTON" ||
        (e.target as HTMLElement).closest("a") ||
        (e.target as HTMLElement).closest("button")
      ) {
        setIsPointer(true)
      } else {
        setIsPointer(false)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="hidden md:block fixed w-8 h-8 rounded-full pointer-events-none z-50 mix-blend-difference"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: "translate(-50%, -50%)",
          backgroundColor: isPointer ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.2)",
          transition: "width 0.3s, height 0.3s, background-color 0.3s",
          width: isPointer ? "50px" : "30px",
          height: isPointer ? "50px" : "30px",
        }}
      />
      <div
        className="hidden md:block fixed w-40 h-40 rounded-full pointer-events-none z-40 opacity-20"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(circle, rgba(255,0,128,0.8) 0%, rgba(255,0,128,0) 70%)",
          transition: "transform 0.1s ease-out",
        }}
      />
    </>
  )
}

// Project data
const projects = [
  {
    id: 1,
    title: "Chess.com Stats Analyzer",
    description:
      "A web application leveraging Chess.com's public API to fetch and analyze player data, including game history, win/loss ratios, and strategic patterns.",
    image: "/projectImages/chess.png",
    tags: ["JavaScript", "Chess.com API", "Data Visualization"],
    date: "Jan 2025",
  },
  {
    id: 2,
    title: "Sentiments and Trends on Sustainability",
    description:
      "Explored public sentiment, social network structures, and real-time trends around sustainability topics on social media platforms, focusing particularly on Twitter/X.",
    image: "/projectImages/sustainability.png",
    tags: ["Python", "TensorFlow", "NetworkX", "Tweepy", "Matplotlib"],
    date: "Sep 2024",
  },
  {
    id: 3,
    title: "HelloMessenger",
    description:
      "Inspired by the need for secure, decentralized communication, developed HelloMessenger using Web3 technologies for enhanced data privacy and user empowerment.",
    image: "/projectImages/hello.png",
    tags: ["React Native", "TypeScript", "JavaScript", "Firebase", "Git"],
    date: "Dec 2023",
    award: "Best Security Hack - CuseHacks Hackathon",
  },
]

// Experience data
const experiences = [
  {
    id: 1,
    role: "Founding Engineer & CTO",
    company: "PapeX",
    location: "Remote",
    period: "Oct 2024 – Present",
    description: [
      "Designed and implemented a Clover POS system application using Kotlin, facilitating automatic digital receipt generation and direct delivery to users' mobile apps built with React Native.",
      "Programmed real-time digital receipt transmission and transaction data synchronization via Clover's REST API.",
      "Streamlined customer checkout processes and enhanced user experience by integrating advanced POS functionalities in a startup setting.",
    ],
    icon: "💼",
  },
  {
    id: 2,
    role: "Full Stack Software Engineer Intern",
    company: "Fidelity Investments",
    location: "Merrimack, NH",
    period: "June 2024 – Aug 2024",
    description: [
      "Enhanced a security web application by orchestrating JavaScript-based Azure Functions, integrating with Power Apps and Microsoft's Dataverse to efficiently manage data for over 2,000 users.",
      "Built custom connectors in Power Automate using C# to interface with various APIs, enhancing automation and reducing manual data entry by 20%.",
      "Leveraged Microsoft Graph API to integrate essential data and services, streamlining user experience and operational processes.",
    ],
    icon: "🏢",
  },
  {
    id: 3,
    role: "Software Engineer Intern",
    company: "Suptho",
    location: "Miami, FL",
    period: "Oct 2023 – Jan 2024",
    description: [
      "Designed and implemented seamless integration of frontend and backend components using React Native and TypeScript, ensuring optimal performance and user experience across the application.",
      "Architected and implemented GraphQL mutations to handle complex social interactions, including likes, comments, friend requests, and notifications, improving system efficiency and scalability.",
      "Collaborated with cross-functional teams to deliver features on time, utilizing Agile methodologies and version control systems to maintain a clean and organized codebase.",
    ],
    icon: "🌴",
  },
]

// Skills data
const skills = [
  {
    category: "Languages",
    items: [
      "Java",
      "Python",
      "JavaScript",
      "C++",
      "C#",
      "TypeScript",
      "Swift",
      "Kotlin",
      "SQL",
      "GraphQL",
      "HTML/CSS",
    ],
  },
  { category: "Frameworks", items: ["React Native", "Angular", "React", "Next.js"] },
  { category: "Developer Tools", items: ["Git", "Docker", "Kubernetes", "REST APIs"] },
  { category: "Cloud & DevOps", items: ["AWS", "Azure"] },
]

export default function Home() {
  const [mounted, setMounted] = useState(false)
  const [activeProject, setActiveProject] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState("All")
  const [visibleSection, setVisibleSection] = useState("hero")

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  const { scrollYProgress } = useScroll()
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95])

  const aboutRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const experienceRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  // Parallax effect for hero section
  const heroBackgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  // Enhanced intersection observer to detect visible section more accurately
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Track all section intersections with their ratios
      const intersectionRatios = {
        hero: 0,
        about: 0,
        projects: 0,
        experience: 0,
        contact: 0
      };
      
      // Create observer with more sensitive settings
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Update ratio for the current section
            if (entry.target.id) {
              const targetId = entry.target.id as keyof typeof intersectionRatios;
              // When a section enters or exits viewport
              intersectionRatios[targetId] = entry.intersectionRatio;
              
              // Immediately find the section with the highest visibility ratio
              let maxSection = "hero";
              let maxRatio = 0;
              
              Object.entries(intersectionRatios).forEach(([section, ratio]) => {
                if (ratio > maxRatio) {
                  maxRatio = ratio;
                  maxSection = section;
                }
              });
              
              // Special case: if we're at the top of the page, highlight hero
              if (window.scrollY < 100) {
                maxSection = "hero";
              }
              
              // Update the visible section with more sensitivity for all sections
              if ((maxRatio > 0.05 || ["hero", "about"].includes(maxSection)) && maxSection !== visibleSection) {
                // Update the visible section state - immediately activate About section with even lower threshold
                setVisibleSection(maxSection);
              }
            }
          });
        },
        { 
          threshold: [0, 0.05, 0.1, 0.15, 0.2], // Lower thresholds for more sensitive detection
          rootMargin: "-5% 0px -5% 0px" // Less aggressive margin to better detect sections
        }
      );

      const sections = [
        document.getElementById("hero"),
        document.getElementById("about"),
        document.getElementById("projects"),
        document.getElementById("experience"),
        document.getElementById("contact"),
      ];

      sections.forEach((section) => {
        if (section) observer.observe(section);
      });

      // Enhanced scroll tracking for better section detection
      const handleScroll = () => {
        // If we're at the very top, always highlight hero
        if (window.scrollY < 50) {
          setVisibleSection("hero");
          return;
        }
        
        // If we're at the very bottom, highlight contact
        const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
        if (isAtBottom) {
          setVisibleSection("contact");
          return;
        }
        
        // Check if we're in the About section area
        const aboutSection = document.getElementById("about");
        if (aboutSection) {
          const aboutRect = aboutSection.getBoundingClientRect();
          // If About section is mostly visible in the viewport
          if (aboutRect.top < window.innerHeight/2 && aboutRect.bottom > window.innerHeight/3) {
            setVisibleSection("about");
            return;
          }
        }
        
        // Check other sections similarly
        ["projects", "experience"].forEach(sectionId => {
          const section = document.getElementById(sectionId);
          if (section) {
            const rect = section.getBoundingClientRect();
            // If section is partially visible in the viewport
            if (rect.top < window.innerHeight*0.7 && rect.bottom > window.innerHeight*0.3) {
              setVisibleSection(sectionId);
            }
          }
        });
      };
      
      window.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        sections.forEach((section) => {
          if (section) observer.unobserve(section);
        });
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [])

  // Filter projects
  const filteredProjects =
    activeFilter === "All" ? projects : projects.filter((project) => project.tags.includes(activeFilter))

  // Get all unique tags for filter
  const allTags = ["All", ...Array.from(new Set(projects.flatMap((project) => project.tags)))]

  // Don't render UI elements that depend on theme until mounted
  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-gray-900"></div>
  }

  return (
    <div className="min-h-screen">
      <CustomCursor />

      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text"
            >
              Raasin Rahman
            </motion.div>

            <nav className="hidden md:flex items-center space-x-8">
              {["hero", "about", "projects", "experience", "contact"].map((section, index) => (
                <motion.a
                  key={section}
                  href={`#${section}`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={(e) => {
                    // Smooth scroll and update active section
                    e.preventDefault();
                    
                    // Immediately update visible section to only highlight this link
                    setVisibleSection(section);
                    
                    const element = document.getElementById(section);
                    if (element) {
                      // Smooth scroll to the section
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className={`relative text-sm font-medium transition-colors hover:text-pink-500 ${
                    visibleSection === section ? "text-pink-500" : ""
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 overflow-hidden">
                    {visibleSection === section && (
                      <motion.div
                        layoutId="activeSection"
                        className="h-full w-full bg-gradient-to-r from-pink-500 to-violet-500"
                        initial={{ opacity: 0, x: "-100%" }}
                        animate={{ opacity: 1, x: "0%" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    )}
                  </div>
                </motion.a>
              ))}
            </nav>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            <motion.div className="absolute inset-0 z-0" style={{ y: heroBackgroundY }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
                {/* Animated background shapes */}
                {Array.from({ length: 20 }).map((_, i) => {
                  const x = typeof window !== "undefined" ? Math.random() * window.innerWidth : 0;
                  const y = typeof window !== "undefined" ? Math.random() * window.innerHeight : 0;
                  const scale = Math.random() * 0.5 + 0.5;

                  return (
                    <motion.div
                      key={i}
                      className="absolute rounded-full bg-gradient-to-br from-pink-400 to-purple-500 opacity-10 dark:opacity-20"
                      initial={{
                        x: x,
                        y: y,
                        scale: scale,
                      }}
                      animate={{
                        x: [x, Math.random() * window.innerWidth],
                        y: [y, Math.random() * window.innerHeight],
                        rotate: Math.random() * 360,
                      }}
                      transition={{
                        duration: Math.random() * 20 + 20,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                      }}
                      style={{
                        width: `${Math.random() * 300 + 50}px`,
                        height: `${Math.random() * 300 + 50}px`,
                        filter: "blur(40px)",
                      }}
                    />
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              className="container mx-auto px-4 z-10 text-center"
              style={{ opacity: heroOpacity, scale: heroScale }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6"
              >
                <h1 className="text-4xl md:text-7xl font-bold mb-4">
                  <span className="block">Hi, I'm</span>
                  <TypeAnimation
                    sequence={[
                      "Raasin Rahman",
                      1000,
                      "a Developer",
                      1000,
                      "a Problem Solver",
                      1000,
                      "an Innovator",
                      1000,
                    ]}
                    wrapper="span"
                    speed={50}
                    repeat={Number.POSITIVE_INFINITY}
                    className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text"
                  />
                </h1>
                <motion.p
                  className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.5 }}
                >
                  Full Stack Software Engineer specializing in modern web and mobile development technologies.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                className="flex justify-center space-x-4 mt-8"
              >
                <Link href="#about" className="group">
                  <motion.button
                    className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium transition-all hover:shadow-lg hover:shadow-pink-500/30 dark:hover:shadow-pink-700/30"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Explore My Work
                  </motion.button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 2.5 }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              >
                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <ChevronDown className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          {/* About Section */}
          <section id="about" ref={aboutRef} className="py-20 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 opacity-50 dark:opacity-100" />

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-16 text-center"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-4 inline-block bg-gradient-to-r from-pink-500 to-violet-500 text-transparent bg-clip-text">
                  About Me
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-violet-500 mx-auto mt-2" />
              </motion.div>

              <div className="grid md:grid-cols-2 gap-16 md:gap-20 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="flex items-center justify-center"
                >
                  <div className="relative w-96 h-96">
                    <div className="absolute -inset-3 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full opacity-15 blur-lg" />
                    <div className="relative w-full h-full overflow-hidden rounded-full border-4 border-white dark:border-gray-800 shadow-2xl group">
                      <Image
                        src="/images/raasin.png"
                        alt="Raasin Rahman"
                        fill
                        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                        priority
                        quality={95}
                        style={{ filter: 'brightness(1.03)' }}
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl md:text-3xl font-bold">
                    Computer Science Student & <span className="text-pink-500">Full Stack Developer</span>
                  </h3>

                  <p className="text-gray-700 dark:text-gray-300">
                    I'm a Computer Science student at{" "}
                    <span className="font-semibold text-violet-600 dark:text-violet-400">Syracuse University</span> with
                    professional experience as a Full Stack Software Engineer, including my time on the Cloud and Platform Engineering team at Fidelity Investments.
                    I'm also the Founding Engineer and CTO at PapeX, where I lead the development of modern web and mobile applications using technologies like{" "}
                    <span className="font-semibold text-pink-500">React Native</span>,{" "}
                    <span className="font-semibold text-pink-500">TypeScript</span>, and{" "}
                    <span className="font-semibold text-green-500">Next.js</span>. My expertise extends to cloud services such as <span className="font-semibold text-green-500">AWS</span>, <span className="font-semibold text-green-500">Kubernetes</span>, and <span className="font-semibold text-green-500">Docker</span>, and database technologies like <span className="font-semibold text-blue-500">PostgreSQL</span>, <span className="font-semibold text-blue-500">MongoDB</span>, and <span className="font-semibold text-blue-500">DynamoDB</span>.
                    My passion lies in creating efficient, user-friendly applications that solve real-world problems. Having worked with both startups and established companies, I bring a versatile and comprehensive approach to software development, blending technical excellence with a deep understanding of business needs.
                  </p>

                  <div className="pt-4">
                    <h4 className="text-lg font-semibold mb-4">My Skills</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {skills.slice(0, 2).map((skillGroup, index) => (
                        <div key={index}>
                          <h5 className="font-medium text-gray-800 dark:text-gray-200 mb-2">{skillGroup.category}</h5>
                          <div className="space-y-2">
                            {skillGroup.items.slice(0, 4).map((skill, i) => (
                              <motion.div
                                key={i}
                                className="relative h-8 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                transition={{ duration: 1, delay: i * 0.1 }}
                                viewport={{ once: true }}
                              >
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full"
                                  initial={{ width: 0 }}
                                  whileInView={{ width: "100%" }}
                                  transition={{ duration: 1.5, delay: i * 0.1 }}
                                  viewport={{ once: true }}
                                />
                                <div className="absolute inset-0 flex items-center px-4">
                                  <span className="text-sm font-medium text-white z-10">{skill}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link href="#projects">
                      <motion.button
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium flex items-center gap-2 group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        View My Projects
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" ref={projectsRef} className="py-20 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 opacity-50 dark:opacity-100" />

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-16 text-center"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-4 inline-block bg-gradient-to-r from-violet-500 to-indigo-500 text-transparent bg-clip-text">
                  Featured Projects
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 mx-auto mt-2" />
                <p className="max-w-2xl mx-auto mt-4 text-gray-600 dark:text-gray-300">
                  A showcase of my recent work spanning web development, data analysis, and mobile applications.
                </p>
              </motion.div>

              {/* Project filters */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex flex-wrap justify-center gap-2 mb-12"
              >
                {allTags.map((tag, index) => (
                  <motion.button
                    key={tag}
                    onClick={() => setActiveFilter(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeFilter === tag
                        ? "bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    {tag}
                  </motion.button>
                ))}
              </motion.div>

              {/* Projects grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                <AnimatePresence>
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative"
                    >
                      <div
                        className="relative overflow-hidden rounded-xl cursor-pointer shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                        onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
                      >
                        {/* Subtle overlay that's always visible */}
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 z-10" />
                        
                        {/* Stronger overlay that appears on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600 opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-20"
                          whileHover={{ opacity: 0.85 }}
                        />

                        {/* Project image */}
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={project.image}
                            alt={project.title}
                            width={800}
                            height={600}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            priority={project.id === 1}
                          />
                        </div>

                        {/* Project info that appears on hover */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <h3 className="text-xl font-bold text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{project.title}</h3>
                          <p className="text-white/90 text-sm line-clamp-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">{project.description}</p>

                          <div className="flex flex-wrap gap-2 mt-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-100">
                            {project.tags.slice(0, 3).map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                                +{project.tags.length - 3} more
                              </span>
                            )}
                          </div>

                          <button className="mt-4 px-4 py-2 bg-white text-indigo-600 rounded-full text-sm font-medium transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-150 hover:bg-opacity-90">
                            View Details
                          </button>
                        </div>
                      </div>

                      {/* Project details modal */}
                      <AnimatePresence>
                        {activeProject === project.id && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-50 flex items-center justify-center p-4"
                            onClick={(e) => {
                              if (e.target === e.currentTarget) setActiveProject(null);
                            }}
                          >
                            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
                            <motion.div 
                              className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden max-w-xl w-full mx-auto max-h-[90vh] overflow-y-auto"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="relative h-48 overflow-hidden">
                                <Image
                                  src={project.image}
                                  alt={project.title}
                                  fill
                                  className="object-cover"
                                />
                                <div className="absolute top-0 right-0 p-2">
                                  <button
                                    onClick={() => setActiveProject(null)}
                                    className="p-2 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 transition-colors"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
                                      viewBox="0 0 20 20"
                                      fill="currentColor"
                                    >
                                      <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              <div className="p-6">
                                <div className="mb-4">
                                  <h3 className="text-xl font-bold">{project.title}</h3>
                                  <p className="text-gray-600 dark:text-gray-300 text-sm">{project.date}</p>
                                </div>

                                <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

                                {project.award && (
                                  <div className="mb-4 p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                                    <p className="text-indigo-700 dark:text-indigo-300 text-sm font-medium">
                                      🏆 {project.award}
                                    </p>
                                  </div>
                                )}

                                <div className="mt-4">
                                  <h4 className="font-medium mb-2">Technologies</h4>
                                  <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, i) => (
                                      <span
                                        key={i}
                                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs"
                                      >
                                        {tag}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" ref={experienceRef} className="py-20 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 opacity-50 dark:opacity-100" />

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-16 text-center"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-4 inline-block bg-gradient-to-r from-indigo-500 to-pink-500 text-transparent bg-clip-text">
                  Work Experience
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto mt-2" />
              </motion.div>

              {/* Timeline */}
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-0 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-indigo-500 to-pink-500 transform md:translate-x-px" />

                {/* Experience items */}
                {experiences.map((experience, index) => (
                  <motion.div
                    key={experience.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className={`relative mb-12 md:mb-24 ${
                      index % 2 === 0 ? "md:pr-12 md:ml-auto md:mr-0" : "md:pl-12 md:ml-0 md:mr-auto"
                    } md:w-1/2 pl-10 md:pl-0 text-left`}
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-0 md:left-auto ${
                        index % 2 === 0 ? "md:right-0 md:translate-x-1/2" : "md:left-0 md:-translate-x-1/2"
                      } top-0 w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-4 border-indigo-500 z-10 flex items-center justify-center text-lg`}
                    >
                      {experience.icon}
                    </div>

                    {/* Content card */}
                    <div className="relative">
                      <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-xl opacity-20 blur-lg" />
                      <div className="relative bg-white dark:bg-gray-800 p-5 md:p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow text-left">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4 gap-2">
                          <div>
                            <h3 className="text-xl font-bold">{experience.role}</h3>
                            <p className="text-gray-800 dark:text-gray-200 font-medium mt-1">{experience.company}</p>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{experience.location}</p>
                          </div>
                          <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium whitespace-nowrap self-start">
                            {experience.period}
                          </span>
                        </div>

                        <ul className="space-y-3 text-gray-700 dark:text-gray-300 mt-5">
                          {experience.description.map((item, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-indigo-500 mr-3 text-lg">•</span>
                              <span className="text-sm md:text-base">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" ref={contactRef} className="py-20 md:py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 opacity-50 dark:opacity-100" />

            <div className="container mx-auto px-4 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-16 text-center"
              >
                <h2 className="text-3xl md:text-5xl font-bold mb-4 inline-block bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
                  Get In Touch
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-pink-500 to-indigo-500 mx-auto mt-2" />
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                  <div className="space-y-6">
                    <motion.div className="flex items-center gap-4" whileHover={{ x: 5 }}>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 flex items-center justify-center text-white">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                        <a
                          href="mailto:raasinr@gmail.com"
                          className="text-lg font-medium hover:text-pink-500 transition-colors"
                        >
                          raasinr@gmail.com
                        </a>
                      </div>
                    </motion.div>

                    <motion.div className="flex items-center gap-4" whileHover={{ x: 5 }}>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 flex items-center justify-center text-white">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                        <a href="tel:7815306734" className="text-lg font-medium hover:text-pink-500 transition-colors">
                          781-530-6734
                        </a>
                      </div>
                    </motion.div>

                    <motion.div className="flex items-center gap-4" whileHover={{ x: 5 }}>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 flex items-center justify-center text-white">
                        <Linkedin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">LinkedIn</p>
                        <a
                          href="https://linkedin.com/in/raasin/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-medium hover:text-pink-500 transition-colors"
                        >
                          linkedin.com/in/raasin
                        </a>
                      </div>
                    </motion.div>

                    <motion.div className="flex items-center gap-4" whileHover={{ x: 5 }}>
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-indigo-500 flex items-center justify-center text-white">
                        <Github className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">GitHub</p>
                        <a
                          href="https://github.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-lg font-medium hover:text-pink-500 transition-colors"
                        >
                          GitHub Profile
                        </a>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <div className="relative">
                    <div className="absolute -inset-4 bg-gradient-to-r from-pink-500 to-indigo-500 rounded-xl opacity-20 blur-lg" />
                    <div className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700">
                      <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

                      <form className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Name
                          </label>
                          <motion.div whileFocus={{ scale: 1.01 }}>
                            <input
                              type="text"
                              id="name"
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 transition-all"
                              placeholder="Your name"
                            />
                          </motion.div>
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                          </label>
                          <motion.div whileFocus={{ scale: 1.01 }}>
                            <input
                              type="email"
                              id="email"
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 transition-all"
                              placeholder="Your email"
                            />
                          </motion.div>
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-sm font-medium mb-1">
                            Message
                          </label>
                          <motion.div whileFocus={{ scale: 1.01 }}>
                            <textarea
                              id="message"
                              rows={4}
                              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:focus:ring-pink-400 transition-all resize-none"
                              placeholder="Your message"
                            />
                          </motion.div>
                        </div>

                        <motion.button
                          type="submit"
                          className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-medium hover:shadow-lg hover:shadow-pink-500/30 dark:hover:shadow-pink-700/30 transition-all relative overflow-hidden group"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <span className="relative z-10">Send Message</span>
                          <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.button>
                      </form>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="py-8 border-t border-gray-200 dark:border-gray-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-50/50 to-indigo-50/50 dark:from-gray-900 dark:to-gray-800 opacity-50" />

            <div className="container mx-auto px-4 relative">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className="mb-4 md:mb-0"
                >
                  <p className="text-xl font-bold bg-gradient-to-r from-pink-500 to-indigo-500 text-transparent bg-clip-text">
                    Raasin Rahman
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} All rights reserved.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex space-x-4"
                >
                  <a
                    href="mailto:raasinr@gmail.com"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-indigo-500 hover:text-white transition-colors"
                    aria-label="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com/in/raasin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-indigo-500 hover:text-white transition-colors"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://github.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gradient-to-r hover:from-pink-500 hover:to-indigo-500 hover:text-white transition-colors"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </motion.div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}

