
export enum SoloLevel {
  UNISTRUCTURAL = 'Unistructural',
  MULTISTRUCTURAL = 'Multistructural',
  RELATIONAL = 'Relational',
  EXTENDED_ABSTRACT = 'Extended Abstract'
}

export interface Student {
  id: string;
  name: string;
  absentNumber: number;
}

export interface AttendanceRecord {
  date: string;
  presents: string[]; // List of student IDs
  notes: Record<string, string>;
}

export interface AssessmentScore {
  studentId: string;
  studentName: string;
  score: number;
  date: string;
  topic: string;
}

export interface Question {
  id: string;
  text: string;
  options?: string[]; // Optional for Fill-in
  correctIndex?: number; // For Multiple Choice
  correctAnswer?: string; // For Fill-in (Isian)
  type: 'SINGLE' | 'GRADED' | 'FILL_IN';
  level?: string;
}

export interface Material {
  id: string;
  title: string;
  narrative: string;
  detailedExplanation: string; // Penjabaran materi yang lebih banyak
  problemScenario: string;
  concepts: string[];
  imageUrl?: string;
  summary: string; // Ringkasan untuk siswa
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  soloLevel: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  materialId: string;
  questions: QuizQuestion[];
}

export interface AppState {
  students: Student[];
  attendance: AttendanceRecord[];
  assessmentScores: AssessmentScore[];
}
