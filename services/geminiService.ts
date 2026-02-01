
import { GoogleGenAI, Type } from "@google/genai";
import { Material, Quiz, SoloLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDeepLearningMaterial = async (topic: string, subject: string): Promise<Material> => {
  const textResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Buatlah materi pembelajaran mendalam (Deep Learning - PBL) untuk siswa Kelas 3 SD Fase B.
    Mata Pelajaran: ${subject}
    Topik: ${topic}

    Tugas: Berikan penjabaran materi yang sangat lengkap, jelas, dan mudah dipahami anak usia 8-9 tahun. Jelaskan langkah demi langkah.
    
    Format JSON:
    {
      "title": "Judul Menarik",
      "narrative": "Satu baris narasi cerita pendek pembuka yang sangat kuat dan kontekstual",
      "detailedExplanation": "Berikan penjelasan panjang (minimal 3 paragraf) yang menjabarkan materi secara detail, menggunakan bahasa yang ramah anak, berikan contoh konkret dalam kehidupan sehari-hari.",
      "problemScenario": "Masalah nyata yang menantang siswa untuk berpikir kritis (Deep Learning)",
      "concepts": ["konsep 1", "konsep 2", "konsep 3"],
      "summary": "Kesimpulan singkat berupa poin-poin agar siswa mudah mengingat",
      "imagePrompt": "Detailed 2D cartoon educational illustration prompt about ${topic} for 8 year old kids, vibrant colors, clear background"
    }`,
    config: { responseMimeType: "application/json" }
  });

  const parsed = JSON.parse(textResponse.text);
  
  let imageUrl = "";
  try {
    const imageResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{ text: `High-quality educational 2D vector cartoon for 3rd grade students: ${parsed.imagePrompt}. Use bright friendly colors.` }],
      config: { imageConfig: { aspectRatio: "16:9" } }
    });

    for (const part of imageResponse.candidates[0].content.parts) {
      if (part.inlineData) {
        imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        break;
      }
    }
  } catch (e) {
    console.error("Image failed", e);
  }

  return {
    id: Date.now().toString(),
    ...parsed,
    imageUrl
  };
};

export const generateCompleteAssessment = async (topic: string, subject: string): Promise<any[]> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Buatlah paket asesmen kurikulum merdeka untuk Kelas 3 SD Fase B.
    Mata Pelajaran: ${subject}
    Topik: ${topic}
    
    TOTAL 40 SOAL:
    1. 25 soal PG Tunggal (A-D) - Type: SINGLE
    2. 10 soal PG Bertingkat (SOLO Taxonomy) - Type: GRADED
    3. 5 soal Isian Singkat - Type: FILL_IN

    Format JSON:
    {
      "questions": [
        { "text": "...", "options": ["A", "B", "C", "D"], "correctIndex": 0, "type": "SINGLE" },
        { "text": "...", "options": ["A", "B", "C", "D"], "correctIndex": 0, "type": "GRADED", "level": "Relational" },
        { "text": "...", "correctAnswer": "jawaban", "type": "FILL_IN" }
      ]
    }`,
    config: { responseMimeType: "application/json" }
  });

  return JSON.parse(response.text).questions;
};

export const generateAdminDoc = async (type: 'CP' | 'TP' | 'ATP' | 'MODUL_AJAR', subject: string, chapter: string, topic: string): Promise<string> => {
    const prompt = `Susunlah dokumen administrasi ${type} Kurikulum Merdeka (Fase B Kelas 3 SD).
    Mata Pelajaran: ${subject}
    Bab: ${chapter}
    Topik: ${topic}
    
    Ketentuan Khusus:
    - Jika TP: Buat tujuan yang terukur (ABCD: Audience, Behavior, Condition, Degree).
    - Jika ATP: Susun alur langkah pembelajaran dari mudah ke kompleks.
    - Jika MODUL AJAR: Sertakan Identitas, Pemahaman Bermakna (Deep Learning), Pertanyaan Pemantik, Kegiatan Pembelajaran (PBL), dan Asesmen.
    - Gunakan format Markdown yang rapi dan profesional.`;

    const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
    });
    return response.text;
}

export const generateSoloQuiz = async (material: Material): Promise<Quiz> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Buat 4 soal kuis SOLO Taxonomy singkat untuk: ${material.title}.`,
    config: { responseMimeType: "application/json" }
  });

  return {
    id: Date.now().toString(),
    materialId: material.id,
    questions: JSON.parse(response.text)
  };
};
