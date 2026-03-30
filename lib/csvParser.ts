export interface VocabItem {
  word: string;
  reading: string;
  meaning: string;
}

export function parseCSV(content: string): VocabItem[] {
  const lines = content.trim().split("\n");
  // skip header
  const dataLines = lines.slice(1);

  return dataLines
    .map((line) => {
      const parts = line.split(",");
      if (parts.length < 3) return null;
      return {
        word: parts[0].trim(),
        reading: parts[1].trim(),
        meaning: parts.slice(2).join(",").trim(),
      };
    })
    .filter((item): item is VocabItem => item !== null);
}
