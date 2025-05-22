import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import  imageurl from '../assets/projectifymanagement.jpg'


const Homepage = () => {
  // Splash screen state
  const [showSplash, setShowSplash] = useState(true);
  // Theme state (dark/light)
  const [darkMode, setDarkMode] = useState(true);

  // Splash screen effect
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  // Smooth scroll handler
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    section?.scrollIntoView({ behavior: 'smooth' });
  };
  const navigate = useNavigate();

  // Splash Screen
  if (showSplash) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-gray-900 to-gray-900">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-widest animate-pulse drop-shadow-lg">
            Welcome to <span className="text-blue-300 animate-glow">Planora</span>
          </h1>
          <div className="mt-8 w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${darkMode ? "bg-gradient-to-br from-[#181c24] via-[#232526] to-[#414345] text-white" : "bg-gradient-to-br from-white via-blue-50 to-blue-100 text-gray-900"} font-sans scroll-smooth min-h-screen transition-colors duration-500`}>
      {/* Navbar */}
      <nav className={`sticky top-0  z-100  shadow ${darkMode ? "bg-[#181c24]/90" : "bg-white/90"} backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-3xl font-extrabold tracking-wider cursor-pointer" onClick={() => scrollToSection('hero')}>
            <span className="text-blue-400">Planora</span>
          </h1>
          <ul className="flex space-x-4 text-sm font-medium items-center">
            <li className="cursor-pointer  text-lg font-serif hover:text-blue-400 transition" onClick={() => scrollToSection('hero')}>Home</li>
            <li className="cursor-pointer text-lg font-serif hover:text-blue-400 transition" onClick={() => scrollToSection('features')}>Features</li>
            <li className="cursor-pointer text-lg font-serif hover:text-blue-400 transition" onClick={() => scrollToSection('how')}>How It Works</li>
            <li className="cursor-pointer text-lg font-serif hover:text-blue-400 transition" onClick={() => scrollToSection('why')}>About</li>
            <li className="cursor-pointer text-lg font-serif hover:text-blue-400 transition" onClick={() => scrollToSection('testimonials')}>Help</li>
            <button className="ml-2 px-4 py-1  text-lg rounded bg-blue-600 text-white hover:bg-blue-700 transition" onClick={() => navigate("/signup")}>Sign up</button>
            <button className="ml-2 px-4 py-1 text-lg rounded border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition" onClick={() => navigate("/signin")}>Sign in</button>
            <button
              className="ml-4 w-10 h-10 hover:bg-[#ffffff2b] px-2 py-1 rounded-full border border-gray-500 text-xs"
              onClick={() => setDarkMode((d) => !d)}
              title="Toggle theme"
            >
              {darkMode ? "🌙" : "☀️"}
            </button>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className={`flex flex-col md:flex-row items-center justify-between p-6 md:p-16 min-h-[80vh] transition-all duration-500 ${
          darkMode
            ? "bg-gradient-to-br from-[#232526] via-[#181c24] to-[#232526]"
            : "bg-gradient-to-br from-blue-50 via-white to-blue-100"
        }`}
      >
        <div className="md:w-1/2 space-y-6 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight leading-tight">
            Organize. Plan. <span className="text-blue-400">Achieve.</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-200/90 dark:text-blue-200 mb-2">
            Welcome to <span className="font-bold text-blue-400">Planora</span> – your all-in-one productivity and planning platform.
          </p>
          <p className="text-gray-300 dark:text-gray-400 mb-4">
            Effortlessly manage tasks, collaborate, and reach your goals with a beautiful, intuitive interface.
          </p>
          <button
            className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-xl text-lg font-semibold shadow-lg hover:bg-blue-700 transition"
            onClick={() => navigate("/signin")}
          >
            Get Started
          </button>
        </div>
        
  <div className="w-[50%] h-[60%]  flex items-center justify-center shadow-2xl shadow-blue-500 animate-float">
    <img
      src={imageurl}
      alt="Project Management Illustration"
      className="w-full h-full object-contain shadow-lg"
    />

</div>
      </section>

      {/* Features Section */}
      <section id="features" className={`p-6 md:p-16 transition-all duration-500 ${darkMode ? "bg-[#232526]" : "bg-white"}`}>
        <h2 className="text-3xl font-bold mb-10 text-center">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: "📝", title: "Smart Task Boards", desc: "Organize tasks visually with drag-and-drop boards." },
            { icon: "🤝", title: "Collaboration", desc: "Work with your team in real-time and stay in sync." },
            { icon: "📅", title: "Calendar Integration", desc: "Sync tasks with your calendar for better planning." },
            { icon: "🔔", title: "Reminders", desc: "Never miss a deadline with smart notifications." },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl shadow-lg p-8 flex flex-col items-center transition-all duration-300 ${
                darkMode
                  ? "bg-gradient-to-br from-[#181c24] via-[#232526] to-[#232526] text-white"
                  : "bg-blue-50 text-gray-900"
              } hover:scale-105 hover:shadow-2xl`}
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-center text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className={`p-6 md:p-16 transition-all duration-500 ${darkMode ? "bg-[#181c24]" : "bg-blue-100"}`}>
        <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: 1, title: "Sign Up", desc: "Create your free Planora account in seconds." },
            { step: 2, title: "Create Boards", desc: "Set up boards for your projects, goals, or routines." },
            { step: 3, title: "Stay Productive", desc: "Track progress, collaborate, and achieve more!" },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl shadow-lg p-8 flex flex-col items-center transition-all duration-300 ${
                darkMode
                  ? "bg-gradient-to-br from-[#232526] via-[#181c24] to-[#232526] text-white"
                  : "bg-white text-gray-900"
              } hover:scale-105 hover:shadow-2xl`}
            >
              <div className="text-4xl mb-4 font-bold text-blue-400">{item.step}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              <p className="text-center text-base">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Planora */}
      <section id="why" className={`p-6 md:p-16 transition-all duration-500 ${darkMode ? "bg-[#232526]" : "bg-white"}`}>
        <h2 className="text-3xl font-bold mb-8 text-center">Why Choose Planora?</h2>
        <ul className="max-w-2xl mx-auto list-disc pl-8 space-y-4 text-lg">
          <li>Intuitive, beautiful interface for all devices</li>
          <li>Real-time collaboration and sharing</li>
          <li>Powerful integrations and reminders</li>
          <li className="italic text-blue-400">"Planora changed the way I work and plan my life!" - Happy User</li>
        </ul>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className={`p-6 md:p-16 transition-all duration-500 ${darkMode ? "bg-[#181c24]" : "bg-blue-100"}`}>
        <h2 className="text-3xl font-bold mb-10 text-center">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Alex", feedback: "Planora keeps my team organized and motivated!", img: "https://randomuser.me/api/portraits/men/32.jpg" },
            { name: "Priya", feedback: "The best productivity tool I've ever used.", img: "https://randomuser.me/api/portraits/women/44.jpg" },
            { name: "Sam", feedback: "Simple, powerful, and beautiful. Love it!", img: "https://randomuser.me/api/portraits/men/65.jpg" },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl shadow-lg p-8 flex flex-col items-center transition-all duration-300 ${
                darkMode
                  ? "bg-gradient-to-br from-[#232526] via-[#181c24] to-[#232526] text-white"
                  : "bg-white text-gray-900"
              } hover:scale-105 hover:shadow-2xl`}
            >
              <img src={item.img} alt={item.name} className="w-20 h-20 rounded-full mb-4 shadow-lg border-4 border-blue-400" />
              <p className="text-center italic mb-2">"{item.feedback}"</p>
              <p className="font-bold">{item.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={`p-6 md:p-12 ${darkMode ? "bg-[#181c24] text-white" : "bg-blue-900 text-white"}`}>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Planora</h3>
            <ul className="text-sm space-y-1">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Features</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-400 transition">F</a>
            <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-400 transition">T</a>
            <a href="#" className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-400 transition">I</a>
          </div>
        </div>
        <div className="text-center text-xs mt-6 text-gray-400">
          &copy; {new Date().getFullYear()} Planora. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Homepage;