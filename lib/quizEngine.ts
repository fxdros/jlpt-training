import { VocabItem } from "./csvParser";

export type QuestionType = "jp-to-id" | "id-to-jp";

export interface Choice {
  label: "A" | "B" | "C" | "D";
  text: string;
}

export interface Question {
  id: number;
  type: QuestionType;
  prompt: string;
  correctAnswer: string;
  choices: Choice[];
  vocabItem: VocabItem;
}

export interface QuizSession {
  questions: Question[];
  sessionSeed: number;
}

export interface AnswerRecord {
  questionId: number;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  question: Question;
}

/** Fisher-Yates shuffle dengan seed — dipakai untuk shuffle SOAL */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const result = [...arr];
  let s = seed;
  for (let i = result.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    const j = Math.abs(s) % (i + 1);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Fisher-Yates shuffle pakai Math.random() — dipakai untuk shuffle PILIHAN JAWABAN */
function randomShuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function getRandomInt(max: number, seed: number): number {
  const s = (seed * 1664525 + 1013904223) & 0xffffffff;
  return Math.abs(s) % max;
}

const LABELS: Choice["label"][] = ["A", "B", "C", "D"];

export function generateSession(
  vocabulary: VocabItem[],
  sessionIndex: number
): QuizSession {
  const seed = Date.now() + sessionIndex * 999983;

  // Acak semua vocab, ambil 50 untuk soal
  const shuffled = seededShuffle(vocabulary, seed);
  const selected = shuffled.slice(0, 50);

  const questions: Question[] = selected.map((item, idx) => {
    // Tentukan tipe soal
    const type: QuestionType =
      Math.random() < 0.5 ? "jp-to-id" : "id-to-jp";

    let prompt: string;
    let correctAnswer: string;

    if (type === "jp-to-id") {
      prompt = `${item.word}（${item.reading}）`;
      correctAnswer = item.meaning;
    } else {
      prompt = item.meaning;
      correctAnswer = `${item.word}（${item.reading}）`;
    }

    // Buat 3 pilihan salah
    const otherVocab = shuffled.filter((v) => v.word !== item.word);
    const wrongPool = seededShuffle(otherVocab, seed + idx * 3571).slice(0, 3);

    const wrongChoices: string[] = wrongPool.map((v) =>
      type === "jp-to-id" ? v.meaning : `${v.word}（${v.reading}）`
    );

    // Gabung semua pilihan lalu shuffle pakai Math.random()
    const allChoices = [correctAnswer, ...wrongChoices];
    const shuffledChoices = randomShuffle(allChoices); // ✅ fix di sini

    const choices: Choice[] = shuffledChoices.map((text, i) => ({
      label: LABELS[i],
      text,
    }));

    return {
      id: idx + 1,
      type,
      prompt,
      correctAnswer,
      choices,
      vocabItem: item,
    };
  });

  return { questions, sessionSeed: seed };
}
