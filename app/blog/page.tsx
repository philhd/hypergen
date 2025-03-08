'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

// Blog post metadata
const blogPosts = [
  {
    id: 'hypergen-architecture',
    title: 'The HyperGen Architecture: Advancing the Frontiers of Multimodal AI',
    excerpt: 'An in-depth look at our breakthrough neural architecture that combines emergent reasoning capabilities with sparse mixture-of-experts technology.',
    author: 'Dr. Michael Khan',
    authorRole: 'CTO & Co-Founder',
    date: 'March 7, 2024',
    readTime: '9 min read',
    category: 'Research',
    featured: true,
    image: '/blog/architecture-header.webp',
  },
  {
    id: 'emergent-capabilities',
    title: 'Emergent Capabilities in Large-Scale Neural Networks',
    excerpt: `Exploring how Hypergen's models demonstrate sophisticated reasoning that emerges from scale without explicit programming.`,
    author: 'Dr. Lisa Wong',
    authorRole: 'Chief Research Officer',
    date: 'February 22, 2024',
    readTime: '7 min read',
    category: 'Research',
    featured: false,
    image: '/blog/emergent-capabilities.jpg', // This would be the actual image in a real implementation
  },
  {
    id: 'multimodal-reasoning',
    title: 'Multimodal Reasoning: Unifying Vision, Text, and Structured Data',
    excerpt: 'How our cross-modal attention mechanisms enable seamless reasoning across different types of information.',
    author: 'Dr. Alexandra Park',
    authorRole: 'CEO & Co-Founder',
    date: 'February 10, 2024',
    readTime: '6 min read',
    category: 'Technology',
    featured: false,
    image: '/blog/multimodal-reasoning.jpg', // This would be the actual image in a real implementation
  },
  {
    id: 'quantum-inspired',
    title: 'Quantum-Inspired Processing in Neural Networks',
    excerpt: 'Leveraging principles from quantum computing to improve parallel processing in traditional neural architectures.',
    author: 'Dr. James Chen',
    authorRole: 'Principal Research Scientist',
    date: 'January 28, 2024',
    readTime: '8 min read',
    category: 'Research',
    featured: false,
    image: '/blog/quantum-inspired.jpg', // This would be the actual image in a real implementation
  }
];

// Filter options for blog categories
const categories = ['All', 'Research', 'Technology', 'Case Studies', 'Company'];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [featuredRef, featuredInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [postsRef, postsInView] = useInView({ triggerOnce: true, threshold: 0.1 });
  
  // Filter posts based on selected category
  const filteredPosts = selectedCategory === 'All' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);
  
  // Get featured post
  const featuredPost = blogPosts.find(post => post.featured);
  
  return (
    <>
      <Navbar />
      
      <section className="w-full pt-32 pb-16 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Hypergen <span className="gradient-text">Blog</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Insights, research, and updates from the frontier of AI technology
            </motion.p>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-primary-500 to-primary-700 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          
          {/* Featured Post */}
          {featuredPost && selectedCategory === 'All' && (
            <motion.div
              ref={featuredRef}
              className="mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={featuredInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="glass-panel overflow-hidden rounded-2xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="aspect-video relative rounded-xl overflow-hidden lg:aspect-auto lg:h-full">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-gray-900/30 z-10" />
                    <Image 
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center mb-4">
                      <span className="text-xs font-medium text-primary-400 uppercase tracking-wider">{featuredPost.category}</span>
                      <span className="mx-2 text-gray-500">•</span>
                      <span className="text-xs text-gray-400">{featuredPost.date}</span>
                      <span className="mx-2 text-gray-500">•</span>
                      <span className="text-xs text-gray-400">{featuredPost.readTime}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                    <p className="text-gray-300 mb-6">{featuredPost.excerpt}</p>
                    <div className="flex items-center mb-6">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex-shrink-0 mr-4" />
                      <div>
                        <h4 className="font-bold text-sm">{featuredPost.author}</h4>
                        <p className="text-xs text-gray-400">{featuredPost.authorRole}</p>
                      </div>
                    </div>
                    <Link 
                      href={`/blog/${featuredPost.id}`} 
                      className="self-start btn-primary"
                    >
                      Read Article
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Blog Post Grid */}
          <motion.div
            ref={postsRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={postsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, staggerChildren: 0.1 }}
          >
            {filteredPosts.filter(post => !post.featured || selectedCategory !== 'All').map((post, index) => (
              <motion.div
                key={post.id}
                className="glass-panel overflow-hidden rounded-xl flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={postsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="aspect-video relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-secondary-500/20 to-gray-900/30 z-10" />
                  {post.id === 'hypergen-architecture' ? (
                    <Image 
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-mono text-sm opacity-60">[ Blog post image ]</span>
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center mb-3">
                    <span className="text-xs font-medium text-primary-400 uppercase tracking-wider">{post.category}</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <span className="text-xs text-gray-400">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{post.title}</h3>
                  <p className="text-gray-300 text-sm mb-4 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex-shrink-0 mr-3" />
                      <span className="text-sm">{post.author}</span>
                    </div>
                    <span className="text-xs text-gray-400">{post.date}</span>
                  </div>
                  <Link 
                    href={`/blog/${post.id}`} 
                    className="mt-4 text-primary-400 text-sm font-medium hover:text-primary-300 transition-colors"
                  >
                    Read more →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="w-full py-16 bg-slate-950">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <div className="glass-panel p-8 md:p-12 rounded-2xl">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated on the Latest in AI</h2>
              <p className="text-gray-300">
                Subscribe to our newsletter to receive the latest insights, research papers, and updates from the Hypergen team.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
                required
              />
              <button type="submit" className="btn-primary whitespace-nowrap">
                Subscribe
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-400 text-center">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
} 