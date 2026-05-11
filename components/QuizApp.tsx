'use client';

import { GoiItem, KanjiItem } from '@/lib/csvParser';
import { useQuiz } from '@/lib/useQuiz';
import StartScreen from './StartScreen';
import QuestionCard from './QuestionCard';
import ResultScreen from './ResultScreen';
import Timer from './Timer';

interface Props {
  goiVocab: GoiItem[];
  kanjiList: KanjiItem[];
}

export default function QuizApp({ goiVocab, kanjiList }: Props) {
  const { state, startQuiz, answerQuestion, finishQuiz, resetQuiz } = useQuiz(goiVocab, kanjiList);
  const { status, questions, currentIndex, answers } = state;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      {status === 'idle' && (
        <StartScreen
          onStart={startQuiz}
          totalGoi={goiVocab.length}
          totalKanji={kanjiList.length}
        />
      )}

      {status === 'running' && questions.length > 0 && (
        <div className="w-full max-w-2xl flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">
              Soal {currentIndex + 1} / {questions.length}
            </span>
            <Timer duration={5 * 60} onTimeUp={finishQuiz} />
          </div>

          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full transition-all"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          <QuestionCard
            question={questions[currentIndex]}
            onSelect={answerQuestion}
          />
        </div>
      )}

      {status === 'finished' && (
        <ResultScreen
          questions={questions}
          answers={answers}
          onRestart={resetQuiz}
        />
      )}
    </div>
  );
}
