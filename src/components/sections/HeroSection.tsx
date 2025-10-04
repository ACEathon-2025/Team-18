import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import MedicalCross from '@/components/3d/MedicalCross';
import FloatingPill from '@/components/3d/FloatingPill';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 z-10">
        {/* Floating medical elements */}
        <FloatingPill className="absolute top-20 left-10 animate-float" />
        <FloatingPill className="absolute top-32 right-20 animate-float" style={{ animationDelay: '2s' }} />
        <FloatingPill className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '4s' }} />
        
        {/* Decorative medical icons */}
        <motion.div
          className="absolute top-1/4 left-1/4 text-primary/20 text-6xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          ⚕️
        </motion.div>
        <motion.div
          className="absolute bottom-1/3 right-1/4 text-secondary/20 text-4xl"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🩺
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-6xl mx-auto px-4 text-center">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          {/* Left side - 3D Medical Cross */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3"
          >
            <MedicalCross className="w-48 h-48 mx-auto glow-primary" />
          </motion.div>

          {/* Right side - Text Content */}
          <div className="lg:w-2/3 space-y-8">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1 className="text-6xl lg:text-8xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                HackOps
              </h1>
              <h2 className="text-4xl lg:text-6xl font-semibold text-secondary mb-6">
                HealthHub
              </h2>
              <p className="text-2xl text-muted-foreground mb-2">
                Your Health, Simplified
              </p>
            </motion.div>

            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg lg:text-xl text-foreground/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Experience the future of healthcare management with our innovative platform. 
              Get personalized health guidance, smart reminders, and emergency support—all in one place.
            </motion.p>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/health-tips">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:shadow-glow-primary transition-all duration-300 text-lg px-8 py-4"
                >
                  Explore Health Tips
                </Button>
              </Link>
              <Link to="/symptom-checker">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-lg px-8 py-4"
                >
                  Check Symptoms
                </Button>
              </Link>
            </motion.div>

            {/* Health Stats */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Health Resources</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">Smart</div>
                <div className="text-sm text-muted-foreground">Health Guidance</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">Safe</div>
                <div className="text-sm text-muted-foreground">Health Management</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-primary rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;