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
├── node_modules       # (.gitignore)
├── src/
│   ├── __tests__/     # Automated Jest/Supertest test files
│   │   ├── budgets.test.js
│   │   ├── guests.test.js
│   │   ├── tasks.test.js
│   │   └── vendors.test.js
├── config/
│   ├── default.json    # Backend config (supports env placeholders)
│   ├── production.json # Production config
│   └── test.json       # Test config
│   ├── controllers/   # Business logic for API endpoints
│   │   ├── vendorController.js
│   │   ├── budgetController.js
│   │   ├── guestController.js
│   │   └── taskController.js
│   ├── middleware/
│   │   └── validation.js # Express-validator middleware for request validation
│   ├── models/        # Mongoose schemas
│   │   ├── Vendor.js   # Vendor schema
│   │   ├── Budget.js   # Budget schema
│   │   ├── Guest.js    # Guest schema
│   │   └── Task.js     # Task schema
│   ├── routes/
│   │   ├── health.js   # Health check endpoint (GET /api/health)
│   │   ├── vendors.js  # Vendor resource API routes
│   │   ├── budgets.js  # Budget resource API routes
│   │   ├── guests.js   # Guest resource API routes
│   │   └── tasks.js    # Task resource API routes
│   ├── testSetup/    # Test environment setup (e.g., in-memory MongoDB)
│   │   └── setup.js
│   ├── app.js         # Main Express app setup (middleware, routes, exports app)
│   └── db.js          # MongoDB connection logic (initiates DB connection)
├── .env               # Backend environment variables (.gitignore)
├── .env.example       # Example backend environment variables
├── jest.config.js
├── package-lock.json
├── package.json       # Backend dependencies and scripts
├── README.md          # Backend-specific documentation
└── server.js          # Entry point for backend server (imports app, starts server)
```

---


## Database Setup

The backend uses MongoDB for data storage, with connection logic handled in `src/db.js` using Mongoose.

### Configuration

MongoDB connection and other settings are managed using the [config](https://www.npmjs.com/package/config) package. Config files are located in the `config/` directory at the project root (not inside `src/`).

**Example: `config/default.json`**
```json
{
   "mongoURI": "mongodb://localhost:27017/ai-wedding-planner",
   "port": 5000
}
```

You can use environment variable placeholders in your config, e.g.:
```json
{
   "mongoURI": "mongodb+srv://${MONGODB_USER}:${MONGODB_PASS}@${MONGODB_HOST}/${MONGODB_DBNAME}?retryWrites=true&w=majority"
}
```

If you use placeholders, be sure to set the corresponding variables in your `.env` file:
```
MONGODB_USER=youruser
MONGODB_PASS=yourpass
MONGODB_HOST=yourhost
MONGODB_DBNAME=yourdbname
```

The backend will automatically replace these placeholders at runtime.

**No manual action is needed beyond setting the correct values in your config and .env files.**


#### Where the Config Package Is Used

The [config](https://www.npmjs.com/package/config) package is used to load configuration values in the following files:

- `src/db.js`: Loads the MongoDB connection URI and other DB-related config values.
- `server.js`: Loads the port and other server-level config values.
- Any other file that requires project configuration (e.g., for secrets, API prefixes, etc.).

You can use `const config = require('config')` in any file to access values from your config files.

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

If your `config/default.json` uses environment variable placeholders (e.g., `${MONGODB_USER}`), you must set those variables in your `.env` file. Typical variables include:

- `MONGODB_USER`: MongoDB username (if using a connection string with authentication)
- `MONGODB_PASS`: MongoDB password
- `MONGODB_HOST`: MongoDB host (e.g., localhost or a cloud host)
- `MONGODB_DBNAME`: MongoDB database name
- `PORT`: Port for Express server (can also be set in config)
- `JWT_SECRET`: Secret key for authentication (if applicable)

**Example `.env` file:**
```
MONGODB_USER=youruser
MONGODB_PASS=yourpass
MONGODB_HOST=localhost
MONGODB_DBNAME=ai-wedding-planner
PORT=4000
```

These variables will be automatically injected into your config at runtime. Always copy `.env.example` to `.env` and fill in your actual values.

### Where Environment Variables Are Used

Environment variables are accessed in the following files:

- `src/db.js`: Loads MongoDB connection details from config, which may use environment variable placeholders (e.g., `${MONGODB_USER}`) that are filled from `.env`.
- Any other code that references `process.env` or uses config values with placeholders.

The config package automatically injects environment variables from `.env` into your config files at runtime.

---

## Scripts

- `npm start`: Starts the backend server.
- `npm run dev`: Starts the backend with nodemon for development (if configured).
- `npm test`: Runs automated backend tests using Jest and Supertest.

---

## Testing

Automated tests are set up using [Jest](https://jestjs.io/) and [Supertest](https://github.com/ladjs/supertest) for API endpoint testing. Tests use an in-memory MongoDB instance provided by [MongoMemoryServer](https://github.com/nodkz/mongodb-memory-server), so no external database is required for running tests.

### How to Run Tests

1. Install all dependencies:
    ```bash
    npm install
    ```
2. Run tests:
    ```bash
    npm test
    ```
    This will execute all test files (in `src/__tests__/`).

### How It Works

- The test environment spins up an in-memory MongoDB instance before running tests and tears it down afterward.
- API endpoints are tested using Supertest to simulate HTTP requests and check responses.
- No manual database setup is needed for testing.

### Example Test File

```js
// src/__tests__/vendors.test.js
const request = require('supertest');
const app = require('../app');

describe('Vendor API', () => {
  it('POST /api/vendors - should create a vendor', async () => {
    const vendorData = {
      name: 'Test Vendor',
      service: 'Photography'
    };
    const res = await request(app)
      .post('/api/vendors')
      .send(vendorData);
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe(vendorData.name);
    vendorId = res.body._id;
  });
});
```

For more details, see the test files in the codebase.

---




## API Endpoints

### Request Validation

All POST and PUT requests for budgets, guests, tasks, and vendors use validation middleware powered by [express-validator](https://express-validator.github.io/). This ensures incoming data matches the expected schema and constraints before reaching the database.

Validation errors return a 400 response with details about the failed fields.

#### Validation Rules

- **Vendor**
   - `name`: string, required, 2-50 chars, trimmed
   - `service`: string, required, trimmed
   - `contact`: string, optional, trimmed
   - `email`: string, optional, must be valid email, normalized
   - `notes`: string, optional, max 200 chars, trimmed

- **Budget**
   - `category`: string, required, trimmed
   - `amount`: number, required, min 0
   - `notes`: string, optional, max 200 chars, trimmed

- **Guest**
   - `name`: string, required, 2-50 chars, trimmed
   - `email`: string, optional, must be valid email, normalized
   - `phone`: string, optional, trimmed
   - `rsvp`: boolean, optional
   - `notes`: string, optional, max 200 chars, trimmed

- **Task**
   - `title`: string, required, 2-100 chars, trimmed
   - `completed`: boolean, optional
   - `dueDate`: ISO8601 date, optional
   - `notes`: string, optional, max 200 chars, trimmed

Validation is handled by middleware in each route file (see `src/routes/`). Example usage:

```js
router.post('/', validationRules, handleValidationErrors, async (req, res) => {
   // ...
});
```

See each route file for the full list of rules and error handling.

### Model Schemas


Below are the main data models used in the backend. All fields are stored in MongoDB via Mongoose. Validation and trimming are applied as described below (Mongoose schema validation). 

#### Vendor
```
{
   name: String (required, trim, minlength: 2, maxlength: 50),
   service: String (required, trim),
   contact: String (optional, trim),
   email: String (optional, trim, must be valid email),
   notes: String (optional, maxlength: 200)
}
```

#### Budget
```
{
   category: String (required, trim),
   amount: Number (required, min: 0),
   notes: String (optional, maxlength: 200)
}
```

#### Guest
```
{
   name: String (required, trim),
   email: String (optional, trim, must be valid email),
   phone: String (optional, trim),
   rsvp: Boolean (default: false),
   notes: String (optional, maxlength: 200)
}
```

#### Task
```
{
   title: String (required, trim),
   completed: Boolean (default: false),
   dueDate: Date (optional),
   notes: String (optional, maxlength: 200)
}
```

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



#### How to Test API Endpoints

You can test any resource endpoint (vendors, budgets, guests, tasks) using your browser, curl, or API tools like Postman/Insomnia:

- **GET all items**
   - Browser: `http://localhost:4000/api/<resource>`
   - Terminal: `curl http://localhost:4000/api/<resource>`

- **GET a single item by ID**
   - Terminal: `curl http://localhost:4000/api/<resource>/<id>`

- **Create a new item (POST)**
   - Terminal:
      ```sh
      curl -X POST http://localhost:4000/api/<resource> \
         -H "Content-Type: application/json" \
         -d '{...json data...}'
      ```

- **Update an item (PUT)**
   - Terminal:
      ```sh
      curl -X PUT http://localhost:4000/api/<resource>/<id> \
         -H "Content-Type: application/json" \
         -d '{...json data...}'
      ```

- **Delete an item (DELETE)**
   - Terminal:
      ```sh
      curl -X DELETE http://localhost:4000/api/<resource>/<id>
      ```

Replace `<resource>` with `vendors`, `budgets`, `guests`, or `tasks` and provide appropriate JSON data for POST/PUT requests.

You should receive JSON responses with the item data or confirmation messages.

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