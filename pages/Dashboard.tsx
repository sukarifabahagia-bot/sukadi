
import React from 'react';
import { AppState } from '../types';

interface Props {
  state: AppState;
}

const DashboardPage: React.FC<Props> = ({ state }) => {
  const today = new Date().toISOString().split('T')[0];
  const todayRecord = state.attendance.find(a => a.date === today);
  const totalStudents = state.students.length;
  const presentCount = todayRecord?.presents.length || 0;

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 rounded-[32px] md:rounded-[40px] p-6 md:p-16 text-white shadow-2xl shadow-blue-200">
        <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-10">
          <div className="w-full lg:max-w-xl space-y-4 md:space-y-6 text-center lg:text-left">
            <span className="inline-block bg-blue-500/30 backdrop-blur-md px-4 py-1 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] border border-white/10">
              Selamat Datang Guru Hebat
            </span>
            <h2 className="text-3xl md:text-6xl font-black leading-tight tracking-tight">
              Inovasi Belajar <br className="hidden md:block"/><span className="text-yellow-400">Deep Learning</span>
            </h2>
            <p className="text-blue-100 text-sm md:text-xl font-medium leading-relaxed opacity-90 px-4 lg:px-0">
              Membangun pemahaman bermakna bagi generasi masa depan melalui SKDBEJO SD.
            </p>
          </div>
          
          <div className="hidden md:flex flex-shrink-0">
            <div className="relative">
              <div className="w-48 h-48 md:w-72 md:h-72 bg-white/10 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-sm animate-bounce duration-[5s]">
                <span className="text-7xl md:text-9xl">🎓</span>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-blue-900 p-4 rounded-3xl font-black shadow-xl rotate-12">
                Fase B
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
        <div className="bg-white p-5 md:p-8 rounded-[24px] md:rounded-[32px] shadow-sm border border-slate-100 flex flex-col">
          <span className="text-2xl md:text-3xl mb-4">👥</span>
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-1">Siswa</span>
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl md:text-5xl font-black text-slate-800">{totalStudents}</span>
            <span className="text-slate-400 font-bold uppercase text-[8px] md:text-[10px]">Anak</span>
          </div>
        </div>

        <div className="bg-white p-5 md:p-8 rounded-[24px] md:rounded-[32px] shadow-sm border border-slate-100 flex flex-col">
          <span className="text-2xl md:text-3xl mb-4">📝</span>
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-1">Hadir</span>
          <div className="flex items-baseline space-x-1">
            <span className="text-3xl md:text-5xl font-black text-green-600">{presentCount}</span>
            <span className="text-slate-400 font-bold uppercase text-[8px] md:text-[10px]">Hari Ini</span>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 bg-white p-5 md:p-8 rounded-[24px] md:rounded-[32px] shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="bg-orange-100 w-12 h-12 rounded-2xl flex items-center justify-center text-2xl">⚡</div>
          <div>
            <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block">Kurikulum</span>
            <span className="text-lg md:text-xl font-black text-slate-800 block leading-tight">Merdeka</span>
          </div>
        </div>
      </div>

      {/* Quick Alert/Tips */}
      <div className="bg-blue-600 p-6 md:p-8 rounded-[32px] text-white flex gap-6 items-center shadow-xl shadow-blue-100">
        <span className="text-4xl hidden md:block">💡</span>
        <p className="text-sm md:text-lg font-medium leading-relaxed">
          Gunakan menu <span className="font-black text-yellow-300">Materi PBL</span> untuk membuat pembelajaran lebih visual dan menarik bagi siswa Kelas 3 SD hari ini!
        </p>
      </div>
    </div>
  );
};

export default DashboardPage;
