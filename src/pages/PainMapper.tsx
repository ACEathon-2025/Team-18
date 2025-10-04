import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Trash2, AlertCircle, Info, Pill, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/navigation/Navbar';
import { HumanBody } from '@/components/3d/HumanBody';
import { BodyPart, PainSession } from '@/types/pain';
import { painRecommendations } from '@/data/painRecommendations';
import { toast } from 'sonner';

const STORAGE_KEY = 'pain-mapper-data';

const PainMapper: React.FC = () => {
  const [selectedParts, setSelectedParts] = useState<PainSession>({});
  const [activePart, setActivePart] = useState<BodyPart | null>(null);
  const [intensity, setIntensity] = useState(5);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const data = JSON.parse(stored);
        setSelectedParts(data.currentSession || {});
      } catch (e) {
        console.error('Error loading pain data:', e);
      }
    }
  }, []);

  // Save to localStorage whenever selectedParts changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      currentSession: selectedParts,
      lastUpdated: Date.now()
    }));
  }, [selectedParts]);

  const handlePartClick = (part: BodyPart) => {
    setActivePart(part);
    setIntensity(selectedParts[part]?.intensity || 5);
  };

  const handleIntensityChange = (value: number[]) => {
    setIntensity(value[0]);
    if (activePart) {
      setSelectedParts(prev => ({
        ...prev,
        [activePart]: {
          intensity: value[0],
          timestamp: Date.now()
        }
      }));
      toast.success(`Pain level ${value[0]}/10 recorded for ${getBodyPartLabel(activePart)}`);
    }
  };

  const handleRemovePart = (part: BodyPart) => {
    setSelectedParts(prev => {
      const updated = { ...prev };
      delete updated[part];
      return updated;
    });
    if (activePart === part) {
      setActivePart(null);
    }
    toast.info(`Removed ${getBodyPartLabel(part)}`);
  };

  const handleClearAll = () => {
    setSelectedParts({});
    setActivePart(null);
    toast.success('All pain markers cleared');
  };


  const getBodyPartLabel = (part: BodyPart): string => {
    const found = painRecommendations.find(r => r.bodyPart === part);
    return found?.label || part;
  };

  const getRecommendations = (part: BodyPart, intensity: number) => {
    const recommendations = painRecommendations.find(r => r.bodyPart === part);
    if (!recommendations) return null;

    const level = intensity <= 3 ? 'mild' : intensity <= 6 ? 'moderate' : 'severe';
    return recommendations.conditions[level];
  };

  const selectedPartsArray = Object.entries(selectedParts).map(([part, data]) => ({
    part: part as BodyPart,
    ...data
  }));

  const activeRecommendations = activePart ? getRecommendations(activePart, intensity) : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-3">
              3D Pain Mapper
            </h1>
            <p className="text-muted-foreground text-lg">
              Click on body parts to mark pain areas and get personalized recommendations
            </p>
          </motion.div>
        </div>

        {/* Alert */}
        <Alert className="mb-6 border-orange-500/50 bg-orange-500/10">
          <AlertCircle className="w-4 h-4 text-orange-500" />
          <AlertDescription className="text-sm">
            <strong>Medical Disclaimer:</strong> This tool provides general information only. Always consult healthcare professionals for proper diagnosis and treatment. In emergencies, call your local emergency services immediately.
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 3D Body Viewer */}
          <div className="lg:col-span-2">
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Interactive 3D Body Model
                </CardTitle>
                <CardDescription>
                  Rotate with mouse • Click body parts to mark pain • Scroll to zoom
                </CardDescription>
              </CardHeader>
              <CardContent>
                <HumanBody
                  selectedParts={Object.fromEntries(
                    Object.entries(selectedParts).map(([part, data]) => [part, data.intensity])
                  )}
                  onPartClick={handlePartClick}
                />
                
                {/* Color Legend */}
                <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#fef08a]" />
                    <span>Mild (1-3)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#fb923c]" />
                    <span>Moderate (4-6)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#ef4444]" />
                    <span>Severe (7-9)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-[#991b1b]" />
                    <span>Extreme (10)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            {/* Active Selection */}
            {activePart ? (
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {getBodyPartLabel(activePart)}
                  </CardTitle>
                  <CardDescription>Pain Intensity Level</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Intensity</span>
                      <Badge variant={intensity <= 3 ? 'secondary' : intensity <= 6 ? 'default' : 'destructive'}>
                        {intensity}/10
                      </Badge>
                    </div>
                    <Slider
                      value={[intensity]}
                      onValueChange={handleIntensityChange}
                      min={1}
                      max={10}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Mild</span>
                      <span>Moderate</span>
                      <span>Severe</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemovePart(activePart)}
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Remove
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="medical-card">
                <CardContent className="pt-6">
                  <div className="text-center text-muted-foreground">
                    <Info className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Click on a body part to record pain</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Active Pain Areas */}
            {selectedPartsArray.length > 0 && (
              <Card className="medical-card">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Active Pain Areas</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleClearAll}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {selectedPartsArray.map(({ part, intensity }) => (
                    <div
                      key={part}
                      className="flex items-center justify-between p-2 rounded bg-muted/50 hover:bg-muted cursor-pointer"
                      onClick={() => handlePartClick(part)}
                    >
                      <span className="font-medium">{getBodyPartLabel(part)}</span>
                      <Badge variant={intensity <= 3 ? 'secondary' : intensity <= 6 ? 'default' : 'destructive'}>
                        {intensity}/10
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

          </div>
        </div>

        {/* Recommendations */}
        {activePart && activeRecommendations && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mt-8"
          >
            <Card className="medical-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Pill className="w-5 h-5" />
                  Recommendations for {getBodyPartLabel(activePart)}
                </CardTitle>
                <CardDescription>
                  Pain Level: {intensity <= 3 ? 'Mild' : intensity <= 6 ? 'Moderate' : 'Severe'}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Tips */}
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    💡 Tips to Help
                  </h3>
                  <ul className="space-y-1">
                    {activeRecommendations.tips.map((tip, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Medicines */}
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    💊 Over-the-Counter Medicines
                  </h3>
                  <ul className="space-y-1">
                    {activeRecommendations.medicines.map((med, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary">•</span>
                        <span>{med}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Home Remedies */}
                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    🏠 Home Remedies
                  </h3>
                  <ul className="space-y-1">
                    {activeRecommendations.homeRemedies.map((remedy, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary">•</span>
                        <span>{remedy}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator />

                {/* Warning */}
                <Alert className="border-red-500/50 bg-red-500/10">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <AlertDescription>
                    <strong>When to Seek Medical Help:</strong> {activeRecommendations.whenToWorry}
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default PainMapper;
