export enum MealType {
  Breakfast = "Breakfast",
  Lunch = "Lunch",
  Dinner = "Dinner",
  Snack = "Snack",
}

export enum DateOption {
  Last7Days = "Last 7 Days",
  Last30Days = "Last 30 Days"
}

export type Meal = {
  id: number;
  date: string;
  name: string;
  type: MealType;
  tags?: string[];
  ingredients?: string[];
  instructions?: string;
  aiSummary?: string;
};

export type MealFormData = {
    date: Date;
    type: MealType;
    name: string;
    ingredients: string;
    instructions: string;
    notes?: string;
    audioNotes?: FileList;
}