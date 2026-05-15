import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  Send, 
  Terminal, 
  Cpu, 
  Database, 
  Zap, 
  MessageSquare,
  Sparkles,
  BarChart3,
  Globe,
  Loader2,
  Camera,
  CameraOff
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import Markdown from 'react-markdown';
import { Hands, Results } from '@mediapipe/hands';
import { Camera as MPCamera } from '@mediapipe/camera_utils';

const NeuralInterface: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [handTracked, setHandTracked] = useState(false);
  const handsRef = useRef<Hands | null>(null);
  const cameraRef = useRef<MPCamera | null>(null);
  const lastHandsResults = useRef<Results | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number, y: number, vx: number, vy: number, r: number, color: string, shape: 'circle' | 'square' | 'triangle' }[] = [];
    const count = 60;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    };

    const init = () => {
      particles = [];
      const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          r: Math.random() * 3 + 1,
          color: 'rgba(59, 130, 246, 0.5)',
          shape: 'circle'
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 1;

      // Interaction Logic
      const hand = lastHandsResults.current?.multiHandLandmarks?.[0];
      let interactionX = -1;
      let interactionY = -1;
      let isPinching = false;

      if (hand) {
        // Thumb tip (4) and Index tip (8)
        const thumb = hand[4];
        const index = hand[8];
        const pinchDist = Math.hypot(thumb.x - index.x, thumb.y - index.y);
        isPinching = pinchDist < 0.05; // Threshold for pinch

        interactionX = (1 - index.x) * canvas.width; // Mirrored
        interactionY = index.y * canvas.height;
        
        // Visual feedback for hand tracking
        ctx.beginPath();
        ctx.arc(interactionX, interactionY, isPinching ? 25 : 15, 0, Math.PI * 2);
        ctx.fillStyle = isPinching ? 'rgba(168, 85, 247, 0.3)' : 'rgba(236, 72, 153, 0.2)';
        ctx.fill();
        ctx.strokeStyle = isPinching ? 'rgba(168, 85, 247, 0.6)' : 'rgba(236, 72, 153, 0.5)';
        ctx.stroke();
      }

      particles.forEach((p, i) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Interaction influence
        if (interactionX !== -1) {
          const dx = p.x - interactionX;
          const dy = p.y - interactionY;
          const dist = Math.hypot(dx, dy);
          if (dist < 200) {
            const force = (200 - dist) / 1500;
            p.vx += dx * force * (isPinching ? -0.2 : 0.1); // Attract if pinching, repel otherwise
            p.vy += dy * force * (isPinching ? -0.2 : 0.1);
            p.color = isPinching ? 'rgba(168, 85, 247, 0.7)' : 'rgba(236, 72, 153, 0.6)';
            
            if (isPinching && Math.random() > 0.95) {
                const shapes: ('circle' | 'square' | 'triangle')[] = ['circle', 'square', 'triangle'];
                p.shape = shapes[Math.floor(Math.random() * shapes.length)];
            }
          } else {
            p.color = 'rgba(59, 130, 246, 0.5)';
          }
        } else {
            p.color = 'rgba(59, 130, 246, 0.5)';
        }

        // Friction/Speed limit
        p.vx *= 0.98;
        p.vy *= 0.98;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.fillStyle = p.color;
        
        if (p.shape === 'circle') {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        } else if (p.shape === 'square') {
            ctx.fillRect(p.x - p.r, p.y - p.r, p.r * 2, p.r * 2);
        } else if (p.shape === 'triangle') {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y - p.r);
            ctx.lineTo(p.x - p.r, p.y + p.r);
            ctx.lineTo(p.x + p.r, p.y + p.r);
            ctx.closePath();
            ctx.fill();
        }

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < (isPinching ? 150 : 100)) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = interactionX !== -1 && dist < 80 ? (isPinching ? 'rgba(168, 85, 247, 0.3)' : 'rgba(236, 72, 153, 0.2)') : 'rgba(59, 130, 246, 0.15)';
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // MediaPipe Initialization
  useEffect(() => {
    if (isCameraActive && !handsRef.current) {
      const hands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
      });

      hands.onResults((results) => {
        lastHandsResults.current = results;
        setHandTracked(results.multiHandLandmarks.length > 0);
      });

      handsRef.current = hands;

      if (videoRef.current) {
        cameraRef.current = new MPCamera(videoRef.current, {
          onFrame: async () => {
            if (handsRef.current && videoRef.current) {
              await handsRef.current.send({ image: videoRef.current });
            }
          },
          width: 640,
          height: 480
        });
        cameraRef.current.start();
      }
    } else if (!isCameraActive && cameraRef.current) {
      cameraRef.current.stop();
      cameraRef.current = null;
      handsRef.current = null;
      lastHandsResults.current = null;
      setHandTracked(false);
    }
  }, [isCameraActive]);

  return (
    <div className="absolute inset-0 w-full h-full">
      <video ref={videoRef} className="hidden" playsInline muted />
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full cursor-crosshair opacity-80"
      />
      
      {/* Overlay controls */}
      <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-3">
        <button
          onClick={() => setIsCameraActive(!isCameraActive)}
          className={`p-3 rounded-full backdrop-blur-md border border-white/20 transition-all ${
            isCameraActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' : 'bg-white/10 text-slate-300 hover:bg-white/20'
          }`}
          title={isCameraActive ? "Deactivate Neural Vision" : "Activate Neural Vision (Camera Tracking)"}
        >
          {isCameraActive ? <Camera className="h-5 w-5" /> : <CameraOff className="h-5 w-5" />}
        </button>
        
        {isCameraActive && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md ${
              handTracked 
                ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                : 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
            }`}
          >
            {handTracked ? 'Hand Synced' : 'Ready for Input'}
          </motion.div>
        )}
      </div>

      {!isCameraActive && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="bg-slate-900/40 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/10 text-center">
            <p className="text-xs font-bold text-white uppercase tracking-widest mb-1">Neural Navigation</p>
            <p className="text-[10px] text-slate-400 font-mono italic">
              {handTracked ? 'Pinch fingers to attract & change shapes' : 'Activate camera for hand-gesture interaction'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const AIDemo: React.FC = () => {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: "Hello! I'm the Venpa AI Strategic Assistant. How can I help you visualize your enterprise's AI transformation today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
            ...messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] })),
            { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: "You are Venpa AI's Lead Engineering Assistant. You help enterprise clients understand how Agentic AI, RAG, and Workflow Automation can transform their business. Be technical, direct, and visionary. Keep responses relatively concise but high-impact.",
        }
      });

      const aiText = response.text || "I apologize, but I encountered an issue processing that request. How else can Venpa AI assist you?";
      setMessages(prev => [...prev, { role: 'ai', content: aiText }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'ai', content: "Our neural networks are currently optimizing. Please try again in a moment for a strategic consultation." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const demoFeatures = [
    { icon: Bot, title: "Autonomous Reasoners", desc: "Multi-step decision making agents." },
    { icon: Database, title: "Private RAG", desc: "Secure knowledge retrieval pipelines." },
    { icon: Zap, title: "Process Intel", desc: "Automated workflow orchestration." }
  ];

  return (
    <section id="ai-demo" className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Interactive Strategic Demo</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold font-display text-slate-900 dark:text-white mb-6 leading-tight">
              Experience the Future of <br />
              <span className="text-blue-600">Enterprise Intelligence</span>
            </h2>
            
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed max-w-xl">
              Don't just read about AI—interact with it. Our strategic assistant provides a window into how we engineer autonomous systems that solve complex business bottlenecks.
            </p>

            <div className="space-y-6">
              {demoFeatures.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="flex items-start space-x-4 p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
                >
                  <div className="mt-1 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-500">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Interactive Chat Terminal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Background Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl rounded-[2.5rem] -z-10" />
            
            <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[600px]">
              {/* Terminal Header */}
              <div className="bg-slate-900/80 border-b border-slate-800 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <div className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <div className="h-4 w-[1px] bg-slate-700 mx-2" />
                  <div className="flex items-center space-x-2 text-slate-400 text-sm font-mono">
                    <Terminal className="h-4 w-4" />
                    <span>venpa-assistant@v1.0</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Live Engine</span>
                </div>
              </div>

              {/* Chat Content */}
              <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide"
              >
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-4 ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
                    }`}>
                      <div className="text-sm prose prose-invert max-w-none">
                        <Markdown>{msg.content}</Markdown>
                      </div>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-slate-900 text-slate-400 p-4 rounded-2xl rounded-tl-none border border-slate-800 flex items-center space-x-3">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                      <span className="text-sm font-mono tracking-tighter italic">Synthesizing strategy...</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 bg-slate-900/50 border-t border-slate-800">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about AI Readiness or RAG architecture..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 pr-12 text-white text-sm outline-none focus:border-blue-500 transition-all placeholder:text-slate-600"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={isLoading || !input.trim()}
                    className="absolute right-2 p-2 text-blue-500 hover:text-blue-400 disabled:text-slate-700 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                <div className="mt-3 flex items-center justify-between px-1">
                    <div className="text-[10px] text-slate-600 font-mono flex items-center space-x-2">
                        <BarChart3 className="h-3 w-3" />
                        <span>Latency: 240ms</span>
                        <Globe className="h-3 w-3 ml-2" />
                        <span>Region: Asia-1</span>
                    </div>
                    <div className="text-[10px] text-slate-600 font-mono">
                        Press Enter to Send
                    </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Neural Interface Section Below */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, delay: 0.2 }}
           className="mt-20 pt-12 border-t border-slate-200 dark:border-slate-800"
        >
            <div className="mb-10 flex flex-col md:flex-row items-end md:items-center justify-between gap-6 px-4">
                <div className="max-w-2xl">
                   <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                       <Cpu className="h-8 w-8 text-blue-500 animate-pulse" />
                       Vision Link Sandbox
                   </h3>
                   <p className="text-slate-600 dark:text-slate-400 mt-2 text-lg">
                       Step into the neural interface. Interact with autonomous logical structures using real-time hand-gesture vision.
                   </p>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-900/30">
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest leading-none">Hardware Acceleration Active</span>
                </div>
            </div>

            <motion.div
              className="relative rounded-[3rem] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-2xl bg-slate-950 group h-[550px] mx-auto"
            >
              <NeuralInterface />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none"></div>
              <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-10 pointer-events-none">
                <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-3">
                    <Database className="h-5 w-5 text-blue-400" />
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-white uppercase tracking-widest leading-none">Spatial Sync Active</span>
                        <span className="text-[8px] text-slate-500 font-mono mt-1">Neural Flow Node v4.12.0</span>
                    </div>
                </div>
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest hidden lg:flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-green-500 rounded-full"></div>
                    <span>Direct Vision Link Ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>Data Uplink: 1.2 GB/s</span>
                  </div>
                </div>
              </div>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AIDemo;
