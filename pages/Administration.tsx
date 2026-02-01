
import React, { useState, useEffect } from 'react';
import { generateAdminDoc } from '../services/geminiService';
import { CURRICULUM_DATA, Subject, Chapter, Topic } from '../constants/curriculum';

const AdministrationPage: React.FC = () => {
  const [selectedSubject, setSelectedSubject] = useState<Subject>(CURRICULUM_DATA[0]);
  const [selectedChapter, setSelectedChapter] = useState<Chapter>(CURRICULUM_DATA[0].chapters[0]);
  const [selectedTopic, setSelectedTopic] = useState<Topic>(CURRICULUM_DATA[0].chapters[0].topics[0]);
  
  const [docType, setDocType] = useState<'CP' | 'TP' | 'ATP' | 'MODUL_AJAR'>('MODUL_AJAR');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedChapter(selectedSubject.chapters[0]);
  }, [selectedSubject]);

  useEffect(() => {
    setSelectedTopic(selectedChapter.topics[0]);
  }, [selectedChapter]);

  const handleGenerate = async () => {
    setLoading(true);
    setContent('');
    try {
      const result = await generateAdminDoc(docType, selectedSubject.name, selectedChapter.name, selectedTopic.name);
      setContent(result);
    } catch (err) {
      alert("Gagal membuat dokumen.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    alert("Teks berhasil disalin!");
  };

  return (
    <div className="space-y-8 pb-32">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Administrasi Guru SKDBEJO</h2>
        <p className="text-slate-500">Generator CP, TP, ATP, dan Modul Ajar otomatis.</p>
      </header>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Jenis Dokumen</label>
            <select 
              value={docType}
              onChange={(e) => setDocType(e.target.value as any)}
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-50 bg-slate-50 focus:border-blue-500 outline-none font-bold"
            >
              <option value="CP">Capaian Pembelajaran (CP)</option>
              <option value="TP">Tujuan Pembelajaran (TP)</option>
              <option value="ATP">Alur Tujuan Pembelajaran (ATP)</option>
              <option value="MODUL_AJAR">Modul Ajar Lengkap</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Mata Pelajaran</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-50 bg-slate-50 focus:border-blue-500 outline-none font-bold"
              value={selectedSubject.id}
              onChange={(e) => setSelectedSubject(CURRICULUM_DATA.find(s => s.id === e.target.value)!)}
            >
              {CURRICULUM_DATA.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Bab</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-50 bg-slate-50 focus:border-blue-500 outline-none font-bold"
              value={selectedChapter.id}
              onChange={(e) => setSelectedChapter(selectedSubject.chapters.find(c => c.id === e.target.value)!)}
            >
              {selectedSubject.chapters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Topik</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border-2 border-slate-50 bg-slate-50 focus:border-blue-500 outline-none font-bold"
              value={selectedTopic.id}
              onChange={(e) => setSelectedTopic(selectedChapter.topics.find(t => t.id === e.target.value)!)}
            >
              {selectedTopic.id ? selectedChapter.topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>) : null}
            </select>
          </div>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-slate-800 disabled:bg-slate-300 transition-all shadow-xl shadow-slate-200"
        >
          {loading ? '⏳ Menyusun Dokumen Administrasi...' : '📝 Generate Dokumen'}
        </button>
      </div>

      {content && (
        <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-100 relative animate-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-50">
             <h3 className="text-xl font-black text-slate-800">{docType} - {selectedTopic.name}</h3>
             <button 
                onClick={copyToClipboard}
                className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-100"
            >
                📋 Salin Teks
            </button>
          </div>
          <div className="prose prose-slate max-w-none prose-headings:font-black prose-p:text-slate-600 prose-p:leading-relaxed">
             <pre className="whitespace-pre-wrap font-sans text-slate-700 leading-relaxed text-sm">
                {content}
             </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdministrationPage;
