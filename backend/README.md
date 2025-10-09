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
│   ├── routes/
│   │   ├── health.js  # Health check endpoint (GET /api/health)
│   │   └── ...        # Other Express routers for each resource
│   ├── controllers/   # Business logic for API endpoints
│   ├── app.js         # Main Express app setup (middleware, routes, exports app)
│   ├── db.js          # MongoDB connection logic (initiates DB connection)
│   └── config/        # Configuration files (default.json)
├── server.js          # Entry point for backend server (imports app, starts server)
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

## Postman Quick Start

Postman is a popular tool for testing and interacting with your API endpoints.

**Setup:**
1. Download and install Postman from [https://www.postman.com/downloads/](https://www.postman.com/downloads/)
2. Open Postman and create a new request (you can click the "+" tab).
3. Set the request type (GET, POST, PUT, DELETE) and enter your API endpoint URL (e.g., `http://localhost:4000/api/vendors`).
4. For POST and PUT requests, select the "Body" tab, choose "raw" and "JSON", and enter your request data.
5. Click "Send" to see the response from your backend.

**Example:**
- To create a new vendor, set the request to POST and use the URL `http://localhost:4000/api/vendors`. In the body, enter:
  ```json
  {
    "name": "Florist Co",
    "service": "Florist",
    "contact": "123-456",
    "email": "florist@example.com"
  }
  ```

Postman will display the response from your API, making it easy to test and debug your backend endpoints.

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

The backend provides API routes for managing wedding vendors, budgets, guests, and tasks. **Currently, only sample GET endpoints are implemented for each resource.** These endpoints return example JSON responses and serve as placeholders for future CRUD functionality.

Sample endpoints (see `src/routes/`):


- **Vendors**
   - `GET /api/vendors` – Get all vendors
   - `GET /api/vendors/:id` – Get a single vendor by ID
   - `POST /api/vendors` – Create a new vendor
   - `PUT /api/vendors/:id` – Update a vendor by ID
   - `DELETE /api/vendors/:id` – Delete a vendor by ID

- **Budgets**
   - `GET /api/budgets` – Get all budgets
   - `GET /api/budgets/:id` – Get a budget by ID
   - `POST /api/budgets` – Create a new budget
   - `PUT /api/budgets/:id` – Update a budget by ID
   - `DELETE /api/budgets/:id` – Delete a budget by ID

- **Guests**
   - `GET /api/guests` – Get all guests
   - `GET /api/guests/:id` – Get a guest by ID
   - `POST /api/guests` – Create a new guest
   - `PUT /api/guests/:id` – Update a guest by ID
   - `DELETE /api/guests/:id` – Delete a guest by ID

- **Tasks**
   - `GET /api/tasks` – Get all tasks
   - `GET /api/tasks/:id` – Get a task by ID
   - `POST /api/tasks` – Create a new task
   - `PUT /api/tasks/:id` – Update a task by ID
   - `DELETE /api/tasks/:id` – Delete a task by ID

> **Note:** Full CRUD operations (POST, PUT, DELETE, etc.) will be added in future updates.


#### How to Test Vendor Endpoints

You can test the vendor API endpoints using your browser, curl, or API tools like Postman/Insomnia:

- **GET all vendors**
   - Browser: `http://localhost:4000/api/vendors`
   - Terminal: `curl http://localhost:4000/api/vendors`

- **GET a single vendor by ID**
   - Terminal: `curl http://localhost:4000/api/vendors/<vendor_id>`

- **Create a new vendor (POST)**
   - Terminal:
      ```sh
      curl -X POST http://localhost:4000/api/vendors \
         -H "Content-Type: application/json" \
         -d '{"name":"Florist Co","service":"Florist","contact":"123-456","email":"florist@example.com"}'
      ```

- **Update a vendor (PUT)**
   - Terminal:
      ```sh
      curl -X PUT http://localhost:4000/api/vendors/<vendor_id> \
         -H "Content-Type: application/json" \
         -d '{"name":"Updated Florist"}'
      ```

- **Delete a vendor (DELETE)**
   - Terminal:
      ```sh
      curl -X DELETE http://localhost:4000/api/vendors/<vendor_id>
      ```

You should receive JSON responses with the vendor data or confirmation messages.

### Health Check Endpoint

`GET /api/health`

Returns `{ status: 'OK' }` if the backend server is running.
Useful for monitoring, deployment checks, and automated uptime verification.

#### How to Test

You can test the health check endpoint by:

- Visiting `http://localhost:4000/api/health` in your browser
- Running `curl http://localhost:4000/api/health` in your terminal
- Using Postman or Insomnia to send a GET request to `/api/health`

You should receive a response:
```
{ "status": "OK" }
```

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