🩺 HackOps HealthHub
Your Health, Simplified.

A smart, frontend-powered healthcare companion built with React + TypeScript + TailwindCSS

🚀 Overview

HackOps HealthHub is an interactive and intelligent frontend-only health management platform.
It simplifies healthcare with AI-inspired tools, 3D visualization, and accessible UI — all running entirely in the browser.

Developed as part of ACEathon 2025, it showcases how modern frontend technologies can deliver meaningful and intuitive digital health experiences.

🧩 Key Features

| Feature                              | Description                                                           |
| ------------------------------------ | --------------------------------------------------------------------- |
| 🏠 **Home Page**                     | Engaging hero section with brand identity and CTAs.                   |
| 🩻 **Pain Mapper (3D)**              | Interactive human body visualization built with React Three Fiber.    |
| 💊 **Medicine Reminder**             | Local reminder system stored in browser memory.                       |
| 🩺 **Symptom Checker**               | Suggests possible causes using simple rule-based JS logic.            |
| ⛑️ **First Aid Guide**               | Expandable cards with step-by-step medical instructions.              |
| 🧠 **Health Tips**                   | Curated list of daily wellness insights.                              |
| 🗺️ **Emergency Contact**             | Stores emergency details safely in localStorage.                      |
| 📊 **Dashboard Showcase**            | Displays health data summaries visually.                              |
| 🌙 **Dark/Light Mode**               | Fully theme-adaptive using Tailwind’s dark mode and context.          |

💻 Tech Stack
| Category        | Tools / Libraries          |
| --------------- | -------------------------- |
| Frontend        | React (TypeScript)         |
| Styling         | Tailwind CSS               |
| Animations      | Framer Motion              |
| 3D Visuals      | React Three Fiber / Drei   |
| Icons           | Lucide React               |
| Build Tool      | Vite                       |
| Package Manager | Bun / npm (both supported) |

🧱 Folder Structure

HackOps-HealthHub/

│

├── public/                  # Static assets (images, favicon)

├── src/

│   ├── components/

│   │   ├── 3d/              # 3D elements (Pain Mapper, Floating Icons)

│   │   ├── effects/         # Particle effects, backgrounds

│   │   ├── navigation/      # Navbar, header, etc.

│   │   ├── sections/        # Hero, Features, Dashboard, Footer

│   │   └── ui/              # Reusable UI components

│   │

│   ├── contexts/            # Global contexts (Theme, Accessibility, etc.)

│   ├── data/                # Static data files

│   ├── hooks/               # Custom hooks

│   ├── pages/               # Page-level components

│   ├── types/               # TypeScript types

│   ├── utils.ts             # Utility functions

│   ├── App.tsx              # Root component

│   ├── main.tsx             # Entry point

│   ├── index.css            # Tailwind base styles

│   └── vite-env.d.ts        # Environment types

│

├── tailwind.config.ts

├── tsconfig.json

├── vite.config.ts

├── package.json

├── bun.lockb

└── README.md



⚙️ Installation & Setup

🧩 Using npm

git clone https://github.com/ACEathon-2025/Team-18.git

cd Team-18


npm install

npm run dev


⚡ Using Bun

bun install

bun dev

🧠 How It Works

Launch the homepage to explore interactive tools like Pain Mapper, Health Tips, and Symptom Checker — each designed for intuitive, real-time feedback.

Navigate through different modules such as First Aid, Emergency Contacts, and Medicine Reminders for quick access to essential health resources.

The platform intelligently integrates animations, local data storage, and 3D visuals to create a smooth, app-like experience that runs entirely in your browser.


🎨 UI Highlights

Fully responsive and accessible layout

Animated transitions with Framer Motion

Blue–green health-focused color palette

Intuitive icons and clean navigation

Subtle particle and 3D effects

🏆 Hackathon Context

Built for: ACEathon 2025
Theme: AI & HealthTech for All

Focus Areas:

Accessibility-first design

Frontend innovation

Offline readiness

Smooth UX

👨‍💻 Developers

🧑‍💻 Amish Rahman

🎓 NMAM Institute of Technology

📧 amishrahmanind@gmail.com

💼 LinkedIn:- www.linkedin.com/in/amish-rahman-2k25

🧑‍💻 Anish Kumar Patra

🎓 NMAM Institute of Technology

📧 anishkumarpatra56@gmail.com

💼 LinkedIn:- www.linkedin.com/in/anish-patra-60543630a
