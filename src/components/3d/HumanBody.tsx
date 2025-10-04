import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { BodyPart } from '@/types/pain';

interface BodyPartMesh {
  part: BodyPart;
  position: [number, number, number];
  geometry: 'sphere' | 'box' | 'cylinder';
  args: number[];
  rotation?: [number, number, number];
}

interface HumanBodyProps {
  selectedParts: { [key: string]: number };
  onPartClick: (part: BodyPart) => void;
}

const bodyParts: BodyPartMesh[] = [
  { part: 'head', position: [0, 3.5, 0], geometry: 'sphere', args: [0.4, 32, 32] },
  { part: 'neck', position: [0, 2.9, 0], geometry: 'cylinder', args: [0.2, 0.2, 0.3, 32] },
  { part: 'chest', position: [0, 2.2, 0], geometry: 'box', args: [0.9, 0.8, 0.4] },
  { part: 'abdomen', position: [0, 1.2, 0], geometry: 'box', args: [0.8, 0.7, 0.35] },
  { part: 'leftShoulder', position: [-0.6, 2.6, 0], geometry: 'sphere', args: [0.25, 32, 32] },
  { part: 'rightShoulder', position: [0.6, 2.6, 0], geometry: 'sphere', args: [0.25, 32, 32] },
  { part: 'leftArm', position: [-0.8, 1.9, 0], geometry: 'cylinder', args: [0.15, 0.15, 0.8, 32] },
  { part: 'rightArm', position: [0.8, 1.9, 0], geometry: 'cylinder', args: [0.15, 0.15, 0.8, 32] },
  { part: 'leftForearm', position: [-0.8, 1.0, 0], geometry: 'cylinder', args: [0.13, 0.13, 0.8, 32] },
  { part: 'rightForearm', position: [0.8, 1.0, 0], geometry: 'cylinder', args: [0.13, 0.13, 0.8, 32] },
  { part: 'leftHand', position: [-0.8, 0.4, 0], geometry: 'sphere', args: [0.15, 32, 32] },
  { part: 'rightHand', position: [0.8, 0.4, 0], geometry: 'sphere', args: [0.15, 32, 32] },
  { part: 'leftThigh', position: [-0.3, 0.2, 0], geometry: 'cylinder', args: [0.18, 0.18, 0.9, 32] },
  { part: 'rightThigh', position: [0.3, 0.2, 0], geometry: 'cylinder', args: [0.18, 0.18, 0.9, 32] },
  { part: 'leftLeg', position: [-0.3, -0.7, 0], geometry: 'cylinder', args: [0.14, 0.14, 0.9, 32] },
  { part: 'rightLeg', position: [0.3, -0.7, 0], geometry: 'cylinder', args: [0.14, 0.14, 0.9, 32] },
  { part: 'leftFoot', position: [-0.3, -1.3, 0.15], geometry: 'box', args: [0.2, 0.15, 0.4] },
  { part: 'rightFoot', position: [0.3, -1.3, 0.15], geometry: 'box', args: [0.2, 0.15, 0.4] },
  { part: 'back', position: [0, 1.7, -0.25], geometry: 'box', args: [0.85, 1.5, 0.2] }
];

const getColorFromIntensity = (intensity: number): string => {
  if (intensity <= 3) return '#fef08a'; // Light yellow
  if (intensity <= 6) return '#fb923c'; // Orange
  if (intensity <= 9) return '#ef4444'; // Red
  return '#991b1b'; // Dark red
};

const BodyPartMesh: React.FC<{
  bodyPart: BodyPartMesh;
  isSelected: boolean;
  intensity: number;
  onPartClick: (part: BodyPart) => void;
  isHovered: boolean;
  onHover: (part: BodyPart | null) => void;
}> = ({ bodyPart, isSelected, intensity, onPartClick, isHovered, onHover }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const color = isSelected ? getColorFromIntensity(intensity) : '#94a3b8';
  const emissive = isHovered || isSelected ? '#3b82f6' : '#000000';
  const emissiveIntensity = isHovered ? 0.3 : isSelected ? 0.2 : 0;

  const renderGeometry = () => {
    switch (bodyPart.geometry) {
      case 'sphere':
        return <sphereGeometry args={bodyPart.args as [number, number, number]} />;
      case 'box':
        return <boxGeometry args={bodyPart.args as [number, number, number]} />;
      case 'cylinder':
        return <cylinderGeometry args={bodyPart.args as [number, number, number, number]} />;
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={bodyPart.position}
      rotation={bodyPart.rotation}
      onClick={(e) => {
        e.stopPropagation();
        onPartClick(bodyPart.part);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        onHover(bodyPart.part);
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
        onHover(null);
      }}
    >
      {renderGeometry()}
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={emissiveIntensity}
        metalness={0.1}
        roughness={0.6}
      />
    </mesh>
  );
};

const HumanBodyScene: React.FC<HumanBodyProps> = ({ selectedParts, onPartClick }) => {
  const [hoveredPart, setHoveredPart] = useState<BodyPart | null>(null);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 1.5, 6]} />
      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 4}
      />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.4} />
      <pointLight position={[0, 3, 3]} intensity={0.5} />

      <group>
        {bodyParts.map((bodyPart) => (
          <BodyPartMesh
            key={bodyPart.part}
            bodyPart={bodyPart}
            isSelected={!!selectedParts[bodyPart.part]}
            intensity={selectedParts[bodyPart.part] || 0}
            onPartClick={onPartClick}
            isHovered={hoveredPart === bodyPart.part}
            onHover={setHoveredPart}
          />
        ))}
      </group>

      <gridHelper args={[10, 10, '#64748b', '#334155']} position={[0, -1.6, 0]} />
    </>
  );
};

export const HumanBody: React.FC<HumanBodyProps> = ({ selectedParts, onPartClick }) => {
  return (
    <div className="w-full h-[600px] rounded-lg overflow-hidden bg-gradient-to-b from-background to-muted/20 border border-border">
      <Canvas shadows>
        <HumanBodyScene selectedParts={selectedParts} onPartClick={onPartClick} />
      </Canvas>
    </div>
  );
};
