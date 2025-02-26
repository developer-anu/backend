# Node.js Express API for Posts Management

This Node.js server application provides RESTful API endpoints for managing user posts. It allows users to add, delete, hide, and unhide posts, as well as retrieve user data from a JSON file.

## Table of Contents

- [Features](#features)
- [API Endpoints](#api-endpoints)
  - [1. Add a New Post](#1-add-a-new-post)
  - [2. Get Users](#2-get-users)
  - [3. Delete a Post](#3-delete-a-post)
  - [4. Hide a Post](#4-hide-a-post)
  - [5. Unhide a Post](#5-unhide-a-post)
- [Getting Started](#getting-started)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- **Add a Post**: Allows users to add a new post associated with their email.
- **Get Users**: Retrieves a list of all users and their associated posts.
- **Delete a Post**: Deletes a specific post for a user based on the post index.
- **Hide a Post**: Marks a specific post as hidden for a user.
- **Unhide a Post**: Marks a specific post as visible for a user.

## API Endpoints

### 1. Add a New Post
- **POST** `/add-post`
- **Request Body**:
  ```json
  {
    "userEmail": "user@example.com",
    "post": {
      "author": "Author Name",
      "authorPhoto": "URL",
      "content": "Post content"
    }
  }
