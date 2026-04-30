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

Creates a new user and returns the created user record.

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
  "message": "Successfully logged in"
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
  "message": "Member activated"
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
  "message": "Admin privileges activated"
}
```

### Posts

#### Get Posts

```http
GET /posts
```

Requires login. Members receive full post information. Non-members receive posts
without author-identifying fields.

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

Creates a post using the logged-in user as the author.

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

Deletes the post with the matching `id`.

### Errors

Validation errors return this general shape:

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

Unknown routes return:

```json
{
  "message": "Route doesn't exist. See API Documentation"
}
```
