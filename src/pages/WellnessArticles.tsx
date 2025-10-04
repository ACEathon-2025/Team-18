import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Tag, Heart, Brain, Activity, Utensils, Moon, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const WellnessArticles: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Articles', icon: Activity },
    { id: 'nutrition', name: 'Nutrition', icon: Utensils },
    { id: 'mental-health', name: 'Mental Health', icon: Brain },
    { id: 'fitness', name: 'Fitness', icon: Heart },
    { id: 'sleep', name: 'Sleep', icon: Moon },
    { id: 'prevention', name: 'Prevention', icon: Shield },
  ];

  const articles = [
    {
      id: 1,
      title: "10 Superfoods to Boost Your Immune System",
      excerpt: "Discover the power of nutrient-rich foods that can strengthen your body's natural defenses.",
      category: "nutrition",
      readTime: "5 min read",
      author: "Dr. Sarah Johnson",
      image: "🥬",
      tags: ["Immunity", "Nutrition", "Wellness"],
      content: "A comprehensive guide to foods that naturally boost your immune system, including citrus fruits, leafy greens, garlic, and yogurt. Learn how these superfoods work and easy ways to incorporate them into your daily diet."
    },
    {
      id: 2,
      title: "Mindfulness Meditation for Beginners",
      excerpt: "Learn simple meditation techniques to reduce stress and improve mental clarity.",
      category: "mental-health",
      readTime: "7 min read",
      author: "Dr. Michael Chen",
      image: "🧘",
      tags: ["Meditation", "Stress Relief", "Mental Health"],
      content: "Start your mindfulness journey with these beginner-friendly techniques. Discover breathing exercises, body scan meditations, and tips for building a consistent practice that fits your lifestyle."
    },
    {
      id: 3,
      title: "The Science of Quality Sleep",
      excerpt: "Understanding sleep cycles and how to optimize your rest for better health.",
      category: "sleep",
      readTime: "6 min read",
      author: "Dr. Emily Williams",
      image: "😴",
      tags: ["Sleep", "Health", "Recovery"],
      content: "Explore the importance of sleep for physical and mental health. Learn about sleep stages, circadian rhythms, and practical tips for improving sleep quality and duration."
    },
    {
      id: 4,
      title: "High-Intensity Interval Training (HIIT) Benefits",
      excerpt: "Maximize your workout efficiency with evidence-based HIIT strategies.",
      category: "fitness",
      readTime: "8 min read",
      author: "Coach Alex Martinez",
      image: "💪",
      tags: ["HIIT", "Fitness", "Exercise"],
      content: "Discover how HIIT can improve cardiovascular health, burn calories efficiently, and fit into busy schedules. Includes sample workouts and safety guidelines for all fitness levels."
    },
    {
      id: 5,
      title: "Preventive Health Screenings by Age",
      excerpt: "A comprehensive guide to essential health screenings throughout your lifetime.",
      category: "prevention",
      readTime: "10 min read",
      author: "Dr. Lisa Thompson",
      image: "🔍",
      tags: ["Prevention", "Screenings", "Health"],
      content: "Learn which preventive screenings are recommended at different life stages, from cholesterol checks to cancer screenings. Understand the importance of early detection and prevention."
    },
    {
      id: 6,
      title: "Hydration: More Than Just Water",
      excerpt: "The complete guide to proper hydration and its impact on your health.",
      category: "nutrition",
      readTime: "4 min read",
      author: "Nutritionist Karen Davis",
      image: "💧",
      tags: ["Hydration", "Water", "Health"],
      content: "Understand your body's hydration needs, signs of dehydration, and the best sources of fluids. Learn how proper hydration affects energy, skin health, and cognitive function."
    }
  ];

  const filteredArticles = activeCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link to="/">
            <Button variant="outline" size="icon" className="shrink-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Wellness Articles</h1>
            <p className="text-muted-foreground">Evidence-based health and wellness information</p>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={activeCategory === category.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </Button>
              );
            })}
          </div>
        </motion.div>

        {/* Articles Grid */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
        >
          {filteredArticles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between gap-3">
                    <div className="text-3xl">{article.image}</div>
                    <Badge variant="secondary" className="text-xs">
                      {article.readTime}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-1">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <User className="h-3 w-3" />
                    <span>{article.author}</span>
                  </div>
                  
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm">{article.content}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Health Disclaimer */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-muted/50 rounded-lg p-6 text-center"
        >
          <h3 className="font-semibold mb-2">📚 Educational Content</h3>
          <p className="text-sm text-muted-foreground">
            These articles are for educational purposes only and should not replace professional medical advice. 
            Always consult with healthcare providers for personalized medical guidance.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WellnessArticles;