import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface Question {
  id: number;
  question: string;
  options: { text: string; points: number; emoji: string }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'How often do you exercise in a week?',
    options: [
      { text: '5–7 days', points: 10, emoji: '🏃' },
      { text: '2–4 days', points: 7, emoji: '🧘' },
      { text: '1 day', points: 4, emoji: '🚶' },
      { text: 'Never', points: 1, emoji: '😴' },
    ],
  },
  {
    id: 2,
    question: 'How many hours of sleep do you get daily?',
    options: [
      { text: '7–8 hrs', points: 10, emoji: '😴' },
      { text: '5–6 hrs', points: 7, emoji: '😌' },
      { text: '3–4 hrs', points: 4, emoji: '😐' },
      { text: 'Less than 3', points: 1, emoji: '😣' },
    ],
  },
  {
    id: 3,
    question: 'How balanced is your diet?',
    options: [
      { text: 'Very balanced', points: 10, emoji: '🥗' },
      { text: 'Somewhat balanced', points: 7, emoji: '🍞' },
      { text: 'Unhealthy', points: 3, emoji: '🍔' },
    ],
  },
  {
    id: 4,
    question: 'How often do you drink water during the day?',
    options: [
      { text: 'Frequently', points: 10, emoji: '💧' },
      { text: 'Occasionally', points: 6, emoji: '😅' },
      { text: 'Rarely', points: 2, emoji: '🥤' },
    ],
  },
  {
    id: 5,
    question: 'How often do you feel stressed?',
    options: [
      { text: 'Rarely', points: 10, emoji: '😌' },
      { text: 'Sometimes', points: 7, emoji: '😐' },
      { text: 'Often', points: 3, emoji: '😣' },
    ],
  },
  {
    id: 6,
    question: 'How much screen time do you have daily (outside work)?',
    options: [
      { text: '<2 hrs', points: 10, emoji: '📵' },
      { text: '2–4 hrs', points: 7, emoji: '💻' },
      { text: '>4 hrs', points: 3, emoji: '📱' },
    ],
  },
  {
    id: 7,
    question: 'How regularly do you visit a doctor for checkups?',
    options: [
      { text: 'Once a year', points: 10, emoji: '🩺' },
      { text: 'Every few years', points: 6, emoji: '🕒' },
      { text: 'Never', points: 2, emoji: '🚫' },
    ],
  },
  {
    id: 8,
    question: 'How often do you skip breakfast?',
    options: [
      { text: 'Never', points: 10, emoji: '🍳' },
      { text: 'Occasionally', points: 6, emoji: '😬' },
      { text: 'Often', points: 2, emoji: '😴' },
    ],
  },
  {
    id: 9,
    question: 'How well do you manage your mental health?',
    options: [
      { text: 'Very well', points: 10, emoji: '🧘' },
      { text: 'Fairly well', points: 7, emoji: '🙂' },
      { text: 'Poorly', points: 3, emoji: '😐' },
    ],
  },
  {
    id: 10,
    question: 'How satisfied are you with your overall health?',
    options: [
      { text: 'Very satisfied', points: 10, emoji: '😃' },
      { text: 'Somewhat satisfied', points: 7, emoji: '🙂' },
      { text: 'Not satisfied', points: 3, emoji: '😕' },
    ],
  },
];

const HealthQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ questionId: number; points: number }[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);

  const handleOptionSelect = (questionId: number, points: number) => {
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex((ans) => ans.questionId === questionId);
      if (existingAnswerIndex > -1) {
        const newAnswers = [...prevAnswers];
        newAnswers[existingAnswerIndex] = { questionId, points };
        return newAnswers;
      }
      return [...prevAnswers, { questionId, points }];
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const calculateScore = () => {
    const totalPoints = answers.reduce((sum, answer) => sum + answer.points, 0);
    const calculatedScore = Math.round((totalPoints / 100) * 100); // Max points is 100
    setScore(calculatedScore);
    setShowResult(true);

    // Animate progress bar
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      if (currentProgress >= calculatedScore) {
        clearInterval(interval);
      }
    }, 10);
  };

  const getResultEmoji = (score: number) => {
    if (score >= 80) return '😃';
    if (score >= 60) return '🙂';
    if (score >= 40) return '😐';
    return '😟';
  };

  const getResultMessage = (score: number) => {
    if (score >= 80) return 'Excellent Health! You maintain a healthy lifestyle.';
    if (score >= 60) return 'Good, keep improving! You have good habits, but there\'s room for growth.';
    if (score >= 40) return 'Needs attention. Consider focusing on improving your health habits.';
    return 'Seek improvement in habits. It\'s time to make some positive changes for your well-being.';
  };

  const currentQuestion = questions[currentQuestionIndex];
  const selectedOptionPoints = answers.find(
    (ans) => ans.questionId === currentQuestion?.id
  )?.points;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-lg rounded-lg overflow-hidden bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-green-500 text-white p-6">
          <CardTitle className="text-3xl font-bold text-center">Health Quiz / Self-Assessment</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {!showResult ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <p className="text-lg font-semibold text-gray-800">
                  Question {currentQuestionIndex + 1} of {questions.length}: {currentQuestion.question}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentQuestion.options.map((option) => (
                    <motion.div
                      key={option.text}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`p-4 border rounded-lg cursor-pointer transition-all duration-200
                        ${selectedOptionPoints === option.points
                          ? 'bg-blue-100 border-blue-500 text-blue-800 shadow-md'
                          : 'bg-gray-50 border-gray-200 hover:border-blue-300'
                        }`}
                      onClick={() => handleOptionSelect(currentQuestion.id, option.points)}
                    >
                      <span className="text-2xl mr-2">{option.emoji}</span>
                      <span className="font-medium">{option.text}</span>
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <Button
                    onClick={handleBack}
                    disabled={currentQuestionIndex === 0}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800"
                  >
                    Back
                  </Button>
                  {currentQuestionIndex === questions.length - 1 ? (
                    <Button
                      onClick={calculateScore}
                      disabled={!selectedOptionPoints}
                      className="bg-green-500 hover:bg-green-600 text-white"
                    >
                      View Result
                    </Button>
                  ) : (
                    <Button
                      onClick={handleNext}
                      disabled={!selectedOptionPoints}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Next
                    </Button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center space-y-6"
            >
              <h2 className="text-3xl font-bold text-blue-700">Your Health Quiz Result</h2>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
                className="text-6xl"
              >
                {getResultEmoji(score)}
              </motion.div>
              <p className="text-xl font-semibold text-gray-800">Health Score: {score}/100</p>
              <Progress value={progress} className="w-full h-4 bg-gray-200 rounded-full" indicatorColor={
                score >= 80 ? 'bg-green-500' :
                score >= 60 ? 'bg-yellow-500' :
                score >= 40 ? 'bg-orange-500' :
                'bg-red-500'
              } />
              <p className="text-lg text-gray-700">{getResultMessage(score)}</p>
              <Button onClick={() => {
                setCurrentQuestionIndex(0);
                setAnswers([]);
                setShowResult(false);
                setScore(0);
                setProgress(0);
              }} className="bg-blue-500 hover:bg-blue-600 text-white mt-4">
                Retake Quiz
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default HealthQuiz;
