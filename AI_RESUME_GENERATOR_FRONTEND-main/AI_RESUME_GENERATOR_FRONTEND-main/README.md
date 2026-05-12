# AI Resume Builder - Frontend

A modern, interactive web application built with Next.js that guides users through creating professional resumes using an AI-powered (or rule-based) chatbot interface.

## 🚀 Features

- **Conversational UI**: A sleek, step-by-step chatbot interface to collect user information.
- **Progress Tracking**: Real-time progress bar to show how much of the resume is completed.
- **Dynamic Preview**: See your information being formatted as you provide it.
- **Instant PDF Download**: One-click generation and download of professional PDF resumes.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Smooth Animations**: Powered by Framer Motion for a premium user experience.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide Icons](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **API Client**: [Axios](https://axios-http.com/)
- **PDF Rendering**: [@react-pdf/renderer](https://react-pdf.org/)

## 📋 Prerequisites

- Node.js 18+
- npm / yarn / pnpm

## ⚙️ Setup & Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd AI_RESUME_GENERATOR_FRONTEND
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```

## 🏗️ Project Structure

```text
src/
├── app/            # Next.js App Router (pages and layouts)
├── components/     # Reusable UI components (buttons, inputs, etc.)
├── services/       # API service layers for backend communication
├── store/          # Zustand state management
├── types/          # TypeScript interfaces and types
└── utils/          # Helper functions and formatting logic
```

## 🌐 Integration

This frontend is designed to work seamlessly with the [AI Resume Builder Backend](https://github.com/Yashwant-Rangrej/AI_RESUME_GENERATOR_BACKEND). Ensure the backend is running and the `NEXT_PUBLIC_API_URL` is correctly configured.

## 👨‍💻 Developed By

**Yashwant Rangrej**
- [GitHub](https://github.com/Yashwant-Rangrej)
- [LinkedIn](https://www.linkedin.com/in/yashwant-rangrej-0856993a8/)

