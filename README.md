I have updated the information based on your request. Here's the revised information:

# ASSEME - Frontend Application

ASSEME is a frontend application built with React, Vite, and Tailwind CSS. It allows users to register and upload GIFs and memes. Users can browse and view GIFs and memes without logging in, but they need to be logged in to upload new content. The application is connected to a MongoDB database, and backend requests are secured using JWT authentication. Axios is used for making these requests.

## Installation and Setup

Before running the ASSEME application, make sure you have Node.js and npm (Node Package Manager) installed on your machine. Additionally, ensure that you have a MongoDB database set up and running.

1. Clone the repository:

```shell
git clone https://github.com/jesusfvj/asseme-front.git
```

2. Navigate to the project's root directory:

```shell
cd asseme
```

3. Install the dependencies:

```shell
npm install
```

4. Configure the front:

   - Open the `.envExample` file in the project's root directory and create a env.js file with the firebase keys updated.

5. Configure the backend:

   - Open the `.env` file in the project's root directory and update the MongoDB connection string.

6. Start the application:

```shell
npm run dev
```

7. Access the application:

   - Open your web browser and visit `http://localhost:YOUR_PORT` to access the ASSEME application.

## Features

- User registration and authentication
- Upload and browse GIFs and memes
- View GIFs and memes without logging in
- Secure backend requests with JWT authentication

## Technologies Used

- React: JavaScript library for building user interfaces.
- Vite: A build tool that provides fast and optimized development setup for React applications.
- Tailwind CSS: A utility-first CSS framework for rapid UI development.
- MongoDB: A popular NoSQL database for storing application data.
- Node.js: A JavaScript runtime environment for executing server-side code.
- Express.js: A web application framework for Node.js.
- JWT (JSON Web Tokens): A standard for securely transmitting information between parties as a JSON object.
- Axios: A promise-based HTTP client for making requests to the backend.

## Dependencies

ASSEME relies on the following dependencies:

| Dependency                 | Version  |
| -------------------------- | -------- |
| axios                      | ^1.4.0   |
| firebase                   | ^9.22.0  |
| react                      | ^18.2.0  |
| react-dom                  | ^18.2.0  |
| react-hook-form            | ^7.43.9  |
| react-icons                | ^4.8.0   |
| react-multi-carousel       | ^2.8.3   |
| react-router-dom           | ^6.11.2  |
| react-router-hash-link     | ^2.4.3   |
| react-toastify             | ^9.1.3   |

## Contributing

We welcome contributions to ASSEME!
