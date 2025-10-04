import { BodyPartRecommendations } from '@/types/pain';

export const painRecommendations: BodyPartRecommendations[] = [
  {
    bodyPart: 'head',
    label: 'Head',
    conditions: {
      mild: {
        tips: ['Rest in a quiet, dark room', 'Stay hydrated - drink water', 'Apply cold compress to forehead', 'Avoid screens and bright lights'],
        medicines: ['Paracetamol 500mg', 'Ibuprofen 200mg'],
        whenToWorry: 'If headache persists for more than 3 days or worsens suddenly',
        homeRemedies: ['Peppermint oil on temples', 'Ginger tea', 'Gentle neck stretches', 'Deep breathing exercises']
      },
      moderate: {
        tips: ['Take prescribed pain medication', 'Avoid caffeine and alcohol', 'Practice relaxation techniques', 'Maintain regular sleep schedule'],
        medicines: ['Paracetamol 1000mg', 'Aspirin 300mg', 'Ibuprofen 400mg'],
        whenToWorry: 'If accompanied by vision changes, fever, or neck stiffness',
        homeRemedies: ['Lavender aromatherapy', 'Scalp massage', 'Warm shower', 'Magnesium supplements']
      },
      severe: {
        tips: ['Seek immediate medical attention', 'Lie down in dark room', 'Avoid all triggers', 'Someone should monitor you'],
        medicines: ['Consult doctor immediately - may need prescription migraine medication'],
        whenToWorry: 'IMMEDIATE: Worst headache of life, sudden onset, with confusion, seizures, or loss of consciousness',
        homeRemedies: ['Ice pack on head', 'Complete rest', 'Medical attention required']
      }
    }
  },
  {
    bodyPart: 'neck',
    label: 'Neck',
    conditions: {
      mild: {
        tips: ['Maintain good posture', 'Take breaks from desk work', 'Gentle neck rotations', 'Use proper pillow height'],
        medicines: ['Ibuprofen 200mg', 'Topical pain relief cream'],
        whenToWorry: 'If pain radiates down arms or causes numbness',
        homeRemedies: ['Warm compress for 15-20 mins', 'Gentle stretching', 'Ergonomic workspace setup']
      },
      moderate: {
        tips: ['Physical therapy exercises', 'Avoid sudden movements', 'Apply heat therapy', 'Consider neck support'],
        medicines: ['Ibuprofen 400mg', 'Muscle relaxants (consult doctor)', 'Topical diclofenac gel'],
        whenToWorry: 'If pain persists beyond 2 weeks or increases with movement',
        homeRemedies: ['Alternating hot/cold therapy', 'Epsom salt bath', 'Yoga for neck']
      },
      severe: {
        tips: ['Consult orthopedic specialist', 'Avoid heavy lifting', 'Consider MRI scan', 'Physical therapy recommended'],
        medicines: ['Prescription NSAIDs', 'Muscle relaxants', 'Nerve pain medication (if needed)'],
        whenToWorry: 'URGENT: Severe pain with fever, weakness in limbs, or loss of bladder control',
        homeRemedies: ['Medical treatment required', 'Complete rest', 'Ice packs initially']
      }
    }
  },
  {
    bodyPart: 'chest',
    label: 'Chest',
    conditions: {
      mild: {
        tips: ['Monitor symptoms closely', 'Avoid heavy meals', 'Sit upright', 'Deep breathing exercises'],
        medicines: ['Antacid (for heartburn)', 'Ibuprofen only if muscular'],
        whenToWorry: 'Any chest pain should be evaluated - especially if new onset',
        homeRemedies: ['Warm compress if muscular', 'Ginger tea for digestive issues']
      },
      moderate: {
        tips: ['Seek medical evaluation', 'Rest and avoid exertion', 'Monitor heart rate', 'Keep emergency contacts ready'],
        medicines: ['As prescribed by doctor only - do not self-medicate'],
        whenToWorry: 'If pain spreads to jaw, arm, or back, or comes with sweating',
        homeRemedies: ['Medical evaluation required', 'Rest in comfortable position']
      },
      severe: {
        tips: ['CALL EMERGENCY SERVICES IMMEDIATELY', 'Chew aspirin if instructed', 'Sit upright or semi-reclined', 'Stay calm'],
        medicines: ['Emergency medical care required - may need aspirin, nitroglycerin'],
        whenToWorry: 'EMERGENCY: Crushing chest pain, shortness of breath, nausea, cold sweats',
        homeRemedies: ['CALL 112/EMERGENCY SERVICES - This could be a heart attack']
      }
    }
  },
  {
    bodyPart: 'abdomen',
    label: 'Abdomen',
    conditions: {
      mild: {
        tips: ['Eat light, bland foods', 'Stay hydrated', 'Avoid fatty foods', 'Apply heating pad'],
        medicines: ['Antacid', 'Simethicone for gas', 'Loperamide for diarrhea'],
        whenToWorry: 'If pain persists beyond 24 hours or becomes localized',
        homeRemedies: ['Peppermint tea', 'BRAT diet (banana, rice, applesauce, toast)', 'Ginger for nausea']
      },
      moderate: {
        tips: ['Monitor pain location', 'Avoid solid foods temporarily', 'Track bowel movements', 'Rest'],
        medicines: ['Antacids', 'Pain relievers (avoid if ulcer suspected)', 'Anti-nausea medication'],
        whenToWorry: 'If pain in lower right (appendix), with fever, or severe cramping',
        homeRemedies: ['Clear liquids only', 'Heating pad on low', 'Chamomile tea']
      },
      severe: {
        tips: ['Seek immediate medical care', 'Do not eat or drink', 'Note pain characteristics', 'Lie still'],
        medicines: ['Hospital evaluation required - may need IV fluids, antibiotics, surgery'],
        whenToWorry: 'URGENT: Severe pain, rigid abdomen, fever, vomiting blood, signs of shock',
        homeRemedies: ['Medical attention required immediately', 'Do not delay treatment']
      }
    }
  },
  {
    bodyPart: 'back',
    label: 'Back',
    conditions: {
      mild: {
        tips: ['Maintain good posture', 'Gentle stretching', 'Apply ice first 48hrs then heat', 'Stay active - avoid bed rest'],
        medicines: ['Ibuprofen 200-400mg', 'Paracetamol 500-1000mg', 'Topical pain relief'],
        whenToWorry: 'If pain radiates down legs or causes numbness/tingling',
        homeRemedies: ['Ice packs for 15-20 min', 'Gentle yoga', 'Swimming', 'Proper lifting techniques']
      },
      moderate: {
        tips: ['Physical therapy recommended', 'Core strengthening exercises', 'Ergonomic adjustments', 'Avoid prolonged sitting'],
        medicines: ['NSAIDs regularly as directed', 'Muscle relaxants (prescription)', 'Topical lidocaine'],
        whenToWorry: 'If pain persists beyond 6 weeks or worsens at night',
        homeRemedies: ['Alternating hot/cold therapy', 'Epsom salt bath', 'Stretching routine', 'Massage therapy']
      },
      severe: {
        tips: ['Consult spine specialist', 'Consider imaging (X-ray/MRI)', 'Physical therapy essential', 'May need injections'],
        medicines: ['Prescription pain medication', 'Muscle relaxants', 'Nerve pain medication', 'Steroid injections'],
        whenToWorry: 'URGENT: Loss of bladder/bowel control, severe leg weakness, saddle numbness',
        homeRemedies: ['Medical treatment required', 'Gentle movement only', 'Proper support']
      }
    }
  },
  {
    bodyPart: 'leftShoulder',
    label: 'Left Shoulder',
    conditions: {
      mild: {
        tips: ['Rest shoulder', 'Avoid overhead activities', 'Gentle pendulum exercises', 'Ice if recent injury'],
        medicines: ['Ibuprofen 200mg', 'Topical anti-inflammatory gel'],
        whenToWorry: 'If pain persists or limits daily activities',
        homeRemedies: ['Ice packs', 'Gentle range-of-motion exercises', 'Proper sleeping position']
      },
      moderate: {
        tips: ['Physical therapy', 'Strengthen rotator cuff', 'Avoid lifting heavy objects', 'Improve posture'],
        medicines: ['Ibuprofen 400mg', 'Topical NSAIDs', 'Consider cortisone injection'],
        whenToWorry: 'If accompanied by chest pain (could be cardiac) or severe weakness',
        homeRemedies: ['Heat therapy after 48hrs', 'Stretching routine', 'Resistance band exercises']
      },
      severe: {
        tips: ['Orthopedic evaluation needed', 'May need imaging', 'Possible rotator cuff injury', 'Immobilization may help'],
        medicines: ['Prescription NSAIDs', 'Steroid injections', 'Prescription pain medication'],
        whenToWorry: 'URGENT: Sudden onset with chest pain or shortness of breath (rule out heart)',
        homeRemedies: ['Medical evaluation required', 'Sling if recommended', 'Ice for acute pain']
      }
    }
  },
  {
    bodyPart: 'rightShoulder',
    label: 'Right Shoulder',
    conditions: {
      mild: {
        tips: ['Rest shoulder', 'Avoid repetitive movements', 'Gentle stretching', 'Ice after activity'],
        medicines: ['Ibuprofen 200mg', 'Topical pain relief'],
        whenToWorry: 'If pain worsens or affects sleep',
        homeRemedies: ['Ice therapy', 'Gentle arm circles', 'Ergonomic workspace']
      },
      moderate: {
        tips: ['Physical therapy recommended', 'Rotator cuff exercises', 'Avoid overhead work', 'Proper sleep position'],
        medicines: ['Ibuprofen 400mg regularly', 'Muscle relaxants if needed', 'Topical diclofenac'],
        whenToWorry: 'If pain radiates down arm or limits range of motion significantly',
        homeRemedies: ['Heat therapy', 'Epsom salt compress', 'Stretching program']
      },
      severe: {
        tips: ['See orthopedic specialist', 'Imaging recommended', 'May need surgery', 'Rest and immobilization'],
        medicines: ['Prescription pain medication', 'Cortisone injections', 'Anti-inflammatories'],
        whenToWorry: 'If sudden inability to move arm, severe weakness, or constant pain',
        homeRemedies: ['Medical treatment required', 'Support sling', 'Complete rest']
      }
    }
  },
  {
    bodyPart: 'leftArm',
    label: 'Left Arm',
    conditions: {
      mild: {
        tips: ['Rest arm', 'Avoid repetitive strain', 'Gentle movement', 'Elevate if swollen'],
        medicines: ['Ibuprofen 200mg', 'Topical pain relief'],
        whenToWorry: 'If accompanied by chest pain or jaw pain',
        homeRemedies: ['Ice for inflammation', 'Compression sleeve', 'Gentle stretches']
      },
      moderate: {
        tips: ['Reduce activities', 'Physical therapy', 'Check blood pressure', 'Avoid heavy lifting'],
        medicines: ['NSAIDs as directed', 'Muscle relaxants if needed'],
        whenToWorry: 'If pain radiates from chest or includes numbness',
        homeRemedies: ['Alternating hot/cold', 'Massage', 'Rest periods']
      },
      severe: {
        tips: ['URGENT: Rule out cardiac issues', 'Seek immediate evaluation', 'Note all symptoms', 'Call emergency if chest pain'],
        medicines: ['Emergency evaluation required', 'Aspirin if cardiac suspected'],
        whenToWorry: 'EMERGENCY: Sudden onset with chest pain, shortness of breath, nausea',
        homeRemedies: ['Seek medical care immediately', 'Chew aspirin if instructed']
      }
    }
  },
  {
    bodyPart: 'rightArm',
    label: 'Right Arm',
    conditions: {
      mild: {
        tips: ['Rest from repetitive activities', 'Ice after use', 'Gentle stretching', 'Proper ergonomics'],
        medicines: ['Ibuprofen 200mg', 'Topical anti-inflammatory'],
        whenToWorry: 'If pain persists beyond a week or worsens',
        homeRemedies: ['Ice therapy', 'Compression', 'Elevation', 'Rest']
      },
      moderate: {
        tips: ['Physical therapy', 'Strengthen muscles', 'Avoid strain', 'Improve posture'],
        medicines: ['NSAIDs regularly', 'Muscle relaxants', 'Topical pain relief'],
        whenToWorry: 'If accompanied by swelling, redness, or warmth',
        homeRemedies: ['Heat after 48hrs', 'Stretching routine', 'Massage therapy']
      },
      severe: {
        tips: ['Orthopedic evaluation', 'Possible fracture or tear', 'Imaging needed', 'Immobilization'],
        medicines: ['Prescription pain medication', 'Injectable treatments', 'Antibiotics if infected'],
        whenToWorry: 'If unable to move arm, severe swelling, or deformity',
        homeRemedies: ['Medical attention required', 'Splint if recommended', 'Ice and elevation']
      }
    }
  },
  {
    bodyPart: 'leftThigh',
    label: 'Left Thigh',
    conditions: {
      mild: {
        tips: ['RICE: Rest, Ice, Compression, Elevation', 'Gentle stretching', 'Avoid running', 'Stay hydrated'],
        medicines: ['Ibuprofen 200-400mg', 'Topical pain relief'],
        whenToWorry: 'If pain worsens with walking or at rest',
        homeRemedies: ['Ice packs', 'Compression wrap', 'Gentle massage', 'Light stretching']
      },
      moderate: {
        tips: ['Physical therapy', 'Strengthen quadriceps', 'Low-impact exercise', 'Proper warm-up'],
        medicines: ['NSAIDs as directed', 'Muscle relaxants', 'Topical treatments'],
        whenToWorry: 'If swelling, bruising, or unable to bear weight',
        homeRemedies: ['Heat therapy after 48hrs', 'Foam rolling', 'Epsom salt bath']
      },
      severe: {
        tips: ['Medical evaluation needed', 'Possible muscle tear', 'Imaging may be required', 'Avoid weight bearing'],
        medicines: ['Prescription pain medication', 'Anti-inflammatories', 'Muscle relaxants'],
        whenToWorry: 'If sudden severe pain, inability to walk, or visible deformity',
        homeRemedies: ['Medical treatment required', 'Crutches if needed', 'Ice and elevation']
      }
    }
  },
  {
    bodyPart: 'rightThigh',
    label: 'Right Thigh',
    conditions: {
      mild: {
        tips: ['Rest and ice', 'Gentle stretching', 'Avoid intense activity', 'Hydrate well'],
        medicines: ['Ibuprofen 200-400mg', 'Topical gel'],
        whenToWorry: 'If pain increases or affects daily activities',
        homeRemedies: ['Ice massage', 'Compression', 'Gentle movement', 'Proper posture']
      },
      moderate: {
        tips: ['Physical therapy exercises', 'Strengthen muscles', 'Cross-training', 'Proper footwear'],
        medicines: ['NSAIDs regularly', 'Muscle relaxants', 'Topical anti-inflammatory'],
        whenToWorry: 'If persistent pain, swelling, or limited range of motion',
        homeRemedies: ['Alternating therapy', 'Sports massage', 'Stretching program']
      },
      severe: {
        tips: ['Orthopedic consultation', 'Stop all activities', 'May need imaging', 'Consider muscle tear'],
        medicines: ['Prescription medications', 'Possible injections', 'Stronger anti-inflammatories'],
        whenToWorry: 'If severe pain, inability to walk, or muscle feels torn',
        homeRemedies: ['Medical care needed', 'Complete rest', 'Ice and compression']
      }
    }
  },
  {
    bodyPart: 'leftLeg',
    label: 'Left Lower Leg',
    conditions: {
      mild: {
        tips: ['Rest from running', 'Ice after activity', 'Stretch calves', 'Proper footwear'],
        medicines: ['Ibuprofen 200mg', 'Topical pain relief'],
        whenToWorry: 'If pain is localized to shin bone or persists',
        homeRemedies: ['Ice massage', 'Calf stretches', 'Compression socks', 'Rest days']
      },
      moderate: {
        tips: ['Reduce impact activities', 'Physical therapy', 'Check for shin splints', 'Cross-train'],
        medicines: ['NSAIDs as directed', 'Topical treatments', 'Pain relief gel'],
        whenToWorry: 'If pain is severe during activity or at rest',
        homeRemedies: ['Ice baths', 'Foam rolling', 'Proper shoes', 'Gradual return']
      },
      severe: {
        tips: ['Medical evaluation essential', 'Rule out stress fracture', 'Imaging recommended', 'Complete rest'],
        medicines: ['Prescription NSAIDs', 'Pain medication', 'Possible boot/cast'],
        whenToWorry: 'If sharp pain, swelling, or unable to walk normally',
        homeRemedies: ['Medical care required', 'Avoid weight bearing', 'Ice and elevation']
      }
    }
  },
  {
    bodyPart: 'rightLeg',
    label: 'Right Lower Leg',
    conditions: {
      mild: {
        tips: ['Rest and recovery', 'Ice after exercise', 'Calf stretching', 'Good running shoes'],
        medicines: ['Ibuprofen 200mg', 'Topical gel'],
        whenToWorry: 'If pain worsens or affects walking',
        homeRemedies: ['Ice therapy', 'Compression', 'Elevation', 'Gentle stretches']
      },
      moderate: {
        tips: ['Reduce training intensity', 'Physical therapy', 'Address biomechanics', 'Supportive footwear'],
        medicines: ['NSAIDs regularly', 'Muscle relaxants', 'Topical treatments'],
        whenToWorry: 'If persistent or sharp pain during activities',
        homeRemedies: ['Ice massage', 'Stretching routine', 'Rest periods', 'Compression wear']
      },
      severe: {
        tips: ['Orthopedic evaluation', 'Check for fracture', 'Stop all impact activities', 'May need boot'],
        medicines: ['Prescription pain medication', 'Anti-inflammatories', 'Possible immobilization'],
        whenToWorry: 'If severe pain, swelling, or inability to bear weight',
        homeRemedies: ['Medical attention needed', 'Complete rest', 'Ice and elevation']
      }
    }
  },
  {
    bodyPart: 'leftFoot',
    label: 'Left Foot',
    conditions: {
      mild: {
        tips: ['Rest foot', 'Ice if swollen', 'Elevate when sitting', 'Proper arch support'],
        medicines: ['Ibuprofen 200mg', 'Topical pain relief'],
        whenToWorry: 'If pain is localized or causes limping',
        homeRemedies: ['Ice rolling', 'Foot stretches', 'Supportive shoes', 'Arch support inserts']
      },
      moderate: {
        tips: ['Podiatrist consultation', 'Custom orthotics', 'Reduce standing', 'Proper footwear'],
        medicines: ['NSAIDs as directed', 'Topical treatments', 'Pain relief gel'],
        whenToWorry: 'If pain persists, swelling increases, or affects mobility',
        homeRemedies: ['Ice bottle roll', 'Calf stretches', 'Night splints', 'Massage']
      },
      severe: {
        tips: ['Medical evaluation needed', 'Rule out fracture', 'X-ray may be needed', 'Avoid weight bearing'],
        medicines: ['Prescription medication', 'Possible injection', 'Stronger anti-inflammatories'],
        whenToWorry: 'If severe pain, unable to walk, deformity, or severe swelling',
        homeRemedies: ['Medical care required', 'Walking boot', 'Crutches', 'Complete rest']
      }
    }
  },
  {
    bodyPart: 'rightFoot',
    label: 'Right Foot',
    conditions: {
      mild: {
        tips: ['Rest and ice', 'Elevate foot', 'Wear supportive shoes', 'Avoid barefoot walking'],
        medicines: ['Ibuprofen 200mg', 'Topical anti-inflammatory'],
        whenToWorry: 'If pain increases or affects daily walking',
        homeRemedies: ['Ice massage', 'Foot stretches', 'Arch support', 'Proper footwear']
      },
      moderate: {
        tips: ['See podiatrist', 'Consider orthotics', 'Physical therapy', 'Reduce impact activities'],
        medicines: ['NSAIDs regularly', 'Topical treatments', 'Pain relief medication'],
        whenToWorry: 'If persistent pain, especially in heel or arch',
        homeRemedies: ['Ice bottle rolling', 'Stretching routine', 'Night splints', 'Massage therapy']
      },
      severe: {
        tips: ['Immediate medical evaluation', 'Check for fracture or rupture', 'Imaging needed', 'Immobilization'],
        medicines: ['Prescription pain medication', 'Injectable treatments', 'Antibiotics if needed'],
        whenToWorry: 'If unable to walk, severe pain, or visible injury',
        homeRemedies: ['Medical attention required', 'Walking boot/cast', 'Crutches', 'Ice and elevation']
      }
    }
  }
];
