import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Utensils, Dumbbell, Moon, Droplets, Brain, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const HealthTips: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Tips', icon: Heart },
    { id: 'nutrition', name: 'Nutrition', icon: Utensils },
    { id: 'exercise', name: 'Exercise', icon: Dumbbell },
    { id: 'sleep', name: 'Sleep', icon: Moon },
    { id: 'hydration', name: 'Hydration', icon: Droplets },
    { id: 'mental', name: 'Mental Health', icon: Brain },
  ];

  const healthTips = [
    {
      id: 1,
      category: 'nutrition',
      title: 'Eat Rainbow Colors Daily',
      description: 'Include fruits and vegetables of different colors in your daily diet to ensure diverse nutrient intake.',
      details: 'Different colored fruits and vegetables provide various vitamins, minerals, and antioxidants. Red foods like tomatoes contain lycopene, orange foods like carrots provide beta-carotene, and green leafy vegetables offer folate and iron.',
      tip: 'Aim for at least 5 different colors on your plate each day.',
      difficulty: 'Easy'
    },
    {
      id: 2,
      category: 'exercise',
      title: '30 Minutes of Movement',
      description: 'Incorporate at least 30 minutes of physical activity into your daily routine.',
      details: 'Regular physical activity helps maintain a healthy weight, reduces risk of chronic diseases, improves mood, and boosts energy levels. It doesn\'t have to be intense - even walking counts!',
      tip: 'Start with 10-minute intervals if 30 minutes seems too much.',
      difficulty: 'Moderate'
    },
    {
      id: 3,
      category: 'sleep',
      title: 'Consistent Sleep Schedule',
      description: 'Go to bed and wake up at the same time every day, even on weekends.',
      details: 'A regular sleep schedule helps regulate your body\'s internal clock, making it easier to fall asleep and wake up naturally. Quality sleep is crucial for physical recovery, mental health, and immune function.',
      tip: 'Create a relaxing bedtime routine 1 hour before sleep.',
      difficulty: 'Easy'
    },
    {
      id: 4,
      category: 'hydration',
      title: 'Stay Properly Hydrated',
      description: 'Drink water throughout the day to maintain optimal hydration levels.',
      details: 'Proper hydration supports all body functions including temperature regulation, joint lubrication, and nutrient transport. Dehydration can cause fatigue, headaches, and decreased concentration.',
      tip: 'Carry a water bottle and sip regularly rather than waiting until you feel thirsty.',
      difficulty: 'Easy'
    },
    {
      id: 5,
      category: 'mental',
      title: 'Practice Mindfulness',
      description: 'Take 10 minutes daily for mindfulness or meditation to reduce stress.',
      details: 'Regular mindfulness practice can reduce anxiety, improve focus, enhance emotional regulation, and promote overall mental well-being. It helps you stay present and manage daily stressors more effectively.',
      tip: 'Use guided meditation apps or simply focus on your breathing.',
      difficulty: 'Moderate'
    },
    {
      id: 6,
      category: 'nutrition',
      title: 'Portion Control',
      description: 'Use smaller plates and bowls to naturally control portion sizes.',
      details: 'Visual cues strongly influence how much we eat. Smaller plates create the illusion of larger portions, helping you feel satisfied with less food while maintaining proper nutrition.',
      tip: 'Fill half your plate with vegetables, quarter with protein, and quarter with whole grains.',
      difficulty: 'Easy'
    },
    {
      id: 7,
      category: 'exercise',
      title: 'Take Regular Breaks',
      description: 'Stand up and move for 2-3 minutes every hour if you work at a desk.',
      details: 'Prolonged sitting can increase risk of various health issues. Regular movement breaks improve circulation, reduce muscle tension, and can boost productivity and focus.',
      tip: 'Set hourly reminders to stand, stretch, or take a quick walk.',
      difficulty: 'Easy'
    },
    {
      id: 8,
      category: 'mental',
      title: 'Social Connections',
      description: 'Maintain meaningful relationships and social connections for mental health.',
      details: 'Strong social relationships are linked to longer life, better mental health, and reduced risk of depression. Regular social interaction provides emotional support and sense of belonging.',
      tip: 'Schedule regular check-ins with friends or family, even if just a phone call.',
      difficulty: 'Moderate'
    }
  ];

  const filteredTips = activeCategory === 'all' 
    ? healthTips 
    : healthTips.filter(tip => tip.category === activeCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-secondary text-secondary-foreground';
      case 'Moderate': return 'bg-primary text-primary-foreground';
      case 'Hard': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Health Tips
                </h1>
                <p className="text-muted-foreground">Evidence-based wellness guidance</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.id;
              
              return (
                <Button
                  key={category.id}
                  variant={isActive ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 ${
                    isActive ? 'bg-gradient-primary text-primary-foreground' : ''
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </motion.div>

        {/* Health Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.map((tip, index) => (
            <motion.div
              key={tip.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="medical-card h-full group">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getDifficultyColor(tip.difficulty)}>
                      {tip.difficulty}
                    </Badge>
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors">
                    {tip.title}
                  </CardTitle>
                  <CardDescription>{tip.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm mb-2 text-foreground">Why it matters:</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tip.details}
                    </p>
                  </div>
                  <div className="bg-accent/50 p-3 rounded-lg">
                    <h4 className="font-semibold text-sm mb-1 text-accent-foreground">💡 Pro Tip:</h4>
                    <p className="text-sm text-muted-foreground">
                      {tip.tip}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Health Reminder */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="inline-block medical-card max-w-2xl">
            <CardContent className="p-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Heart className="w-8 h-8 text-primary animate-pulse-medical" />
                <h3 className="text-2xl font-bold">Remember</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Small, consistent changes lead to big health improvements over time. 
                Start with one tip that resonates with you and build from there. 
                Always consult with healthcare professionals for personalized medical advice.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default HealthTips;