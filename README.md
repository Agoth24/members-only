# Members-Only Message Board

A small Express/PostgreSQL message board API with local username/password auth,
session-based login, member-only post creation, and admin-only post deletion.

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Passport Local
- express-session
- bcryptjs
- Zod

## API Documentation

Base URL during local development:

```text
http://localhost:3000
```

Send JSON request bodies with:

```text
Content-Type: application/json
```

This API uses session-based auth. In an API client such as Postman, keep cookies
enabled after logging in so protected routes can read the session.

### Auth

#### Sign Up

```http
POST /sign-up
```

Request body:

```json
{
  "firstName": "Ada",
  "lastName": "Lovelace",
  "username": "ada",
  "password": "secret-password"
}
```

Success response:

```json
{
  "id": 1,
  "firstName": "Ada",
  "lastName": "Lovelace",
  "username": "ada",
  "member": false,
  "admin": false
}
```

The password is hashed before storage and is not returned in the response.

#### Log In

```http
POST /login
```

Request body:

```json
{
  "username": "ada",
  "password": "secret-password"
}
```

Success response:

```json
{
  "id": 1,
  "firstName": "Ada",
  "lastName": "Lovelace",
  "username": "ada",
  "member": false,
  "admin": false
}
```

Invalid username or password response:

```json
{
  "message": "Username does not exist"
}
```

```json
{
  "message": "Incorrect password"
}
```

#### Log Out

```http
GET /log-out
```

Requires login.

Success response:

```json
{
  "message": "Successfully logged out"
}
```

### Membership

#### Become a Member

```http
POST /members
```

Requires login.

Request body:

```json
{
  "passcode": "member-passcode"
}
```

Success response:

```json
{
  "id": 1,
  "firstName": "Ada",
  "lastName": "Lovelace",
  "username": "ada",
  "member": true,
  "admin": false
}
```

#### Become an Admin

```http
POST /members/admin
```

Requires login and member status.

Request body:

```json
{
  "passcode": "admin-passcode"
}
```

Success response:

```json
{
  "id": 1,
  "firstName": "Ada",
  "lastName": "Lovelace",
  "username": "ada",
  "member": true,
  "admin": true
}
```

### Posts

#### Get Posts

```http
GET /posts
```

Requires login.

Non-member success response:

```json
[
  {
    "id": 1,
    "title": "First post",
    "content": "This is the message content.",
    "createdAt": "2026-04-30T18:30:00.000Z"
  }
]
```

Member success response:

```json
[
  {
    "id": 1,
    "authorId": 1,
    "firstName": "Ada",
    "lastName": "Lovelace",
    "username": "ada",
    "title": "First post",
    "content": "This is the message content.",
    "createdAt": "2026-04-30T18:30:00.000Z"
  }
]
```

#### Create Post

```http
POST /posts
```

Requires login and member status.

Request body:

```json
{
  "title": "First post",
  "content": "This is the message content."
}
```

Success response:

```json
{
  "id": 1,
  "authorId": 1,
  "title": "First post",
  "content": "This is the message content.",
  "createdAt": "2026-04-30T18:30:00.000Z"
}
```

#### Delete Post

```http
DELETE /posts/:id
```

Requires login and admin status.

Request body:

```json
{
  "passcode": "admin-passcode"
}
```

Success response:

```json
{
  "id": 1,
  "authorId": 1,
  "title": "First post",
  "content": "This is the message content.",
  "createdAt": "2026-04-30T18:30:00.000Z"
}
```

### Errors

Validation errors return this shape:

```json
{
  "status": "error",
  "message": "Validation Failed",
  "errors": [
    {
      "field": "body",
      "message": "Required"
    }
  ]
}
```

Auth guard errors currently use an `error` field:

```json
{
  "error": "Not authenticated"
}
```

```json
{
  "error": "Not a member"
}
```

```json
{
  "error": "Forbidden"
}
```

Login, passcode, and unknown-route errors currently use a `message` field:

```json
{
  "message": "Incorrect password"
}
```

```json
{
  "message": "Forbidden"
}
```

```json
{
  "message": "Route doesn't exist. See API Documentation"
}
```

If creating or deleting a post does not return a row, the current controllers
return an empty object with status `500`:

```json
{}
```
