# B2B Tracking API

## Project Overview

<h3 align="center">Tools</h3>
<p align="center">
<img width="300px"  src="https://skillicons.dev/icons?i=docker,nodejs,express,ts&perline=8"  />
</p>

The B2B Tracking API is a backend service built with Express.js and TypeScript to provide last known position data for tracking units. It is designed to be containerized using Docker for consistent and reliable deployment across different environments. The API retrieves data from the Wialon tracking platform and leverages AWS Secrets Manager for secure handling of credentials.


## Features

- Get the last known position of a single unit by its VIN.
- Get the last known position of a single unit by its name.
- Get the last known position of a group of units.
- Securely manages credentials using AWS Secrets Manager.
- Containerized for easy deployment and scalability with Docker.

## Project Structure

The project is organized into the following main directories:

- `src/`: Contains the source code for the API.
  - `api/`: Defines the API routes, controllers, and interfaces.
  - `config/`: Holds application configuration files.
  - `interfaces/`: Contains shared TypeScript interfaces.
  - `middleware/`: Includes custom middleware for the application.
  - `services/`: Contains services for interacting with external APIs (e.g., Wialon, AWS).
  - `utils/`: Provides utility functions used across the application.
- `dist/`: Contains the compiled JavaScript code.

## Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd b2btracking-api
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a `.env.dev` file in the root of the project and add the following environment variables:

    ```
    AWS_REGION=<your-aws-region>
    AWS_ACCESS_KEY_ID=<your-aws-access-key-id>
    AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
    ```

## Running the Project

### Using npm

To run the project in a development environment with hot-reloading, use the following command:

```bash
npm run dev
```

To build and run the project in a production environment, use the following commands:

```bash
npm run build
npm start
```

### Using Docker

To build and run the project using Docker, use the following command:

```bash
docker-compose -f docker-compose.dev.yml up --build
```

The API will be accessible at `http://localhost:3000`.

## API Endpoints

The following endpoints are available:

| Method | Endpoint                                | Description                                       |
| :----- | :-------------------------------------- | :------------------------------------------------ |
| GET    | `/v1/lastKnownPosition/vin/:vin`        | Get the last known position of a unit by its VIN. |
| GET    | `/v1/lastKnownPosition/name/:name`      | Get the last known position of a unit by its name.|
| GET    | `/v1/lastKnownPosition/group/:group`    | Get the last known position of a group of units.  |

## Deployment

To deploy the project, you can use the production-ready Docker configuration. Build and run the container using the following command:

```bash
docker-compose -f docker-compose.prod.yml up --build -d
```
