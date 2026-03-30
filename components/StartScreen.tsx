"use client";

interface Props {
  onStart: () => void;
}

export default function StartScreen({ onStart }: Props) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Badge */}
        <div className="inline-block bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full mb-6 tracking-widest uppercase">
          JLPT N2
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-2">
          語彙・漢字クイズ
        </h1>
        <p className="text-slate-400 text-lg mb-8">
          Latihan Kosakata &amp; Kanji JLPT N2
        </p>

        {/* Info cards */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="text-2xl font-bold text-indigo-400">50</div>
            <div className="text-slate-400 text-sm mt-1">Soal</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="text-2xl font-bold text-indigo-400">25</div>
            <div className="text-slate-400 text-sm mt-1">Menit</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4">
            <div className="text-2xl font-bold text-indigo-400">4</div>
            <div className="text-slate-400 text-sm mt-1">Pilihan</div>
          </div>
        </div>

        {/* Rules */}
        <div className="bg-slate-800 rounded-xl p-5 text-left mb-8 text-sm text-slate-300 space-y-2">
          <p>📝 Ada 2 jenis soal: <strong>JP → ID</strong> dan <strong>ID → JP</strong></p>
          <p>⏱️ Waktu 25 menit — jika habis, sesi otomatis selesai</p>
          <p>✅ Hasil dan review jawaban salah ditampilkan di akhir</p>
          <p>🔀 Soal diacak setiap sesi baru</p>
        </div>

        {/* Start button */}
        <button
          onClick={onStart}
          className="w-full bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-bold text-lg py-4 rounded-xl transition-colors duration-200 shadow-lg shadow-indigo-900"
        >
          Mulai Latihan →
        </button>
      </div>
    </div>
  );
}
