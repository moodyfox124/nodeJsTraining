# NodeJS Training Course

# Homework 1

- [x] Task 1.1
- [x] Task 1.2
- [x] Task 1.3

# Homework 2
# IN MEMORY CRUD REST SERVICE WITH VALIDATION

## Task 2.1

Write a simple **REST** service with **CRUD** operations for User entity.
To create **REST** service, use **ExpressJS**.
The User should have the following properties (you can use **UUID** as a user identifier (**id**)):
```typescript
type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
};
```
Service should have the following **CRUD** operations for **User**:
- get user by **id**;
- create and update user;
- get auto-suggest list from `limit` users, sorted by login property and filtered by `loginSubstring` in the login property
- remove user (**soft delete** – user gets marked with `isDeleted` flag, but not removed from the collection).

Store user’s collection in the service memory (while the service is running).

## Task 2.2

Add server-side validation for **create/update** operations of **User** entity:

- all fields are **required**;
- `login` validation is required;
- `password` must contain letters and numbers;
- user’s `age` must be between 4 and 130.

In case of any property does not meet the validation requirements or the field is absent, return **400 (Bad Request)** and detailed error message.

For requests validation use special packages like **Joi**.
---
# Usage

To run task 2.1/2.2:
```
npm run task3
```
To apply eslint rules:
```
npm run lint
```

POST and PATCH requests body:
```
{
    login: "any string",
    password: "string must contain at least one number and one alphabet sumbol",
    age: integer from 4 to 130 
}
```