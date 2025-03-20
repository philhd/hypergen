'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GraphVisualization = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [activePathway, setActivePathway] = useState<number[]>([]);
  
  useEffect(() => {
    // Handle resize
    const handleResize = () => {
      if (canvasRef.current && containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        
        // Set high-resolution canvas for retina displays
        const dpr = window.devicePixelRatio || 1;
        canvasRef.current.width = width * dpr;
        canvasRef.current.height = height * dpr;
        canvasRef.current.style.width = `${width}px`;
        canvasRef.current.style.height = `${height}px`;
        
        // Set context scale
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.scale(dpr, dpr);
        }
        
        setDimensions({ width, height });
      }
    };
    
    // Use both methods for reliable sizing:
    // 1. ResizeObserver for accurate element resize detection
    let resizeObserver: ResizeObserver;
    if (containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(containerRef.current);
    }
    
    // 2. Window resize event as backup
    window.addEventListener('resize', handleResize);
    
    // 3. Initial size with small delay to ensure DOM is ready
    handleResize(); // Immediate attempt
    const timeoutId = setTimeout(handleResize, 100); // Delayed attempt
    
    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);
  
  // Create nodes and connections
  useEffect(() => {
    if (!canvasRef.current || dimensions.width === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas completely on init
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);
    
    // Graph nodes class
    class GraphNode {
      id: number;
      x: number;
      y: number;
      radius: number;
      color: string;
      connections: { node: GraphNode; weight: number; active: boolean }[];
      layer: number;
      label: string;
      active: boolean;
      activity: number;
      
      constructor(id: number, x: number, y: number, radius: number, color: string, layer: number, label: string) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.connections = [];
        this.layer = layer;
        this.label = label;
        this.active = false;
        this.activity = 0; // 0 to 1 for animation
      }
      
      connect(node: GraphNode, weight: number) {
        // Avoid duplicate connections
        if (!this.connections.some(conn => conn.node.id === node.id)) {
          this.connections.push({ node, weight, active: false });
        }
      }
      
      update() {
        // Update activity level
        if (this.active && this.activity < 1) {
          this.activity += 0.05;
        } else if (!this.active && this.activity > 0) {
          this.activity -= 0.05;
        }
        
        // Clamp activity
        this.activity = Math.max(0, Math.min(1, this.activity));
      }
      
      draw() {
        if (!ctx) return;
        
        // Draw connections
        this.connections.forEach(connection => {
          const { node, active } = connection;
          
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(node.x, node.y);
          
          if (active) {
            // Pulsing active connection
            const pulse = 0.5 + Math.sin(Date.now() / 200) * 0.5;
            ctx.strokeStyle = `rgba(232, 121, 249, ${0.3 + pulse * 0.7})`; // Secondary color with pulse
            ctx.lineWidth = 2;
          } else {
            // Normal connection
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
          }
          
          ctx.stroke();
        });
        
        // Draw node
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        
        if (this.active) {
          // Active node
          const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.radius * 2
          );
          gradient.addColorStop(0, 'rgba(232, 121, 249, 1)'); // Secondary color
          gradient.addColorStop(1, 'rgba(232, 121, 249, 0)');
          
          ctx.fillStyle = this.color;
          ctx.fill();
          
          // Draw glow for active node
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
          
          // Draw stronger border for active node
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(232, 121, 249, 1)';
          ctx.lineWidth = 2;
          ctx.stroke();
        } else {
          // Inactive node
          const fillColor = this.color.replace('1)', `${0.3 + this.activity * 0.7})`);
          ctx.fillStyle = fillColor;
          ctx.fill();
          
          // Draw border
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 1;
          ctx.stroke();
        }
        
        // Draw label if specified and node is active or has some activity
        if (this.label && (this.active || this.activity > 0.1)) {
          ctx.font = '9px Arial';
          ctx.fillStyle = `rgba(255, 255, 255, ${this.activity * 0.8 + 0.2})`;
          ctx.textAlign = 'center';
          ctx.fillText(this.label, this.x, this.y + this.radius + 12);
        }
      }
    }
    
    // Create nodes in layers
    const nodes: GraphNode[] = [];
    let nodeId = 0;
    
    // Input layer
    const inputLayerSize = 5;
    const inputLabels = ['text', 'query', 'context', 'intent', 'params'];
    
    // Hidden layers
    const hiddenLayers = 3;
    const hiddenLayerSizes = [8, 12, 8];
    const expertLabels = [
      'parsing', 'routing', 'memory', 'reasoning', 'context', 'intent', 'generation', 'verification',
      'transformer', 'expert1', 'expert2', 'expert3', 'expert4', 'expert5', 'expert6', 'expert7',
      'knowledge', 'semantic', 'syntax', 'logic', 'structure', 'facts', 'relations', 'models'
    ];
    
    // Output layer
    const outputLayerSize = 4;
    const outputLabels = ['coherence', 'factuality', 'response', 'confidence'];
    
    // Calculate layer positions
    const layerSpacing = dimensions.width / (hiddenLayers + 3); // +3 for input, output, and spacing
    const verticalCenter = dimensions.height / 2;
    
    // Create input layer
    for (let i = 0; i < inputLayerSize; i++) {
      const x = layerSpacing;
      const y = verticalCenter - ((inputLayerSize - 1) * 25) / 2 + i * 25;
      const label = inputLabels[i];
      nodes.push(new GraphNode(nodeId++, x, y, 5, 'rgba(56, 189, 248, 1)', 0, label));
    }
    
    // Create hidden layers
    let expertLabelIndex = 0;
    for (let layer = 0; layer < hiddenLayers; layer++) {
      const layerSize = hiddenLayerSizes[layer];
      for (let i = 0; i < layerSize; i++) {
        const x = layerSpacing * (layer + 2);
        const y = verticalCenter - ((layerSize - 1) * 20) / 2 + i * 20;
        const label = expertLabels[expertLabelIndex++ % expertLabels.length];
        nodes.push(new GraphNode(nodeId++, x, y, 4, 'rgba(255, 255, 255, 1)', layer + 1, label));
      }
    }
    
    // Create output layer
    for (let i = 0; i < outputLayerSize; i++) {
      const x = layerSpacing * (hiddenLayers + 2);
      const y = verticalCenter - ((outputLayerSize - 1) * 25) / 2 + i * 25;
      const label = outputLabels[i];
      nodes.push(new GraphNode(nodeId++, x, y, 5, 'rgba(56, 189, 248, 1)', hiddenLayers + 1, label));
    }
    
    // Create connections between layers
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i];
      const nextLayer = node.layer + 1;
      
      // Connect to next layer
      const nextLayerNodes = nodes.filter(n => n.layer === nextLayer);
      
      if (nextLayerNodes.length > 0) {
        // Create sparse connections - connect to ~30-60% of nodes in next layer
        const connectionCount = Math.max(1, Math.floor(nextLayerNodes.length * (0.3 + Math.random() * 0.3)));
        
        // Shuffle next layer nodes to randomize connections
        const shuffled = [...nextLayerNodes].sort(() => 0.5 - Math.random());
        
        // Connect to random subset of next layer
        for (let j = 0; j < connectionCount; j++) {
          node.connect(shuffled[j], 0.1 + Math.random() * 0.9);
        }
      }
    }
    
    // Animation variables
    let animationFrameId: number;
    let pathwayActivationStage = -1; // -1 means no active pathway
    let lastPathwayUpdateTime = 0;
    
    // Function to activate a random pathway through the network
    const activateRandomPathway = () => {
      // Reset all nodes and connections
      nodes.forEach(node => {
        node.active = false;
        node.connections.forEach(conn => (conn.active = false));
      });
      
      // Start with a random input node
      const inputNodes = nodes.filter(n => n.layer === 0);
      const startNode = inputNodes[Math.floor(Math.random() * inputNodes.length)];
      
      // Trace a path through the network
      const pathway: GraphNode[] = [startNode];
      let currentNode = startNode;
      
      while (currentNode.layer < hiddenLayers + 1) {
        // Get connections to next layer
        const nextLayerConnections = currentNode.connections.filter(
          conn => conn.node.layer === currentNode.layer + 1
        );
        
        if (nextLayerConnections.length === 0) break;
        
        // Select a random connection weighted by connection weights
        const randomConnection = nextLayerConnections[Math.floor(Math.random() * nextLayerConnections.length)];
        currentNode = randomConnection.node;
        pathway.push(currentNode);
      }
      
      // Store node IDs of the pathway
      setActivePathway(pathway.map(node => node.id));
      
      // Reset activation stage
      pathwayActivationStage = 0;
      lastPathwayUpdateTime = Date.now();
    };
    
    // Activate a new random pathway periodically
    const updatePathway = () => {
      const now = Date.now();
      const timeSinceLastUpdate = now - lastPathwayUpdateTime;
      
      // If we haven't started a pathway yet, start one
      if (pathwayActivationStage === -1) {
        activateRandomPathway();
        return;
      }
      
      // Advance the pathway activation
      if (timeSinceLastUpdate > 300) { // Activate next node every 300ms
        if (pathwayActivationStage < activePathway.length) {
          // Activate next node in pathway
          const nodeToActivate = nodes.find(n => n.id === activePathway[pathwayActivationStage]);
          if (nodeToActivate) {
            nodeToActivate.active = true;
            
            // Activate connection from previous node if exists
            if (pathwayActivationStage > 0) {
              const prevNode = nodes.find(n => n.id === activePathway[pathwayActivationStage - 1]);
              if (prevNode) {
                const connection = prevNode.connections.find(c => c.node.id === nodeToActivate.id);
                if (connection) {
                  connection.active = true;
                }
              }
            }
          }
          
          pathwayActivationStage++;
          lastPathwayUpdateTime = now;
        } else if (timeSinceLastUpdate > 2000) {
          // After a delay, activate a new pathway
          activateRandomPathway();
        }
      }
    };
    
    // Render loop
    const render = () => {
      if (!ctx) return;
      
      // Update pathway activation
      updatePathway();
      
      // Clear canvas with semi-transparency for slight trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      
      // Update and draw all nodes
      nodes.forEach(node => {
        node.update();
      });
      
      // Draw connections first (so they appear behind nodes)
      nodes.forEach(node => {
        node.connections.forEach(connection => {
          const { node: connectNode, active } = connection;
          
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(connectNode.x, connectNode.y);
          
          if (active) {
            // Pulsing active connection
            const pulse = 0.5 + Math.sin(Date.now() / 200) * 0.5;
            ctx.strokeStyle = `rgba(232, 121, 249, ${0.3 + pulse * 0.7})`; // Secondary color with pulse
            ctx.lineWidth = 2;
          } else {
            // Normal connection
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
          }
          
          ctx.stroke();
        });
      });
      
      // Then draw nodes (on top of connections)
      nodes.forEach(node => {
        node.draw();
      });
      
      // Continue animation loop
      animationFrameId = requestAnimationFrame(render);
    };
    
    // Start the animation
    render();
    
    // Clean up on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions, activePathway]);
  
  return (
    <div ref={containerRef} className="w-full h-full bg-black/30 backdrop-blur-sm overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
};

export default GraphVisualization; 