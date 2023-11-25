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
-   [Warnings](#warnings)
-   [Key Features](#key-features)
-   [How It Works](#how-it-works)
-   [Project Structure](#project-structure)
-   [Running the Application](#running-the-application)
-   [API Endpoints](#api-endpoints)
-   [License](#license)

## Project Overview

**rButler** project aims to enhance household organization, fostering better communication and cooperation among its users. Whether it's planning a shopping trip or coordinating daily tasks, this platform simplifies the management of household responsibilities in the digital age.

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
cd rbutler
```

#### Server Setup

Open a new terminal window/tab in the root directory of your project.

To set up the server, run the following commands:

```bash
./server_setup.sh
```

This script will:

    1. Set up environment variables for the server.
    2. Install server dependencies.
    3. Start the server in development mode.

#### Client Setup

Open a new terminal window/tab in the root directory of your project.

```bash
./client_setup.sh
```

This script will:

    1. Set up environment variables for the client.
    2. Install client dependencies.
    3. Start the client in development mode.

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
