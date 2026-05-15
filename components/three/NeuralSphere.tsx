import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, MeshWobbleMaterial, Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

interface NeuralSphereProps {
  scrollProgress: any; // MotionValue
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

const NeuralSphere: React.FC<NeuralSphereProps> = ({ scrollProgress, mouse }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Group>(null);
  const ringsRef = useRef<THREE.Group>(null);

  // Pre-calculate particle positions for better performance
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 60; i++) {
      const t = Math.random() * Math.PI * 2;
      const u = Math.random() * 2 - 1;
      const r = 2.5 + Math.random() * 2;
      const x = r * Math.sqrt(1 - u * u) * Math.cos(t);
      const y = r * Math.sqrt(1 - u * u) * Math.sin(t);
      const z = r * u;
      temp.push({ 
        position: [x, y, z] as [number, number, number], 
        speed: 0.5 + Math.random(),
        size: 0.02 + Math.random() * 0.05
      });
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.2;
      meshRef.current.rotation.y = time * 0.3;
    }

    if (coreRef.current) {
      // Pulsing effect
      const pulse = Math.sin(time * 2) * 0.1 + 1;
      coreRef.current.scale.setScalar(pulse);
      // Reactive glow
      if (coreRef.current.material instanceof THREE.MeshStandardMaterial) {
        coreRef.current.material.emissiveIntensity = 2 + Math.sin(time * 3) * 1;
      }
    }
    
    if (outerRef.current) {
      outerRef.current.rotation.z = time * 0.1;
      // Slight tilt towards mouse
      outerRef.current.rotation.x = THREE.MathUtils.lerp(outerRef.current.rotation.x, mouse.current.y * 0.2, 0.1);
      outerRef.current.rotation.y = THREE.MathUtils.lerp(outerRef.current.rotation.y, mouse.current.x * 0.2, 0.1);
    }

    if (ringsRef.current) {
      ringsRef.current.children.forEach((ring, i) => {
        ring.rotation.x = time * (0.2 + i * 0.05);
        ring.rotation.y = time * (0.1 + i * 0.05);
      });
    }
  });

  return (
    <group ref={outerRef}>
      {/* Background Starfield - Subtle inspiration */}
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      
      {/* Core Glowing Energy */}
      <Float speed={3} rotationIntensity={2} floatIntensity={2}>
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.6, 64, 64]} />
          <meshStandardMaterial
            color="#6366f1"
            emissive="#4f46e5"
            emissiveIntensity={5}
            roughness={0}
            metalness={1}
          />
        </mesh>
      </Float>

      {/* Main Distorted Shell */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.2, 128, 128]} />
          <MeshDistortMaterial
            color="#3b82f6"
            speed={3}
            distort={0.5}
            radius={1}
            transparent
            opacity={0.6}
            emissive="#1d4ed8"
            emissiveIntensity={1}
          />
        </mesh>
      </Float>

      {/* Outer Wobbling Shell - Adds layered complexity */}
      <mesh rotation={[Math.PI / 4, 0, 0]}>
        <sphereGeometry args={[1.6, 64, 64]} />
        <MeshWobbleMaterial 
          color="#a855f7" 
          factor={0.4} 
          speed={2} 
          wireframe 
          transparent 
          opacity={0.08} 
        />
      </mesh>

      {/* Orbital Circles (Data Rings) */}
      <group ref={ringsRef}>
        {[0.8, 1, 1.2].map((m, i) => (
          <mesh key={i} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
            <torusGeometry args={[2.2 + i * 0.4, 0.015, 16, 100]} />
            <meshBasicMaterial 
              color={i === 0 ? "#60a5fa" : i === 1 ? "#a78bfa" : "#f472b6"} 
              transparent 
              opacity={0.2} 
            />
          </mesh>
        ))}
      </group>

      {/* Connection Lines (Neural Network Web) */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} rotation={[0, (i * Math.PI) / 3, 0]}>
            <torusGeometry args={[2, 0.005, 16, 100]} />
            <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} />
          </mesh>
        ))}
      </group>

      {/* Floating Particles (Stardust) */}
      {particles.map((p, i) => (
        <Float key={i} speed={p.speed} rotationIntensity={2} floatIntensity={2}>
          <mesh position={p.position}>
            <boxGeometry args={[p.size, p.size, p.size]} />
            <meshBasicMaterial color={i % 2 === 0 ? "#60a5fa" : "#c084fc"} transparent opacity={0.8} />
          </mesh>
        </Float>
      ))}

      {/* Sparkles effect for that "inspiring" shimmer */}
      <Sparkles count={50} scale={6} size={2} speed={0.4} color="#60a5fa" />

      {/* Dramatic Lighting */}
      <pointLight position={[5, 5, 5]} intensity={2} color="#3b82f6" />
      <pointLight position={[-5, -5, -5]} intensity={2} color="#a855f7" />
      <pointLight position={[0, 0, 0]} intensity={4} color="#ffffff" distance={5} />
      
      {/* Spot light to create highlights */}
      <spotLight 
        position={[0, 10, 0]} 
        intensity={2} 
        angle={0.5} 
        penumbra={1} 
        color="#ffffff" 
      />
    </group>
  );
};

export default NeuralSphere;
