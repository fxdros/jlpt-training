"use client";

import { Question } from "@/lib/quizEngine";

interface Props {
  question: Question;
  onSelect: (choiceText: string) => void;
}

const LABEL_COLORS: Record<string, string> = {
  A: "bg-blue-600 hover:bg-blue-500",
  B: "bg-violet-600 hover:bg-violet-500",
  C: "bg-emerald-600 hover:bg-emerald-500",
  D: "bg-rose-600 hover:bg-rose-500",
};

export default function QuestionCard({ question, onSelect }: Props) {
  const typeLabel =
    question.type === "jp-to-id"
      ? "Apa arti dari kata berikut?"
      : "Pilih kata Jepang yang sesuai dengan arti berikut:";

  return (
    <div className="w-full max-w-2xl">
      {/* Type label */}
      <p className="text-slate-400 text-sm mb-3 text-center">{typeLabel}</p>

      {/* Prompt card */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-8 mb-6 text-center shadow-xl">
        <p className="text-3xl font-bold text-white leading-relaxed">
          {question.prompt}
        </p>
      </div>

      {/* Choices */}
      <div className="grid grid-cols-1 gap-3">
        {question.choices.map((choice) => (
          <button
            key={choice.label}
            onClick={() => onSelect(choice.text)}
            className={`flex items-center gap-4 w-full text-left px-5 py-4 rounded-xl text-white font-medium transition-all duration-150 active:scale-95 shadow-md ${
              LABEL_COLORS[choice.label]
            }`}
          >
            <span className="text-white/70 font-bold text-sm w-5 shrink-0">
              {choice.label}
            </span>
            <span className="text-base">{choice.text}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
