# AI Wedding Planner Backend

This is the Node.js/Express backend API for the AI Wedding Planner project.

## Table of Contents

- [Project Structure](#project-structure)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)

---

## Project Structure

```
backend/
├── src/
│   ├── models/        # Mongoose schemas (Vendor, Budget, Guest, Task)
│   ├── routes/        # Express routers for each resource
│   ├── controllers/   # Business logic for API endpoints
│   ├── app.js         # Main Express app setup
│   ├── db.js          # MongoDB connection logic
│   └── config/        # Configuration files (default.json)
├── server.js          # Entry point for backend server
├── package.json       # Backend dependencies and scripts
├── .env.example       # Example backend environment variables
├── .env               # Backend environment variables
├── README.md          # Backend-specific documentation
```

---


## Database Setup

The backend uses MongoDB for data storage, with connection logic handled in `src/db.js` using Mongoose.

1. **Configure your MongoDB URI:**
   - Set the `MONGODB_URI` variable in your `.env` file to your MongoDB connection string (local or cloud).
   - Example for local development:
     ```
     MONGODB_URI=mongodb://localhost:27017/ai-wedding-planner
     ```

2. **Connection logic:**
   - The file `src/db.js` loads the URI from `.env` and connects to MongoDB when the app starts.
   - On successful connection, you’ll see `Connected to MongoDB` in your terminal.
   - If the connection fails, an error message will be printed.

No manual action is needed beyond setting the correct URI in `.env`.

---
## Setup

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values.

3. **Start the server:**
   ```bash
   npm start
   ```
   The server will start on the port specified in `.env`.

   Or, for automatic restarts during development, use:
   ```bash
   npm run dev
   ```
   This uses nodemon (if configured) to restart the server when you make code changes.

---

## Environment Variables

See `.env.example` for all available environment variables.

Typical variables include:
- `PORT`: Port for Express server (e.g., 4000)
- `MONGODB_URI`: Connection string for MongoDB
- `JWT_SECRET`: Secret key for authentication (if applicable)

---

## Scripts

- `npm start`: Starts the backend server.
- `npm run dev`: Starts the backend with nodemon for development (if configured).

---

## API Endpoints

Sample endpoints (see `src/routes/`):
- `GET /api/health` – Health check
- `GET /api/vendors` – List vendors
- `POST /api/budgets` – Create new budget
- `GET /api/guests` – List guests
- `POST /api/tasks` – Create new task

Detailed documentation for all endpoints can be found in the source files or will be provided in future updates.

---

## Contributing

1. Fork and clone the repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and submit a pull request.

Please see the main project `README.md` for full contributing guidelines.

---

## License

See [../LICENSE](../LICENSE) for license information.