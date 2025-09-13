# CookCraft

CookCraft is an AI-powered personal meal tracker and assistant built with Next.js, React, and Tailwind CSS. It helps you log meals, track nutrition, visualize your dietary habits, and get AI-generated meal summaries and suggestions.

## Screenshots

### Homepage
<img width="1268" height="593" alt="Homepage - 1" src="https://github.com/user-attachments/assets/42fc983a-12a0-4bfd-99b9-ca470a91292c" />

<img width="1268" height="593" alt="Homepage - 2" src="https://github.com/user-attachments/assets/f99e26b1-f241-432c-99a6-3c9d39f8ea29" />


### Login

<img width="1279" height="592" alt="Login" src="https://github.com/user-attachments/assets/dbaf249a-a2eb-4cb8-98a9-785f7c2f0d59" />


### Log a Meal

<img width="1267" height="592" alt="Log Meal" src="https://github.com/user-attachments/assets/58d6eaf7-d56c-469a-a157-e0f463348eaf" />


### Dashboard

<img width="1268" height="594" alt="Dashboard - 1" src="https://github.com/user-attachments/assets/182a850a-aab8-4550-bc3a-f3448eda5c7b" />
<img width="1269" height="594" alt="Dashboard - 2" src="https://github.com/user-attachments/assets/b1773dcd-b78c-4385-b5c1-34ea33a98eff" />
<img width="1268" height="591" alt="Dashboard - 3" src="https://github.com/user-attachments/assets/b42a14d5-382c-4a58-bcdc-a9fb92c3baa6" />


### Meal History

<img width="1280" height="593" alt="Meal History" src="https://github.com/user-attachments/assets/420403b6-dd54-4742-9607-bc85be72ea23" />


### Ask AI Assistant

![Uploading Ask AI Assistant.png…]()


## Features

- **Meal Logging:**  
  Easily log your daily meals with details like date, type, ingredients, instructions, notes, and audio notes.

- **AI Meal Summary:**  
  Get instant AI-generated nutrition summaries, macro breakdowns, tags, and suggestions for your meals using OpenRouter AI.

- **Meal History:**  
  View and filter your meal history by date range, meal type, and search by name or tags.

- **Dashboard & Analytics:**  
  Visualize your calorie intake and macro distribution with interactive charts (Recharts).

- **AI Assistant:**  
  Ask questions about your meal history and get intelligent responses based on your logged data.

- **Authentication:**  
  Secure login and logout with Google OAuth via NextAuth.js.

## Tech Stack

- Next.js (App Router)
- React & React Hooks
- Tailwind CSS
- Zustand (state management)
- Recharts (data visualization)
- NextAuth.js (authentication)
- OpenRouter AI API (AI meal analysis)
- TypeScript

## Getting Started

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/cookcraft.git
   cd cookcraft
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**  
   Create a `.env.local` file and add your API keys and secrets:

   ```
   OPENROUTER_API_KEY=your_openrouter_api_key
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

## Folder Structure

- `/src/app` — Main app pages (log, dashboard, history, assistant, etc.)
- `/src/components` — Reusable UI components
- `/src/hooks` — Custom React hooks
- `/src/store` — Zustand stores
- `/src/types` — TypeScript types and interfaces
- `/public` — Static assets

## License

This project is licensed under the MIT License.
