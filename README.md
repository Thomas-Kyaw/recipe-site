# Recipe Site

## Project Setup

1. **Extract the ZIP file**:
    - Download and extract the ZIP file to your desired directory.

2. **Install dependencies**:
    - Open a Command Prompt and navigate to the project directory.
    ```bash
    cd <extracted-directory>
    npm install
    ```

## MongoDB Setup

1. **Install MongoDB**:
    - Download and install MongoDB from the [official website](https://www.mongodb.com/try/download/community).
    - Follow the instructions to install MongoDB as a Windows service.

2. **Install MongoDB Compass**:
    - Download and install MongoDB Compass from the [official website](https://www.mongodb.com/products/compass).

3. **Start MongoDB**:
    - MongoDB should start automatically as a service. If not, start it manually from the Services management console.

4. **Connect to MongoDB with Compass**:
    - Open MongoDB Compass and connect to `mongodb://localhost:27017`.
    - Create a new database if necessary (e.g., `recipeDB`).

## Development Setup

1. **Start the frontend server**:
    - In the Command Prompt, run:
    ```bash
    npm run serve
    ```

2. **Start the JSON server** (ensure it runs on a port different from 3000, e.g., 3001):
    - In another Command Prompt window, run:
    ```bash
    json-server --watch data/db.json --port 3001
    ```

3. **Start the Node.js server** (running on port 3000, connected to MongoDB localhost):
    - In another Command Prompt window, run:
    ```bash
    npm run start
    ```

## Production Setup

1. **Compile and minify for production**:
    - In the Command Prompt, run:
    ```bash
    npm run build
    ```

2. **Serve the built files** using your preferred method.

## Additional Notes

- Ensure you have Node.js and npm installed on your machine.
- The project requires the JSON server to simulate a backend API.
- The frontend server will be accessible typically on `http://localhost:8080` unless specified otherwise.
- The Node.js server listens on port 3000 by default. Ensure no other services are using this port.
- MongoDB should be running locally and connected to the project.

## Customize Configuration

See [Configuration Reference](https://cli.vuejs.org/config/)