export interface AiSummaryResponse {
  calories: number,
  macros: { protein: number, carbs: number, fats: number },
  tags: string[],
  suggestion: string
}