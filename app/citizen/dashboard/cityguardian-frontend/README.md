# City Guardian Frontend

## Overview
The City Guardian Frontend is a web application designed to facilitate communication between citizens and municipal authorities. It allows users to report issues, view community updates, and manage complaints efficiently.

## Project Structure
The project is organized into several key directories and files:

- **app/**: Contains the main application code, including pages and API routes.
  - **citizen/**: Contains components related to the citizen dashboard.
  - **api/**: Contains API routes for handling complaints and authentication.
  - **layout.tsx**: Defines the layout structure for the application.
  - **globals.css**: Contains global CSS styles.

- **components/**: Contains reusable UI components such as buttons, cards, and navigation headers.

- **lib/**: Contains utility functions and libraries, including MongoDB connection logic.

- **models/**: Contains Mongoose models for database schemas, such as the complaint model.

- **middleware/**: Contains middleware for authentication and other purposes.

- **types/**: Contains TypeScript types and interfaces used throughout the application.

- **.env.local**: Stores environment variables, including sensitive information like the MongoDB connection string.

- **.gitignore**: Specifies files and directories to be ignored by Git.

- **package.json**: Lists project dependencies and scripts.

- **tsconfig.json**: TypeScript configuration file.

- **next.config.js**: Configuration settings for the Next.js application.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd cityguardian-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://anshikakhushikansal122004_db_usre:<db_password>@cluster0.9fseuc0.mongodb.net/?appName=Cluster0
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. **Access the Application**
   Open your browser and navigate to `http://localhost:3000` to view the application.

## Features

- **Citizen Dashboard**: A user-friendly interface for citizens to view community updates, submit complaints, and track the status of their issues.
- **Complaint Submission**: Users can submit complaints with details, including title, description, location, and priority level.
- **Community Updates**: A section for municipal posts and updates relevant to the community.
- **Authentication**: Secure user authentication to protect sensitive routes and data.

## Additional Notes

- Ensure that your MongoDB Atlas cluster allows connections from your IP address.
- The application uses Mongoose for database interactions, and the complaint schema is defined in `models/complaint.ts`.
- API routes for handling complaints and authentication are located in `app/api/complaints/route.ts` and `app/api/auth/route.ts`, respectively.

## Contribution
To contribute to the project, please fork the repository, make your changes, and submit a pull request. Ensure that your code adheres to the project's coding standards and includes appropriate tests.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.