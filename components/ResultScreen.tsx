'use client';

import { Question } from '@/lib/quizEngine';

interface Props {
  questions: Question[];
  answers: (string | null)[];
  onRestart: () => void;
}

export default function ResultScreen({ questions, answers, onRestart }: Props) {
  const total = questions.length;
  const correct = questions.filter(
    (q, i) => answers[i] === q.correctAnswer
  ).length;
  const wrong = total - correct;
  const percentage = Math.round((correct / total) * 100);

  const wrongItems = questions.filter((q, i) => answers[i] !== q.correctAnswer);

  return (
    <div className="w-full max-w-2xl flex flex-col gap-6">
      {/* Score */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">Hasil Latihan</h2>
        <div className="text-6xl font-bold text-indigo-400 mb-2">{percentage}%</div>
        <p className="text-slate-400">
          {correct} benar · {wrong} salah · dari {total} soal
        </p>

        {/* Score bar */}
        <div className="w-full bg-slate-700 rounded-full h-3 mt-4">
          <div
            className="bg-indigo-500 h-3 rounded-full transition-all"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Wrong answers review */}
      {wrongItems.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold text-white">
            Review Jawaban Salah ({wrongItems.length})
          </h3>
          {wrongItems.map((q, i) => (
            <div
              key={q.id}
              className="bg-slate-800 border border-slate-700 rounded-xl p-4"
            >
              <p className="text-slate-400 text-xs mb-1">Soal {q.id}</p>
              <p className="text-white font-medium mb-2">{q.prompt}</p>
              <p className="text-rose-400 text-sm">
                ✗ Jawaban kamu:{' '}
                <span className="font-semibold">
                  {answers[questions.indexOf(q)] ?? '(tidak dijawab)'}
                </span>
              </p>
              <p className="text-emerald-400 text-sm">
                ✓ Jawaban benar:{' '}
                <span className="font-semibold">{q.correctAnswer}</span>
              </p>
            </div>
          ))}
        </div>
      )}

      {wrongItems.length === 0 && (
        <div className="text-center text-emerald-400 font-semibold text-lg">
          🎉 Sempurna! Semua jawaban benar!
        </div>
      )}

      {/* Restart */}
      <button
        onClick={onRestart}
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg"
      >
        Kembali ke Menu
      </button>
    </div>
  );
}
