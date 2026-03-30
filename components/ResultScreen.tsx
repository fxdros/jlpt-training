"use client";

import { AnswerRecord } from "@/lib/quizEngine";

interface Props {
  score: number;
  totalQuestions: number;
  wrongAnswers: AnswerRecord[];
  allAnswers: AnswerRecord[];
  onRestart: () => void;
}

export default function ResultScreen({
  score,
  totalQuestions,
  wrongAnswers,
  allAnswers,
  onRestart,
}: Props) {
  const percentage = Math.round((score / totalQuestions) * 100);

  const getGrade = () => {
    if (percentage >= 90) return { label: "Luar Biasa! 🎉", color: "text-emerald-400" };
    if (percentage >= 75) return { label: "Bagus! 👍", color: "text-blue-400" };
    if (percentage >= 60) return { label: "Cukup 😊", color: "text-amber-400" };
    return { label: "Perlu Belajar Lagi 💪", color: "text-rose-400" };
  };

  const grade = getGrade();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl">
        {/* Score card */}
        <div className="bg-slate-800 rounded-2xl p-8 text-center mb-6 shadow-xl border border-slate-700">
          <p className="text-slate-400 text-sm mb-2 uppercase tracking-widest">Hasil Latihan</p>
          <div className="text-7xl font-bold text-white mb-1">
            {score}
            <span className="text-3xl text-slate-500">/{totalQuestions}</span>
          </div>
          <div className="text-2xl font-bold text-indigo-400 mb-3">{percentage}%</div>
          <div className={`text-xl font-semibold ${grade.color}`}>{grade.label}</div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-emerald-900/40 border border-emerald-700 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-emerald-400">{score}</div>
            <div className="text-emerald-300 text-sm mt-1">✅ Benar</div>
          </div>
          <div className="bg-rose-900/40 border border-rose-700 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-rose-400">{wrongAnswers.length}</div>
            <div className="text-rose-300 text-sm mt-1">❌ Salah</div>
          </div>
        </div>

        {/* Wrong answers review */}
        {wrongAnswers.length > 0 && (
          <div className="mb-6">
            <h2 className="text-white font-bold text-lg mb-3">
              📋 Review Jawaban Salah ({wrongAnswers.length} soal)
            </h2>
            <div className="space-y-3">
              {wrongAnswers.map((record) => (
                <div
                  key={record.questionId}
                  className="bg-slate-800 border border-slate-700 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-slate-400 text-xs">Soal #{record.questionId}</span>
                    <span className="text-xs text-slate-500 bg-slate-700 px-2 py-0.5 rounded-full">
                      {record.question.type === "jp-to-id" ? "JP → ID" : "ID → JP"}
                    </span>
                  </div>
                  <p className="text-white font-semibold text-base mb-3">
                    {record.question.prompt}
                  </p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-rose-400 shrink-0">❌ Jawabanmu:</span>
                      <span className="text-rose-300">{record.selectedAnswer}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-emerald-400 shrink-0">✅ Jawaban benar:</span>
                      <span className="text-emerald-300 font-medium">{record.correctAnswer}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {wrongAnswers.length === 0 && (
          <div className="bg-emerald-900/30 border border-emerald-700 rounded-xl p-6 text-center mb-6">
            <p className="text-emerald-300 text-lg font-semibold">
              🎊 Sempurna! Semua jawaban benar!
            </p>
          </div>
        )}

        {/* Restart button */}
        <button
          onClick={onRestart}
          className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-lg py-4 rounded-xl transition-colors duration-200 shadow-lg shadow-indigo-900"
        >
          🔀 Mulai Sesi Baru
        </button>
      </div>
    </div>
  );
}
