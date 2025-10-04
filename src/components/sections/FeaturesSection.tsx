import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Pill, Lightbulb, Phone, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    icon: Activity,
    title: "3D Pain Mapper",
    description: "Interactive 3D body model to map pain areas, track intensity, and receive personalized recommendations.",
    color: "text-primary",
    gradient: "from-primary/10 to-purple-500/10",
    link: "/pain-mapper"
  },
  {
    icon: Heart,
    title: "First-Aid Guidance",
    description: "Instant access to life-saving first-aid instructions with step-by-step guides and emergency protocols.",
    color: "text-red-500",
    gradient: "from-red-500/10 to-pink-500/10",
    link: "/first-aid"
  },
  {
    icon: Pill,
    title: "Medicine Reminders", 
    description: "Never miss a dose with smart medication reminders, dosage tracking, and medication management.",
    color: "text-blue-500",
    gradient: "from-blue-500/10 to-cyan-500/10",
    link: "/medicine-reminders"
  },
  {
    icon: Lightbulb,
    title: "Health Tips",
    description: "Evidence-based health recommendations covering nutrition, exercise, sleep, and wellness practices.",
    color: "text-secondary",
    gradient: "from-secondary/10 to-green-500/10",
    link: "/health-tips"
  },
  {
    icon: Phone,
    title: "Emergency Contacts",
    description: "Quick access to emergency services, your doctors, and trusted contacts in critical situations.",
    color: "text-orange-500",
    gradient: "from-orange-500/10 to-yellow-500/10",
    link: "/emergency-contacts"
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-background relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Comprehensive <span className="bg-gradient-primary bg-clip-text text-transparent">Health Solutions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our integrated platform provides everything you need to manage your health effectively and confidently.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ y: 80, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <Link to={feature.link}>
                  <Card className="medical-card group cursor-pointer h-full">
                    <CardHeader className="text-center pb-4">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}
                      >
                        <Icon className={`w-8 h-8 ${feature.color}`} />
                      </motion.div>
                      <CardTitle className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-base leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Health Resources Info */}
        <div className="mt-20 relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-4 bg-gradient-medical p-8 rounded-2xl border border-border/50 backdrop-blur-sm">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-4xl"
              >
                ⚕️
              </motion.div>
              <div>
                <h3 className="text-2xl font-semibold mb-2">Comprehensive Health Resources</h3>
                <p className="text-muted-foreground">
                  Get reliable health information and tools to manage your wellness effectively
                </p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-4xl animate-pulse-medical"
              >
                💊
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;