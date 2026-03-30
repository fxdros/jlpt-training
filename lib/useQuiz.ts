"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { VocabItem } from "./csvParser";
import { generateSession, Question, AnswerRecord } from "./quizEngine";

export type QuizPhase = "start" | "quiz" | "result";

const TOTAL_QUESTIONS = 50;
const TIME_LIMIT_SECONDS = 25 * 60; // 25 menit

export function useQuiz(vocabulary: VocabItem[]) {
  const [phase, setPhase] = useState<QuizPhase>("start");
  const [sessionIndex, setSessionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const finishSession = useCallback(
    (currentAnswers: AnswerRecord[], currentQuestions: Question[]) => {
      stopTimer();
      // Soal yang belum dijawab dianggap salah
      const answeredIds = new Set(currentAnswers.map((a) => a.questionId));
      const unanswered: AnswerRecord[] = currentQuestions
        .filter((q) => !answeredIds.has(q.id))
        .map((q) => ({
          questionId: q.id,
          selectedAnswer: "(tidak dijawab)",
          correctAnswer: q.correctAnswer,
          isCorrect: false,
          question: q,
        }));

      const allAnswers = [...currentAnswers, ...unanswered].sort(
        (a, b) => a.questionId - b.questionId
      );
      setAnswers(allAnswers);
      setPhase("result");
    },
    [stopTimer]
  );

  // Ref untuk akses state terbaru di dalam timer callback
  const answersRef = useRef<AnswerRecord[]>([]);
  const questionsRef = useRef<Question[]>([]);
  answersRef.current = answers;
  questionsRef.current = questions;

  const startSession = useCallback(() => {
    stopTimer();
    const session = generateSession(vocabulary, sessionIndex);
    setQuestions(session.questions);
    questionsRef.current = session.questions;
    setCurrentIndex(0);
    setAnswers([]);
    answersRef.current = [];
    setTimeLeft(TIME_LIMIT_SECONDS);
    setPhase("quiz");

    // Mulai timer
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Waktu habis
          finishSession(answersRef.current, questionsRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [vocabulary, sessionIndex, stopTimer, finishSession]);

  const selectAnswer = useCallback(
    (choiceText: string) => {
      if (phase !== "quiz") return;
      const question = questions[currentIndex];
      if (!question) return;

      const isCorrect = choiceText === question.correctAnswer;
      const record: AnswerRecord = {
        questionId: question.id,
        selectedAnswer: choiceText,
        correctAnswer: question.correctAnswer,
        isCorrect,
        question,
      };

      const newAnswers = [...answers, record];
      setAnswers(newAnswers);
      answersRef.current = newAnswers;

      if (currentIndex + 1 >= TOTAL_QUESTIONS) {
        finishSession(newAnswers, questions);
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [phase, questions, currentIndex, answers, finishSession]
  );

  const restartSession = useCallback(() => {
    stopTimer();
    setSessionIndex((prev) => prev + 1);
    setPhase("start");
  }, [stopTimer]);

  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  const score = answers.filter((a) => a.isCorrect).length;
  const wrongAnswers = answers.filter((a) => !a.isCorrect);

  return {
    phase,
    questions,
    currentIndex,
    currentQuestion: questions[currentIndex] ?? null,
    answers,
    timeLeft,
    score,
    wrongAnswers,
    totalQuestions: TOTAL_QUESTIONS,
    startSession,
    selectAnswer,
    restartSession,
  };
}
