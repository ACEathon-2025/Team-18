export type BodyPart =
  | 'head'
  | 'neck'
  | 'leftShoulder'
  | 'rightShoulder'
  | 'chest'
  | 'abdomen'
  | 'leftArm'
  | 'rightArm'
  | 'leftForearm'
  | 'rightForearm'
  | 'leftHand'
  | 'rightHand'
  | 'leftThigh'
  | 'rightThigh'
  | 'leftLeg'
  | 'rightLeg'
  | 'leftFoot'
  | 'rightFoot'
  | 'back';

export type PainLevel = 'mild' | 'moderate' | 'severe';

export interface PainEntry {
  bodyPart: BodyPart;
  intensity: number;
  timestamp: number;
}

export interface PainSession {
  [key: string]: {
    intensity: number;
    timestamp: number;
  };
}

export interface PainHistory {
  date: string;
  pains: PainEntry[];
}

export interface Recommendation {
  tips: string[];
  medicines: string[];
  whenToWorry: string;
  homeRemedies: string[];
}

export interface BodyPartRecommendations {
  bodyPart: BodyPart;
  label: string;
  conditions: {
    mild: Recommendation;
    moderate: Recommendation;
    severe: Recommendation;
  };
}
