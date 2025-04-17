# Task Manager API

A RESTful API for managing tasks and boards, built with Node.js, Express, TypeORM, and PostgreSQL.

## Features

- CRUD operations for boards and tasks
- Input validation and error handling
- Logging and monitoring
- TypeScript support
- PostgreSQL database with TypeORM
- RESTful API design

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd my-task-manager
```

2. Install dependencies:
```bash
npm install
```

3. Create a PostgreSQL database named `task_manager`

4. Copy the `.env.example` file to `.env` and update the database credentials:
```bash
cp .env.example .env
```

5. Run database migrations:
```bash
npm run migration:run
```

## Development

Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## API Endpoints

### Boards

- `POST /api/boards` - Create a new board
- `GET /api/boards` - Get all boards
- `GET /api/boards/:id` - Get a single board
- `PUT /api/boards/:id` - Update a board
- `DELETE /api/boards/:id` - Delete a board

### Tasks

- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a single task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

## Project Structure

```
my-task-manager/
├── src/
│   ├── entity/                 # Entity definitions for TypeORM
│   ├── routes/                 # API route handlers
│   ├── services/               # Business logic
│   ├── utils/                  # Utility functions
│   ├── config/                 # Configuration files
│   └── app.ts                  # Main application file
├── .env                        # Environment variables
├── ormconfig.json              # TypeORM configuration
└── package.json                # Project dependencies
```

## Error Handling

The API uses a consistent error response format:

```json
{
  "status": "error",
  "message": "Error message",
  "errors": [
    {
      "property": "fieldName",
      "constraints": {
        "constraintName": "Error message"
      }
    }
  ]
}
```

## Logging

The application uses Winston for logging. Logs are stored in:
- `error.log` - Error logs
- `combined.log` - All logs

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. 