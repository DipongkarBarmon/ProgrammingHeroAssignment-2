# Issue Tracker API

A robust backend API for managing issues with role-based access control, built with Express.js and TypeScript.

## 🔗 Live URL

The API is deployed and accessible at your Vercel deployment URL. Replace with your actual Vercel domain:
```
https://your-vercel-domain.vercel.app
```

## ✨ Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Password Security**: Passwords encrypted using bcrypt
- **Role-Based Access Control**: Role-based authorization for contributors and maintainers
- **Issue Management**: Create, read, update, and delete issues
- **Issue Types & Status**: Support for different issue types and status tracking
- **User Tracking**: Issues tracked with reporter information
- **Timestamps**: Automatic creation and update timestamps for all issues
- **Error Handling**: Comprehensive global error handling middleware
- **CORS Support**: Configured cross-origin resource sharing

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 5.2.1
- **Language**: TypeScript 6.0.3
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Security**: bcrypt 6.0.0
- **HTTP Client Support**: CORS 2.8.6
- **Environment Management**: dotenv 17.4.2
- **Development**: tsx 4.22.4

## 📋 Setup Steps

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Assignment-2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/issue_tracker
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```
   
   Or start the production server:
   ```bash
   npm start
   ```

The API will be available at `http://localhost:5000`

## 📡 API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/signup` | Register a new user | No |
| POST | `/login` | Authenticate user and get JWT token | No |

### Issue Routes (`/api/issues`)

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|----------------|-------|
| POST | `/` | Create a new issue | Yes | contributor, maintainer |
| GET | `/` | Get all issues | No | - |
| GET | `/:id` | Get a specific issue by ID | No | - |
| PUT | `/:id` | Update an issue | Yes | contributor, maintainer |
| DELETE | `/:id` | Delete an issue | Yes | maintainer |

## 📊 Database Schema

### Users Table

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'contributor',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields:**
- `id`: Unique user identifier
- `name`: User's full name
- `email`: User's email address (unique)
- `password`: Encrypted password using bcrypt
- `role`: User role ('contributor' or 'maintainer') - controls access to issue operations
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp

### Issues Table

```sql
CREATE TABLE issues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type VARCHAR(50) NOT NULL,
  status VARCHAR(50) DEFAULT 'open',
  reporter_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Fields:**
- `id`: Unique issue identifier (UUID)
- `title`: Issue title
- `description`: Detailed description of the issue
- `type`: Type of issue (e.g., bug, feature, enhancement)
- `status`: Current status (default: 'open')
- `reporter_id`: Foreign key referencing the user who reported the issue
- `created_at`: Issue creation timestamp
- `updated_at`: Last modification timestamp

## 🔐 Authentication Flow

1. **Signup**: User registers with name, email, and password
   - Password is hashed with bcrypt before storing
   - User role is set to 'contributor' by default

2. **Login**: User authenticates with email and password
   - Returns JWT token for authenticated requests

3. **Authorization**: JWT token is required in the Authorization header
   - Format: `Bearer <token>`
   - Token validates user role for protected endpoints

## 🚀 Deployment

The project is configured for deployment on Vercel. The `vercel.json` configuration automatically:
- Builds the TypeScript project
- Deploys the compiled JavaScript server

To deploy:
```bash
vercel --prod
```

## 📝 Available NPM Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Compile TypeScript to JavaScript
npm start        # Start production server
npm test         # Run tests (not configured)
```

## 🛡️ Security Features

- **Password Encryption**: bcrypt hashing for secure password storage
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Access Control**: Route-level authorization
- **Global Error Handler**: Centralized error handling and logging
- **CORS Protection**: Configured cross-origin requests
- **Environment Variables**: Sensitive data managed via .env file

## 📄 Project Structure

```
src/
├── app.ts                    # Express app configuration
├── server.ts               # Server entry point
├── config/                 # Configuration files
├── db/                     # Database connection
├── Middleware/             # Custom middleware (auth, error handler)
├── Module/
│   ├── auth/              # Authentication logic
│   │   ├── auth.controller.ts
│   │   ├── auth.interface.ts
│   │   ├── auth.route.ts
│   │   └── auth.service.ts
│   └── issue/             # Issue management logic
│       ├── issue.controller.ts
│       ├── issue.interface.ts
│       ├── issue.route.ts
│       └── issue.service.ts
├── type/                  # TypeScript type definitions
└── utility/               # Utility functions (response formatting)
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests.

## 📧 Author

**Dipongkar Barmon**

## 📜 License

ISC
