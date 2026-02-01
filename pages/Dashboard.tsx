
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
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-1000">
      {/* 3D-Styled Hero Section */}
      <section className="relative overflow-hidden bg-[#0F172A] rounded-[40px] md:rounded-[60px] p-8 md:p-20 text-white shadow-[0_32px_64px_-16px_rgba(30,64,175,0.3)] border border-white/5">
        {/* Animated 3D Background Elements */}
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[150px] animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="w-full lg:max-w-2xl space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 shadow-inner">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-blue-200">
                Sistem Intelligence SKDBEJO SD v2.5
              </span>
            </div>

            <h2 className="text-4xl md:text-7xl font-black leading-[1.05] tracking-tight">
              Platform Belajar <br/>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400 animate-gradient">
                Masa Depan.
              </span>
            </h2>
            
            <p className="text-slate-400 text-base md:text-xl font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Transformasi pendidikan melalui pendekatan <span className="text-white font-bold">Deep Learning</span> dan <span className="text-white font-bold">PBL</span> yang dirancang khusus untuk eksplorasi siswa Fase B.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="bg-white/5 backdrop-blur-md px-6 py-4 rounded-[24px] border border-white/10 flex flex-col items-center lg:items-start group hover:bg-white/10 transition-all duration-500 hover:-translate-y-1">
                <span className="text-[10px] font-black text-blue-400 uppercase mb-1 tracking-widest">Kurikulum</span>
                <span className="text-xl font-black text-white">Merdeka 2025</span>
              </div>
              <div className="bg-white/5 backdrop-blur-md px-6 py-4 rounded-[24px] border border-white/10 flex flex-col items-center lg:items-start group hover:bg-white/10 transition-all duration-500 hover:-translate-y-1">
                <span className="text-[10px] font-black text-emerald-400 uppercase mb-1 tracking-widest">Mode</span>
                <span className="text-xl font-black text-white">Deep Learning</span>
              </div>
            </div>
          </div>
          
          {/* Floating 3D Scene Simulation */}
          <div className="relative flex-shrink-0 w-full lg:w-auto flex justify-center py-10 lg:py-0">
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              {/* Main 3D Floating Sphere */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-700 rounded-full shadow-[0_0_100px_rgba(59,130,246,0.4)] animate-float overflow-hidden group">
                 <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.2),transparent)]"></div>
                 <div className="w-full h-full flex items-center justify-center text-[120px] md:text-[180px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-transform duration-700 group-hover:scale-110">
                   📚
                 </div>
              </div>

              {/* Orbital Elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 md:w-32 md:h-32 bg-white/10 backdrop-blur-xl rounded-[24px] md:rounded-[32px] border border-white/20 shadow-2xl flex items-center justify-center text-4xl animate-float delay-300">
                🧬
              </div>
              <div className="absolute -bottom-8 -left-8 w-16 h-16 md:w-24 md:h-24 bg-white/10 backdrop-blur-xl rounded-[20px] md:rounded-[28px] border border-white/20 shadow-2xl flex items-center justify-center text-3xl animate-float delay-700">
                📐
              </div>
              <div className="absolute top-1/2 -right-12 w-12 h-12 md:w-20 md:h-20 bg-emerald-500/20 backdrop-blur-xl rounded-full border border-emerald-400/30 shadow-2xl flex items-center justify-center text-2xl animate-pulse">
                🌱
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        <div className="group bg-white p-6 md:p-10 rounded-[32px] md:rounded-[48px] shadow-sm border border-slate-100 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10 space-y-6">
            <div className="bg-blue-600 text-white w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-200">👥</div>
            <div>
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-1">Total Siswa</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter">{totalStudents}</span>
                <span className="text-slate-400 font-bold text-xs uppercase">Jiwa</span>
              </div>
            </div>
          </div>
        </div>

        <div className="group bg-white p-6 md:p-10 rounded-[32px] md:rounded-[48px] shadow-sm border border-slate-100 hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10 space-y-6">
            <div className="bg-emerald-500 text-white w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-emerald-200">✅</div>
            <div>
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest block mb-1">Kehadiran Hari Ini</span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-6xl font-black text-emerald-600 tracking-tighter">{presentCount}</span>
                <span className="text-slate-400 font-bold text-xs uppercase">Hadir</span>
              </div>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
               <div 
                 className="h-full bg-emerald-500 transition-all duration-1000" 
                 style={{ width: `${(presentCount/totalStudents)*100}%` }}
               />
            </div>
          </div>
        </div>

        <div className="col-span-2 md:col-span-1 group bg-[#1E293B] p-6 md:p-10 rounded-[32px] md:rounded-[48px] shadow-xl text-white overflow-hidden relative hover:-translate-y-2 transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent"></div>
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="bg-white/10 backdrop-blur-md w-14 h-14 rounded-2xl flex items-center justify-center text-2xl border border-white/10">✨</div>
            <div className="mt-8 space-y-2">
               <h4 className="text-2xl font-black leading-tight">Mulai Eksplorasi <br/>Pelajaran Baru</h4>
               <p className="text-slate-400 text-sm font-medium">Buka menu materi untuk memulai sesi Deep Learning PBL.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 5s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
