'use client';

import React from 'react';

import { useState, useEffect } from 'react';

type Question = {
  _id: string;
  pertanyaan: string;
  pilihan: string[];
  jawaban: string;
  penjelasan?: string;
};

type QuizState = 'not-started' | 'in-progress' | 'finished';

const gradeColorClasses = {
  excellent: 'text-primary',
  good: 'text-yellow-500',
  needsImprovement: 'text-red-500',
};

function getGradeColorClass(scoreRatio: number): string {
  if (scoreRatio >= 0.8) return gradeColorClasses.excellent;
  if (scoreRatio >= 0.6) return gradeColorClasses.good;
  return gradeColorClasses.needsImprovement;
}

function getGradeText(scoreRatio: number): string {
  if (scoreRatio >= 0.8) return 'Excellent!';
  if (scoreRatio >= 0.6) return 'Good Job!';
  return 'Keep Practicing!';
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  loadingContent: {
    textAlign: 'center',
  },
  errorContent: {
    textAlign: 'center',
  },
  retryButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default function QuizPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizState, setQuizState] = useState<QuizState>('not-started');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<(string | null)[]>([]);
  const [name, setName] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Load questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        console.log('[v0] Fetching questions from /api/questions');
        const response = await fetch('/api/questions');
        console.log('[v0] Response status:', response.status);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        console.log('[v0] Questions received:', data);
        setQuestions(data);
        setUserAnswers(new Array(data.length).fill(null));
      } catch (err) {
        console.error('[v0] Failed to load questions:', err);
        setError('Failed to load questions. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Timer
  useEffect(() => {
    if (quizState !== 'in-progress') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuizFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState]);

  const startQuiz = () => {
    if (!name.trim()) {
      alert('Please enter your name');
      return;
    }
    if (questions.length === 0) {
      alert('Questions are not ready yet');
      return;
    }
    setQuizState('in-progress');
  };

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswer(option);
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = option;
    setUserAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null) {
      alert('Please select an answer');
      return;
    }

    if (questions[currentQuestionIndex].penjelasan) {
      setShowExplanation(true);
      setTimeout(() => {
        proceedToNext();
      }, 3000);
    } else {
      proceedToNext();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex - 1]);
      setShowExplanation(false);
    }
  };

  const proceedToNext = () => {
    setShowExplanation(false);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(userAnswers[currentQuestionIndex + 1]);
    } else {
      handleQuizFinish();
    }
  };

  const handleQuizFinish = async () => {
    let finalScore = 0;
    userAnswers.forEach((answer, index) => {
      if (answer === questions[index]?.jawaban) {
        finalScore++;
      }
    });

    setScore(finalScore);
    setQuizState('finished');

    // Save submission
    try {
      await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentName: name,
          answers: userAnswers,
          timeSpent: 300 - timeLeft,
        }),
      });
    } catch (err) {
      console.error('Failed to save submission:', err);
    }
  };

  const restartQuiz = () => {
    setQuizState('not-started');
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setUserAnswers(new Array(questions.length).fill(null));
    setTimeLeft(300);
    setName('');
    setShowExplanation(false);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = questions.length > 0 ? ((currentQuestionIndex + 1) / questions.length) * 100 : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="text-4xl mb-4">📚</div>
          <p className="text-lg text-muted-foreground">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-md">
          <div className="text-4xl mb-4">⚠️</div>
          <p className="text-lg text-destructive mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-opacity-90 transition">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">
              <span className="text-primary">Kompak Satya</span>Buana
            </h1>
            {quizState === 'in-progress' && (
              <div className="flex gap-6 text-sm">
                <span className="text-primary font-semibold">Time: {formatTime(timeLeft)}</span>
                <span className="text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {quizState === 'not-started' && (
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-2xl">
              <div className="bg-gradient-to-br from-primary/20 to-primary/10 border border-primary/30 rounded-2xl p-8 sm:p-12 text-center">
                <div className="text-6xl mb-6">📚</div>
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Welcome to English Quiz!</h2>
                <p className="text-lg text-muted-foreground mb-8">Test your English knowledge with our interactive quiz.</p>

                <div className="grid grid-cols-3 gap-4 mb-10">
                  <div className="bg-secondary p-4 rounded-lg border border-border">
                    <span className="text-2xl mb-2 block">⏱️</span>
                    <span className="text-sm text-muted-foreground">5 minutes</span>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg border border-border">
                    <span className="text-2xl mb-2 block">❓</span>
                    <span className="text-sm text-muted-foreground">{questions.length} questions</span>
                  </div>
                  <div className="bg-secondary p-4 rounded-lg border border-border">
                    <span className="text-2xl mb-2 block">🎯</span>
                    <span className="text-sm text-muted-foreground">Multiple choice</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-6 py-3 rounded-lg bg-background border border-primary/50 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition"
                    onKeyPress={(e) => e.key === 'Enter' && startQuiz()}
                  />
                  <button onClick={startQuiz} className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-opacity-90 transition transform hover:scale-105">
                    🚀 Start Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {quizState === 'in-progress' && currentQuestion && (
          <div className="space-y-6">
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300" style={{ width: `${progressPercentage}%` }} />
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-8 leading-relaxed">{currentQuestion.pertanyaan}</h3>

              <div className="space-y-3 mb-8">
                {currentQuestion.pilihan?.map((option, index) => (
                  <button
                    key={index}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${selectedAnswer === option ? 'bg-primary/20 border-primary text-primary' : 'bg-secondary border-border hover:border-primary/50'}`}
                    onClick={() => handleAnswerSelect(option)}
                  >
                    <span className="font-medium">{option}</span>
                  </button>
                ))}
              </div>

              {showExplanation && currentQuestion.penjelasan && (
                <div className="bg-primary/10 border-l-4 border-primary p-4 rounded-lg mb-8">
                  <h4 className="font-semibold text-primary mb-2">Penjelasan:</h4>
                  <p className="text-muted-foreground">{currentQuestion.penjelasan}</p>
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex-1 px-6 py-3 bg-secondary border border-border rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary/50"
                >
                  ← Previous
                </button>

                <button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:bg-opacity-90"
                >
                  {currentQuestionIndex + 1 === questions.length ? 'Finish Quiz →' : 'Next →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {quizState === 'finished' && (
          <div className="space-y-8 text-center py-8">
            <div>
              <h2 className="text-4xl font-bold mb-2">🎉 Quiz Completed! 🎉</h2>
            </div>

            <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-12 max-w-2xl mx-auto">
              <div className="flex justify-center mb-8">
                <div className="w-32 h-32 rounded-full bg-primary/30 border-4 border-primary flex flex-col items-center justify-center">
                  <div className="text-5xl font-bold text-primary">{Math.round((score / questions.length) * 100)}%</div>
                  <div className="text-sm text-muted-foreground mt-2">Your Score</div>
                </div>
              </div>

              <div className="space-y-4 text-left max-w-md mx-auto">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Name:</span>
                  <span className="font-semibold">{name}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Correct Answers:</span>
                  <span className="font-semibold">
                    {score} out of {questions.length}
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Time Taken:</span>
                  <span className="font-semibold">{formatTime(300 - timeLeft)}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-muted-foreground">Grade:</span>
                  <span className={`font-semibold text-lg ${getGradeColorClass(score / questions.length)}`}>{getGradeText(score / questions.length)}</span>
                </div>
              </div>
            </div>

            <button onClick={restartQuiz} className="px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-opacity-90 transition transform hover:scale-105">
              🔄 Take Quiz Again
            </button>
          </div>
        )}
      </main>

      <footer className="bg-card border-t border-border mt-12 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} English Quiz Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
