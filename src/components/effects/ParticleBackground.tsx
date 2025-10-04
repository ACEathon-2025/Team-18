import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  color: string;
  duration: number;
}

const ParticleBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles: Particle[] = [];
      const colors = ['#0066CC', '#00A86B', '#E6F3FF'];
      
      for (let i = 0; i < 30; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: 100 + Math.random() * 10,
          size: Math.random() * 6 + 2,
          delay: Math.random() * 5,
          color: colors[Math.floor(Math.random() * colors.length)],
          duration: 15 + Math.random() * 10,
        });
      }
      setParticles(newParticles);
    };

    createParticles();
    const interval = setInterval(createParticles, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full opacity-30"
          style={{
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            left: `${particle.x}%`,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
          }}
          initial={{ y: '100vh', opacity: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.7, 0],
            x: [0, 50, -30, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'linear',
            repeat: Infinity,
          }}
        />
      ))}
      
      {/* Medical cross particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`cross-${i}`}
          className="absolute text-primary/20"
          style={{
            left: `${Math.random() * 100}%`,
            fontSize: `${12 + Math.random() * 8}px`,
          }}
          initial={{ y: '100vh', opacity: 0, rotate: 0 }}
          animate={{
            y: '-10vh',
            opacity: [0, 0.4, 0],
            rotate: 360,
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            delay: Math.random() * 8,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          ✚
        </motion.div>
      ))}
    </div>
  );
};

export default ParticleBackground;