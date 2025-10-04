import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Search, ArrowLeft, Stethoscope, Clock, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const SymptomChecker: React.FC = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const symptomCategories = [
    {
      name: 'General Symptoms',
      symptoms: [
        'Fever', 'Fatigue', 'Headache', 'Dizziness', 'Nausea', 'Vomiting', 
        'Loss of appetite', 'Weight loss', 'Weight gain', 'Chills'
      ]
    },
    {
      name: 'Respiratory',
      symptoms: [
        'Cough', 'Shortness of breath', 'Wheezing', 'Chest pain', 
        'Sore throat', 'Runny nose', 'Sneezing', 'Difficulty breathing'
      ]
    },
    {
      name: 'Digestive',
      symptoms: [
        'Stomach pain', 'Diarrhea', 'Constipation', 'Heartburn', 
        'Bloating', 'Gas', 'Blood in stool', 'Difficulty swallowing'
      ]
    },
    {
      name: 'Neurological',
      symptoms: [
        'Memory problems', 'Confusion', 'Seizures', 'Numbness', 
        'Tingling', 'Weakness', 'Vision changes', 'Hearing problems'
      ]
    },
    {
      name: 'Musculoskeletal',
      symptoms: [
        'Joint pain', 'Muscle pain', 'Back pain', 'Stiffness', 
        'Swelling', 'Bruising', 'Difficulty walking', 'Limping'
      ]
    }
  ];

  const getPossibleConditions = () => {
    const conditions = [
      {
        name: 'Common Cold',
        symptoms: ['Runny nose', 'Sneezing', 'Sore throat', 'Cough', 'Fatigue'],
        urgency: 'Low',
        description: 'A viral infection of the upper respiratory tract.',
        recommendations: [
          'Get plenty of rest',
          'Stay hydrated',
          'Use over-the-counter pain relievers if needed',
          'Consider throat lozenges for sore throat'
        ]
      },
      {
        name: 'Influenza (Flu)',
        symptoms: ['Fever', 'Fatigue', 'Headache', 'Muscle pain', 'Cough', 'Chills'],
        urgency: 'Medium',
        description: 'A viral infection that affects the respiratory system.',
        recommendations: [
          'Rest and stay home to avoid spreading',
          'Drink plenty of fluids',
          'Consider antiviral medication if within 48 hours of onset',
          'Monitor temperature and symptoms'
        ]
      },
      {
        name: 'Gastroenteritis',
        symptoms: ['Nausea', 'Vomiting', 'Diarrhea', 'Stomach pain', 'Fever'],
        urgency: 'Medium',
        description: 'Inflammation of the stomach and intestines, often called "stomach flu".',
        recommendations: [
          'Stay hydrated with clear fluids',
          'Follow the BRAT diet (Bananas, Rice, Applesauce, Toast)',
          'Avoid dairy and fatty foods',
          'Seek medical care if symptoms worsen'
        ]
      },
      {
        name: 'Migraine',
        symptoms: ['Headache', 'Nausea', 'Vision changes', 'Dizziness'],
        urgency: 'Medium',
        description: 'A neurological condition characterized by intense headaches.',
        recommendations: [
          'Rest in a quiet, dark room',
          'Apply cold or warm compress to head/neck',
          'Stay hydrated',
          'Consider over-the-counter pain medication'
        ]
      },
      {
        name: 'Heart Attack',
        symptoms: ['Chest pain', 'Shortness of breath', 'Nausea', 'Dizziness', 'Fatigue'],
        urgency: 'Emergency',
        description: 'A serious medical emergency requiring immediate attention.',
        recommendations: [
          'Call emergency services immediately (112)',
          'Chew aspirin if not allergic',
          'Remain calm and rest',
          'Do not drive yourself to hospital'
        ]
      }
    ];

    return conditions.filter(condition => 
      condition.symptoms.some(symptom => selectedSymptoms.includes(symptom))
    ).sort((a, b) => {
      const matchA = a.symptoms.filter(s => selectedSymptoms.includes(s)).length;
      const matchB = b.symptoms.filter(s => selectedSymptoms.includes(s)).length;
      return matchB - matchA;
    });
  };

  const handleSymptomChange = (symptom: string, checked: boolean) => {
    if (checked) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    } else {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'Low': return 'bg-secondary text-secondary-foreground';
      case 'Medium': return 'bg-primary text-primary-foreground';
      case 'High': return 'bg-orange-500 text-white';
      case 'Emergency': return 'bg-destructive text-destructive-foreground';
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
                  Symptom Checker
                </h1>
                <p className="text-muted-foreground">Find possible conditions based on your symptoms</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Emergency Warning */}
      <div className="bg-destructive/10 border-l-4 border-destructive p-4 m-4">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6 text-destructive" />
          <div>
            <h3 className="font-semibold text-destructive">Emergency Warning</h3>
            <p className="text-sm text-muted-foreground">
              If you're experiencing a medical emergency, call 112 immediately. 
              This tool is for informational purposes only and should not replace professional medical advice.
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Symptom Selection */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
            >
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="w-5 h-5 text-primary" />
                    Select Your Symptoms
                  </CardTitle>
                  <CardDescription>
                    Check all symptoms you're currently experiencing. Selected: {selectedSymptoms.length}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {symptomCategories.map((category, categoryIndex) => (
                    <motion.div
                      key={category.name}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: categoryIndex * 0.1 }}
                      className="space-y-3"
                    >
                      <h3 className="font-semibold text-lg text-foreground">{category.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {category.symptoms.map((symptom) => (
                          <div key={symptom} className="flex items-center space-x-2">
                            <Checkbox
                              id={symptom}
                              checked={selectedSymptoms.includes(symptom)}
                              onCheckedChange={(checked) => handleSymptomChange(symptom, checked as boolean)}
                            />
                            <label
                              htmlFor={symptom}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                            >
                              {symptom}
                            </label>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <div className="flex gap-4">
              <Button
                onClick={() => setShowResults(true)}
                disabled={selectedSymptoms.length === 0}
                className="bg-gradient-primary hover:shadow-glow-primary"
              >
                <Stethoscope className="w-4 h-4 mr-2" />
                Check Symptoms
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedSymptoms([]);
                  setShowResults(false);
                }}
              >
                Clear All
              </Button>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {showResults && selectedSymptoms.length > 0 && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold">Possible Conditions</h2>
                {getPossibleConditions().map((condition, index) => {
                  const matchingSymptoms = condition.symptoms.filter(s => selectedSymptoms.includes(s));
                  
                  return (
                    <motion.div
                      key={condition.name}
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="medical-card">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">{condition.name}</CardTitle>
                            <Badge className={getUrgencyColor(condition.urgency)}>
                              {condition.urgency}
                            </Badge>
                          </div>
                          <CardDescription>{condition.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Matching Symptoms ({matchingSymptoms.length}):</h4>
                            <div className="flex flex-wrap gap-1">
                              {matchingSymptoms.map((symptom) => (
                                <Badge key={symptom} variant="outline" className="text-xs">
                                  {symptom}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-sm mb-2">Recommendations:</h4>
                            <ul className="text-sm text-muted-foreground space-y-1">
                              {condition.recommendations.map((rec, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
                
                {getPossibleConditions().length === 0 && (
                  <Card className="medical-card">
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">
                        No matching conditions found for the selected symptoms. 
                        Consider consulting with a healthcare professional for personalized advice.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}

            {/* Emergency Contact */}
            <Card className="medical-card border-destructive/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Phone className="w-5 h-5" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Emergency Services:</span>
                    <span className="font-bold">112</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Poison Control:</span>
                    <span className="font-bold">1800-425-1213</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Crisis Text Line:</span>
                    <span className="font-bold">+91-99996 65555</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Disclaimer */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  Important Notice
                </CardTitle>
              </CardHeader>
              <CardContent className="text-xs text-muted-foreground space-y-2">
                <p>
                  This symptom checker is for informational purposes only and should not be used 
                  as a substitute for professional medical advice, diagnosis, or treatment.
                </p>
                <p>
                  Always seek the advice of your physician or other qualified health provider 
                  with any questions you may have regarding a medical condition.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SymptomChecker;