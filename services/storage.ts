
import { AppState, Student, AttendanceRecord, AssessmentScore } from '../types';

const STORAGE_KEY = 'SKDBEJO_DATA_V1';
// GANTI URL DI BAWAH INI DENGAN URL WEB APP DARI GOOGLE APPS SCRIPT ANDA
// Fix: Explicitly typing as string to avoid inference as literal '' which leads to 'never' type in unreachable logic branches
const CLOUD_API_URL: string = ''; 

const generate35Students = (): Student[] => {
  const names = [
    "Ahmad Fauzi", "Budi Santoso", "Cici Amalia", "Dedi Kurniawan", "Eka Putri",
    "Fajar Siddiq", "Gita Permata", "Hadi Wijaya", "Indah Lestari", "Indra Kusuma",
    "Joko Susilo", "Kiki Amelia", "Lutfi Hakim", "Maya Sari", "Nanda Pratama",
    "Oki Setiawan", "Putri Ayu", "Qori Ananda", "Rian Hidayat", "Siska Olivia",
    "Taufik Hidayat", "Umar Bakri", "Vina Panduwinata", "Wawan Hermawan", "Xena Putri",
    "Yuda Pratama", "Zainal Arifin", "Anisa Rahma", "Bambang Pamungkas", "Citra Kirana",
    "Doni Salmanan", "Erna Sari", "Farhan Abbas", "Guntur Bumi", "Hesti Purwadinata"
  ];
  return names.map((name, index) => ({
    id: (index + 1).toString(),
    name: name,
    absentNumber: index + 1
  }));
};

const INITIAL_STATE: AppState = {
  students: generate35Students(),
  attendance: [],
  assessmentScores: []
};

export const loadLocalData = (): AppState => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : INITIAL_STATE;
  } catch (e) {
    return INITIAL_STATE;
  }
};

export const saveLocalData = (state: AppState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Local save failed", e);
  }
};

export const fetchCloudData = async (): Promise<AppState | null> => {
  if (!CLOUD_API_URL || CLOUD_API_URL.trim() === '') return null;
  try {
    const response = await fetch(CLOUD_API_URL);
    if (!response.ok) return null;
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Cloud Fetch Error:", error);
    return null;
  }
};

export const syncToCloud = async (state: AppState) => {
  if (!CLOUD_API_URL || CLOUD_API_URL.trim() === '') return;
  try {
    await fetch(CLOUD_API_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'SYNC_ALL', data: state })
    });
  } catch (error) {
    console.error("Cloud Sync Error:", error);
  }
};

export const exportToCSV = (students: Student[], attendance: AttendanceRecord[]) => {
  let csv = 'No,Nama,Tanggal,Status\n';
  attendance.forEach(record => {
    students.forEach(student => {
      const isPresent = record.presents.includes(student.id);
      csv += `${student.absentNumber},${student.name},${record.date},${isPresent ? 'Hadir' : 'Alpa'}\n`;
    });
  });
  
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('hidden', '');
  a.setAttribute('href', url);
  a.setAttribute('download', `Absensi_SKDBEJO_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
