
import React from 'react';
import { AppState } from '../types';

interface Props {
  state: AppState;
}

const AssessmentResultsPage: React.FC<Props> = ({ state }) => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Hasil Asesmen Siswa</h2>
        <p className="text-slate-500">Histori nilai kurikulum merdeka.</p>
      </header>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-600">Siswa</th>
              <th className="px-6 py-4 font-bold text-slate-600">Topik</th>
              <th className="px-6 py-4 font-bold text-slate-600 text-center">Skor</th>
              <th className="px-6 py-4 font-bold text-slate-600">Tanggal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {state.assessmentScores.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">Belum ada data hasil asesmen.</td>
              </tr>
            ) : (
              state.assessmentScores.map((res, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-700">{res.studentName}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{res.topic}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-4 py-1 rounded-full font-bold ${res.score >= 70 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {res.score}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-sm">{res.date}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile List */}
      <div className="md:hidden space-y-4 pb-20">
        {state.assessmentScores.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-3xl text-slate-400 border border-slate-100">
            Belum ada data nilai.
          </div>
        ) : (
          state.assessmentScores.map((res, i) => (
            <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
              <div className="flex justify-between items-start">
                <span className="font-black text-slate-800 text-lg">{res.studentName}</span>
                <span className={`px-3 py-1 rounded-xl text-sm font-black ${res.score >= 70 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {res.score}
                </span>
              </div>
              <div className="text-xs text-slate-500 font-bold uppercase tracking-widest">{res.topic}</div>
              <div className="text-[10px] text-slate-400 font-medium">{res.date}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AssessmentResultsPage;
