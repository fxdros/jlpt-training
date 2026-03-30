"use client";

import { VocabItem } from "@/lib/csvParser";
import { useQuiz } from "@/lib/useQuiz";
import StartScreen from "./StartScreen";
import QuestionCard from "./QuestionCard";
import ResultScreen from "./ResultScreen";
import Timer from "./Timer";

interface Props {
  vocabulary: VocabItem[];
}

export default function QuizApp({ vocabulary }: Props) {
  const quiz = useQuiz(vocabulary);

  if (quiz.phase === "start") {
    return <StartScreen onStart={quiz.startSession} />;
  }

  if (quiz.phase === "result") {
    return (
      <ResultScreen
        score={quiz.score}
        totalQuestions={quiz.totalQuestions}
        wrongAnswers={quiz.wrongAnswers}
        allAnswers={quiz.answers}
        onRestart={quiz.restartSession}
      />
    );
  }

  // phase === "quiz"
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center py-8 px-4">
      {/* Header */}
      <div className="w-full max-w-2xl flex items-center justify-between mb-6">
        <div className="text-slate-400 text-sm font-medium">
          Soal{" "}
          <span className="text-white font-bold text-lg">
            {quiz.currentIndex + 1}
          </span>
          <span className="text-slate-500"> / {quiz.totalQuestions}</span>
        </div>
        <Timer timeLeft={quiz.timeLeft} />
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-2xl bg-slate-700 rounded-full h-2 mb-8">
        <div
          className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
          style={{
            width: `${((quiz.currentIndex) / quiz.totalQuestions) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      {quiz.currentQuestion && (
        <QuestionCard
          question={quiz.currentQuestion}
          onSelect={quiz.selectAnswer}
        />
      )}
    </div>
  );
}
