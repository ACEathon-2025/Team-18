import React, { createContext, useContext, useEffect, useState } from 'react';

interface AccessibilityContextType {
  highContrast: boolean;
  toggleHighContrast: () => void;
  colorBlindMode: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia';
  setColorBlindMode: (mode: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia') => void;
  fontSize: 'normal' | 'large' | 'extra-large';
  setFontSize: (size: 'normal' | 'large' | 'extra-large') => void;
  textToSpeechEnabled: boolean;
  toggleTextToSpeech: () => void;
  speakText: (text: string) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState(() => 
    localStorage.getItem('accessibility-high-contrast') === 'true'
  );
  const [colorBlindMode, setColorBlindModeState] = useState<'none' | 'deuteranopia' | 'protanopia' | 'tritanopia'>(() => 
    (localStorage.getItem('accessibility-color-blind-mode') as any) || 'none'
  );
  const [fontSize, setFontSizeState] = useState<'normal' | 'large' | 'extra-large'>(() => 
    (localStorage.getItem('accessibility-font-size') as any) || 'normal'
  );
  const [textToSpeechEnabled, setTextToSpeechEnabled] = useState(() => 
    localStorage.getItem('accessibility-text-to-speech') === 'true'
  );

  const toggleHighContrast = () => {
    setHighContrast(prev => {
      const newValue = !prev;
      localStorage.setItem('accessibility-high-contrast', newValue.toString());
      return newValue;
    });
  };

  const setColorBlindMode = (mode: 'none' | 'deuteranopia' | 'protanopia' | 'tritanopia') => {
    setColorBlindModeState(mode);
    localStorage.setItem('accessibility-color-blind-mode', mode);
  };

  const setFontSize = (size: 'normal' | 'large' | 'extra-large') => {
    setFontSizeState(size);
    localStorage.setItem('accessibility-font-size', size);
  };

  const toggleTextToSpeech = () => {
    setTextToSpeechEnabled(prev => {
      const newValue = !prev;
      localStorage.setItem('accessibility-text-to-speech', newValue.toString());
      return newValue;
    });
  };

  const speakText = (text: string) => {
    if (!textToSpeechEnabled || !('speechSynthesis' in window)) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.8;
    utterance.volume = 0.8;
    utterance.pitch = 1;
    
    window.speechSynthesis.speak(utterance);
  };

  // Apply accessibility settings to document
  useEffect(() => {
    const root = document.documentElement;
    
    // High contrast mode
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Color blind mode
    root.classList.remove('deuteranopia', 'protanopia', 'tritanopia');
    if (colorBlindMode !== 'none') {
      root.classList.add(colorBlindMode);
    }

    // Font size
    root.classList.remove('font-large', 'font-extra-large');
    if (fontSize === 'large') {
      root.classList.add('font-large');
    } else if (fontSize === 'extra-large') {
      root.classList.add('font-extra-large');
    }

    // Text-to-speech indicator
    if (textToSpeechEnabled) {
      root.classList.add('text-to-speech-enabled');
    } else {
      root.classList.remove('text-to-speech-enabled');
    }
  }, [highContrast, colorBlindMode, fontSize, textToSpeechEnabled]);

  // Text-to-speech click handler
  useEffect(() => {
    if (!textToSpeechEnabled) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Speak text content of clicked elements
      if (target.tagName === 'BUTTON' || target.tagName === 'A' || target.hasAttribute('role')) {
        const textContent = target.textContent?.trim();
        if (textContent) {
          speakText(textContent);
        }
      }
      
      // Speak headings and important text
      if (['H1', 'H2', 'H3', 'H4', 'H5', 'H6'].includes(target.tagName)) {
        const textContent = target.textContent?.trim();
        if (textContent) {
          speakText(`Heading: ${textContent}`);
        }
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [textToSpeechEnabled]);

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        toggleHighContrast,
        colorBlindMode,
        setColorBlindMode,
        fontSize,
        setFontSize,
        textToSpeechEnabled,
        toggleTextToSpeech,
        speakText,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};