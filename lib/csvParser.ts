export interface GoiItem {
  word: string;    // kanji (bisa kosong untuk pure hiragana)
  reading: string; // furigana
  meaning: string; // arti bahasa Inggris
}

export interface KanjiItem {
  kanji: string;   // karakter kanji
  reading: string; // cara baca
}

export function parseGoiCSV(csvText: string): GoiItem[] {
  const lines = csvText.trim().split('\n');
  const dataLines = lines.slice(1);

  return dataLines
    .map((line) => {
      const parts = line.split(',');
      return {
        word: parts[0]?.trim() ?? '',
        reading: parts[1]?.trim() ?? '',
        meaning: parts[2]?.trim() ?? '',
      };
    }
  )
}

export function parseKanjiCSV(csvText: string): KanjiItem[] {
  const lines = csvText.trim().split('\n');
  const dataLines = lines.slice(1);

  return dataLines
    .map((line) => {
      const [kanji, reading] = line.split(',');
      return {
        kanji: kanji?.trim() ?? '',
        reading: reading?.trim() ?? '',
      };
    }
  )
}
