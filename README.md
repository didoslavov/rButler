# rButler

**rButler** project is a comprehensive online
platform that allows users to create and manage their digital households
effortlessly. This platform is designed to streamline household
organization by providing a centralized space for users to collaborate
on various lists, including shopping and to-do lists. The goal is to
simplify day-to-day tasks and enhance communication within households.

## Table of Contents

-   [Project Overview](##project-overview)
-   [Key Features](##key-features)
-   [How It Works](##how-it-works)
-   [Project Structure](##project-structure)
-   [Running the Application](##running-the-application)
-   [API Endpoints](##api-endpoints)
-   [License](##license)

## Project Overview

**rButler** project aims to enhance household organization, fostering better communication and cooperation among its users. Whether it's planning a shopping trip or coordinating daily tasks, this platform simplifies the management of household responsibilities in the digital age.

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

Provide instructions on how to start the backend and frontend components of your application.

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
          "presentation": string
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
          "users": ["username1", "username2", ...],
          "lists": ["shopping", "todo", ...]
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
