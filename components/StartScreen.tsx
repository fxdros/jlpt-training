'use client';

import { QuizMode } from '@/lib/quizEngine';

interface Props {
  onStart: (mode: QuizMode) => void;
  totalGoi: number;
  totalKanji: number;
}

export default function StartScreen({ onStart, totalGoi, totalKanji }: Props) {
  return (
    <div className="flex flex-col items-center gap-8 text-center max-w-lg w-full">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">JLPT N2 Quiz</h1>
        <p className="text-slate-400">Pilih mode latihan yang ingin kamu mulai</p>
      </div>

      <div className="grid grid-cols-1 gap-4 w-full">
        {/* Goi Mode */}
        <button
          onClick={() => onStart('goi')}
          className="bg-indigo-600 hover:bg-indigo-500 transition-all rounded-2xl p-6 text-left shadow-xl group"
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl">📖</span>
            <div>
              <h2 className="text-xl font-bold text-white">Latihan Goi</h2>
              <p className="text-indigo-200 text-sm mt-1">
                Kosakata — JP↔ID · {totalGoi} kata tersedia
              </p>
            </div>
          </div>
        </button>

        {/* Kanji Mode */}
        <button
          onClick={() => onStart('kanji')}
          className="bg-rose-600 hover:bg-rose-500 transition-all rounded-2xl p-6 text-left shadow-xl group"
        >
          <div className="flex items-center gap-4">
            <span className="text-4xl">漢</span>
            <div>
              <h2 className="text-xl font-bold text-white">Latihan Kanji</h2>
              <p className="text-rose-200 text-sm mt-1">
                Kanji ↔ Furigana · {totalKanji} kanji tersedia
              </p>
            </div>
          </div>
        </button>
      </div>

      <div className="text-slate-500 text-sm">
        50 soal · Timer 25 menit · Jawaban diacak
      </div>
    </div>
  );
}
