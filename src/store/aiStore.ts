import { create } from "zustand";
import { persist } from "zustand/middleware";

type AiState = {
    aiQuery: string;
    aiResponse: string;
    setAiQuery: (query: string) => void;
    setAiResponse: (response: string | null) => void;
    clearStore: () => void;
}

const defaultResponse = "Hi, I am your assistant...";

export const useAiStore = create<AiState>()(
    persist(
        (set) => ({
            aiQuery: "",
            aiResponse: defaultResponse,
            setAiQuery: (query) => set({ aiQuery: query }),
            setAiResponse: (response) => set({ aiResponse: response ?? defaultResponse }),
            clearStore: () => set({ aiQuery: "", aiResponse: defaultResponse })
        }),
        {
            name: "ai-assistant-store"
        }
    )
);