'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function About() {
  const [visionRef, visionInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [teamRef, teamInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [timelineRef, timelineInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center pt-32 pb-20 relative overflow-hidden hexagon-grid">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="gradient-text">Our Mission</span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Pioneering the frontier of artificial intelligence to solve humanity's most complex challenges.
            </motion.p>
          </div>
        </div>
      </section>
      
      {/* Vision Section */}
      <section className="w-full py-20 bg-slate-950">
        <div 
          ref={visionRef}
          className="container mx-auto px-4 md:px-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={visionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Redefining What's <span className="gradient-text">Possible</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6">
                Founded in 2023, Hypergen emerged from groundbreaking research at the intersection of deep learning, cognitive science, and quantum computing. Our team of pioneering researchers and engineers is dedicated to pushing the boundaries of what artificial intelligence can achieve.
              </p>
              <p className="text-lg text-gray-300 mb-6">
                We believe that the next generation of AI will transcend current limitations through emergent properties, multimodal reasoning, and scalable neural architectures that adapt dynamically to new information and contexts.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="glass-panel px-4 py-2 text-sm">Neural Architecture Search</div>
                <div className="glass-panel px-4 py-2 text-sm">Emergent Reasoning</div>
                <div className="glass-panel px-4 py-2 text-sm">Multimodal Intelligence</div>
                <div className="glass-panel px-4 py-2 text-sm">Quantum-Inspired Processing</div>
              </div>
            </motion.div>
            
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 30 }}
              animate={visionInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-square w-full rounded-2xl glass-panel overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/10 mix-blend-overlay" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-primary-500/30 rounded-full blur-3xl" />
              <div className="absolute -top-6 -left-6 w-64 h-64 bg-secondary-500/20 rounded-full blur-3xl" />
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From breakthrough research to redefining the future of AI.
            </p>
          </div>
          
          <div 
            ref={timelineRef}
            className="relative max-w-4xl mx-auto"
          >
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -ml-px md:ml-0 transform md:translate-x-0"></div>
            
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className={`relative mb-12 md:mb-16 ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right md:ml-auto md:mr-1/2' : 'md:pl-12 md:ml-1/2'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-3">
                  {/* Timeline dot */}
                  <div 
                    className={`absolute left-0 md:left-1/2 w-5 h-5 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 transform -translate-x-1/2 ${
                      index % 2 === 0 ? 'md:right-0 md:left-auto md:translate-x-1/2' : ''
                    }`}
                  ></div>
                  <span className="gradient-text font-bold text-xl">{item.date}</span>
                </div>
                <div className="md:max-w-md glass-panel p-6">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="w-full py-20 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Leadership Team</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Meet the visionaries and experts building the future of AI.
            </p>
          </div>
          
          <motion.div 
            ref={teamRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {team.map((member, index) => (
              <motion.div
                key={index}
                className="glass-panel p-8 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-32 h-32 rounded-full glass-panel overflow-hidden mb-6 flex items-center justify-center">
                  <span className="gradient-text text-4xl font-bold">{member.initials}</span>
                </div>
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary-400 mb-4">{member.role}</p>
                <p className="text-gray-400 mb-6">{member.bio}</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Join Section */}
      <section className="w-full py-20 bg-gradient-to-r from-primary-900 to-secondary-900">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            We're looking for exceptional talent to help us build the future of artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/careers" className="btn-primary text-lg">
              View Open Positions
            </Link>
            <Link href="/contact" className="btn-secondary text-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
}

const timeline = [
  {
    date: "2023",
    title: "Founded by AI Visionaries",
    description: "Hypergen was founded by a team of AI researchers and engineers with a vision to create the next generation of AI technology."
  },
  {
    date: "2023",
    title: "Breakthrough in Neural Architecture",
    description: "Our research team achieved a breakthrough in neural architecture search, enabling models that autonomously optimize for specific tasks."
  },
  {
    date: "2024",
    title: "Seed Funding",
    description: "Secured $25M in seed funding to accelerate development of our core technology and expand our research team."
  },
  {
    date: "2024",
    title: "Beta Launch",
    description: "Introduced Hypergen Beta to select partners across healthcare, finance, and manufacturing sectors."
  },
  {
    date: "2025",
    title: "The Future",
    description: "Full commercial launch with expanded capabilities and industry-specific solutions."
  }
];

const team = [
  {
    initials: "AP",
    name: "Dr. Alexandra Park",
    role: "CEO & Co-Founder",
    bio: "Former lead AI researcher at Quantum Dynamics with over 15 years of experience in neural architecture and emergent reasoning systems."
  },
  {
    initials: "MK",
    name: "Dr. Michael Khan",
    role: "CTO & Co-Founder",
    bio: "Pioneered breakthroughs in multimodal intelligence and quantum computing algorithms at MIT's Advanced AI Laboratory."
  },
  {
    initials: "LW",
    name: "Dr. Lisa Wong",
    role: "Chief Research Officer",
    bio: "Award-winning researcher specializing in emergent capabilities and neural network optimization with 50+ published papers."
  },
  {
    initials: "JS",
    name: "James Stevens",
    role: "Chief Product Officer",
    bio: "Former product lead at leading AI companies, with expertise in bringing cutting-edge AI technologies to market."
  },
  {
    initials: "RJ",
    name: "Rachel Johnson",
    role: "VP of Engineering",
    bio: "Engineering leader with extensive experience scaling AI infrastructure and building high-performance compute systems."
  },
  {
    initials: "DM",
    name: "Dr. Daniel Martinez",
    role: "Director of Ethics & Safety",
    bio: "Leading expert in AI safety, alignment, and ethical deployment of advanced artificial intelligence systems."
  }
]; 