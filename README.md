# Car Registration Application

A full-stack application for managing car registrations with real-time status updates.

## Features

- View list of cars with filtering capability
- Real-time registration status updates
- Filter cars by make
- RESTful API endpoints
- SignalR for real-time communication

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Axios for HTTP requests
- SignalR client for real-time updates
- React Router DOM

### Backend
- .NET 9
- C#
- SignalR
- Swagger/OpenAPI
- CORS enabled

## Prerequisites

- Node.js >= 18.0.0
- .NET 9 SDK
- npm or yarn

## Installation

1. Clone the repository
2. Install frontend dependencies:
```bash
cd car-registration-app
npm install
```

3. Install backend dependencies:
```bash
cd CarRegistrationApi
dotnet restore
```

## Running the Application

Use the start script to run both frontend and backend:

```bash
cd car-registration-app
npm run start
```

This will start:
- Frontend: http://localhost:5173
- Backend API: https://localhost:7214
- Swagger UI: https://localhost:7214/swagger

## Project Structure

### Frontend
```
car-registration-app/
├── src/
│   ├── components/
│   │   ├── CarsList.tsx        # Cars list component
│   │   ├── RegistrationStatus.tsx  # Registration status component
│   │   └── styles.css         # Component styles
│   ├── App.tsx                # Main application component
│   └── main.tsx              # Application entry point
├── scripts/
│   ├── start.ts              # Start script for both services
│   └── dev.ts               # Development script
└── vite.config.ts           # Vite configuration
```

### Backend
```
CarRegistrationApi/
├── Controllers/
├── Services/
├── Hubs/
└── Program.cs
```

## API Endpoints

- GET `/api/cars` - Get all cars
- GET `/api/cars?make={make}` - Filter cars by make
- GET `/api/cars/registration-status/{registrationNumber}` - Get registration status
- SignalR Hub at `/carhub` - Real-time registration updates

## Development

For frontend only:
```bash
npm run dev
```

For backend only:
```bash
cd CarRegistrationApi
dotnet run --launch-profile https
```

## ESLint Configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

1. Configure the top-level `parserOptions` property:

```js
export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

2. Update ESLint configurations:
- Replace `tseslint.configs.recommended` with `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`

3. Install and configure eslint-plugin-react:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: {
    react,
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## Available Scripts

- `npm run start` - Start both frontend and backend services
- `npm run dev` - Start frontend development server
- `npm run dev:clean` - Start frontend with port cleanup

## Configuration

Backend URL can be configured in `vite.config.ts`:
```typescript
const BACKEND_URL = process.env.BACKEND_URL || 'https://localhost:7214';
```

CORS settings are configured in Program.cs to allow localhost origins.
