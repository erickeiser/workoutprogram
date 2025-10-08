
import React, { useState } from 'react';
import type { WorkoutPlan, WorkoutWeek, WorkoutDay, Exercise } from '../types';

interface WorkoutPlanProps {
  plan: WorkoutPlan;
}

const WeightliftingIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M5 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zM15 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zM11 5a1 1 0 00-1 1v8a1 1 0 102 0V6a1 1 0 00-1-1zM3 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1zM17 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" />
    </svg>
);

const CardioIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);

const StretchingIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.5 3a.5.5 0 01.5.5v13a.5.5 0 01-1 0v-13a.5.5 0 01.5-.5zM3 5.5a.5.5 0 01.5-.5h9a.5.5 0 010 1h-9a.5.5 0 01-.5-.5zM15 3a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2a.5.5 0 01.5-.5zM10 5.5a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5z" clipRule="evenodd" />
        <path d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
    </svg>
);

const BodyweightIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);


const ExerciseCard: React.FC<{ exercise: Exercise }> = ({ exercise }) => {
    const iconMap: Record<Exercise['exerciseType'], React.ReactNode> = {
        weightlifting: <WeightliftingIcon />,
        cardio: <CardioIcon />,
        stretching: <StretchingIcon />,
        bodyweight: <BodyweightIcon />,
    };

    return (
        <div className="border-t border-gray-700 py-3">
            <div className="flex items-center space-x-3">
                <div className="text-blue-400 w-5 h-5 flex-shrink-0" aria-label={`Exercise type: ${exercise.exerciseType}`}>
                    {iconMap[exercise.exerciseType] || null}
                </div>
                <p className="font-semibold text-blue-300">{exercise.name}</p>
            </div>
            <div className="flex justify-between text-sm text-gray-400 mt-1 pl-8">
                <span>Sets: <span className="text-gray-200 font-medium">{exercise.sets}</span></span>
                <span>Reps: <span className="text-gray-200 font-medium">{exercise.reps}</span></span>
                <span>Rest: <span className="text-gray-200 font-medium">{exercise.rest}</span></span>
            </div>
            {exercise.notes && <p className="text-xs text-gray-500 mt-2 italic pl-8">Note: {exercise.notes}</p>}
        </div>
    );
};


const DayCard: React.FC<{ day: WorkoutDay }> = ({ day }) => (
  <div className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col">
    <h4 className="text-lg font-bold text-green-400">{day.day}</h4>
    <p className="text-sm text-gray-400 mb-4">{day.focus}</p>
    <div className="space-y-2 flex-grow">
      {day.exercises.map((ex, index) => (
        <ExerciseCard key={index} exercise={ex} />
      ))}
    </div>
  </div>
);

const WeekComponent: React.FC<{ week: WorkoutWeek; isOpen: boolean; onToggle: () => void }> = ({ week, isOpen, onToggle }) => (
  <div className="mb-6 border border-gray-700 rounded-lg overflow-hidden">
    <button
      onClick={onToggle}
      className="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 transition-colors duration-200"
      aria-expanded={isOpen}
      aria-controls={`week-${week.week}-content`}
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white">Week {week.week}</h3>
          <p className="text-blue-300">{week.weeklyFocus}</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>
    {isOpen && (
      <div id={`week-${week.week}-content`} className="p-4 bg-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {week.days.map((d, index) => (
            <DayCard key={index} day={d} />
          ))}
        </div>
      </div>
    )}
  </div>
);

const GeneralInfoCard: React.FC<{ title: string, items: string[]}> = ({title, items}) => (
    <div className="bg-gray-800 bg-opacity-50 border border-gray-700 rounded-lg p-6 my-6">
      <h2 className="text-2xl font-bold text-blue-300 mb-4">{title}</h2>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-blue-400 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="text-gray-300">{item}</p>
          </li>
        ))}
      </ul>
    </div>
)

export const WorkoutPlanDisplay: React.FC<WorkoutPlanProps> = ({ plan }) => {
  const [openWeek, setOpenWeek] = useState<number | null>(1);

  const toggleWeek = (weekNumber: number) => {
    setOpenWeek(openWeek === weekNumber ? null : weekNumber);
  };

  return (
    <div className="mt-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">{plan.title}</h1>
        <p className="mt-4 max-w-3xl mx-auto text-gray-400">{plan.introduction}</p>
      </div>

      <GeneralInfoCard title="General Advice" items={plan.generalAdvice} />

      <div>
        {plan.weeks.map((week) => (
          <WeekComponent
            key={week.week}
            week={week}
            isOpen={openWeek === week.week}
            onToggle={() => toggleWeek(week.week)}
          />
        ))}
      </div>
      
      <GeneralInfoCard title="Active Recovery (Sundays)" items={plan.activeRecovery} />
    </div>
  );
};