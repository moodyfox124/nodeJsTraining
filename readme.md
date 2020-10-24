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

# Homework 3
# POSTGRESQL AND LAYERED ARCHITECTURE

## Task 3.1

- Install DB PostgreSQL on your machine or use a free web hosting services for PostgreSQL.
- Write SQL script which will create Users table in the DB and fill it in with predefined users’ collection.
- Configure your REST service to work with PostgreSQL.
  - Use the sequelize package as ORM to work with PostgreSQL. 

## Task 3.2

The service should adhere to 3-layer architecture principles (https://softwareontheroad.com/idealnodejs-project-structure/) and contain the following set of directories:

    |- routers / controllers 
    |- services 
    |- data-access 
    |- models 

# Homework 4
# SECOND ENTITY AND MANY-TO-MANY ENTITY RELATIONSHIPS

## Task 4.1

Add Group entity to already existing REST service with CRUD operations.

- The Group entity should have the following properties (you can use UUID as Group id):
```typescript
type Permissions =  | "READ" | "WRITE" | "DELETE" | "SHARE" | "UPLOAD_FILES";

type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
};
```
- The service should provide the following CRUD operations for Group:
  - get group by **id**;
  - get all groups;
  - create and update a group;
  - remove group (hard delete – group data is fully removed from the DB)

- Storing of groups data should be done in PostgreSQL in Groups table.
- The service should follow the principles of 3-layer architecture.

## Task 4.2

Link User records in one table with Group records in another table.
- Add a **UserGroup** table (*“many-to-many”* relationship) which will store the data describing
which users are assigned to which group.
- If any record gets removed from the DB, then all linked records should be removed from
**UserGroup** as well.

## Task 4.3

Add ```addUsersToGroup(groupId, userIds)``` method which will allow adding users to a certain group.
Use **transactions** to save records in DB.

# Homework 5
# LOGGING & ERROR HANDLING

## TASK 5.1 
Add express middleware which will log which service method has been invoked and which arguments have been passed to it.

## TASK 5.2 
Add express **middleware** which will log all unhandled errors and return a standard message with **HTTP** code 500 (**Internal Server Error**). 
**Remark:** Do not modify the status code and the message for other errors like validation errors from the previous task.
Add error handling to process.on(‘uncaughtException’,...).
Add **Unhandled promise** rejection listener to log errors.

## TASK 5.3 
Every method in the controllers should log the errors which should include the following information:
− method name;
− arguments which have been passed to the method;
− error message.

## EVALUATION CRITERIA
2. Custom logger based on console.log is added instead of Logger package.
3. Task 5.1 is fulfilled to the full extent; logs are written into the console.
4. Task 5.2 is fulfilled to the full extent; Winston (https://github.com/winstonjs/winston) package is used for logging.
5. Task 5.3 is fulfilled to the full extent.
5*. *Add middleware wrapper functions (or decorators) which will track the methods’ execution time.*

# Homework 6
# JWT AUTHORIZATION AND CORS

## TASK 6.1
Add authorization to the already existing REST service
- Add *login(username, password)* method which should return **JWT** token.
- Add a **middleware** which will proxy all the requests (except **login**) and check that **HTTP Authorization** header has the correct value of **JWT** token.
- In case of the **HTTP Authorization** header is absent in the request, the **middleware** should stop further controller method execution and return **HTTP** *401* code (**Unauthorized Error**) and standard error message.
- In case of **HTTP Authorization** header has invalid **JWT** token in the request, the middleware should return **HTTP** code *403* (**Forbidden Error**) and standard error message.

## TASK 6.2
Add **CORS middleware** to access service methods from WEB applications hosted on another domains.
