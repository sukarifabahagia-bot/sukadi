
import React, { useState } from 'react';

interface Props {
  children: React.ReactNode;
  onSuccess?: () => void;
}

const PasswordGuard: React.FC<Props> = ({ children }) => {
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState(false);

  const handleVerify = () => {
    if (password === '138') {
      setIsAuthorized(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
    }
  };

  if (isAuthorized) return <>{children}</>;

  return (
    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl shadow-xl border border-slate-100 max-w-md mx-auto mt-20">
      <div className="bg-orange-100 p-4 rounded-full mb-6">
        <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-slate-800 mb-2">Area Terbatas</h2>
      <p className="text-slate-500 text-center mb-6 text-sm">Masukkan kode akses untuk membuka halaman ini.</p>
      
      <input 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
        placeholder="Kode Akses"
        className={`w-full px-4 py-3 rounded-xl border text-center text-2xl tracking-widest focus:ring-2 outline-none mb-4 ${error ? 'border-red-500 focus:ring-red-200' : 'border-slate-200 focus:ring-blue-200'}`}
      />
      
      {error && <p className="text-red-500 text-xs font-bold mb-4">Kode salah! Silakan coba lagi.</p>}
      
      <button 
        onClick={handleVerify}
        className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-900 transition-all"
      >
        Buka Akses
      </button>
    </div>
  );
};

export default PasswordGuard;
