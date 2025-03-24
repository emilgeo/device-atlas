# Web Application with Docker Compose

This project consists of a **Node.js** backend, a **React (Vite) + Tailwind CSS** frontend, and a **PostgreSQL** database, all running inside Docker containers and orchestrated using **Docker Compose**.

## 🏗 Project Structure

    /project-root
    │── client/ # React (Vite) frontend with Tailwind CSS
    │── server/ # Node.js backend
    │── docker-compose.yml # Docker Compose configuration
    │── .env # docker compose env file
    │── README.md # This file

## 🚀 Getting Started

### **Prerequisites**

- [Docker](https://www.docker.com/get-started) installed on your system
- [Docker Compose](https://docs.docker.com/compose/install/)

### **Running the Application**

1. Clone the repository from git.

   ```sh
   git@github.com:emilgeo/device-atlas.git
   ```

2. Navigate to the project root directory:

   ```sh
   cd /path/to/device-atlas
   ```

3. Build and start the containers:

   ```sh
   docker-compose up --build
   ```

4. Wait for each of the services in the docker compose to be ready.

   - postgres - It creates a PostgreSQL instance, and creates a database `deviceatlas` and waits for the instance to be ready before it's marked healthy.
   - init-db - It runs the SQL queries to create the tables `device, os and browser` needed for the application.
   - server - This is the server service which spins up a NodeJS server.
   - call-api - Once the server is up and running, this calls the API `/api/devices` to add the devices in the database (basically seed the database) based on the given user agents.
   - client - Once all services are completed, this runs the client server

5. The application will now be running:

   - Frontend: http://localhost:5173 (Vite default port)

   - Backend: http://localhost:8080 (Node.js server)

6. To stop the containers:

   ```sh
   docker-compose down
   ```

### 🛠 Development Notes

- Backend Development: Run `npm run dev` inside the `/server` directory.

- Frontend Development: Run `npm run dev` inside the `/client` directory.

- You can modify `.env` files to customize environment variables.

### 🏗 Building and Running Individually (Without Docker)

#### Backend:

    cd server
    npm install
    npm start

#### Frontend:

    cd client
    npm install
    npm run dev
