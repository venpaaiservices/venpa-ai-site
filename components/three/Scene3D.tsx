import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useScroll, useTransform, motion } from 'motion/react';
import NeuralSphere from './NeuralSphere';
import { Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const Scene3D: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Scroll mapping - more dramatic movements
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1], [1.2, 1.8, 0.7, 1.4, 0.6, 1.5, 0.8]);
  const posX = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1], [2.5, 0, -3, 3, -4, 0, 2]);
  const posY = useTransform(scrollYProgress, [0, 0.15, 0.3, 0.5, 0.7, 0.85, 1], [0, 1.5, -1, 0.5, -2, 0, 0]);
  const rotationY = useTransform(scrollYProgress, [0, 0.5, 1], [0, Math.PI * 4, Math.PI * 8]);
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0.8, 1, 1, 0.5]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div 
        style={{ opacity }}
        className="w-full h-full"
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          
          <Suspense fallback={null}>
            <SceneContent 
              scale={scale} 
              posX={posX} 
              posY={posY} 
              rotationY={rotationY} 
              scrollYProgress={scrollYProgress} 
              mouse={mouse}
            />
            <Environment preset="city" />
            <ContactShadows 
              position={[0, -2.5, 0]} 
              opacity={0.4} 
              scale={10} 
              blur={2.5} 
              far={4.5} 
            />
          </Suspense>
        </Canvas>
      </motion.div>
    </div>
  );
};

interface SceneContentProps {
  scale: any;
  posX: any;
  posY: any;
  rotationY: any;
  scrollYProgress: any;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

const SceneContent: React.FC<SceneContentProps> = ({ scale, posX, posY, rotationY, scrollYProgress, mouse }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Smoothly follow scroll
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, scale.get(), 0.1));
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, posX.get(), 0.1);
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, posY.get(), 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, rotationY.get(), 0.1);

      // Add mouse influence
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.current.y * 0.2, 0.05);
      groupRef.current.rotation.y += mouse.current.x * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      <NeuralSphere scrollProgress={scrollYProgress} mouse={mouse} />
    </group>
  );
}

export default Scene3D;
