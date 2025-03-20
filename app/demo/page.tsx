'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import GraphVisualization from '../../components/GraphVisualization';

export default function DemoPage() {
  const [inputText, setInputText] = useState('');
  const [processing, setProcessing] = useState(false);
  const [showGraph, setShowGraph] = useState(false);
  const [responseText, setResponseText] = useState('');
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const [responseHistory, setResponseHistory] = useState<Array<{prompt: string, response: string}>>([]);
  
  // Sample conversation starters
  const samplePrompts = [
    "How does Hypergen's neural architecture compare to traditional transformers?",
    "Explain the multimodal reasoning capabilities of Hypergen",
    "What makes sparse mixture-of-experts more efficient?",
    "How do emergent capabilities manifest in large models?"
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || processing) return;
    
    // Add to history
    setResponseHistory([...responseHistory, { prompt: inputText, response: '' }]);
    
    // Start processing sequence
    setProcessing(true);
    setShowGraph(true);
    setResponseText('');
    
    // Simulate processing delay
    setTimeout(() => {
      setIsGeneratingResponse(true);
      generateResponse(inputText);
    }, 3000); // After graph animation
  };
  
  const generateResponse = (prompt: string) => {
    const responses = {
      "How does Hypergen's neural architecture compare to traditional transformers?": 
        "Hypergen's architecture fundamentally differs from traditional transformers in several ways. While transformers use fixed self-attention mechanisms, Hypergen employs dynamic routing through our Sparse Mixture-of-Experts (SMoE) approach. This means that for any given input, only 0.1-1% of parameters are activated, making it vastly more efficient.\n\nAdditionally, Hypergen incorporates neural architecture search (NAS) that continuously optimizes topology during training, unlike transformers' static structure. This results in 43% higher performance on reasoning tasks while using fewer computational resources.\n\nThe cross-modal attention mechanisms allow Hypergen to reason across different data types simultaneously, whereas traditional transformers typically require separate models or encoders for different modalities.",
      
      "Explain the multimodal reasoning capabilities of Hypergen":
        "Hypergen's multimodal reasoning capabilities stem from our proprietary Unified Representational Space (URS) technology. Unlike traditional systems that treat different data types separately, Hypergen projects all inputs – text, images, structured data, etc. – into a shared latent space through modality-specific encoders.\n\nThis enables bidirectional cross-attention where information flows across modalities in both directions. For example, when analyzing a chart with accompanying text, Hypergen can relate visual patterns in the chart with concepts in the text, and vice versa.\n\nOur Contextual Alignment Training ensures that representations from different modalities that refer to the same concepts are aligned in the latent space. This allows Hypergen to perform complex reasoning tasks that require integrating information across modalities, such as answering questions about images or generating visualizations based on text descriptions.",
      
      "What makes sparse mixture-of-experts more efficient?":
        "Sparse Mixture-of-Experts (SMoE) achieves its efficiency through conditional computation. Rather than activating all parameters for every input – as dense models do – SMoE selectively activates only the most relevant expert subnetworks for each specific input.\n\nHypergen's proprietary HyperRouter determines which experts to activate for each token or image patch. Typically, only 0.1-1% of parameters are activated for any given input, allowing us to scale to over 1 trillion parameters while maintaining fast inference times on consumer hardware.\n\nThis approach provides several advantages:\n\n1. Computational efficiency: 73% reduction in FLOPS during training and 86% reduction in inference latency\n2. Specialization: Experts develop specialized capabilities through our Diversity Maximization Training\n3. Scalability: Parameter count can increase without proportional computation costs\n4. Energy efficiency: 79% reduction in energy usage per inference\n\nThese efficiency gains make trillion-parameter models practical for everyday applications.",
      
      "How do emergent capabilities manifest in large models?":
        "Emergent capabilities in large models like Hypergen appear as sophisticated behaviors that weren't explicitly programmed but arise from scale and architecture. These include:\n\n1. Multi-step reasoning: The ability to break down complex problems into logical steps and solve them sequentially\n2. Dynamic task decomposition: Automatically identifying subtasks within a larger problem\n3. Self-verification: The model can validate its own outputs and self-correct errors\n4. Analogical reasoning: Drawing parallels between previously seen problems and novel situations\n\nWhat's fascinating is that these capabilities appear at certain scale thresholds – models below these thresholds show no signs of these abilities, while models above suddenly demonstrate them. In Hypergen specifically, our sparse activation patterns and cross-modal representations seem to accelerate the emergence of these capabilities at smaller parameter counts than dense models require.\n\nOur research shows that emergent reasoning correlates strongly with neural pathway diversity, which our architecture explicitly optimizes for."
    };
    
    // Default response for unrecognized prompts
    let fullResponse = "Hypergen's advanced neural architecture provides unique insights into this question. Our research demonstrates that through sparse mixture-of-experts and emergent reasoning capabilities, we can address complex problems more efficiently than traditional approaches. The multimodal nature of our system allows for integrated understanding across different types of data, creating a more comprehensive analysis framework.";
    
    // Check if we have a matching response
    for (const [key, value] of Object.entries(responses)) {
      if (prompt.toLowerCase().includes(key.toLowerCase())) {
        fullResponse = value;
        break;
      }
    }
    
    // Simulate typing effect
    let currentText = '';
    const words = fullResponse.split(' ');
    
    const typeNextWord = (index: number) => {
      if (index >= words.length) {
        setProcessing(false);
        setIsGeneratingResponse(false);
        
        // Update history with final response
        setResponseHistory(prev => 
          prev.map((item, idx) => 
            idx === prev.length - 1 
              ? { ...item, response: fullResponse } 
              : item
          )
        );
        return;
      }
      
      currentText += (index === 0 ? '' : ' ') + words[index];
      setResponseText(currentText);
      
      // Random typing speed for more natural effect
      const delay = 30 + Math.random() * 50;
      setTimeout(() => typeNextWord(index + 1), delay);
    };
    
    // Start typing effect
    typeNextWord(0);
  };
  
  const handleSamplePrompt = (prompt: string) => {
    setInputText(prompt);
  };
  
  return (
    <>
      <Navbar />
      
      <section className="w-full pt-32 pb-16 relative overflow-hidden min-h-screen">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Experience <span className="gradient-text">Hypergen</span>
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Interact with our breakthrough AI and see neural architecture in action
            </motion.p>
          </div>
          
          {/* Interactive Demo Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            {/* Input & History Panel */}
            <div className="col-span-1 lg:col-span-5">
              <div className="glass-panel p-6 rounded-xl h-full flex flex-col">
                <h2 className="text-xl font-bold mb-4">Ask Hypergen</h2>
                
                <form onSubmit={handleSubmit} className="mb-6">
                  <div className="mb-4">
                    <textarea 
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Enter your question about Hypergen's capabilities..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none min-h-[120px]"
                      disabled={processing}
                    />
                  </div>
                  <button 
                    type="submit" 
                    className={`btn-primary w-full flex items-center justify-center gap-2 ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {isGeneratingResponse ? "Generating Response..." : "Processing..."}
                      </>
                    ) : "Submit Question"}
                  </button>
                </form>
                
                <h3 className="text-sm font-medium text-gray-400 mb-3">Try asking about:</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {samplePrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSamplePrompt(prompt)}
                      className="px-3 py-1 text-xs bg-white/5 hover:bg-white/10 rounded-full transition-colors text-gray-300"
                      disabled={processing}
                    >
                      {prompt.length > 30 ? prompt.substring(0, 30) + '...' : prompt}
                    </button>
                  ))}
                </div>
                
                {responseHistory.length > 0 && (
                  <div className="mt-auto">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">Conversation History</h3>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                      {responseHistory.slice(0, -1).map((item, index) => (
                        <div key={index} className="glass-panel p-3 rounded-lg text-sm">
                          <p className="font-medium text-primary-400 mb-1">You: {item.prompt}</p>
                          <p className="text-gray-300 text-xs">Hypergen: {item.response.length > 100 ? item.response.substring(0, 100) + '...' : item.response}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Visualization & Response Panel */}
            <div className="col-span-1 lg:col-span-7">
              <div className="glass-panel rounded-xl overflow-hidden h-full flex flex-col">
                {/* Graph Visualization */}
                <div className="relative aspect-video">
                  <AnimatePresence>
                    {showGraph && (
                      <motion.div
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        <GraphVisualization />
                        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-white font-mono">
                          {isGeneratingResponse ? (
                            <span className="text-primary-400">Generating Response...</span>
                          ) : (
                            <span className="text-secondary-400">Neural Pathway Analysis Active</span>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {!showGraph && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center p-6">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-primary-500/20 to-secondary-500/20 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h3 className="text-lg font-medium mb-2">Neural Visualization</h3>
                        <p className="text-gray-400 text-sm">Ask a question to see Hypergen's neural pathways in action</p>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Response Area */}
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold mb-4 flex items-center">
                    <span className="mr-2">Response</span>
                    {isGeneratingResponse && (
                      <span className="inline-block w-2 h-4 bg-primary-400 animate-pulse rounded-sm"></span>
                    )}
                  </h2>
                  
                  <div className="flex-1 overflow-y-auto pr-2">
                    {responseText ? (
                      <p className="text-gray-300 whitespace-pre-line">
                        {responseText}
                      </p>
                    ) : (
                      <div className="h-full flex items-center justify-center text-center p-6">
                        <p className="text-gray-500">
                          {processing ? "Analyzing input and activating neural pathways..." : "Responses will appear here"}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div className="border-t border-white/10 mt-6 pt-4">
                    <div className="flex items-center text-xs text-gray-500">
                      <div className="flex items-center mr-4">
                        <div className="w-2 h-2 rounded-full bg-green-400 mr-1"></div>
                        <span>Hypergen v4.2.1</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mr-1"></div>
                        <span>Knowledge base: March 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Technical Features Panel */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8 text-center">Technical Capabilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass-panel p-6 rounded-xl">
                <div className="text-primary-400 text-2xl mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Neural Architecture Search</h3>
                <p className="text-gray-400 text-sm">
                  Real-time topology optimization discovers and utilizes the most efficient neural pathways for each specific task.
                </p>
              </div>
              
              <div className="glass-panel p-6 rounded-xl">
                <div className="text-secondary-400 text-2xl mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Multimodal Reasoning</h3>
                <p className="text-gray-400 text-sm">
                  Cross-modal attention mechanisms enable seamless integration of different data types within a unified representational space.
                </p>
              </div>
              
              <div className="glass-panel p-6 rounded-xl">
                <div className="text-primary-400 text-2xl mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-2">Sparse Activation</h3>
                <p className="text-gray-400 text-sm">
                  Hypergen activates only 0.1-1% of parameters for any given input, enabling trillion-parameter scale on consumer hardware.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </>
  );
} 