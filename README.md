# Readme
## Authentication Features
1. Login 
2. Register
3. Forgot Password
4. Reset Password Email
5. Email Verification
6. Update Profile Information
7. Update Password
8. Two Factor Authentication
9. Confirm Password

## CRUD Features
1. CRUD Products
2. CRUD Categories 
3. Role Management (User & Admin)
4. Verified User Management

## Access
1. Role user can create, read, and update product
2. Role user only can read category
3. Role admin can get full access 
4. Create, update, and delete features are only possible when the user is verified.

## Setup Project
1. Cloning repository
2. Doing an "npm install" on the client folder
3. Doing an "composer install" on the api folder
4. Cloning the .env.example file and rename it to .env, then set the .env file, such as database, email provider, client application URL, etc. Recommended to use [mailtrap](https://mailtrap.io) as email provider
5. Migrating and seeding database 
6. Running folder api and client 