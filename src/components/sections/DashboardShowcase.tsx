import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Calculator, Heart, Stethoscope, Brain, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardShowcase: React.FC = () => {
  const [bmi, setBmi] = useState<number | null>(null);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');

  const calculateBMI = () => {
    const h = parseFloat(height) / 100; // convert cm to m
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const result = w / (h * h);
      setBmi(parseFloat(result.toFixed(1)));
    }
  };

  const healthResources = [
    {
      icon: BookOpen,
      title: "Health Library",
      value: "500+",
      subtitle: "Educational Articles",
      color: "text-blue-500",
      description: "Comprehensive health information and wellness guides"
    },
    {
      icon: Stethoscope,
      title: "Symptom Guide",
      value: "200+",
      subtitle: "Common Conditions",
      color: "text-green-500",
      description: "Learn about symptoms and when to seek medical care"
    },
    {
      icon: Heart,
      title: "First Aid",
      value: "50+",
      subtitle: "Emergency Procedures",
      color: "text-red-500",
      description: "Step-by-step emergency response instructions"
    },
    {
      icon: Brain,
      title: "Mental Health",
      value: "100+",
      subtitle: "Wellness Tips",
      color: "text-purple-500",
      description: "Mental wellness resources and stress management"
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-medical relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Health <span className="bg-gradient-secondary bg-clip-text text-transparent">Resource Center</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Access comprehensive health information, interactive tools, and educational resources to support your wellness journey.
          </p>
        </motion.div>

        {/* Health Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {healthResources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={resource.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <Card className="medical-card relative overflow-hidden h-full">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <Icon className={`w-6 h-6 ${resource.color}`} />
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                      >
                        <div className={`w-2 h-2 rounded-full bg-current ${resource.color} animate-pulse`} />
                      </motion.div>
                    </div>
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="space-y-3">
                      <div>
                        <div className="text-2xl font-bold">{resource.value}</div>
                        <div className="text-xs text-muted-foreground">{resource.subtitle}</div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {resource.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Health Calculator */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50 shadow-elevated mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-6 h-6 text-primary" />
            <h3 className="text-2xl font-bold">BMI Calculator</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
              <label className="block text-sm font-medium mb-2">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="170"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                placeholder="70"
              />
            </div>
            <Button onClick={calculateBMI} className="px-6 py-2">
              Calculate BMI
            </Button>
          </div>
          
          {bmi && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{bmi}</div>
                <div className="text-sm text-muted-foreground">
                  {bmi < 18.5 ? 'Underweight' : 
                   bmi < 25 ? 'Normal weight' : 
                   bmi < 30 ? 'Overweight' : 'Obese'}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Quick Access to Health Tools */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <h4 className="text-lg font-semibold mb-6">Quick Access to Health Resources</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { name: "Daily Health Tips", path: "/health-tips" },
              { name: "Symptom Checker", path: "/symptom-checker" }, 
              { name: "First Aid Guide", path: "/first-aid" },
              { name: "Emergency Contacts", path: "/emergency-contacts" },
              { name: "Medicine Information", path: "/medicine-reminders" },
              { name: "Wellness Articles", path: "/wellness-articles" }
            ].map((tool, index) => (
              <motion.div
                key={tool.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={tool.path}>
                  <Button 
                    variant="outline"
                    className="px-4 py-2 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
                  >
                    {tool.name}
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardShowcase;