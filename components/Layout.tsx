
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Beranda', icon: '🏠' },
    { id: 'attendance', label: 'Absensi', icon: '📝' },
    { id: 'material', label: 'Materi', icon: '📖' },
    { id: 'assessment', label: 'Asesmen', icon: '✍️' },
    { id: 'results', label: 'Nilai', icon: '📊' },
    { id: 'admin', label: 'Admin', icon: '📂' },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F8FAFF]">
      {/* Sidebar for Desktop */}
      <nav className="hidden md:flex w-64 bg-[#0F172A] text-white flex-col shadow-2xl sticky top-0 h-screen">
        <div className="p-8 border-b border-slate-800">
          <h1 className="text-2xl font-black tracking-tighter text-blue-400">SKDBEJO SD</h1>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mt-1">Smart Teacher Portal</p>
        </div>
        <div className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all flex items-center gap-3 ${
                activeTab === item.id 
                ? 'bg-blue-600 shadow-lg shadow-blue-500/20 translate-x-1 font-bold' 
                : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
        <div className="p-4 text-[10px] text-center border-t border-slate-800 text-slate-600 font-bold uppercase tracking-tighter">
          SKDBEJO SYSTEM V2.5
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto pb-24 md:pb-10">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 flex justify-around items-center px-2 py-3 z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] rounded-t-[24px]">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-all px-3 py-1 rounded-xl ${
              activeTab === item.id 
              ? 'text-blue-600' 
              : 'text-slate-400'
            }`}
          >
            <span className={`text-2xl transition-transform ${activeTab === item.id ? 'scale-110' : 'scale-100'}`}>
              {item.icon}
            </span>
            <span className={`text-[10px] font-bold ${activeTab === item.id ? 'opacity-100' : 'opacity-60'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
