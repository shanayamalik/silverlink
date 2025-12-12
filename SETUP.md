# Project Setup Guide

Follow these steps to get the SilverLink project running on your local machine.

## Prerequisites

- [Node.js](https://nodejs.org/) (Version 16 or higher recommended)
- [Git](https://git-scm.com/)

## 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/shanayamalik/cs260-final-project.git
cd cs260-final-project
```

## 2. Create Environment Variables

The project requires a `.env` file for backend configuration. This file is not shared in the repository for security reasons. **Each team member must create this file locally.**

1.  Create a new file named `.env` in the root folder of the project (same level as `package.json`).
2.  Paste the following content into it:

```env
# Get your own API key from: https://platform.openai.com/api-keys
OPENAI_API_KEY=sk-your-actual-api-key-here
PORT=3001
```

*Note: You can leave `OPENAI_API_KEY` as a placeholder for now if you don't have one yet, but the backend might need it later for the AI features.*

## 3. Install Dependencies

Install all the required libraries for both the frontend and backend:

```bash
npm install
```

## 4. Run the Project

You can run the project in two ways:

### Option A: Run Everything (Recommended)
This starts both the React frontend and the Express backend server at the same time.

```bash
npm start
```

- The frontend will open at: `http://localhost:3000` (or similar port)
- The backend API will run at: `http://localhost:3001`

### Option B: Run Frontend Only
If you only need to work on the UI:

```bash
npm run dev
```

## Troubleshooting

- **Port already in use?**
  If you see an error about port 3000 or 3001 being in use, you can either kill the process using that port or let Vite/Express choose a different port automatically (Vite usually does this).

- **"vite: command not found"?**
  Make sure you ran `npm install` successfully.

- **Changes not showing up?**
  Refresh your browser. If that doesn't work, stop the server (Ctrl+C) and run `npm start` again.
