import { MealType, Macros } from "@/types/meal";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type MealFormState = {
    date: Date | null;
    type: MealType | "";
    name: string;
    ingredients: string;
    instructions: string;
    notes?: string;
    audioNotes?: FileList | null;
    macros?: Macros;
    calories: number | null;
    tags?: string[];
    aiSummary?: string;
};

export const getInitialMealFormState = (): MealFormState => ({
    date: null,
    type: "",
    name: "",
    ingredients: "",
    instructions: "",
    notes: "",
    audioNotes: null,
    macros: {
        protein: 0,
        carbs: 0,
        fats: 0,
    },
    calories: 0,
    tags: [],
    aiSummary: "",
});

type MealFormStore = MealFormState & {
    setField: <K extends keyof MealFormState>(key: K, value: MealFormState[K]) => void;
    clearStore: () => void;
};

export const useMealFormStore = create<MealFormStore>()(
    persist(
        (set) => ({
            ...getInitialMealFormState(),
            setField: (key, value) => set((state) => ({ ...state, [key]: value })),
            clearStore: () => set(() => ({ ...getInitialMealFormState() })),
        }),
        {
            name: "meal-form-store",
        }
    )
);