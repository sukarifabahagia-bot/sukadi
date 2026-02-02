
import { GoogleGenAI, Type } from "@google/genai";
import { Material, Quiz, SoloLevel } from "../types";

// Fix: Guideline: Initialize GoogleGenAI with process.env.API_KEY directly and create instance right before use
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDeepLearningMaterial = async (topic: string, subject: string): Promise<Material> => {
  const ai = getAI();
  const textResponse = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Buatlah materi pembelajaran mendalam (Deep Learning - PBL) untuk siswa Kelas 3 SD Fase B.
    Mata Pelajaran: ${subject}
    Topik: ${topic}

    Tugas: Berikan penjabaran materi yang sangat lengkap, jelas, dan mudah dipahami anak usia 8-9 tahun. Jelaskan langkah demi langkah.`,
    config: { 
      responseMimeType: "application/json",
      // Fix: Guideline: Use responseSchema for robust JSON extraction
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          narrative: { type: Type.STRING },
          detailedExplanation: { type: Type.STRING },
          problemScenario: { type: Type.STRING },
          concepts: { type: Type.ARRAY, items: { type: Type.STRING } },
          summary: { type: Type.STRING },
          imagePrompt: { type: Type.STRING }
        },
        required: ["title", "narrative", "detailedExplanation", "problemScenario", "concepts", "summary", "imagePrompt"]
      }
    }
  });

  const parsed = JSON.parse(textResponse.text || "{}");
  
  let imageUrl = "";
  try {
    // Fix: Guideline: Use gemini-2.5-flash-image for default image generation task
    const imageResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { 
        parts: [{ text: `High-quality educational 2D vector cartoon for 3rd grade students: ${parsed.imagePrompt}. Use bright friendly colors.` }] 
      },
      config: { imageConfig: { aspectRatio: "16:9" } }
    });

    // Fix: Guideline: Iterate through response parts to find image data
    if (imageResponse.candidates?.[0]?.content?.parts) {
      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }
    }
  } catch (e) {
    console.error("Image generation failed", e);
  }

  return {
    id: Date.now().toString(),
    ...parsed,
    imageUrl
  };
};

export const generateCompleteAssessment = async (topic: string, subject: string): Promise<any[]> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Buatlah paket asesmen kurikulum merdeka untuk Kelas 3 SD Fase B.
    Mata Pelajaran: ${subject}
    Topik: ${topic}
    
    TOTAL 40 SOAL:
    1. 25 soal PG Tunggal (A-D) - Type: SINGLE
    2. 10 soal PG Bertingkat (SOLO Taxonomy) - Type: GRADED
    3. 5 soal Isian Singkat - Type: FILL_IN`,
    config: { 
      responseMimeType: "application/json",
      // Fix: Guideline: Use responseSchema for predictable JSON output
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          questions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctIndex: { type: Type.NUMBER },
                correctAnswer: { type: Type.STRING },
                type: { type: Type.STRING },
                level: { type: Type.STRING }
              },
              required: ["text", "type"]
            }
          }
        },
        required: ["questions"]
      }
    }
  });

  return JSON.parse(response.text || "{}").questions || [];
};

export const generateAdminDoc = async (type: 'CP' | 'TP' | 'ATP' | 'MODUL_AJAR', subject: string, chapter: string, topic: string): Promise<string> => {
    const ai = getAI();
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
    // Fix: Guideline: Use .text property directly
    return response.text || "";
};

export const generateSoloQuiz = async (material: Material): Promise<Quiz> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Buat 4 soal kuis SOLO Taxonomy singkat untuk: ${material.title}.`,
    config: { 
      responseMimeType: "application/json",
      // Fix: Guideline: Explicit responseSchema for structured data
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctAnswer: { type: Type.NUMBER },
            soloLevel: { type: Type.STRING },
            explanation: { type: Type.STRING }
          },
          required: ["question", "options", "correctAnswer", "soloLevel", "explanation"]
        }
      }
    }
  });

  return {
    id: Date.now().toString(),
    materialId: material.id,
    questions: JSON.parse(response.text || "[]")
  };
};
