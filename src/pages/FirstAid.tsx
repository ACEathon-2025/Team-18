import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Heart, Zap, ArrowLeft, Phone, Clock, CheckCircle2, Package, Plus, Trash2, Home, Car, Briefcase, Plane } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface KitItem {
  id: string;
  name: string;
  category: string;
  checked: boolean;
}

const FirstAid: React.FC = () => {
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);
  const [kitItems, setKitItems] = useState<KitItem[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedKit = localStorage.getItem('firstAidKit');
    if (savedKit) {
      setKitItems(JSON.parse(savedKit));
    } else {
      setKitItems(defaultKitItems);
    }
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (kitItems.length > 0) {
      localStorage.setItem('firstAidKit', JSON.stringify(kitItems));
    }
  }, [kitItems]);

  const defaultKitItems: KitItem[] = [
    // Basic Supplies
    { id: '1', name: 'Adhesive Bandages (various sizes)', category: 'Basic Supplies', checked: false },
    { id: '2', name: 'Sterile Gauze Pads (2x2, 4x4)', category: 'Basic Supplies', checked: false },
    { id: '3', name: 'Medical Tape', category: 'Basic Supplies', checked: false },
    { id: '4', name: 'Elastic Bandages', category: 'Basic Supplies', checked: false },
    { id: '5', name: 'Cotton Balls & Swabs', category: 'Basic Supplies', checked: false },
    { id: '6', name: 'Disposable Gloves', category: 'Basic Supplies', checked: false },
    { id: '7', name: 'Antiseptic Wipes', category: 'Basic Supplies', checked: false },
    { id: '8', name: 'Antibiotic Ointment', category: 'Basic Supplies', checked: false },
    // Medications
    { id: '9', name: 'Pain Relievers (Acetaminophen, Ibuprofen)', category: 'Medications', checked: false },
    { id: '10', name: 'Antihistamines', category: 'Medications', checked: false },
    { id: '11', name: 'Anti-diarrhea Medication', category: 'Medications', checked: false },
    { id: '12', name: 'Antacids', category: 'Medications', checked: false },
    { id: '13', name: 'Aspirin (for heart attack)', category: 'Medications', checked: false },
    { id: '14', name: 'EpiPen (if prescribed)', category: 'Medications', checked: false },
    // Tools & Equipment
    { id: '15', name: 'Scissors', category: 'Tools', checked: false },
    { id: '16', name: 'Tweezers', category: 'Tools', checked: false },
    { id: '17', name: 'Digital Thermometer', category: 'Tools', checked: false },
    { id: '18', name: 'Safety Pins', category: 'Tools', checked: false },
    { id: '19', name: 'Flashlight & Batteries', category: 'Tools', checked: false },
    { id: '20', name: 'Instant Cold Pack', category: 'Tools', checked: false },
    { id: '21', name: 'CPR Face Shield', category: 'Tools', checked: false },
    // Emergency Items
    { id: '22', name: 'Emergency Blanket', category: 'Emergency', checked: false },
    { id: '23', name: 'First Aid Manual', category: 'Emergency', checked: false },
    { id: '24', name: 'Emergency Contact List', category: 'Emergency', checked: false },
    { id: '25', name: 'Hand Sanitizer', category: 'Emergency', checked: false }
  ];

  const toggleKitItem = (id: string) => {
    setKitItems(items =>
      items.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const resetKit = () => {
    if (confirm('Reset your first aid kit checklist? This will uncheck all items.')) {
      setKitItems(defaultKitItems);
    }
  };

  const categories = ['Basic Supplies', 'Medications', 'Tools', 'Emergency'];

  const getProgress = () => {
    const checked = kitItems.filter(item => item.checked).length;
    return Math.round((checked / kitItems.length) * 100);
  };

  const emergencyGuides = [
    {
      id: 'cpr',
      title: 'CPR (Cardiopulmonary Resuscitation)',
      urgency: 'Emergency',
      description: 'For unconscious person who is not breathing normally',
      icon: '❤️',
      steps: [
        'Check for responsiveness - tap shoulders and shout "Are you OK?"',
        'Call 112 immediately or have someone else do it',
        'Place person on firm, flat surface. Tilt head back, lift chin',
        'Place heel of one hand on center of chest between nipples',
        'Place other hand on top, interlace fingers',
        'Push hard and fast at least 2 inches deep at 100-120 compressions per minute',
        'Allow complete chest recoil between compressions',
        'Give 30 chest compressions, then 2 rescue breaths',
        'Continue cycles of 30:2 until emergency services arrive'
      ],
      warnings: [
        'Only perform if person is unconscious and not breathing normally',
        'Do not stop until professional help arrives',
        'Switch with another person every 2 minutes if possible to avoid fatigue'
      ]
    },
    {
      id: 'choking',
      title: 'Choking (Heimlich Maneuver)',
      urgency: 'Emergency', 
      description: 'For conscious person who cannot cough, speak, or breathe',
      icon: '🫁',
      steps: [
        'Ask "Are you choking?" - if they can\'t speak, act immediately',
        'Stand behind the person, wrap arms around their waist',
        'Make a fist with one hand, place thumb side against stomach just above navel',
        'Grasp fist with other hand and press into stomach with quick upward thrust',
        'Repeat until object is expelled or person becomes unconscious',
        'If person becomes unconscious, lower to ground and begin CPR',
        'Call 112 if not already done'
      ],
      warnings: [
        'For infants under 1 year, use back blows and chest thrusts instead',
        'If pregnant or obese, use chest thrusts instead of abdominal thrusts',
        'Seek medical attention even if object is successfully removed'
      ]
    },
    {
      id: 'bleeding',
      title: 'Severe Bleeding Control',
      urgency: 'High',
      description: 'For wounds with heavy bleeding that won\'t stop',
      icon: '🩸',
      steps: [
        'Call 112 if bleeding is severe',
        'Put on protective gloves if available',
        'Remove any visible debris, but don\'t remove embedded objects',
        'Apply direct pressure to wound with clean cloth or bandage',
        'Maintain pressure continuously - don\'t peek under bandage',
        'If blood soaks through, add more layers on top',
        'Elevate injured area above heart level if possible',
        'Apply pressure to pressure point if bleeding doesn\'t stop',
        'Cover with bandage and secure firmly but not too tightly',
        'Monitor for signs of shock'
      ],
      warnings: [
        'Never remove objects embedded in wounds',
        'Don\'t use tourniquet unless trained and bleeding is life-threatening',
        'Seek immediate medical attention for deep cuts'
      ]
    },
    {
      id: 'burns',
      title: 'Burn Treatment',
      urgency: 'Medium',
      description: 'For thermal, chemical, or electrical burns',
      icon: '🔥',
      steps: [
        'Remove person from heat source and call 112 for severe burns',
        'For thermal burns, cool with cool (not cold) running water for 10-20 minutes',
        'Remove jewelry and loose clothing before swelling occurs',
        'Don\'t break blisters or remove stuck clothing',
        'Cover burn with sterile, non-fluffy dressing or clean plastic wrap',
        'For chemical burns, flush with water for 20+ minutes',
        'For electrical burns, ensure power source is off before approaching',
        'Give over-the-counter pain medication if needed',
        'Monitor for signs of infection'
      ],
      warnings: [
        'Never use ice, butter, or other home remedies on burns',
        'Seek immediate medical attention for burns on face, hands, feet, or genitals',
        'Call 112 for burns larger than palm of hand or if person is in severe pain'
      ]
    },
    {
      id: 'shock',
      title: 'Shock Treatment',
      urgency: 'High',
      description: 'For person showing signs of medical shock',
      icon: '⚡',
      steps: [
        'Call 112 immediately',
        'Check for breathing and pulse',
        'Control any obvious bleeding',
        'Lay person down and elevate legs 8-12 inches unless spinal injury suspected',
        'Keep person warm with blankets but don\'t overheat',
        'Loosen tight clothing around neck and waist',
        'Don\'t give food or water',
        'Monitor breathing and pulse continuously',
        'Begin CPR if person stops breathing or has no pulse',
        'Stay with person until help arrives'
      ],
      warnings: [
        'Signs of shock: pale/cool/moist skin, rapid weak pulse, rapid breathing',
        'Don\'t move person if spinal injury is suspected',
        'Never give anything by mouth to person in shock'
      ]
    },
    {
      id: 'seizure',
      title: 'Seizure Response',
      urgency: 'Medium',
      description: 'For someone having a seizure',
      icon: '🧠',
      steps: [
        'Stay calm and time the seizure',
        'Clear area of hard or sharp objects',
        'Place something soft under their head',
        'Turn person onto their side to help breathing',
        'Don\'t hold them down or put anything in their mouth',
        'Speak calmly and comfort them as they recover',
        'Stay with them until they\'re fully alert',
        'Call 112 if seizure lasts more than 5 minutes or they\'re injured'
      ],
      warnings: [
        'Never put anything in person\'s mouth during seizure',
        'Don\'t restrain movement unless they\'re in danger',
        'Call 112 if it\'s their first seizure or if they don\'t wake up after'
      ]
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Emergency': return 'bg-destructive text-destructive-foreground';
      case 'High': return 'bg-orange-500 text-white';
      case 'Medium': return 'bg-primary text-primary-foreground';
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
                  First Aid Guide
                </h1>
                <p className="text-muted-foreground">Emergency response procedures</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Emergency Alert */}
      <div className="bg-destructive/10 border-l-4 border-destructive p-4 m-4">
        <div className="flex items-center gap-3">
          <Phone className="w-6 h-6 text-destructive" />
          <div>
            <h3 className="font-semibold text-destructive">Emergency: Call 112</h3>
            <p className="text-sm text-muted-foreground">
              In any life-threatening emergency, call 112 first, then provide first aid while waiting for help.
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Guide Selection */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Select Emergency Type</h2>
            {emergencyGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`medical-card cursor-pointer transition-all ${
                    selectedGuide === guide.id ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => setSelectedGuide(guide.id)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{guide.icon}</span>
                        <div>
                          <CardTitle className="text-lg">{guide.title}</CardTitle>
                          <CardDescription>{guide.description}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getUrgencyColor(guide.urgency)}>
                        {guide.urgency}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Detailed Instructions */}
          <div className="space-y-6">
            {selectedGuide ? (
              <motion.div
                key={selectedGuide}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-6"
              >
                {(() => {
                  const guide = emergencyGuides.find(g => g.id === selectedGuide);
                  if (!guide) return null;

                  return (
                    <>
                      <Card className="medical-card">
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{guide.icon}</span>
                            <div>
                              <CardTitle className="text-xl">{guide.title}</CardTitle>
                              <CardDescription>{guide.description}</CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>

                      <Card className="medical-card">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            Step-by-Step Instructions
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {guide.steps.map((step, index) => (
                              <motion.div
                                key={index}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-start gap-3 p-3 bg-accent/30 rounded-lg"
                              >
                                <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                  {index + 1}
                                </div>
                                <p className="text-sm leading-relaxed">{step}</p>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="medical-card border-orange-200 bg-orange-50/50 dark:bg-orange-950/20">
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2 text-orange-600">
                            <AlertTriangle className="w-5 h-5" />
                            Important Warnings
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {guide.warnings.map((warning, index) => (
                              <div key={index} className="flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-orange-700 dark:text-orange-300">{warning}</p>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </>
                  );
                })()}
              </motion.div>
            ) : (
              <Card className="medical-card">
                <CardContent className="p-12 text-center">
                  <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select an Emergency Type</h3>
                  <p className="text-muted-foreground">
                    Choose from the emergency situations on the left to see detailed first aid instructions.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Reference */}
            <Card className="medical-card bg-gradient-medical">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-primary" />
                  Quick Emergency Numbers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Emergency Services:</span>
                  <span className="font-bold text-destructive">112</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Poison Control:</span>
                  <span className="font-bold">1800-425-1213</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Crisis Text Line:</span>
                  <span className="font-bold">+91-99996 65555</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* First Aid Kit Builder & Preferences */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16"
        >
          <Card className="medical-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package className="w-6 h-6 text-primary" />
                  <div>
                    <CardTitle>First Aid Kit Builder & Preferences</CardTitle>
                    <CardDescription>Track your supplies and store important medical information</CardDescription>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  Progress: <span className="font-bold text-primary">{getProgress()}%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="kit" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="kit">
                    <Package className="w-4 h-4 mr-2" />
                    Kit Checklist
                  </TabsTrigger>
                  <TabsTrigger value="locations">
                    <Home className="w-4 h-4 mr-2" />
                    Kit Types
                  </TabsTrigger>
                </TabsList>

                {/* Kit Checklist Tab */}
                <TabsContent value="kit" className="space-y-6">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                      Check off items you have in your first aid kit
                    </p>
                    <Button variant="outline" size="sm" onClick={resetKit}>
                      Reset All
                    </Button>
                  </div>

                  {categories.map((category) => (
                    <div key={category} className="space-y-3">
                      <h4 className="font-semibold text-sm text-primary flex items-center gap-2">
                        {category === 'Basic Supplies' && '🩹'}
                        {category === 'Medications' && '💊'}
                        {category === 'Tools' && '🔧'}
                        {category === 'Emergency' && '🚨'}
                        {category}
                      </h4>
                      <div className="space-y-2 pl-4">
                        {kitItems
                          .filter(item => item.category === category)
                          .map((item) => (
                            <div key={item.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-accent/30 transition-colors">
                              <Checkbox
                                id={item.id}
                                checked={item.checked}
                                onCheckedChange={() => toggleKitItem(item.id)}
                              />
                              <Label
                                htmlFor={item.id}
                                className={`flex-1 cursor-pointer ${item.checked ? 'line-through text-muted-foreground' : ''}`}
                              >
                                {item.name}
                              </Label>
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>

                {/* Location Recommendations Tab */}
                <TabsContent value="locations" className="space-y-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Recommended first aid kit configurations for different locations
                  </p>

                  <div className="grid gap-4">
                    <Card className="border-l-4 border-l-primary">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Home className="w-5 h-5 text-primary" />
                          <div>
                            <CardTitle className="text-lg">Home Kit</CardTitle>
                            <CardDescription>Comprehensive kit for household emergencies</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• All basic supplies, medications, and tools</li>
                          <li>• Burn gel and eye wash</li>
                          <li>• Multiple sizes of bandages and dressings</li>
                          <li>• Store in easily accessible location</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Car className="w-5 h-5 text-blue-500" />
                          <div>
                            <CardTitle className="text-lg">Car Kit</CardTitle>
                            <CardDescription>Compact kit for vehicle emergencies</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Waterproof container</li>
                          <li>• Bandages, gauze, and tape</li>
                          <li>• Emergency blanket and flashlight</li>
                          <li>• Basic pain relievers</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-green-500">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Briefcase className="w-5 h-5 text-green-500" />
                          <div>
                            <CardTitle className="text-lg">Workplace Kit</CardTitle>
                            <CardDescription>Professional environment essentials</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Basic bandages and antiseptic</li>
                          <li>• Pain relievers and antacids</li>
                          <li>• Cold pack for minor injuries</li>
                          <li>• Keep in desk or common area</li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-l-4 border-l-orange-500">
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Plane className="w-5 h-5 text-orange-500" />
                          <div>
                            <CardTitle className="text-lg">Travel Kit</CardTitle>
                            <CardDescription>Portable kit for trips and vacations</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• TSA-compliant sizes (3.4oz liquids)</li>
                          <li>• Bandages, pain relievers, antihistamines</li>
                          <li>• Motion sickness and anti-diarrhea medication</li>
                          <li>• Compact and lightweight</li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8"
        >
          <Card className="medical-card border-muted">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2">Training Recommendation</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    While this guide provides essential first aid information, we strongly recommend taking a certified 
                    first aid and CPR course from organizations like the Red Cross or American Heart Association. 
                    Hands-on training is invaluable in emergency situations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default FirstAid;