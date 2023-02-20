# Internship-Assignment-Twain_Labs

Purpose: To built a backend in Nodejs for ‘CarDealership’ for their showroom business management.

User Roles: Admin, Manager, Employee

Brief overview of workflow and components: 
Management of Users, Enquiries, Target assigned to employees by their manager and perform basic CRUD operations.

A.	Employee :
1.	Add enquiries (date, vehicle name, customer’s details)
2.	View his/her profile
3.	View target set by his/her manager(only count .. just for simulation purpose)
4.	View enquiries assigned to him/her (either by employee or by his/her manager)

B.	Manager:
1.	View details of the employee working in manager’s department. (Assumption:
Each department has exactly one manager)
2.	Set/Update target for employees of his/her department. (Only target count)
3.	View enquires of added by the employees of his/her department
4.	Delete/Update enquiry details

C.	Admin:
1.	Register new user in the system and assign role to the user.
2.	View details of every user of the system.
3.	Delete user from the system.
4.	View all the enquiries/employee details in the system.
D.	All the users are able to login into system using credentials set by the admin. System requires minimum one default admin credentials for the system to be usable.

Implementation Details:

A.	Database : Consists of two entities 1. Enquiry 2. User

B.	LogIn / Registration :
1.	JWT tokens are cached in the client cookies and used in further subsequent api calls for authentication/authorization.
2.	User’s ID is used as a payload in JWT

C.	MiddleWare:
1.	2 functions authUser and authRole are used for authorization.
2.	authRole take permitted roles(admin, manager, employee) as arguments. And thereby gaurds the api routes from unauthorized access.
3.	JWT tokens cached in client cookies is used by backend using cookie-parser dependency.

D.	Brief API routing overview:
1.	Role specific API’s are grouped together.
2.	Application access(login/logout) and general enquiry entity related API routes are kept separate.
