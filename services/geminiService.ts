
import { GoogleGenAI, Type } from "@google/genai";
import { WorkoutPlan } from '../types';

const USER_PROMPT = `
I suffer from high bp, high cholesterol and partial ED. My current supplement stack is potassium, b-12, mnm, a bp mix of beetroot, hawothorn, ceyenne, beet supplements and I drink a protein shake everyday from On fitness.
Today I started day 1 of a what I want to be a 12 week gym routine. Today (Tuesday) was Pullups, barbell row, bicep curl, rear delt fly and farmers carry.
Build out the rest of the 12 week program shooting for a monday through friday routine with the possibility of Saturday. Sunday will be an active recovery day.
`;

const SYSTEM_INSTRUCTION = `
You are an expert fitness coach and kinesiologist with special expertise in creating workout plans for individuals with health considerations like high blood pressure and high cholesterol.

Your task is to generate a comprehensive 12-week workout program based on the user's details.

**Key considerations:**
1.  **Safety First:** The plan must be suitable for someone with high blood pressure. This means avoiding exercises that cause sudden, extreme spikes in blood pressure (e.g., very heavy 1-rep max lifts, holding breath/Valsalva maneuver). Emphasize controlled movements and consistent breathing.
2.  **Progressive Overload:** The plan must gradually increase in intensity over the 12 weeks. This can be through increased weight, reps, sets, or reduced rest time. Clearly state the focus for each week (e.g., "Week 1-4: Foundational Strength & Endurance", "Week 5-8: Hypertrophy", "Week 9-12: Strength & Conditioning").
3.  **Structure:** Create a 5-day split (Monday-Friday) with an optional 6th day (Saturday). Sunday should be for active recovery. A common split like Push/Pull/Legs is a good foundation.
4.  **Completeness:** Each exercise must include the name, sets, reps, and rest period. Rep ranges like 8-12 are good for hypertrophy and cardiovascular health.
5.  **Exercise Type:** For each exercise, include an 'exerciseType' field. The value must be one of the following strings: 'weightlifting', 'cardio', 'stretching', or 'bodyweight'.
6.  **User's Start:** Incorporate the user's first workout (Tuesday - Pull Day) into the plan for Week 1. Build the rest of Week 1 and the subsequent 11 weeks around it.
7.  **Cardio:** Integrate moderate-intensity cardio sessions into the plan, as this is crucial for managing BP and cholesterol.
8.  **Clarity:** Provide a brief introduction, general advice (like hydration, warm-ups, cool-downs, and listening to their body), and specific suggestions for active recovery.
9.  **JSON Output:** You must return the data in the specified JSON format.
`;

const responseSchema: object = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    introduction: { type: Type.STRING },
    weeks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          week: { type: Type.INTEGER },
          weeklyFocus: { type: Type.STRING },
          days: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.STRING },
                focus: { type: Type.STRING },
                exercises: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      sets: { type: Type.STRING },
                      reps: { type: Type.STRING },
                      rest: { type: Type.STRING },
                      notes: { type: Type.STRING, description: "Optional notes like 'Focus on form' or 'Warm-up sets'" },
                      exerciseType: { type: Type.STRING, description: "The type of exercise. Must be one of: 'weightlifting', 'cardio', 'stretching', 'bodyweight'."}
                    },
                    required: ["name", "sets", "reps", "rest", "exerciseType"],
                  },
                },
              },
              required: ["day", "focus", "exercises"],
            },
          },
        },
        required: ["week", "weeklyFocus", "days"],
      },
    },
    generalAdvice: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    activeRecovery: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
  },
  required: ["title", "introduction", "weeks", "generalAdvice", "activeRecovery"],
};

export const generateWorkoutPlan = async (): Promise<WorkoutPlan> => {
  if (typeof process === 'undefined' || typeof process.env === 'undefined' || !process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: USER_PROMPT,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: 'application/json',
      responseSchema: responseSchema,
      temperature: 0.5,
    }
  });

  try {
    const jsonText = response.text.trim();
    const plan = JSON.parse(jsonText);
    return plan;
  } catch (e) {
    console.error("Failed to parse Gemini response:", e);
    console.error("Raw response text:", response.text);
    throw new Error("AI failed to generate a valid workout plan. Please try again.");
  }
};