import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Phone, Plus, Trash2, ArrowLeft, AlertTriangle, 
  Heart, Shield, Clock, MapPin, User, Stethoscope 
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface EmergencyContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  email?: string;
  address?: string;
  category: 'family' | 'medical' | 'emergency' | 'other';
  isPrimary?: boolean;
}

const EmergencyContacts: React.FC = () => {
  const [contacts, setContacts] = useState<EmergencyContact[]>([
    {
      id: '1',
      name: 'Rakesh Garg',
      relationship: 'Father',
      phone: '+91-98765 43210',
      email: 'RakeshGarg@email.com',
      category: 'family',
      isPrimary: true
    },
    {
      id: '2',
      name: 'Dr Karthik Rao',
      relationship: 'Primary Care Physician',
      phone: '+91-088617 51416',
      email: 'office@drdarthikrao.com',
      address: 'Pervaje Rd, opp. LIC, Karkala, Karnataka-574104',
      category: 'medical'
    },
    {
      id: '3',
      name: 'Shumaila Garg',
      relationship: 'Mother',
      phone: '+91-87654 32109',
      category: 'family'
    },
    {
      id: '4',
      name: 'Nitte Rural Medical Center',
      relationship: 'Hospital',
      phone: '+91-82582 81180',
      address: '5WPV+2FG, Nitte, Karnataka 574110',
      category: 'emergency'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    email: '',
    address: '',
    category: 'family' as EmergencyContact['category']
  });

  const emergencyServices = [
    {
      name: 'Emergency Services',
      number: '112',
      description: 'Police, Fire, Medical Emergency',
      icon: '🚨'
    },
    {
      name: 'Poison Control',
      number: '1800-425-1213',
      description: 'Poisoning emergencies and information',
      icon: '☠️'
    },
    {
      name: 'Crisis Text Line',
      number: '+91-99996 65555',
      description: 'Mental health crisis support',
      icon: '💬'
    },
    {
      name: 'National Suicide Prevention',
      number: '+91-98204 66726',
      description: 'Suicide & crisis lifeline',
      icon: '🤝'
    }
  ];

  const getCategoryInfo = (category: EmergencyContact['category']) => {
    switch (category) {
      case 'family':
        return { label: 'Family', color: 'bg-blue-100 text-blue-700', icon: Heart };
      case 'medical':
        return { label: 'Medical', color: 'bg-green-100 text-green-700', icon: Stethoscope };
      case 'emergency':
        return { label: 'Emergency', color: 'bg-red-100 text-red-700', icon: AlertTriangle };
      default:
        return { label: 'Other', color: 'bg-gray-100 text-gray-700', icon: User };
    }
  };

  const addContact = () => {
    if (!newContact.name || !newContact.phone) return;
    
    const contact: EmergencyContact = {
      id: Date.now().toString(),
      ...newContact
    };
    
    setContacts([...contacts, contact]);
    setNewContact({ name: '', relationship: '', phone: '', email: '', address: '', category: 'family' });
    setShowAddForm(false);
  };

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const setPrimaryContact = (id: string) => {
    setContacts(contacts.map(contact => ({
      ...contact,
      isPrimary: contact.id === id
    })));
  };

  const groupedContacts = {
    family: contacts.filter(c => c.category === 'family'),
    medical: contacts.filter(c => c.category === 'medical'),
    emergency: contacts.filter(c => c.category === 'emergency'),
    other: contacts.filter(c => c.category === 'other')
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
                  Emergency Contacts
                </h1>
                <p className="text-muted-foreground">Quick access to important contacts</p>
              </div>
            </div>
            <Button 
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-primary hover:shadow-glow-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Contact
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Emergency Services */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-destructive" />
            Emergency Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {emergencyServices.map((service, index) => (
              <motion.div
                key={service.name}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="medical-card group cursor-pointer hover:shadow-glow-primary">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-3">{service.icon}</div>
                    <h3 className="font-semibold mb-2">{service.name}</h3>
                    <p className="text-2xl font-bold text-destructive mb-2">{service.number}</p>
                    <p className="text-xs text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Add Contact Form */}
        {showAddForm && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8"
          >
            <Card className="medical-card">
              <CardHeader>
                <CardTitle>Add Emergency Contact</CardTitle>
                <CardDescription>Add someone important to your emergency contact list</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={newContact.name}
                      onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship *</Label>
                    <Input
                      id="relationship"
                      value={newContact.relationship}
                      onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
                      placeholder="Spouse, Doctor, Friend, etc."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={newContact.phone}
                      onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                      placeholder="+91-12345 67890"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newContact.email}
                      onChange={(e) => setNewContact({...newContact, email: e.target.value})}
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <select
                      id="category"
                      value={newContact.category}
                      onChange={(e) => setNewContact({...newContact, category: e.target.value as EmergencyContact['category']})}
                      className="w-full px-3 py-2 border border-input bg-background rounded-md"
                    >
                      <option value="family">Family</option>
                      <option value="medical">Medical</option>
                      <option value="emergency">Emergency</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={newContact.address}
                      onChange={(e) => setNewContact({...newContact, address: e.target.value})}
                      placeholder="123 Main St, City, State"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={addContact}>Add Contact</Button>
                  <Button variant="outline" onClick={() => setShowAddForm(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Contact Categories */}
        <div className="space-y-8">
          {Object.entries(groupedContacts).map(([category, contactList]) => {
            if (contactList.length === 0) return null;
            
            const categoryInfo = getCategoryInfo(category as EmergencyContact['category']);
            const Icon = categoryInfo.icon;
            
            return (
              <motion.div
                key={category}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="w-5 h-5 text-primary" />
                  <h2 className="text-2xl font-bold capitalize">{category} Contacts</h2>
                  <Badge variant="outline">{contactList.length}</Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contactList.map((contact, index) => (
                    <motion.div
                      key={contact.id}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className={`medical-card ${contact.isPrimary ? 'ring-2 ring-primary' : ''}`}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <CardTitle className="text-lg flex items-center gap-2">
                                {contact.name}
                                {contact.isPrimary && (
                                  <Badge className="bg-primary text-primary-foreground text-xs">
                                    Primary
                                  </Badge>
                                )}
                              </CardTitle>
                              <CardDescription>{contact.relationship}</CardDescription>
                            </div>
                            <div className="flex items-center gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setPrimaryContact(contact.id)}
                                className="text-primary hover:text-primary"
                              >
                                <Heart className={`w-4 h-4 ${contact.isPrimary ? 'fill-current' : ''}`} />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => deleteContact(contact.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" />
                            <a href={`tel:${contact.phone}`} className="text-sm hover:text-primary">
                              {contact.phone}
                            </a>
                          </div>
                          
                          {contact.email && (
                            <div className="flex items-center gap-2">
                              <span className="w-4 h-4 text-4xl leading-none">✉️</span>
                              <a href={`mailto:${contact.email}`} className="text-sm hover:text-primary">
                                {contact.email}
                              </a>
                            </div>
                          )}
                          
                          {contact.address && (
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-muted-foreground">{contact.address}</p>
                            </div>
                          )}
                          
                          <Button className="w-full bg-gradient-primary hover:shadow-glow-primary">
                            <Phone className="w-4 h-4 mr-2" />
                            Call Now
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Emergency Instructions */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <Card className="medical-card bg-gradient-medical">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                In Case of Emergency
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Medical Emergency:</h4>
                  <ol className="space-y-1 text-muted-foreground">
                    <li>1. Call 112 immediately</li>
                    <li>2. Provide clear location and situation</li>
                    <li>3. Follow dispatcher instructions</li>
                    <li>4. Contact primary emergency contact</li>
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Personal Information:</h4>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>• Keep medical ID updated on phone</li>
                    <li>• Carry emergency contact card in wallet</li>
                    <li>• Share location with trusted contacts</li>
                    <li>• Update emergency contacts regularly</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default EmergencyContacts;