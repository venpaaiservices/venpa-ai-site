import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Database, 
  BarChart3, 
  Globe, 
  Camera, 
  CameraOff
} from 'lucide-react';
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
  return (
    <section id="ai-demo" className="py-24 bg-slate-50 dark:bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Vision Link Sandbox Section */}
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="pt-12"
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
