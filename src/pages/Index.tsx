import React from 'react';
import ParticleBackground from '@/components/effects/ParticleBackground';
import Navbar from '@/components/navigation/Navbar';
import DailyQuote from '@/components/sections/DailyQuote';
import HeroSection from '@/components/sections/HeroSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import DashboardShowcase from '@/components/sections/DashboardShowcase';
import AccessibilitySection from '@/components/sections/AccessibilitySection';
import Footer from '@/components/sections/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Particle Background Animation */}
      <ParticleBackground />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Daily Health Quote */}
      <section className="py-8 px-4">
        <DailyQuote />
      </section>

      {/* Main Content */}
      <main id="main-content" className="relative z-10" tabIndex={-1}>
        {/* Hero Section with 3D Medical Cross */}
        <HeroSection />
        
        {/* Features Section with Interactive Cards */}
        <FeaturesSection />
        
        {/* Dashboard Showcase */}
        <DashboardShowcase />
        
        {/* Accessibility Features */}
        <AccessibilitySection />
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
