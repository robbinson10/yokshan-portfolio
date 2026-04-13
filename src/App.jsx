import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedinIn } from 'react-icons/fa';
import { FiMail, FiChevronDown } from 'react-icons/fi';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState(''); // '', 'sending', 'success', 'error'

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('sending');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "ea58b22d-d934-49ad-b3a1-d6eec660208b", 
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Clear the form
        setTimeout(() => setSubmitStatus(''), 5000); // Hide success message after 5s
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    /* Changed bg-slate-950 to bg-black */
    <div className="bg-black text-white overflow-hidden">
      
      {/* --- NAVIGATION --- */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen
            ? 'bg-black/80 backdrop-blur-md' /* Restored the 80% opacity for the perfect glass effect! */
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="#" className="text-white font-bold text-xl tracking-tight hover:text-cyan-400 transition-colors cursor-pointer">
                YH
              </a>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors relative group cursor-pointer"
                  >
                    {item}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></span>
                  </a>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                className="text-gray-300 hover:text-white focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
                    <path d="M4 12h16"></path>
                    <path d="M4 18h16"></path>
                    <path d="M4 6h16"></path>
                  </svg>
                )}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-black/80 backdrop-blur-md"> {/* Restored 80% opacity here too! */}
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {['About', 'Experience', 'Projects', 'Skills', 'Education', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-cyan-400 block px-3 py-2 rounded-md text-base font-medium transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        
        {/* Exact background DOM structure from your screenshot */}
        <div className="absolute inset-0 z-0">
          {/* Bottom layer: Dark Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-[0.92]"></div>
          {/* Top layer: Your image set to 15% opacity */}
          <img alt="Neural Network Background" className="w-full h-full object-cover opacity-15" src="/background.jpg" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* ONE animation wrapper for everything - Screenshot 248 */}
          <div className="animate-fade-up">
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-gradient-to-r from-white via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
              Yokshan Hathile
            </h1>

            <div className="text-2xl md:text-3xl text-cyan-400 mb-5 font-semibold">
              AI Engineer | Generative AI & Computer Vision
            </div>

            <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto mb-3 leading-relaxed font-medium opacity-70">
              Designing production-ready AI systems with LLMs & Vision
            </p>

            <p className="text-base md:text-lg text-cyan-300/60 max-w-2xl mx-auto mb-12 leading-relaxed">
              Built production-grade AI systems at KPIT Technologies
            </p>

            <div className="flex justify-center gap-8 mb-12">
              <a href="https://github.com/robbinson10" target="_blank" rel="noopener noreferrer" className="group relative p-4 bg-white/10 hover:bg-cyan-400 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/50" aria-label="GitHub">
                <FaGithub className="w-7 h-7 text-white" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">GitHub</span>
              </a>

              <a href="https://www.linkedin.com/in/yokshanhathile" target="_blank" rel="noopener noreferrer" className="group relative p-4 bg-white/10 hover:bg-cyan-400 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/50" aria-label="LinkedIn">
                <FaLinkedinIn className="w-7 h-7 text-white" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">LinkedIn</span>
              </a>

              <a href="mailto:yokshanh@gmail.com" className="group relative p-4 bg-white/10 hover:bg-cyan-400 rounded-full transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-400/50" aria-label="Email">
                <FiMail className="w-7 h-7 text-white" />
                <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Contact</span>
              </a>
            </div>

            {/* CTA */}
            <a 
              href="#projects"
              className="inline-block px-8 py-4 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-500 transition-all duration-300 hover:scale-105 shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/70 text-lg cursor-pointer"
            >
              View My Projects
            </a>
          </div>

        </div>

        {/* Bouncing Arrow Link */}
        <a 
          href="#about" 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white animate-bounce hover:text-cyan-400 transition-colors cursor-pointer" 
        >
          <FiChevronDown size={32} />
        </a>

      </section>

      {/* --- ABOUT SECTION --- */}
      {/* Exact gradient from DevTools: from-black to-gray-900 */}
      <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900 relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">About Me</h2>
            <div className="w-20 h-1 bg-cyan-400 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-5 text-left">
              {/* Changed text-slate-300 to text-gray-300 */}
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm an AI Engineer focused on building real-world systems using <span className="text-cyan-400 font-semibold">Generative AI</span>, <span className="text-cyan-400 font-semibold">LLMs</span>, and <span className="text-cyan-400 font-semibold">Computer Vision</span>.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                At KPIT Technologies, I built production-grade AI pipelines for image and video understanding, including SAM-based segmentation, video mask propagation, and RAG systems using LlamaIndex and LangChain—improving annotation efficiency and enabling scalable AI deployment.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                I focus on designing scalable systems, optimizing performance, and turning AI models into real-world products.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Completed M.Tech in Computer Science & Engineering (Information Security & Privacy) from SVNIT Surat.
              </p>
            </div>
            
            <div className="relative">
              <img alt="AI Visualization" className="rounded-lg shadow-2xl" src="/about-image.jpg" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            {/* Changed bg-slate-800 to bg-gray-800 */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:transform hover:scale-105">
              <div className="text-cyan-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"></path><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"></path><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"></path><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"></path><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"></path><path d="M3.477 10.896a4 4 0 0 1 .585-.396"></path><path d="M19.938 10.5a4 4 0 0 1 .585.396"></path><path d="M6 18a4 4 0 0 1-1.967-.516"></path><path d="M19.967 17.484A4 4 0 0 1 18 18"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI & Machine Learning</h3>
              <p className="text-gray-400">Built production-grade LLM pipelines, RAG systems, and GenAI applications</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:transform hover:scale-105">
               <div className="text-cyan-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Computer Vision</h3>
              <p className="text-gray-400">Developed SAM-based segmentation and video tracking pipelines for real-world datasets</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:transform hover:scale-105">
               <div className="text-cyan-400 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path></svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Performance Optimization</h3>
              <p className="text-gray-400">Optimized AI systems for low-latency inference and scalable deployment</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE SECTION --- */}
      <section id="experience" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Experience</h2>
            <div className="w-20 h-1 bg-cyan-400 mx-auto"></div>
          </div>

          {/* Changed max-w-4xl to max-w-6xl to give the sidebar layout more horizontal room */}
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all duration-300">
              
              {/* Main Grid: 1 column on mobile, 12 columns on desktop */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

                {/* LEFT COLUMN: Metadata & Technologies */}
                <div className="lg:col-span-4 flex flex-col space-y-6">
                  
                  {/* Title & Company */}
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">AI/ML Intern</h3>
                    <div className="text-cyan-400 font-medium mb-4 text-sm">Gen AI, Computer Vision & LLM Systems</div>
                    
                    <div className="flex items-center gap-2 text-cyan-400 mb-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase flex-shrink-0">
                        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                        <rect width="20" height="14" x="2" y="6" rx="2"></rect>
                      </svg>
                      <span className="font-semibold">KPIT Technologies</span>
                    </div>
                  </div>

                  {/* Dates & Location */}
                  <div className="flex flex-col gap-2 text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar flex-shrink-0">
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                      </svg>
                      <span>July 2024 - Dec 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin flex-shrink-0">
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>Pune, Maharashtra</span>
                    </div>
                  </div>

                  {/* Summary Sentence */}
                  <p className="text-gray-300 text-sm leading-relaxed pb-6 border-b border-gray-700">
                    Worked on production-grade AI systems for autonomous driving and LLM-based applications.
                  </p>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Technologies:</h4>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-xs border border-cyan-400/20">SAM</span>
                      <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-xs border border-cyan-400/20">FastAPI</span>
                      <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-xs border border-cyan-400/20">LangChain</span>
                      <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-xs border border-cyan-400/20">LangGraph</span>
                      <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-xs border border-cyan-400/20">LlamaIndex</span>
                      <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-xs border border-cyan-400/20">Unity3D</span>
                      <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-xs border border-cyan-400/20">Docker</span>
                      <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-xs border border-cyan-400/20">PyTorch</span>
                      <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-xs border border-cyan-400/20">ChromaDB</span>
                      <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-xs border border-cyan-400/20">JavaScript</span>
                      <span className="px-3 py-1 bg-cyan-400/10 text-cyan-400 rounded-full text-xs border border-cyan-400/20">AWS EC2</span>
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN: Key Achievements */}
                <div className="lg:col-span-8">
                  <h4 className="text-lg font-semibold text-white mb-5">Key Achievements:</h4>
                  <ul className="space-y-4">
                    <li className="flex gap-3 text-gray-300">
                      <span className="text-cyan-400 mt-1.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </span>
                      <span className="leading-relaxed">
                        Led development of an AI annotation platform using <span className="font-semibold text-cyan-400">SAM-based segmentation</span> and video mask propagation, reducing labeling effort by <span className="font-semibold text-cyan-400">60%</span> and improving temporal consistency.
                      </span>
                    </li>
                    <li className="flex gap-3 text-gray-300">
                      <span className="text-cyan-400 mt-1.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </span>
                      <span className="leading-relaxed">
                        Designed low-latency <span className="font-semibold text-cyan-400">FastAPI</span> model-serving APIs with persistent GPU states, improving response time by <span className="font-semibold text-cyan-400">40%.</span>
                      </span>
                    </li>
                    <li className="flex gap-3 text-gray-300">
                      <span className="text-cyan-400 mt-1.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </span>
                      <span className="leading-relaxed">
                        Designed and implemented a text-to-mask segmentation workflow using <span className="font-semibold text-cyan-400">SAM</span> for natural language-driven labeling, accelerating multi-class semantic dataset creation.
                      </span>
                    </li>
                    <li className="flex gap-3 text-gray-300">
                      <span className="text-cyan-400 mt-1.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </span>
                      <span className="leading-relaxed">
                        Engineered an Android-based ADAS learning application in <span className="font-semibold text-cyan-400">Unity3D</span> with an integrated <span className="font-semibold text-cyan-400">RAG chatbot</span> using LlamaIndex and LangChain for contextual Q&A.
                      </span>
                    </li>
                    <li className="flex gap-3 text-gray-300">
                      <span className="text-cyan-400 mt-1.5 flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </span>
                      <span className="leading-relaxed">
                        Architected modular <span className="font-semibold text-cyan-400">LLM pipelines</span> with retrieval, tool chaining, and memory handling using <span className="font-semibold text-cyan-400">LangGraph</span> improving response consistency and reducing hallucinations in production systems.
                      </span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Featured Projects</h2>
            <div className="w-20 h-1 bg-cyan-400 mx-auto"></div>
          </div>

          {/* SCROLLABLE CONTAINER: Fixed height, vertical scroll, added custom-scrollbar class for styling */}
          <div className="max-h-[600px] overflow-y-auto pr-2 sm:pr-4 space-y-12 custom-scrollbar">
            
            {/* Project 1: GenAI-Augmented IDS */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 hover:border-cyan-400 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-400/10 flex flex-col lg:flex-row">
              
              <div className="relative w-full lg:w-5/12 flex-shrink-0 h-64 lg:h-auto">
                <img 
                  alt="GenAI-Augmented Intrusion Detection System" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  src="/project1.jpg" 
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent"></div>
              </div>
              
              <div className="p-6 lg:p-10 lg:w-7/12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  GenAI-Augmented Intrusion Detection System
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  Architected a multi-class network intrusion detection system using XGBoost and Variational Autoencoders on the CIC-IDS dataset, improving rare attack recall from 0.57 to 0.99 while maintaining 99.9% overall accuracy. Delivered a real-time Streamlit dashboard for batch inference, confidence scoring, and SHAP-based model explainability.
                </p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Key Metrics:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-sm font-medium">99.9% Accuracy</span>
                    <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-sm font-medium">0.99 Recall</span>
                    <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-sm font-medium">Real-time Detection</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-sm">XGBoost</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-sm">Variational Autoencoders</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-sm">Streamlit</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-sm">SHAP</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-sm">Python</span>
                  </div>
                </div>

                <div className="mt-8">
                  <a href="https://github.com/robbinson10/GenAI-IDS" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800/50 hover:bg-cyan-400/10 text-white hover:text-cyan-400 border border-gray-700 hover:border-cyan-400 rounded-lg transition-all duration-300 w-fit group/btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                    <span className="font-semibold text-sm tracking-wide">View Repository</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2: Py2Perf */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-700 hover:border-cyan-400 transition-all duration-300 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-400/10 flex flex-col lg:flex-row">
              
              <div className="relative w-full lg:w-5/12 flex-shrink-0 h-64 lg:h-auto">
                <img 
                  alt="Py2Perf - AI-Guided Optimizing Compiler" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  src="/project2.png" 
                />
                <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent"></div>
              </div>

              <div className="p-6 lg:p-10 lg:w-7/12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                  Py2Perf - AI-Guided Optimizing Compiler
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                  Constructed a compiler pipeline that translates Python numerical kernels into optimized C++ using a custom Recursive Descent Parser and LLM-guided IR optimizations with Qwen 2.5. Achieved up to 23% execution speedup through automated benchmarking with GCC and dynamic optimization strategies.
                </p>
                
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Key Metrics:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-sm font-medium">23% Speedup</span>
                    <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-sm font-medium">Automated Optimization</span>
                    <span className="px-3 py-1 bg-cyan-400/20 text-cyan-400 rounded-full text-sm font-medium">IR Translation</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-400 mb-3">Technologies:</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-sm">Python</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-sm">C++</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-sm">LLM (Qwen 2.5)</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-sm">GCC</span>
                    <span className="px-3 py-1 bg-gray-700 text-gray-300 rounded-md text-sm">Compiler Design</span>
                  </div>
                </div>

                <div className="mt-8">
                  <a href="https://github.com/robbinson10/Py2Perf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-800/50 hover:bg-cyan-400/10 text-white hover:text-cyan-400 border border-gray-700 hover:border-cyan-400 rounded-lg transition-all duration-300 w-fit group/btn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                    <span className="font-semibold text-sm tracking-wide">View Repository</span>
                  </a>
                </div>
              </div>
            </div>

            {/* You can add Project 3, 4, 5 down here and they will just scroll inside the box! */}

          </div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Technical Skills</h2>
            <div className="w-20 h-1 bg-cyan-400 mx-auto"></div>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Category: Languages */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:transform hover:scale-105">
              <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b border-gray-700">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'Java', 'C#', 'JavaScript', 'SQL'].map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-cyan-400/10 text-cyan-400 rounded-md text-sm border border-cyan-400/20 hover:bg-cyan-400/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Category: AI / ML */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:transform hover:scale-105">
              <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b border-gray-700">AI / ML</h3>
              <div className="flex flex-wrap gap-2">
                {['Generative AI', 'LLMs', 'RAG', 'LangChain', 'LangGraph', 'Computer Vision', 'NLP'].map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-cyan-400/10 text-cyan-400 rounded-md text-sm border border-cyan-400/20 hover:bg-cyan-400/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Category: Frameworks */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:transform hover:scale-105">
              <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b border-gray-700">Frameworks</h3>
              <div className="flex flex-wrap gap-2">
                {['PyTorch', 'TensorFlow', 'Hugging Face', 'OpenCV', 'scikit-learn', 'FastAPI', 'REST API'].map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-cyan-400/10 text-cyan-400 rounded-md text-sm border border-cyan-400/20 hover:bg-cyan-400/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Category: Cloud / Tools */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:transform hover:scale-105">
              <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b border-gray-700">Cloud / Tools</h3>
              <div className="flex flex-wrap gap-2">
                {['AWS', 'Docker', 'Git', 'Linux'].map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-cyan-400/10 text-cyan-400 rounded-md text-sm border border-cyan-400/20 hover:bg-cyan-400/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Category: Databases */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all duration-300 hover:transform hover:scale-105">
              <h3 className="text-xl font-bold text-white mb-4 pb-2 border-b border-gray-700">Databases</h3>
              <div className="flex flex-wrap gap-2">
                {['ChromaDB', 'MongoDB', 'Redis'].map(skill => (
                  <span key={skill} className="px-3 py-1.5 bg-cyan-400/10 text-cyan-400 rounded-md text-sm border border-cyan-400/20 hover:bg-cyan-400/20 transition-colors">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- EDUCATION SECTION --- */}
      <section id="education" className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Education</h2>
            <div className="w-20 h-1 bg-cyan-400 mx-auto"></div>
          </div>

          {/* Education Cards Container */}
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Card 1: M.Tech */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all duration-300 relative overflow-hidden group">
              
              {/* Status Badge */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-400 text-black text-xs font-bold rounded-full">
                Completed 2025
              </div>

              <div className="flex items-start gap-4">
                {/* Icon Container */}
                <div className="p-3 bg-cyan-400/10 rounded-lg group-hover:bg-cyan-400/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap w-8 h-8 text-cyan-400">
                    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                    <path d="M22 10v6"></path>
                    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
                  </svg>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">M.Tech in Computer Science & Engineering</h3>
                  <p className="text-cyan-400 font-semibold mb-3">Information Security & Privacy</p>
                  <p className="text-xl text-gray-300 mb-4">Sardar Vallabhbhai National Institute of Technology</p>
                  
                  {/* Meta Info */}
                  <div className="flex flex-wrap gap-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin">
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>Surat, Gujarat</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar">
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                      </svg>
                      <span>2023 - 2025</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: B.Tech */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-lg border border-gray-700 hover:border-cyan-400 transition-all duration-300 relative overflow-hidden group">
              
              <div className="absolute top-4 right-4 px-3 py-1 bg-cyan-400 text-black text-xs font-bold rounded-full">
                Completed 2023
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-400/10 rounded-lg group-hover:bg-cyan-400/20 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-graduation-cap w-8 h-8 text-cyan-400">
                    <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"></path>
                    <path d="M22 10v6"></path>
                    <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path>
                  </svg>
                </div>
                
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">B.Tech in Computer Science & Engineering</h3>
                  {/* Note: Omitted the cyan specialization line here to match your visual */}
                  <p className="text-xl text-gray-300 mb-4">Bhilai Institute of Technology</p>
                  
                  <div className="flex flex-wrap gap-4 text-gray-400">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin">
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>Durg, Chhattisgarh</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar">
                        <path d="M8 2v4"></path>
                        <path d="M16 2v4"></path>
                        <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                        <path d="M3 10h18"></path>
                      </svg>
                      <span>2019 - 2023</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h2>
            <div className="w-20 h-1 bg-cyan-400 mx-auto"></div>
            <p className="text-gray-400 mt-6 text-lg">Let's discuss AI/ML opportunities and collaborations</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Left Side: Contact Information */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-400/10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail w-6 h-6 text-cyan-400">
                    <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"></path>
                    <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <a href="mailto:yokshanh@gmail.com" className="text-white hover:text-cyan-400 transition-colors">yokshanh@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-400/10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone w-6 h-6 text-cyan-400">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Phone</p>
                  <a href="tel:+919630380213" className="text-white hover:text-cyan-400 transition-colors">+91 9630380213</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 bg-cyan-400/10 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-6 h-6 text-cyan-400">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white">Pune, Maharashtra</p>
                </div>
              </div>

              <div className="mt-8">
                <h4 className="text-lg font-semibold text-white mb-4">Connect with me</h4>
                <div className="flex gap-4">
                  <a href="https://github.com/robbinson10" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-cyan-400 rounded-lg transition-all duration-300 hover:scale-110 group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-github w-6 h-6 text-white group-hover:text-black transition-colors">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                      <path d="M9 18c-4.51 2-5-2-7-2"></path>
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/yokshanhathile" target="_blank" rel="noopener noreferrer" className="p-3 bg-white/10 hover:bg-cyan-400 rounded-lg transition-all duration-300 hover:scale-110 group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin w-6 h-6 text-white group-hover:text-black transition-colors">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect width="4" height="12" x="2" y="9"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right Side: Contact Form */}
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2 font-medium">Name</label>
                <input 
                  id="name" 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors" 
                  placeholder="Your name" 
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2 font-medium">Email</label>
                <input 
                  id="email" 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors" 
                  placeholder="your.email@example.com" 
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-300 mb-2 font-medium">Message</label>
                <textarea 
                  id="message" 
                  rows="5" 
                  required
                  value={formData.message}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none" 
                  placeholder="Your message..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                disabled={submitStatus === 'sending'}
                className="w-full px-6 py-3 bg-cyan-400 text-black font-semibold rounded-lg hover:bg-cyan-500 transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-cyan-400/50 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {submitStatus === 'sending' ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send">
                      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                      <path d="m21.854 2.147-10.94 10.939"></path>
                    </svg>
                    Send Message
                  </>
                )}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 text-sm text-center">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">
                  Oops! Something went wrong. Please try emailing me directly.
                </div>
              )}
            </form>

          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            <p className="flex items-center gap-2 mb-4 md:mb-0">
              Built with 
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart w-4 h-4 text-cyan-400 fill-cyan-400">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
              by Yokshan Hathile
            </p>
            <p>&copy; 2026 All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;