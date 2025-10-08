
import React, { useState, useEffect } from 'react';
import { generateWorkoutPlan } from './services/geminiService';
import type { WorkoutPlan } from './types';
import { Disclaimer } from './components/Disclaimer';
import { LoadingSpinner } from './components/LoadingSpinner';
import { Supplements } from './components/Supplements';
import { WorkoutPlanDisplay } from './components/WorkoutPlan';

const App: React.FC = () => {
  const [plan, setPlan] = useState<WorkoutPlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const generatedPlan = await generateWorkoutPlan();
        setPlan(generatedPlan);
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlan();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }
    if (error) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div role="alert" className="p-4 border border-red-600 bg-red-900 bg-opacity-20 rounded-lg text-red-300 max-w-md">
            <h3 className="font-bold">Error Generating Plan</h3>
            <p className="text-sm mt-2">{error}</p>
          </div>
        </div>
      );
    }
    if (plan) {
      return (
        <>
          <Disclaimer />
          <Supplements />
          <WorkoutPlanDisplay plan={plan} />
        </>
      );
    }
    return null;
  };

  return (
    <main className="container mx-auto px-4 py-8 md:py-12">
      {renderContent()}
    </main>
  );
};

export default App;
