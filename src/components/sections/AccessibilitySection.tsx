import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, HardDrive, Type, Contrast, Users, Accessibility, Volume2, Palette } from 'lucide-react';
import { useAccessibility } from '@/contexts/AccessibilityContext';

const AccessibilitySection: React.FC = () => {
  const { 
    highContrast, 
    toggleHighContrast, 
    colorBlindMode, 
    setColorBlindMode, 
    fontSize, 
    setFontSize,
    textToSpeechEnabled, 
    toggleTextToSpeech,
    speakText
  } = useAccessibility();

  const accessibilityFeatures = [
    {
      icon: Contrast,
      title: "High Contrast Mode",
      description: "Enhanced visual contrast for better readability and reduced eye strain.",
      color: "text-purple-500",
      gradient: "from-purple-500/10 to-violet-500/10",
      active: highContrast,
      action: toggleHighContrast
    },
    {
      icon: HardDrive,
      title: "Offline Mode",
      description: "All features work offline with local storage - no internet required.",
      color: "text-blue-500",
      gradient: "from-blue-500/10 to-cyan-500/10",
      active: true,
      action: () => {}
    },
    {
      icon: Type,
      title: "Large Text Support", 
      description: "Scalable font sizes and clear typography for users with visual impairments.",
      color: "text-green-500",
      gradient: "from-green-500/10 to-emerald-500/10",
      active: fontSize !== 'normal',
      action: () => setFontSize(fontSize === 'normal' ? 'large' : fontSize === 'large' ? 'extra-large' : 'normal')
    },
    {
      icon: Volume2,
      title: "Text-to-Speech",
      description: "Click any text, button, or heading to have it read aloud using your browser's speech synthesis.",
      color: "text-orange-500", 
      gradient: "from-orange-500/10 to-amber-500/10",
      active: textToSpeechEnabled,
      action: () => {
        toggleTextToSpeech();
        if (!textToSpeechEnabled) {
          setTimeout(() => speakText("Text to speech is now enabled. Click any text to hear it spoken."), 100);
        }
      }
    }
  ];

  return (
    <section className="py-20 px-4 bg-background relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Accessibility className="w-12 h-12 text-primary" />
            </motion.div>
            <h2 className="text-4xl lg:text-5xl font-bold">
              Inclusive <span className="bg-gradient-primary bg-clip-text text-transparent">Healthcare</span>
            </h2>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Healthcare should be accessible to everyone. Our platform is designed with comprehensive accessibility features 
            to ensure all users can manage their health effectively.
          </p>
        </motion.div>

        {/* Accessibility Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {accessibilityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  ease: "easeOut"
                }}
              >
                <Card className={`medical-card group h-full ${feature.active ? 'ring-2 ring-primary/50' : ''}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}
                        >
                          <Icon className={`w-6 h-6 ${feature.color}`} />
                        </motion.div>
                        <div>
                          <CardTitle className="text-xl group-hover:text-primary transition-colors">
                            {feature.title}
                          </CardTitle>
                        </div>
                      </div>
                      <Button
                        onClick={feature.action}
                        variant={feature.active ? "default" : "outline"}
                        size="sm"
                        className="min-w-[80px]"
                      >
                        {feature.active ? "ON" : "OFF"}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed mb-4">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Color Blind Mode Controls */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <Card className="medical-card p-6">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-semibold">Color Vision Support</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Adjust colors for different types of color vision to ensure optimal readability.
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { value: 'none', label: 'Normal Vision' },
                { value: 'deuteranopia', label: 'Deuteranopia' },
                { value: 'protanopia', label: 'Protanopia' },
                { value: 'tritanopia', label: 'Tritanopia' }
              ].map((option) => (
                <Button
                  key={option.value}
                  onClick={() => setColorBlindMode(option.value as any)}
                  variant={colorBlindMode === option.value ? "default" : "outline"}
                  size="sm"
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Inclusive Design Showcase */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-medical rounded-3xl p-8 border border-border/50"
        >
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4">Universal Design Principles</h3>
            <p className="text-muted-foreground text-lg">
              Built following WCAG 2.1 AA standards for maximum accessibility
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🔊",
                title: "Text-to-Speech",
                description: "Click any text, button, or heading to have it read aloud"
              },
              {
                icon: "🎨", 
                title: "Color Vision Support",
                description: "Multiple color blind modes with high contrast options"
              },
              {
                icon: "💾",
                title: "Offline Functionality",
                description: "All accessibility settings stored locally"
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Statement */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="inline-block medical-card max-w-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Users className="w-8 h-8 text-primary" />
                </motion.div>
                <h4 className="text-2xl font-bold">Healthcare for Everyone</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                We believe that everyone deserves equal access to quality healthcare tools. 
                Our commitment to accessibility ensures that no one is left behind in their health journey.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default AccessibilitySection;