
import React, { useState } from 'react';
import { AppState, AttendanceRecord } from '../types';
import { exportToCSV } from '../services/storage';

interface Props {
  state: AppState;
  onUpdateAttendance: (record: AttendanceRecord) => void;
}

const AttendancePage: React.FC<Props> = ({ state, onUpdateAttendance }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const currentRecord = state.attendance.find(a => a.date === selectedDate) || {
    date: selectedDate,
    presents: [],
    notes: {}
  };

  const toggleStudent = (id: string) => {
    const isPresent = currentRecord.presents.includes(id);
    const newPresents = isPresent 
      ? currentRecord.presents.filter(pid => pid !== id)
      : [...currentRecord.presents, id];
    
    onUpdateAttendance({
      ...currentRecord,
      presents: newPresents
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Sistem Absensi</h2>
          <p className="text-slate-500">Rekap kehadiran siswa SKDBEJO SD.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold text-slate-700"
            />
            <button 
                onClick={() => exportToCSV(state.students, state.attendance)}
                className="bg-green-600 text-white px-4 py-3 rounded-xl font-bold hover:bg-green-700 flex items-center justify-center gap-2 shadow-lg shadow-green-100"
            >
                📥 Ekspor CSV
            </button>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="px-6 py-4 font-semibold text-slate-600 w-20 text-center">No</th>
              <th className="px-6 py-4 font-semibold text-slate-600">Nama Lengkap</th>
              <th className="px-6 py-4 font-semibold text-slate-600 text-center">Status Kehadiran</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {state.students.sort((a,b) => a.absentNumber - b.absentNumber).map(student => {
              const isPresent = currentRecord.presents.includes(student.id);
              return (
                <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-center text-slate-500">{student.absentNumber}</td>
                  <td className="px-6 py-4 font-medium text-slate-700">{student.name}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleStudent(student.id)}
                      className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                        isPresent 
                        ? 'bg-green-100 text-green-700 border border-green-200' 
                        : 'bg-red-100 text-red-700 border border-red-200'
                      }`}
                    >
                      {isPresent ? 'HADIR' : 'ALPA'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile List View */}
      <div className="md:hidden space-y-3 pb-20">
        {state.students.sort((a,b) => a.absentNumber - b.absentNumber).map(student => {
          const isPresent = currentRecord.presents.includes(student.id);
          return (
            <div 
              key={student.id} 
              onClick={() => toggleStudent(student.id)}
              className={`p-4 rounded-2xl border flex items-center justify-between transition-all active:scale-95 ${
                isPresent ? 'bg-white border-green-100' : 'bg-white border-red-100'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                  {student.absentNumber}
                </span>
                <span className="font-bold text-slate-700">{student.name}</span>
              </div>
              <div className={`w-4 h-4 rounded-full ${isPresent ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]' : 'bg-red-500'}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttendancePage;
