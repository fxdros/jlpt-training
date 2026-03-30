"use client";

interface Props {
  timeLeft: number; // dalam detik
}

export default function Timer({ timeLeft }: Props) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isWarning = timeLeft <= 300; // 5 menit terakhir
  const isDanger = timeLeft <= 60;   // 1 menit terakhir

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono font-bold text-lg transition-colors ${
        isDanger
          ? "bg-red-900 text-red-300 animate-pulse"
          : isWarning
          ? "bg-amber-900 text-amber-300"
          : "bg-slate-800 text-slate-200"
      }`}
    >
      <span>⏱</span>
      <span>
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
}
