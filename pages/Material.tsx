
import React, { useState, useEffect } from 'react';
import { generateDeepLearningMaterial } from '../services/geminiService';
import { Material } from '../types';
import { CURRICULUM_DATA, Subject, Chapter, Topic } from '../constants/curriculum';

const MaterialPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>(CURRICULUM_DATA[0]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(CURRICULUM_DATA[0].chapters[0]);
  const [selectedTopic, setSelectedTopic] = useState<Topic>(CURRICULUM_DATA[0].chapters[0].topics[0]);
  
  const [loading, setLoading] = useState(false);
  const [material, setMaterial] = useState<Material | null>(null);

  useEffect(() => {
    setSelectedChapter(selectedSubject.chapters[0]);
  }, [selectedSubject]);

  useEffect(() => {
    setSelectedTopic(selectedChapter.topics[0]);
  }, [selectedChapter]);

  const handleGenerate = async () => {
    setLoading(true);
    setMaterial(null);
    try {
      const mat = await generateDeepLearningMaterial(selectedTopic.name, selectedSubject.name);
      setMaterial(mat);
    } catch (err) {
      alert("Gagal memuat materi.");
    } finally {
      setLoading(false);
    }
  };

  const renderSummaryLines = (summary: any) => {
    if (!summary) return null;
    let lines: string[] = [];
    if (Array.isArray(summary)) {
      lines = summary;
    } else if (typeof summary === 'string') {
      lines = summary.split('\n').filter(l => l.trim() !== '');
    }
    
    return lines.map((line, idx) => (
      <div key={idx} className="flex gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
        <span className="text-green-500 font-black">✓</span>
        <p className="text-slate-700 font-bold text-lg">{line.replace(/^[*-]\s*/, '')}</p>
      </div>
    ));
  };

  return (
    <div className="space-y-8 pb-32">
      <header>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Materi PBL SKDBEJO</h2>
        <p className="text-slate-500 font-medium">Penjabaran Materi Lengkap & Visual Pendukung</p>
      </header>

      <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mata Pelajaran</label>
            <select 
              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-blue-500 outline-none font-bold text-slate-700 transition-all"
              value={selectedSubject.id}
              onChange={(e) => setSelectedSubject(CURRICULUM_DATA.find(s => s.id === e.target.value)!)}
            >
              {CURRICULUM_DATA.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Bab</label>
            <select 
              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-blue-500 outline-none font-bold text-slate-700 transition-all"
              value={selectedChapter.id}
              onChange={(e) => setSelectedChapter(selectedSubject.chapters.find(c => c.id === e.target.value)!)}
            >
              {selectedSubject.chapters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Topik Spesifik</label>
            <select 
              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-50 bg-slate-50 focus:border-blue-500 outline-none font-bold text-slate-700 transition-all"
              value={selectedTopic.id}
              onChange={(e) => setSelectedTopic(selectedChapter.topics.find(t => t.id === e.target.value)!)}
            >
              {selectedChapter.topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
        </div>

        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 disabled:bg-slate-300 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3"
        >
          {loading ? (
            <>
              <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
              Sedang Menjabarkan Materi...
            </>
          ) : '✨ Generate Materi Penjabaran'}
        </button>
      </div>

      {material && (
        <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
          <article className="bg-white rounded-[48px] shadow-2xl border border-slate-50 overflow-hidden">
            {material.imageUrl && (
              <div className="aspect-[21/9] w-full overflow-hidden bg-slate-100 relative">
                <img src={material.imageUrl} alt={material.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent"></div>
              </div>
            )}
            <div className="p-10 md:p-20 space-y-12">
              <div className="space-y-6 text-center">
                <span className="bg-orange-100 text-orange-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em]">Eksplorasi Pembelajaran</span>
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tight">{material.title}</h1>
              </div>

              <div className="bg-blue-50 p-10 rounded-[40px] border-l-[12px] border-blue-500 shadow-inner">
                <div className="flex gap-4 mb-4">
                  <span className="text-3xl">📖</span>
                  <h4 className="text-blue-900 font-black uppercase tracking-widest text-sm self-center">Cerita Pembuka</h4>
                </div>
                <p className="text-2xl text-blue-800 font-semibold italic leading-relaxed">
                  "{material.narrative}"
                </p>
              </div>

              <div className="space-y-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-slate-900 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black">1</div>
                  <h3 className="text-3xl font-black text-slate-800 tracking-tight">Mari Kita Pelajari!</h3>
                </div>
                <div className="prose prose-xl prose-slate max-w-none">
                  <div className="text-slate-600 leading-loose text-xl whitespace-pre-line font-medium space-y-6">
                    {material.detailedExplanation}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-600 to-blue-700 text-white p-12 rounded-[40px] shadow-2xl shadow-blue-200 transform hover:scale-[1.02] transition-transform duration-500">
                <div className="flex items-center gap-4 mb-6">
                  <div className="bg-white/20 p-4 rounded-3xl backdrop-blur-md">
                    <span className="text-4xl">🧩</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black tracking-tight">Tantangan Deep Learning</h3>
                    <p className="text-blue-100 font-bold text-xs uppercase tracking-widest opacity-80">Problem Based Learning</p>
                  </div>
                </div>
                <p className="text-blue-50 text-2xl leading-relaxed font-bold">
                  {material.problemScenario}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t border-slate-100">
                <div className="space-y-6">
                   <h4 className="text-xl font-black text-slate-800">📌 Ingat Poin Ini:</h4>
                   <div className="space-y-3">
                      {renderSummaryLines(material.summary)}
                   </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-xl font-black text-slate-800">💡 Konsep Kunci:</h4>
                  <div className="flex flex-wrap gap-3">
                    {material.concepts.map((c, i) => (
                      <span key={i} className="bg-slate-900 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-lg shadow-slate-200">
                        #{c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </article>
          
          <div className="mt-10 text-center">
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Dicetak oleh SKDBEJO SD Intelligence System</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialPage;
