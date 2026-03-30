# JLPT Quiz App

Web app latihan kosakata dan kanji JLPT berbasis Next.js + TypeScript.

## Cara Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Struktur Project

```
jlpt-quiz/
├── app/
│   ├── layout.tsx
│   ├── page.tsx          # Baca CSV di server, pass ke client
│   └── globals.css
├── components/
│   ├── QuizApp.tsx       # Orchestrator utama
│   ├── StartScreen.tsx   # Halaman awal
│   ├── QuestionCard.tsx  # Tampilan soal
│   ├── ResultScreen.tsx  # Hasil + review
│   └── Timer.tsx         # Countdown timer
├── lib/
│   ├── csvParser.ts      # Parse CSV kosakata
│   ├── quizEngine.ts     # Generate soal & pilihan
│   └── useQuiz.ts        # React hook state management
├── data/
│   └── vocabulary.csv    # Kosakata JLPT N2 (bisa ditambah)
└── README.md
```

## Format CSV

```csv
word,reading,meaning
以外,いがい,selain; kecuali
意見,いけん,pendapat; opini
```

Kolom:
- `word` — kanji/kata Jepang
- `reading` — furigana (hiragana)
- `meaning` — arti dalam bahasa Indonesia

## Fitur

- ✅ 50 soal per sesi, diacak setiap sesi
- ✅ 2 jenis soal: JP→ID dan ID→JP
- ✅ 4 pilihan jawaban (A/B/C/D)
- ✅ Timer 25 menit dengan warning visual
- ✅ Hasil + review jawaban salah di akhir sesi
- ✅ Soal berbeda setiap sesi (seed berbasis waktu)

## Improvement Ideas

Fitur-fitur berikut direncanakan untuk pengembangan ke depan:

### 🗒️ Latihan Tata Bahasa (Grammar)
- Soal pilihan ganda untuk pola kalimat dan tata bahasa JLPT N2
- Contoh kalimat dengan bagian yang dikosongkan (fill-in-the-blank)
- Penjelasan singkat mengapa jawaban benar/salah setelah sesi selesai

### 📖 Latihan Reading (Membaca)
- Teks bacaan pendek khas soal JLPT N2
- Soal pemahaman bacaan (comprehension questions)
- Timer yang disesuaikan dengan panjang teks

### 📊 Statistik & Progress Tracking
- Riwayat sesi latihan tersimpan di local storage
- Grafik perkembangan skor dari waktu ke waktu
- Highlight kosakata/grammar yang sering salah

### 🔖 Sistem Bookmark
- Tandai vocab atau grammar yang sulit untuk dilatih ulang
- Mode latihan khusus untuk item yang di-bookmark

## Credits
Built with the assistance of Claude Code (through Japan AI Assistant).