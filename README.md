# Tsvetan Tsaryanski exam project for React February 2025 course in SoftUni

## Project Setup and Start Guide

This guide explains how to install dependencies and start both the server and the client of the project.

### Installation and start the server

1.  Install dependencies for the REST API server:

    Open Terminal, navigate and install:

    -   cd Rest API
    -   npm install

2.  Environment Variables Configuration

    -   **If use local database (e.g., MongoDB Compass) then `CLOUD_DB_URL` you won't need this!!!**
    -   **If you are not going to use the upload functionality from local storage then `AWS_ACCESS_KEY` and `AWS_SECRET_ACCESS_KEY` you won't need them!!!**

    To run this server, you need to set up the following environment variables in a `.env` file located in the root of the server. Here's a brief explanation of each variable:

    -   JWT_SECRET: A secret key used for signing JSON Web Tokens (JWT). This should be a strong, random string.  
         Example: `your_super_secret_key`

    -   CLOUD_DB_URL: The connection string to your cloud database (e.g., MongoDB Atlas). You can use a test database URL if running in a development environment.  
         Example: `mongodb+srv://username:password@cluster0.mongodb.net/dbname`

    -   AWS_ACCESS_KEY: Your AWS Access Key for interacting with AWS services (e.g., S3 for file storage). You can obtain this from your AWS account.

    -   AWS_SECRET_ACCESS_KEY: Your AWS Secret Key, paired with the AWS Access Key. This is also generated in your AWS account.

    Steps to Set Up the `.env` File:

    -   Create a file named `.env` in the root directory of the server.
    -   Add the required environment variables in the following format:

        ```sh
        JWT_SECRET=<your-jwt-secret>
        CLOUD_DB_URL=<your-cloud-database-url>
        AWS_ACCESS_KEY=<your-aws-access-key>
        AWS_SECRET_ACCESS_KEY=<your-aws-secret-access-key>
        ```

    -   Save the file.

3.  Start the REST API Server:

    -   npm start

If everything is normal you will see the following messages:

    Server running on http://localhost:3000
    Successfully connect to local(cloud) DB!

### Installation and start the client

1.  Install dependencies for the client (SPA):

    Open Terminal, navigate and install:

    -   cd client
    -   npm install

2.  Start the Application:

    -   npm start

The SPA will typically be available at http://localhost:5173.

Ensure the Rets API server is running before starting the SPA to enable proper integration.

<!------------------------------------------------------------------------------------------------------------------------------------------------------------------>

# ClassBook - [към приложението](https://classbook-client-for-render.onrender.com)
