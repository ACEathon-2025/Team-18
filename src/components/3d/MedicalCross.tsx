import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Group } from 'three';

const RotatingCross = () => {
  const meshRef = useRef<Group>(null!);

  useFrame((state) => {
    meshRef.current.rotation.y += 0.01;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.1;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
  });

  return (
    <group ref={meshRef}>
      {/* Vertical bar of cross */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 2, 0.3]} />
        <meshPhongMaterial color="#0066CC" />
      </mesh>
      {/* Horizontal bar of cross */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[1.5, 0.3, 0.3]} />
        <meshPhongMaterial color="#00A86B" />
      </mesh>
      {/* Glowing core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshPhongMaterial 
          color="#E6F3FF" 
          emissive="#0066CC"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  );
};

interface MedicalCrossProps {
  className?: string;
}

const MedicalCross: React.FC<MedicalCrossProps> = ({ className = "" }) => {
  return (
    <div className={`w-32 h-32 ${className}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#0066CC" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00A86B" />
        <RotatingCross />
      </Canvas>
    </div>
  );
};

export default MedicalCross;