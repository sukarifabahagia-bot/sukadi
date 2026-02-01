
import React, { useState, useEffect } from 'react';
import { AppState, AssessmentScore, Question } from '../types';
import { generateCompleteAssessment } from '../services/geminiService';
import { CURRICULUM_DATA, Subject, Chapter, Topic as CurriculumTopic } from '../constants/curriculum';

interface Props {
  state: AppState;
  onComplete: (score: AssessmentScore) => void;
}

const AssessmentPage: React.FC<Props> = ({ state, onComplete }) => {
  // Curriculum Selection State
  const [selectedSubject, setSelectedSubject] = useState<Subject>(CURRICULUM_DATA[0]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(CURRICULUM_DATA[0].chapters[0]);
  const [selectedTopic, setSelectedTopic] = useState<CurriculumTopic>(CURRICULUM_DATA[0].chapters[0].topics[0]);

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [finished, setFinished] = useState(false);

  // Sync Chapters when Subject changes
  useEffect(() => {
    setSelectedChapter(selectedSubject.chapters[0]);
  }, [selectedSubject]);

  // Sync Topics when Chapter changes
  useEffect(() => {
    setSelectedTopic(selectedChapter.topics[0]);
  }, [selectedChapter]);

  const handleGenerate = async () => {
    setLoading(true);
    setQuestions([]);
    setAnswers({});
    try {
      // Pass the specific topic name to the generator
      const qs = await generateCompleteAssessment(selectedTopic.name, selectedSubject.name);
      setQuestions(qs);
      setFinished(false);
    } catch (err) {
      alert("Gagal memuat asesmen. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const calculateScore = () => {
    if (!selectedStudent) return alert("Pilih nama siswa sebelum menyimpan!");
    
    let correct = 0;
    questions.forEach((q, idx) => {
      if (q.type === 'FILL_IN') {
        const userAns = (answers[idx] || '').toString().toLowerCase().trim();
        const correctAns = (q.correctAnswer || '').toLowerCase().trim();
        if (userAns === correctAns) correct++;
      } else {
        if (answers[idx] === q.correctIndex) correct++;
      }
    });

    const finalScore = Math.round((correct / questions.length) * 100);
    const student = state.students.find(s => s.id === selectedStudent);

    onComplete({
      studentId: selectedStudent,
      studentName: student?.name || '',
      score: finalScore,
      date: new Date().toLocaleDateString('id-ID'),
      topic: `${selectedSubject.name}: ${selectedChapter.name} - ${selectedTopic.name}`
    });
    setFinished(true);
  };

  if (finished) {
    return (
      <div className="bg-white p-12 rounded-[40px] shadow-xl text-center border-2 border-green-100 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-lg">
          ✓
        </div>
        <h2 className="text-3xl font-black text-slate-800">Skor Tersimpan!</h2>
        <p className="text-slate-500 mt-2 text-lg">Data hasil asesmen telah berhasil direkam ke database SKDBEJO SD.</p>
        <button 
          onClick={() => {setQuestions([]); setFinished(false);}} 
          className="mt-8 bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100"
        >
          Siapkan Ujian Berikutnya
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-32">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Pusat Asesmen SKDBEJO SD</h2>
          <p className="text-slate-500 font-medium tracking-tight">Pilih materi dan generate 40 soal otomatis.</p>
        </div>
        <div className="bg-orange-100 px-4 py-2 rounded-xl border border-orange-200">
          <span className="text-orange-700 font-black text-xs uppercase tracking-widest">Kurikulum Merdeka V2</span>
        </div>
      </header>

      {questions.length === 0 ? (
        <div className="bg-white p-10 rounded-[40px] shadow-sm border border-slate-100 space-y-8 animate-in fade-in slide-in-from-top-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mata Pelajaran</label>
              <select 
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-blue-500 outline-none transition-all font-black text-slate-700"
                value={selectedSubject.id}
                onChange={(e) => setSelectedSubject(CURRICULUM_DATA.find(s => s.id === e.target.value)!)}
              >
                {CURRICULUM_DATA.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Pilih Bab</label>
              <select 
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-blue-500 outline-none transition-all font-black text-slate-700"
                value={selectedChapter.id}
                onChange={(e) => setSelectedChapter(selectedSubject.chapters.find(c => c.id === e.target.value)!)}
              >
                {selectedSubject.chapters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Topik Spesifik</label>
              <select 
                className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-blue-500 outline-none transition-all font-black text-slate-700"
                value={selectedTopic.id}
                onChange={(e) => setSelectedTopic(selectedChapter.topics.find(t => t.id === e.target.value)!)}
              >
                {selectedChapter.topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
              </select>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-center gap-4">
             <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl">✨</div>
             <div>
                <h4 className="font-black text-blue-900">Konfigurasi Asesmen</h4>
                <p className="text-blue-700 text-sm">Sistem akan menyusun 25 PG Tunggal, 10 PG Bertingkat, dan 5 Isian Singkat.</p>
             </div>
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-slate-900 text-white py-6 rounded-3xl font-black text-xl hover:bg-slate-800 disabled:bg-slate-300 transition-all shadow-2xl flex items-center justify-center gap-4"
          >
            {loading ? (
              <>
                <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                Menyusun 40 Soal Strategis...
              </>
            ) : (
              <>🚀 Generate Soal Sekarang</>
            )}
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Persistent Header for Student Selection */}
          <div className="bg-white/90 backdrop-blur-xl p-6 rounded-[32px] shadow-2xl border border-blue-100 sticky top-4 z-20 flex flex-col md:flex-row justify-between items-center gap-4 animate-in slide-in-from-top-4">
            <div className="flex flex-col w-full md:w-auto">
              <span className="text-[10px] font-black text-blue-600 uppercase mb-1 ml-1 tracking-widest">Peserta Ujian: {selectedSubject.name}</span>
              <select 
                className="bg-transparent text-2xl font-black outline-none text-slate-800 cursor-pointer"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="">-- Pilih Nama Siswa --</option>
                {state.students.map(s => <option key={s.id} value={s.id}>{s.absentNumber}. {s.name}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-8">
               <div className="text-right">
                  <span className="text-[10px] font-black text-slate-400 block uppercase tracking-tighter">Progress Pengerjaan</span>
                  <span className="text-3xl font-black text-blue-600">{Object.keys(answers).length} <span className="text-slate-200 text-lg font-bold">/ {questions.length}</span></span>
               </div>
               <button 
                 onClick={calculateScore} 
                 className="bg-blue-600 text-white px-10 py-4 rounded-[20px] font-black hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 text-lg"
               >
                 SIMPAN HASIL
               </button>
            </div>
          </div>

          <div className="space-y-8">
            {questions.map((q, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="flex items-start gap-8">
                  <div className={`w-14 h-14 rounded-3xl flex items-center justify-center font-black flex-shrink-0 text-white shadow-xl ${
                    q.type === 'SINGLE' ? 'bg-slate-400' : 
                    q.type === 'GRADED' ? 'bg-indigo-600' : 'bg-orange-500'
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-3">
                       <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl ${
                         q.type === 'SINGLE' ? 'bg-slate-50 text-slate-400 border border-slate-100' : 
                         q.type === 'GRADED' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-orange-50 text-orange-600 border border-orange-100'
                       }`}>
                         {q.type === 'SINGLE' ? 'PG Tunggal' : q.type === 'GRADED' ? `Solo Bertingkat (${q.level})` : 'Isian Singkat'}
                       </span>
                    </div>
                    <p className="text-2xl text-slate-800 font-bold leading-relaxed">{q.text}</p>
                    
                    {q.type !== 'FILL_IN' ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                        {q.options?.map((opt, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => setAnswers({...answers, [idx]: optIdx})}
                            className={`text-left px-8 py-6 rounded-[28px] border-2 transition-all flex items-center gap-5 group relative overflow-hidden ${
                              answers[idx] === optIdx 
                                ? 'bg-blue-600 border-blue-600 text-white font-black shadow-xl' 
                                : 'border-slate-50 bg-slate-50 hover:border-blue-200 hover:bg-white text-slate-600 font-bold'
                            }`}
                          >
                            <span className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-black transition-all ${
                              answers[idx] === optIdx ? 'bg-blue-500 text-white scale-110 shadow-lg' : 'bg-white text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'
                            }`}>
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="flex-1 text-lg">{opt}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-4">
                        <input 
                          type="text"
                          placeholder="Ketik jawaban singkat..."
                          className="w-full px-10 py-7 rounded-[32px] bg-slate-50 border-4 border-slate-100 focus:border-orange-500 outline-none text-3xl font-black text-slate-800 placeholder:text-slate-200 transition-all shadow-inner"
                          value={answers[idx] || ''}
                          onChange={(e) => setAnswers({...answers, [idx]: e.target.value})}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="py-16">
            <button 
              onClick={calculateScore}
              className="w-full bg-slate-900 text-white py-10 rounded-[40px] font-black text-4xl hover:bg-black shadow-2xl shadow-slate-200 transition-all active:scale-[0.98] tracking-tight"
            >
              🚀 SELESAIKAN ASESMEN
            </button>
            <p className="text-center text-slate-400 mt-6 text-sm font-black uppercase tracking-[0.5em]">SKDBEJO SD Advanced Assessment System</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentPage;
