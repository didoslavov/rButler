**Backend Stack**

[![Node.js](https://img.shields.io/badge/Node.js-✓-green)]() [![Express.js](https://img.shields.io/badge/Express.js-✓-lightgrey)]() [![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-4DB33D)]() [![Mongoose](https://img.shields.io/badge/Mongoose-5.13.2-orange)]() [![JWT](https://img.shields.io/badge/JWT-✓-blue)]() [![Bcrypt](https://img.shields.io/badge/Bcrypt-✓-blueviolet)]() [![Express Validator](https://img.shields.io/badge/Express_Validator-✓-yellow)]()

**Frontend Stack**

[![React](https://img.shields.io/badge/React-✓-blue)]() [![Material-UI](https://img.shields.io/badge/Material--UI-✓-important)]() [![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-✓-9cf)]() [![Supabase](https://img.shields.io/badge/Supabase-✓-yellowgreen)]() [![React Router DOM](https://img.shields.io/badge/React_Router_DOM-✓-brightgreen)]() [![React Share](https://img.shields.io/badge/React_Share-✓-ff69b4)]()

# rButler

**rButler** project is a comprehensive online
platform that allows users to create and manage their digital households
effortlessly. This platform is designed to streamline household
organization by providing a centralized space for users to collaborate
on various lists, including shopping and to-do lists. The goal is to
simplify day-to-day tasks and enhance communication within households.

## Table of Contents

-   [Project Overview](#project-overview)
-   [Project Deployment](#deployed-project-showcase)
-   [Warnings](#warnings)
-   [Key Features](#key-features)
-   [How It Works](#how-it-works)
-   [Project Structure](#project-structure)
-   [Running the Application](#running-the-application)
-   [Running tests](#running-tests)
-   [API Endpoints](#api-endpoints)
-   [License](#license)

## Project Overview

**rButler** project aims to enhance household organization, fostering better communication and cooperation among its users. Whether it's planning a shopping trip or coordinating daily tasks, this platform simplifies the management of household responsibilities in the digital age.

## Deployed Project Showcase

**rButler** is deployed on a free hosting service [render](https://render.com/), providing you with the opportunity to experience its features firsthand. To access the live version, simply visit [rButler Live](https://rbutler.onrender.com/).

### Note

-   The deployed version may be subject to periodic updates and maintenance.
-   For the best user experience, we recommend using the latest version of Mozilla Firefox or Chrome, with a desktop resolution of 1920x1080.

Feel free to explore and test the various functionalities of **rButler** in this live environment. If you encounter any issues or have feedback, please let us know through our [GitHub Issues](https://github.com/didoslavov/rButler/issues) page.

Enjoy using **rButler** for seamless household organization!

## Warnings

1. Best to be used on desktop with resolution 1920x1080
2. Developed on Mozilla Firefox (latest version)
3. Tested on Chrome (latest version)

## Key Features

1. **Digital Households:**
   Users can effortlessly create and manage digital households, inviting family members or housemates to collaborate in a centralized space.
2. **List Management:**
   The platform facilitates the creation and maintenance of various lists, such as shopping and to-do lists, tailored to each household's unique needs.
3. **Real-time Collaboration:**
   Enjoy seamless real-time collaboration among household members, allowing for contributions, edits, and completion status updates on shared lists.
4. **User Authentication:**
   Secure user authentication ensures a personalized experience for each member within their digital household.
5. **Intuitive User Interface:**
   The platform boasts a user-friendly interface, providing easy navigation and efficient list management.

## How It Works

1. **Account Creation:**
   Users sign up to create personalized accounts, establishing a digital space for their household.
2. **Household Creation:**
   Once registered, users create digital households and invite family members or housemates to join using unique household codes.
3. **List Creation and Management:**
   Within each household, users create different lists (e.g., shopping or to-do lists) and collaboratively manage them.
4. **Real-time Updates:**
   All changes to lists, including additions and completions, are updated in real-time, ensuring every household member stays informed.
5. **Personalization:**
   Users can customize their digital households and lists, tailoring the experience to their specific needs.

## Project Structure

The project follows a structured organization to enhance maintainability and ease of navigation. Here's a brief overview of the main directories and their purposes:

-   **`/client`**: Contains the frontend application built with React.

    -   `/public`: Static assets and HTML template.
    -   `/src`: React components, styles, and application logic.

-   **`/server/src`**: Houses the backend application built with Node.js and Express.

    -   `/config`: Configuration files for the server.
    -   `/controllers`: Controllers handling the business logic.
    -   `/models`: Database models (if applicable).
    -   `/routes`: Express routes for handling API requests.
    -   `/utils`: Utility functions and helper modules.

Feel free to explore each directory for more detailed information on their contents. This structure is designed to enhance code organization, making it easier for developers to locate and work on specific aspects of the application.

## Running the Application

### Clone the Repository

```bash
git clone https://github.com/didoslavov/rButler.git
```

### Unix based OS

#### Server Setup

Open a new terminal window/tab in the root directory of your project.

Navigate to `server` directory:

```bash
cd server
```

To set up the server, run the following command:

```bash
./server_setup.sh
```

This script will:

    1. Set up environment variables for the server.
    2. Install server dependencies.
    3. Start the server in development mode.

#### Client Setup

Open a new terminal window/tab in the root directory of your project.

Navigate to client directory:

```bash
cd client
```

To set up the `client`, run the following command:

```bash
./client_setup.sh
```

This script will:

    1. Set up environment variables for the client.
    2. Install client dependencies.
    3. Start the client in development mode.

### Windows OS

#### Server Setup

Open a new terminal window/tab in the root directory of your project.

Navigate to `server` directory:

```powershell
cd server
```

To set up the server, run the following command:

```powershell
.\windows_server_setup.bat
```

This script will:

    1. Set up environment variables for the server.
    2. Install server dependencies.
    3. Start the server in development mode.

#### Client Setup

Open a new terminal window/tab in the root directory of your project.

Navigate to `client` directory:

```powershell
cd client
```

To set up the client, run the following command:

```powershell
.\windows_client_setup.bat
```

This script will:

    1. Set up environment variables for the client.
    2. Install client dependencies.
    3. Start the client in development mode.

### Manual setup

#### Server Setup

1. Open a new Command Prompt or PowerShell window in the root directory of your project.
2. Navigate to the `server` directory:

    ```bash
    cd server
    ```

3. Create a new `.env` file in the `server` directory with the following content:

    ```plaintext
    PORT=3000
    DB_URI=mongodb+srv://didoslavov:FYe72ng2bCQQijst@rbutler.dqs4ylm.mongodb.net/rButler
    JWT_SECRET=WhispersInSilkGlovesAndTails
    ```

4. Install server dependencies:

    ```bash
    npm install
    ```

5. Start the server in development mode:

    ```bash
    npm run dev
    ```

#### Client Setup

1. Open a new Command Prompt or PowerShell window in the root directory of your project.
2. Navigate to the `client` directory:

    ```bash
    cd client
    ```

3. Create a new `.env` file in the `client` directory with the following content:

    ```plaintext
    VITE_BASE_URL=http://localhost:3000
    VITE_SUPABASE_URL=https://cxswmrfheqrkzrsexvrl.supabase.co
    VITE_SUPABASE_BUCKET=/storage/v1/object/public/avatars/
    VITE_SUPABASE_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN4c3dtcmZoZXFya3pyc2V4dnJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2NDg0MDUsImV4cCI6MjAxNDIyNDQwNX0.NBQTc_i5rHnRdDvFAvVTVFE7pjV69KGFfihG0Ths9QQ
    VITE_OPENWEATHER_API_KEY=65c8bce3c3835f283c727ae2bbd5cf75
    VITE_OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
    ```

4. Install client dependencies:

    ```bash
    npm install
    ```

5. Start the client in development mode:

    ```bash
    npm run dev
    ```

6. Client setup complete! Open the following link in your web browser:
   http://localhost:5173

### Frontend Tests

# Tests Overview

## Frontend Tests

The frontend tests in rButler are designed to ensure the reliability and functionality of the user interface. We use Vitest, a lightweight and flexible testing library, in combination with @vitest/ui for a seamless testing experience.

### Unit Tests

-   **@testing-library/react:** Unit tests are implemented using @testing-library/react to test individual React components in isolation. This ensures that each component behaves as expected and can be easily maintained.
-   **@testing-library/jest-dom:** Jest-DOM is utilized for extending Jest's functionality, providing a set of custom Jest matchers for asserting on the state of the DOM elements. This enhances the precision of our component tests.

### Integration Tests

-   **Vitest:** Integration tests are conducted using Vitest to validate the interactions and collaborations between various components. Vitest provides a clear and concise syntax for writing integration tests, making it easier to understand and maintain the test suite.
-   **@vitest/ui:** UI tests are executed using @vitest/ui to create a visual representation of the test results in a browser tab. This allows for a more comprehensive analysis of the frontend behavior, facilitating quick identification of any issues or regressions.

### Redux Tests

-   **redux-mock-store:** For testing Redux state management, we utilize redux-mock-store. This library enables us to create a mock Redux store, allowing us to simulate actions and state changes, ensuring that the application state is correctly managed.

These testing tools collectively contribute to a robust testing suite that covers different aspects of the frontend, including individual component behavior, component interactions, and the overall user interface. Running both unit and UI tests ensures a comprehensive evaluation of the frontend functionality, providing confidence in the stability of the rButler application.

## Running Tests

```bash
npm run test
```

To run the frontend tests in a browser tab with a detailed report, you can use the following command:

```bash
npm run test:ui
```

## API Endpoints

### Authentication

-   **POST /users/register**

    -   _Description_: Register a new user.
    -   _Request_:
        ```json
        {
            "username": "string",
            "email": "string",
            "password": "string"
        }
        ```
    -   _Response_:
        ```json
        {
            "User Data": "userData"
        }
        ```

-   **POST /users/login**

    -   _Description_: Authenticate and log in a user.
    -   _Request_:
        ```json
        {
            "username": "string",
            "password": "string"
        }
        ```
    -   _Response_:
        ```json
        {
            "User Data": "userData"
        }
        ```

### Household Management

-   **POST /households**

    -   _Description_: Create a new household.
    -   _Request_:
        ```json
        {
            "master": "string",
            "name": "string",
            "presentation": "string"
        }
        ```
    -   _Response_:
        ```json
        {
            "message": "Household created successfully",
            "householdId": "unique_id_here"
        }
        ```

-   **GET /households/:householdId**

    -   _Description_: Get details of a specific household.
    -   _Response_:
        ```json
        {
            "householdId": "unique_id_here",
            "master": "unique_owner_id",
            "name": "string",
            "presentation": "string",
            "users": ["username1", "username2", "..."],
            "lists": ["shopping", "todo", "..."]
        }
        ```

-   **PATCH /households/:householdId/update**

    -   _Description_: Update a household.
    -   _Request_:
        ```json
        {
            "householdId": "unique_household_id",
            "name": "string",
            "presentation": "string"
        }
        ```
    -   _Response_:
        ```json
        {
            "success": "Household updated successfully"
        }
        ```

-   **DELETE /api/households/:householdId**

    -   _Description_: Delete a household.
    -   _Response_:

        ```json
        {
            "message": "Household deleted successfully"
        }
        ```

    ## License

    This project is licensed under the MIT License - see the [LICENSE](https://opensource.org/license/mit/) file for details.

    ## Credits

    This documentation is writen with the help of [ChatGPT](https://chatgpt.openai.com)
