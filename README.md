# Real Estate Leads UI (Checkpoint 2 scaffold)

This is a starter frontend scaffold for the **Data Collection Approach** (Checkpoint 2).
It includes a small React + Vite app using Tailwind for styles and Framer Motion + GSAP for interactions.

## What I built for you (files included)
- Dashboard (src/pages/Dashboard.jsx)
- Categorization / Drag & Drop (src/pages/Categorization.jsx)
- Lead Detail & Verification (src/pages/LeadDetail.jsx)
- Lead card component + sample data (src/components, src/data/leads.js)
- Tailwind config, PostCSS, Vite config and package.json

## How to run locally
1. Make sure you have Node.js (>=16) and npm or yarn installed.
2. In the project folder, run:
   ```bash
   npm install
   npm run dev
   ```
3. Open the dev server URL that Vite prints (usually http://localhost:5173).

## Notes
- This scaffold uses sample data (src/data/leads.js). In a real integration, you'd wire API calls to fetch data.
- Drag-and-drop uses native HTML5 drag events and GSAP to animate the dropped card.
- Animations use Framer Motion for entry/hover and GSAP for drop bounce.

If you'd like, I can:
- Add CSV import handling (frontend parsing)
- Add a verification modal with simulated API calls
- Convert drag/drop to a library (react-beautiful-dnd) for richer interactions

