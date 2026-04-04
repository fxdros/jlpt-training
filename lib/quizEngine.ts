import { GoiItem, KanjiItem } from './csvParser';

export type QuizMode = 'goi' | 'kanji';
export type QuestionType = 'jp-to-id' | 'id-to-jp' | 'kanji-to-reading' | 'reading-to-kanji';

export interface Choice {
  label: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface Question {
  id: number;
  type: QuestionType;
  prompt: string;
  correctAnswer: string;
  choices: Choice[];
  goiItem?: GoiItem;
  kanjiItem?: KanjiItem;
}

export interface QuizSession {
  questions: Question[];
  sessionSeed: number;
  mode: QuizMode;
}

export interface AnswerRecord {
  questionId: number;
  selectedAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  question: Question;
}

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

function randomShuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const LABELS: Choice['label'][] = ['A', 'B', 'C', 'D'];

// ── GOIN SESSION ──────────────────────────────────────────
export function generateGoiSession(
  vocabulary: GoiItem[],
  sessionIndex: number
): QuizSession {
  const seed = Date.now() + sessionIndex * 999983;
  const shuffled = seededShuffle(vocabulary, seed);
  const selected = shuffled.slice(0, 50);

  const questions: Question[] = selected.map((item, idx) => {
    const type: QuestionType =
      Math.random() < 0.5 ? 'jp-to-id' : 'id-to-jp';

    const displayWord = item.word
      ? `${item.word}（${item.reading}）`
      : item.reading;

    let prompt: string;
    let correctAnswer: string;

    if (type === 'jp-to-id') {
      prompt = displayWord;
      correctAnswer = item.meaning;
    } else {
      prompt = item.meaning;
      correctAnswer = displayWord;
    }

    const otherVocab = shuffled.filter((v) => v.reading !== item.reading);
    const wrongPool = randomShuffle(otherVocab).slice(0, 3);
    const wrongChoices = wrongPool.map((v) => {
      if (type === 'jp-to-id') return v.meaning;
      return v.word ? `${v.word}（${v.reading}）` : v.reading;
    });

    const allChoices = randomShuffle([correctAnswer, ...wrongChoices]);
    const choices: Choice[] = allChoices.map((text, i) => ({
      label: LABELS[i],
      text,
    }));

    return {
      id: idx + 1,
      type,
      prompt,
      correctAnswer,
      choices,
      goiItem: item,
    };
  });

  return { questions, sessionSeed: seed, mode: 'goi' };
}

// ── KANJI SESSION ─────────────────────────────────────────
export function generateKanjiSession(
  kanjiList: KanjiItem[],
  sessionIndex: number
): QuizSession {
  const seed = Date.now() + sessionIndex * 999983;
  const shuffled = seededShuffle(kanjiList, seed);
  const selected = shuffled.slice(0, 50);

  const questions: Question[] = selected.map((item, idx) => {
    const type: QuestionType =
      Math.random() < 0.5 ? 'kanji-to-reading' : 'reading-to-kanji';

    let prompt: string;
    let correctAnswer: string;

    if (type === 'kanji-to-reading') {
      prompt = item.kanji;
      correctAnswer = item.reading;
    } else {
      prompt = item.reading;
      correctAnswer = item.kanji;
    }

    const otherKanji = shuffled.filter((v) => v.kanji !== item.kanji);
    const wrongPool = randomShuffle(otherKanji).slice(0, 3);
    const wrongChoices = wrongPool.map((v) =>
      type === 'kanji-to-reading' ? v.reading : v.kanji
    );

    const allChoices = randomShuffle([correctAnswer, ...wrongChoices]);
    const choices: Choice[] = allChoices.map((text, i) => ({
      label: LABELS[i],
      text,
    }));

    return {
      id: idx + 1,
      type,
      prompt,
      correctAnswer,
      choices,
      kanjiItem: item,
    };
  });

  return { questions, sessionSeed: seed, mode: 'kanji' };
}
