import fs from "fs";
import path from "path";
import QuizApp from "@/components/QuizApp";
import { parseCSV } from "@/lib/csvParser";

export default function Home() {
  const csvPath = path.join(process.cwd(), "data", "vocabulary.csv");
  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const vocabulary = parseCSV(csvContent);

  return <QuizApp vocabulary={vocabulary} />;
}
