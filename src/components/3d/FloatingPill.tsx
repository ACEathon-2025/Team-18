import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface PillProps {
  position: [number, number, number];
  color: string;
  delay: number;
}

const Pill: React.FC<PillProps> = ({ position, color, delay }) => {
  const meshRef = useRef<Group>(null!);

  useFrame((state) => {
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.z += 0.003;
    meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.5;
    meshRef.current.position.x = position[0] + Math.cos(state.clock.elapsedTime * 0.5 + delay) * 0.3;
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Pill capsule body */}
      <mesh>
        <capsuleGeometry args={[0.2, 0.8, 4, 8]} />
        <meshPhongMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
      {/* Pill highlight */}
      <mesh position={[0.1, 0.2, 0.1]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshPhongMaterial 
          color="white" 
          emissive="white"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
};

interface FloatingPillProps {
  className?: string;
  style?: React.CSSProperties;
}

const FloatingPill: React.FC<FloatingPillProps> = ({ className = "", style }) => {
  return (
    <div className={`w-24 h-24 ${className}`} style={style}>
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#0066CC" />
        <Pill position={[0, 0, 0]} color="#0066CC" delay={0} />
      </Canvas>
    </div>
  );
};

export default FloatingPill;