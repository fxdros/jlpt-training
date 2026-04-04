import { useState, useCallback } from 'react';
import { GoiItem, KanjiItem } from './csvParser';
import { generateGoiSession, generateKanjiSession, Question, QuizMode } from './quizEngine';

export type QuizStatus = 'idle' | 'running' | 'finished';

export interface QuizState {
  status: QuizStatus;
  mode: QuizMode | null;
  questions: Question[];
  currentIndex: number;
  answers: (string | null)[];
  startTime: number | null;
  sessionIndex: number;
}

export function useQuiz(goiVocab: GoiItem[], kanjiList: KanjiItem[]) {
  const [state, setState] = useState<QuizState>({
    status: 'idle',
    mode: null,
    questions: [],
    currentIndex: 0,
    answers: [],
    startTime: null,
    sessionIndex: 0,
  });

  const startQuiz = useCallback((mode: QuizMode) => {
    const session =
      mode === 'goi'
        ? generateGoiSession(goiVocab, state.sessionIndex)
        : generateKanjiSession(kanjiList, state.sessionIndex);

    setState((prev) => ({
      status: 'running',
      mode,
      questions: session.questions,
      currentIndex: 0,
      answers: new Array(session.questions.length).fill(null),
      startTime: Date.now(),
      sessionIndex: prev.sessionIndex + 1,
    }));
  }, [goiVocab, kanjiList, state.sessionIndex]);

  const answerQuestion = useCallback((choiceText: string) => {
    setState((prev) => {
      if (prev.status !== 'running') return prev;

      const newAnswers = [...prev.answers];
      newAnswers[prev.currentIndex] = choiceText;

      const isLast = prev.currentIndex === prev.questions.length - 1;

      return {
        ...prev,
        answers: newAnswers,
        currentIndex: isLast ? prev.currentIndex : prev.currentIndex + 1,
        status: isLast ? 'finished' : 'running',
      };
    });
  }, []);

  const finishQuiz = useCallback(() => {
    setState((prev) => ({ ...prev, status: 'finished' }));
  }, []);

  const resetQuiz = useCallback(() => {
    setState((prev) => ({
      status: 'idle',
      mode: null,
      questions: [],
      currentIndex: 0,
      answers: [],
      startTime: null,
      sessionIndex: prev.sessionIndex,
    }));
  }, []);

  return { state, startQuiz, answerQuestion, finishQuiz, resetQuiz };
}
