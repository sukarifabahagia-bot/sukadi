
import React, { useState, useEffect } from 'react';
import { AppState, AttendanceRecord, AssessmentScore } from './types';
import { loadLocalData, saveLocalData, fetchCloudData, syncToCloud } from './services/storage';
import Layout from './components/Layout';
import PasswordGuard from './components/PasswordGuard';
import DashboardPage from './pages/Dashboard';
import AttendancePage from './pages/Attendance';
import MaterialPage from './pages/Material';
import AdministrationPage from './pages/Administration';
import AssessmentPage from './pages/Assessment';
import AssessmentResultsPage from './pages/AssessmentResults';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [state, setState] = useState<AppState>(loadLocalData());
  const [isSyncing, setIsSyncing] = useState(false);

  // Load Cloud Data on startup
  useEffect(() => {
    const initCloud = async () => {
      const cloudData = await fetchCloudData();
      if (cloudData && cloudData.students && cloudData.students.length > 0) {
        setState(cloudData);
        saveLocalData(cloudData);
      }
    };
    initCloud();
  }, []);

  // Save to Local and Cloud whenever state changes
  useEffect(() => {
    saveLocalData(state);
    
    // Debounce cloud sync to avoid hitting limits
    const timeout = setTimeout(() => {
      syncToCloud(state);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [state]);

  const updateAttendance = (record: AttendanceRecord) => {
    setState(prev => {
        const existingIndex = prev.attendance.findIndex(a => a.date === record.date);
        let newAttendance = [...prev.attendance];
        if (existingIndex >= 0) {
            newAttendance[existingIndex] = record;
        } else {
            newAttendance.push(record);
        }
        return { ...prev, attendance: newAttendance };
    });
  };

  const addAssessmentScore = (score: AssessmentScore) => {
    setState(prev => ({
      ...prev,
      assessmentScores: [score, ...prev.assessmentScores]
    }));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardPage state={state} />;
      case 'attendance': return (
        <PasswordGuard>
          <AttendancePage state={state} onUpdateAttendance={updateAttendance} />
        </PasswordGuard>
      );
      case 'material': return <MaterialPage />;
      case 'assessment': return <AssessmentPage state={state} onComplete={addAssessmentScore} />;
      case 'results': return (
        <PasswordGuard>
          <AssessmentResultsPage state={state} />
        </PasswordGuard>
      );
      case 'admin': return (
        <PasswordGuard>
          <AdministrationPage />
        </PasswordGuard>
      );
      default: return <DashboardPage state={state} />;
    }
  };

  return (
    <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
      <div className="relative">
        {/* Sync Indicator */}
        <div className="fixed top-4 right-4 z-[60] flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-1 rounded-full border border-slate-100 shadow-sm pointer-events-none opacity-50">
           <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
           <span className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Cloud Sync Active</span>
        </div>
        {renderContent()}
      </div>
    </Layout>
  );
};

export default App;
