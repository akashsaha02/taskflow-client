# TaskFlow

TaskFlow is a task management application that allows users to create, update, and delete tasks. It supports Google Sign-In for authentication and provides a drag-and-drop interface for managing tasks.

## Live Links

- [Live Demo](https://akashsaha-02.web.app)

## Dependencies

### Client

- `@dnd-kit/core`: ^6.3.1
- `@dnd-kit/sortable`: ^10.0.0
- `@tailwindcss/cli`: ^4.0.7
- `@tailwindcss/vite`: ^4.0.7
- `axios`: ^1.7.9
- `daisyui`: ^5.0.0-beta.8
- `firebase`: ^11.3.1
- `moment`: ^2.30.1
- `react`: ^19.0.0
- `react-dom`: ^19.0.0
- `react-hot-toast`: ^2.5.2
- `react-icons`: ^5.5.0
- `react-router-dom`: ^7.2.0
- `socket.io-client`: ^4.8.1
- `tailwindcss`: ^4.0.7

### Server

- `bcryptjs`: ^3.0.2
- `cors`: ^2.8.5
- `dotenv`: ^16.4.7
- `express`: ^4.21.2
- `http`: ^0.0.1-security
- `jsonwebtoken`: ^9.0.2
- `mongodb`: ^6.13.0
- `mongoose`: ^8.10.1
- `nodemon`: ^3.1.9
- `socket.io`: ^4.8.1

## Installation Steps

### Client

1. Clone the repository:
    ```sh
    git clone https://github.com/akashsaha02/taskflow-client.git
    cd taskflow-client
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a  file in the  directory and add your Firebase and API base URL configurations:
    ```env
    VITE_API_KEY=your-firebase-api-key
    VITE_AUTH_DOMAIN=your-firebase-auth-domain
    VITE_PROJECT_ID=your-firebase-project-id
    VITE_STORAGE_BUCKET=your-firebase-storage-bucket
    VITE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
    VITE_APP_ID=your-firebase-app-id
    VITE_API_BASE_URL=your-api-base-url
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```

### Server

1. Clone the repository:
    ```sh
    git clone https://github.com/akashsaha02/taskflow-server.git
    cd taskflow-server
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a  file in the  directory and add your MongoDB URI and JWT secret:
    ```env
    PORT=3000
    MONGO_URI=your-mongodb-uri
    ACCESS_TOKEN_SECRET=your-jwt-secret
    ```

4. Start the server:
    ```sh
    npm start
    ```

## Technologies Used

- **Frontend**: React, Tailwind CSS, DaisyUI, Firebase Authentication, Axios, React Router, DnD Kit, React Hot Toast, React Icons
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Bcrypt, Socket.io
- **Build Tools**: Vite, ESLint