# Project Structure

This document outlines the organization and purpose of each directory and major file in the `ai-wedding-planner` repository.

## Overview

The project is a fullstack web application for AI-powered wedding planning, with a React frontend and a Node.js/Express backend.

```
ai-wedding-planner/
├── frontend/        # React frontend application
├── backend/         # Node.js/Express backend API
├── .gitignore       # Git ignore rules
├── LICENSE          # Project license
├── PROJECT_STRUCTURE.md # This documentation file
├── README.md        # Project overview and setup instructions
```

---

## Frontend (`/frontend`)

- **node_modules/**: Installed frontend dependencies (not tracked in version control).
- **public/**: Static assets and configuration files for the React app.
  - `index.html`, `manifest.json`, `favicon.ico`, `robots.txt`, etc.
- **src/**: Source code for React application.
  - **components/**: Reusable React components.
  - **pages/**: Page-level components mapped to routes.
  - **utils/**: Utility/helper functions.
  - **api/**: API helper functions for communicating with backend.
  - `App.js`, `index.js`, `App.css`, etc.
- **package.json**: Frontend dependencies and scripts.
- **package-lock.json**: Auto-generated lockfile for consistent installs.
- **README.md**: Frontend-specific documentation and setup.
- **.env.example**: Example environment variables for frontend.

---

## Backend (`/backend`)

- **src/**: Source code for Node.js/Express backend.
  - **models/**: Mongoose schemas for database entities (Vendor, Budget, Guest, Task).
  - **routes/**: Express route handlers (vendors.js, budgets.js, guests.js, tasks.js).
  - **controllers/**: Business logic for API endpoints.
  - `app.js`: Main Express app setup.
  - `db.js`: MongoDB connection logic.
  - **config/**: Backend configuration files (`default.json`).
- **server.js**: Entry point for backend server.
- **package.json**: Backend dependencies and scripts.
- **README.md**: Backend-specific documentation and setup.
- **.env**: Backend environment variables (not tracked in version control).
- **.env.example**: Example backend environment variables.

---

## Root Files

- **.gitignore**: Specifies intentionally untracked files to ignore.
- **LICENSE**: Project license.
- **PROJECT_STRUCTURE.md**: This file - explains the project organization.
- **README.md**: High-level project overview, setup, and usage instructions.

---

## Conventions

- Keep frontend and backend code strictly separated for clarity and scalability.
- Use `.env.example` files as templates for required environment variables.
- All documentation should be kept up to date as the project evolves.

---

## Full Structure

```bash
ai-wedding-planner/             # Repository root
├── /frontend/                  # React app (previously /src and /public)
│   ├── node_modules            # gitignored (created by npm install)
│   ├── public/                 # Static assets (favicon, index.html, etc.)
│   │   ├── favicon.ico         # Browser tab icon
│   │   ├── index.html          # Main HTML template for React app
│   │   ├── logo192.png         # 192x192 PWA icon for app manifest
│   │   ├── logo512.png         # 512x512 PWA icon for app manifest
│   │   ├── manifest.json       # PWA configuration and metadata
│   │   └── robots.txt          # Web crawler instructions for SEO
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/              # Main page/route components
│   │   ├── utils/              # Helper functions and utilities
│   │   ├── api/                # Frontend API helpers (calls to backend)
│   │   ├── App.css             # Main application styles
│   │   ├── App.js              # Root React component
│   │   ├── App.test.js         # Tests for App component
│   │   ├── index.css           # Global CSS styles
│   │   ├── index.js            # React app entry point
│   │   ├── logo.svg            # React logo SVG file
│   │   ├── reportWebVitals.js  # Performance monitoring utilities
│   │   └── setupTests.js       # Test environment configuration
│   ├── README.md               # Frontend-specific docs/setup
│   ├── package-lock.json       # Auto-generated lockfile for frontend
│   ├── package.json            # Frontend dependencies and scripts
│   └── .env.example            # Example env vars for frontend (API URLs etc.)
├── /backend/                   # Node/Express API
│   ├── src/
│   │   ├── models/
│   │   │   ├── Vendor.js
│   │   │   ├── Budget.js
│   │   │   ├── Guest.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── vendors.js
│   │   │   ├── budgets.js
│   │   │   ├── guests.js
│   │   │   └── tasks.js
│   │   ├── controllers/
│   │   │   ├── vendorController.js
│   │   │   ├── budgetController.js
│   │   │   ├── guestController.js
│   │   │   └── taskController.js
│   │   ├── app.js              # Express app setup
│   │   ├── db.js               # MongoDB connection
│   │   └── config/
│   │       └── default.json    # Backend config (if needed)
│   ├── package.json            # Backend dependencies and scripts
│   ├── README.md               # Backend-specific docs/setup
│   ├── .env                    # Backend secrets (not checked in)
│   ├── .env.example            # Backend env template
│   └── server.js               # App/server entry point (could also be index.js)
├── .gitignore                  # Top-level git ignore rules
├── LICENSE                     # Project license
├── PROJECT_STRUCTURE.md        # Project structure documentation
├── README.md                   # Project overview and setup
```
