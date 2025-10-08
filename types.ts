
export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  rest: string;
  notes?: string;
  exerciseType: 'weightlifting' | 'cardio' | 'stretching' | 'bodyweight';
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface WorkoutWeek {
  week: number;
  weeklyFocus: string;
  days: WorkoutDay[];
}

export interface WorkoutPlan {
  title: string;
  introduction: string;
  weeks: WorkoutWeek[];
  generalAdvice: string[];
  activeRecovery: string[];
}