
import React, { useState, useEffect } from 'react';
import { AppState, AttendanceRecord, AssessmentScore } from './types';
import { loadData, saveData } from './services/storage';
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
  const [state, setState] = useState<AppState>(loadData());

  useEffect(() => {
    saveData(state);
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
      {renderContent()}
    </Layout>
  );
};

export default App;
