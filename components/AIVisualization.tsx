'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AIVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  
  useEffect(() => {
    // Handle resize
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const { width, height } = canvasRef.current.parentElement.getBoundingClientRect();
        setDimensions({ width, height });
        canvasRef.current.width = width;
        canvasRef.current.height = height;
      }
    };
    
    window.addEventListener('resize', handleResize);
    // Initial size
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Node class representing neural network nodes
    class Node {
      x: number;
      y: number;
      radius: number;
      color: string;
      connections: Node[];
      speed: number;
      angle: number;
      
      constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.connections = [];
        this.speed = 0.2 + Math.random() * 0.5;
        this.angle = Math.random() * Math.PI * 2;
      }
      
      update() {
        // Move in a small random orbit
        this.angle += 0.01 * this.speed;
        this.x += Math.cos(this.angle) * 0.5;
        this.y += Math.sin(this.angle) * 0.5;
        
        // Keep in bounds with soft boundaries
        const margin = 50;
        if (this.x < margin) this.x += (margin - this.x) * 0.05;
        if (this.x > dimensions.width - margin) this.x -= (this.x - (dimensions.width - margin)) * 0.05;
        if (this.y < margin) this.y += (margin - this.y) * 0.05;
        if (this.y > dimensions.height - margin) this.y -= (this.y - (dimensions.height - margin)) * 0.05;
      }
      
      draw() {
        if (!ctx) return;
        
        // Draw connections
        this.connections.forEach(node => {
          const distance = Math.sqrt(Math.pow(this.x - node.x, 2) + Math.pow(this.y - node.y, 2));
          const maxDistance = 150;
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(node.x, node.y);
            
            // Connection opacity based on distance
            const opacity = 1 - distance / maxDistance;
            ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.5})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
        
        // Draw node
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Draw glow
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + 5, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, this.radius + 5);
        gradient.addColorStop(0, `rgba(56, 189, 248, 0.5)`);
        gradient.addColorStop(1, `rgba(56, 189, 248, 0)`);
        ctx.fillStyle = gradient;
        ctx.fill();
      }
    }
    
    // Create nodes
    const nodeCount = Math.floor(dimensions.width / 70); // Responsive node count
    const nodes: Node[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * dimensions.width;
      const y = Math.random() * dimensions.height;
      const radius = 2 + Math.random() * 3;
      
      // Use primary color from theme
      const color = i % 5 === 0 ? '#38bdf8' : // Primary-400
                    i % 7 === 0 ? '#e879f9' : // Secondary-400
                    'rgba(255, 255, 255, 0.7)';
      
      nodes.push(new Node(x, y, radius, color));
    }
    
    // Connect nodes
    nodes.forEach(node => {
      // Connect to 2-4 other random nodes
      const connectionCount = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < connectionCount; i++) {
        const randomNode = nodes[Math.floor(Math.random() * nodes.length)];
        if (randomNode !== node && !node.connections.includes(randomNode)) {
          node.connections.push(randomNode);
        }
      }
    });
    
    // Animation loop
    let animationFrameId: number;
    
    const render = () => {
      if (!ctx) return;
      
      // Clear canvas with transparency for trail effect
      ctx.fillStyle = 'rgba(15, 23, 42, 0.1)'; // Slate-900 with low opacity
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      
      // Update and draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });
      
      // Animate data flow along connections
      const time = Date.now() / 1000;
      nodes.forEach((node, i) => {
        if (i % 3 === 0) { // Only animate some nodes
          node.connections.forEach(connectedNode => {
            const t = (time * 0.5) % 1; // Repeating 0-1 value
            
            const x = node.x + (connectedNode.x - node.x) * t;
            const y = node.y + (connectedNode.y - node.y) * t;
            
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#e879f9'; // Secondary-400
            ctx.fill();
          });
        }
      });
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);
  
  return (
    <div className="relative w-full h-full">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center"
        >
          <h3 className="text-xl font-mono text-white text-opacity-90 mb-2">HYPERGEN NEURAL NETWORK</h3>
          <p className="text-sm text-white text-opacity-60 max-w-md">Dynamic architecture visualization with emergent node relationships</p>
        </motion.div>
      </div>
    </div>
  );
};

export default AIVisualization; 