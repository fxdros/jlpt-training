import fs from 'fs';
import path from 'path';
import QuizApp from '@/components/QuizApp';
import { parseGoiCSV, parseKanjiCSV } from '@/lib/csvParser';

export default function Home() {
  const goiPath = path.join(process.cwd(), 'data', 'goi.csv');
  const kanjiPath = path.join(process.cwd(), 'data', 'kanji.csv');

  const goiVocab = parseGoiCSV(fs.readFileSync(goiPath, 'utf-8'));
  const kanjiList = parseKanjiCSV(fs.readFileSync(kanjiPath, 'utf-8'));

  return <QuizApp goiVocab={goiVocab} kanjiList={kanjiList} />;
}
