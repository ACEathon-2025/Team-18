import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Pill, Clock, Plus, Trash2, ArrowLeft, Bell, 
  Calendar, AlertCircle, CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  notes: string;
  taken: boolean;
  nextDose: Date;
}

const MedicineReminders: React.FC = () => {
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Vitamin D3',
      dosage: '1000 IU',
      frequency: 'Once daily',
      time: '08:00',
      notes: 'Take with breakfast',
      taken: true,
      nextDose: new Date(Date.now() + 24 * 60 * 60 * 1000)
    },
    {
      id: '2', 
      name: 'Omega-3',
      dosage: '1000mg',
      frequency: 'Twice daily',
      time: '08:00',
      notes: 'Take with meals',
      taken: false,
      nextDose: new Date(Date.now() + 2 * 60 * 60 * 1000)
    },
    {
      id: '3',
      name: 'Blood Pressure Medication',
      dosage: '10mg',
      frequency: 'Once daily',
      time: '20:00',
      notes: 'Take before bedtime',
      taken: false,
      nextDose: new Date(Date.now() + 8 * 60 * 60 * 1000)
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMedication, setNewMedication] = useState({
    name: '',
    dosage: '',
    frequency: '',
    time: '',
    notes: ''
  });

  const formatTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getNextDoseStatus = (nextDose: Date) => {
    const now = new Date();
    const diffHours = (nextDose.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < 0) {
      return { status: 'overdue', color: 'text-destructive', text: 'Overdue' };
    } else if (diffHours < 1) {
      return { status: 'soon', color: 'text-orange-500', text: 'Due soon' };
    } else if (diffHours < 24) {
      const hours = Math.floor(diffHours);
      return { status: 'upcoming', color: 'text-primary', text: `In ${hours}h` };
    } else {
      const days = Math.floor(diffHours / 24);
      return { status: 'scheduled', color: 'text-muted-foreground', text: `In ${days}d` };
    }
  };

  const toggleMedicationTaken = (id: string) => {
    setMedications(medications.map(med => 
      med.id === id ? { ...med, taken: !med.taken } : med
    ));
  };

  const deleteMedication = (id: string) => {
    setMedications(medications.filter(med => med.id !== id));
  };

  const addMedication = () => {
    if (!newMedication.name || !newMedication.time) return;
    
    const newMed: Medication = {
      id: Date.now().toString(),
      ...newMedication,
      taken: false,
      nextDose: new Date() // This would be calculated based on frequency and time
    };
    
    setMedications([...medications, newMed]);
    setNewMedication({ name: '', dosage: '', frequency: '', time: '', notes: '' });
    setShowAddForm(false);
  };

  const todaysMedications = medications.filter(med => {
    const today = new Date().toDateString();
    return med.nextDose.toDateString() === today;
  });

  const upcomingMedications = medications.filter(med => {
    const today = new Date().toDateString();
    return med.nextDose.toDateString() !== today;
  });

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
                  Medicine Reminders
                </h1>
                <p className="text-muted-foreground">Never miss a dose again</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-primary hover:shadow-glow-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Medication
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Add Medication Form */}
        {showAddForm && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Add New Medication</CardTitle>
                <CardDescription>Set up a new medication reminder</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Medication Name *</Label>
                    <Input
                      id="name"
                      value={newMedication.name}
                      onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                      placeholder="e.g., Aspirin"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dosage">Dosage</Label>
                    <Input
                      id="dosage"
                      value={newMedication.dosage}
                      onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                      placeholder="e.g., 500mg"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Input
                      id="frequency"
                      value={newMedication.frequency}
                      onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                      placeholder="e.g., Twice daily"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newMedication.time}
                      onChange={(e) => setNewMedication({...newMedication, time: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={newMedication.notes}
                    onChange={(e) => setNewMedication({...newMedication, notes: e.target.value})}
                    placeholder="Special instructions, side effects to watch for, etc."
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={addMedication}>Add Medication</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Today's Medications */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <h2 className="text-2xl font-bold">Today's Schedule</h2>
              <Badge variant="outline">{todaysMedications.length} medications</Badge>
            </div>
            
            {todaysMedications.length === 0 ? (
              <Card className="medical-card">
                <CardContent className="p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-secondary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">No medications scheduled for today.</p>
                </CardContent>
              </Card>
            ) : (
              todaysMedications.map((medication, index) => (
                <motion.div
                  key={medication.id}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`medical-card ${medication.taken ? 'opacity-75 bg-secondary/20' : ''}`}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            medication.taken ? 'bg-secondary text-secondary-foreground' : 'bg-primary text-primary-foreground'
                          }`}>
                            <Pill className="w-5 h-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{medication.name}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{medication.dosage}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {formatTime(medication.time)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant={medication.taken ? "secondary" : "default"}
                            onClick={() => toggleMedicationTaken(medication.id)}
                          >
                            {medication.taken ? 'Taken' : 'Mark Taken'}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteMedication(medication.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    {(medication.frequency || medication.notes) && (
                      <CardContent className="pt-0">
                        {medication.frequency && (
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Frequency:</strong> {medication.frequency}
                          </p>
                        )}
                        {medication.notes && (
                          <p className="text-sm text-muted-foreground">
                            <strong>Notes:</strong> {medication.notes}
                          </p>
                        )}
                      </CardContent>
                    )}
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          {/* Upcoming & All Medications */}
          <div className="space-y-6">
            {/* Upcoming */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                <h2 className="text-2xl font-bold">Upcoming</h2>
              </div>
              
              {upcomingMedications.slice(0, 3).map((medication, index) => {
                const doseStatus = getNextDoseStatus(medication.nextDose);
                
                return (
                  <motion.div
                    key={medication.id}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="medical-card">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Pill className="w-5 h-5 text-primary" />
                            <div>
                              <h4 className="font-semibold">{medication.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {medication.dosage} • {formatTime(medication.time)}
                              </p>
                            </div>
                          </div>
                          <Badge variant="outline" className={doseStatus.color}>
                            {doseStatus.text}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Medication Safety Tips */}
            <Card className="medical-card bg-gradient-medical">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-primary" />
                  Medication Safety Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Always take medications at the same time each day</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Read labels carefully and follow dosage instructions</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Store medications in a cool, dry place away from children</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Never share prescription medications with others</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1 h-1 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p>Check expiration dates regularly and dispose of expired medications safely</p>
                </div>
              </CardContent>
            </Card>

            {/* Medication Summary */}
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Medication Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Total Medications</span>
                    <span className="font-bold text-2xl text-primary">{medications.length}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Taken Today</span>
                    <span className="font-bold text-2xl text-secondary">
                      {todaysMedications.filter(m => m.taken).length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Pending Today</span>
                    <span className="font-bold text-2xl text-orange-500">
                      {todaysMedications.filter(m => !m.taken).length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Medical Disclaimer */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <Card className="medical-card border-muted">
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-muted-foreground mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-2">Important Reminder</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    This medication reminder tool is for informational purposes only. Always consult with your 
                    healthcare provider before starting, stopping, or changing any medications. Never adjust 
                    dosages without medical supervision.
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

export default MedicineReminders;