'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AIVisualization from '../components/AIVisualization';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const [featureRef, featureInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [useCaseRef, useCaseInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [testimonialRef, testimonialInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center relative overflow-hidden py-20 md:py-32 hexagon-grid">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-primary-500/10 to-secondary-500/5 z-0"
          style={{ 
            transform: `translateY(${scrollY * 0.1}px)`,
            opacity: 1 - scrollY * 0.001,
          }}
        />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center text-center">
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="gradient-text pb-2 inline-block">Hypergen</span><br />
              <span className="leading-tight text-3xl md:text-5xl lg:text-6xl">
                The Future of AI is Here
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-300 max-w-3xl mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Experience breakthrough neural architecture with emergent capabilities, 
              multimodal reasoning, and scalable cognitive intelligence for the next era of AI.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link href="/demo" className="btn-primary">
                Experience Hypergen
              </Link>
              <Link href="/about" className="btn-secondary">
                Explore Technology
              </Link>
            </motion.div>
          </div>
          
          <motion.div 
            className="mt-16 relative w-full max-w-5xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="relative w-full aspect-video glass-panel overflow-hidden rounded-xl border border-white/10">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/30 to-secondary-500/20 mix-blend-overlay" />
              <AIVisualization />
            </div>
            
            <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-primary-500/30 rounded-full blur-3xl" />
            <div className="absolute -top-4 -left-4 w-72 h-72 bg-secondary-500/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="w-full py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Advanced Capabilities</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Hypergen's breakthrough architecture delivers unprecedented results across multiple domains.
            </p>
          </div>
          
          <motion.div 
            ref={featureRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={featureInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="glass-panel p-8 h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={featureInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 w-12 h-12 flex items-center justify-center mb-6">
                  <span className="text-xl font-bold">{index + 1}</span>
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Use Cases Section */}
      <section className="w-full py-20 bg-slate-950 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transforming Industries</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Hypergen's adaptable neural architecture provides solutions across every sector.
            </p>
          </div>
          
          <motion.div 
            ref={useCaseRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
            initial={{ opacity: 0, y: 40 }}
            animate={useCaseInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {useCases.map((useCase, index) => (
              <motion.div
                key={index}
                className="flex gap-6"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={useCaseInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="rounded-lg bg-gradient-to-r from-primary-500/20 to-secondary-500/20 w-20 h-20 flex-shrink-0 flex items-center justify-center">
                  <div className="text-2xl font-bold gradient-text">{useCase.icon}</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
                  <p className="text-gray-400">{useCase.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Testimonial Section */}
      <section className="w-full py-20 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Industry Leaders Say</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Hypergen is already changing how leading organizations approach AI.
            </p>
          </div>
          
          <motion.div 
            ref={testimonialRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 40 }}
            animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="glass-panel p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={testimonialInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex-shrink-0" />
                  <div className="ml-4">
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-20 bg-gradient-to-r from-primary-900 to-secondary-900">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Experience the Future?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Join the pioneers already leveraging Hypergen's transformative AI capabilities.
          </p>
          <Link href="/contact" className="btn-primary text-lg px-8 py-4">
            Get Early Access
          </Link>
        </div>
      </section>
      
      <Footer />
    </>
  );
}

const features = [
  {
    title: "Neural Architecture Search",
    description: "Hypergen autonomously discovers optimal neural network topologies tailored to your specific needs, surpassing human-designed architectures by 43%."
  },
  {
    title: "Emergent Reasoning",
    description: "Our models demonstrate sophisticated emergent capabilities that weren't explicitly programmed, showing remarkable problem-solving across domains."
  },
  {
    title: "Multimodal Intelligence",
    description: "Process and reason across text, images, audio, and structured data simultaneously with our breakthrough cross-modal attention mechanisms."
  },
  {
    title: "Quantum-Inspired Processing",
    description: "Leveraging principles from quantum computing, Hypergen models represent multiple probabilistic states simultaneously for unprecedented parallelism."
  },
  {
    title: "Sparse Mixture of Experts",
    description: "Our proprietary MoE architecture activates only the most relevant neural pathways, enabling trillion-parameter scale with consumer-grade hardware."
  },
  {
    title: "Adaptive Knowledge Synthesis",
    description: "Continuously update and synthesize knowledge from disparate sources while maintaining coherent conceptual representations."
  }
];

const useCases = [
  {
    icon: "💊",
    title: "Healthcare & Drug Discovery",
    description: "Accelerate drug discovery by 10x through molecular property prediction and biomedical knowledge synthesis across millions of research papers."
  },
  {
    icon: "🏦",
    title: "Financial Services",
    description: "Deploy state-of-the-art risk assessment models that process structured and unstructured data for superior predictive performance."
  },
  {
    icon: "🏭",
    title: "Manufacturing & Logistics",
    description: "Optimize complex supply chains and production processes with real-time adaptive scheduling that reduces waste by 37%."
  },
  {
    icon: "🧬",
    title: "Computational Biology",
    description: "Revolutionize protein folding prediction and genetic analysis with our specialized biomedical transformers."
  }
];

const testimonials = [
  {
    name: "Dr. Sophia Chen",
    role: "CTO, Quantum Dynamics",
    quote: "Hypergen's emergent capabilities allowed us to solve complex optimization problems we'd struggled with for years. The results frankly surprised our entire research team."
  },
  {
    name: "Marcus Blackwell",
    role: "Director of AI, Nexus Financial",
    quote: "The multimodal intelligence demonstrated by Hypergen's models has transformed how we process financial data, giving us a significant competitive advantage."
  },
  {
    name: "Dr. Elena Rodriguez",
    role: "Head of R&D, BioGenesis",
    quote: "We've accelerated our drug discovery pipeline by integrating Hypergen's neural architecture search, reducing time-to-candidate from years to months."
  }
]; 