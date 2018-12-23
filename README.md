# Ticket system
This source code does support addition, deletion, editing and searching a ticket created by any employee.

# The api also hosted over heroku
https://searceticketing.herokuapp.com/ 
 add URI to use API
## Development server

Run `nodemon server.js` for a dev server. Navigate to `http://localhost:3000/api/`. The app will automatically reload if you change any of the source files.


## create an employee 
```
Title : employee create.
URL : http://localhost:3000/api/create/employee
Method : POST 
Data Params : { employeeName:[string] ,password:[string]}
Example: {
	"employeeName":"employee1",
	"password":"password"
}
Success Response: 
Example: 
{
    "employee": {
        "tickets": [],
        "employeeTickets": 0,
        "created": "2018-12-23T11:06:18.295Z",
        "_id": "5c1f6e7e09451e54980665eb",
        "tokens": [
            {
                "_id": "5c1f6e7e09451e54980665ec",
                "access": "auth",
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzFmNmU3ZTA5NDUxZTU0OTgwNjY1ZWIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQ1NTYzNzc0fQ.rdm3ma956RmXK5UliTXROhBqcx66vALSVpRdVnXS3M0"
            }
        ],
        "employeeName": "employee1",
        "password": "password",
        "__v": 1
    }
}
Response Codes: Success (200 OK), Bad Request (400)

```
## create ticket for authenticate user only 
```
Title : ticket create.
URL : http://localhost:3000/api/create/ticket
Method : POST 
Data Params : { id:[string], title:[string] ,description:[string]}
Headers: x-auth eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzFmNmU3ZTA5NDUxZTU0OTgwNjY1ZWIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQ1NTYzNzc0fQ.rdm3ma956RmXK5UliTXROhBqcx66vALSVpRdVnXS3M0
Example: {
	"id":"5c1f6e7e09451e54980665eb", // id of employee
	"title":"need to surf youtube for R & D",
	"description":"urgent need for development"
}
Success Response: 
Example: 
{
    "_id": "5c1f7440dd6ab840e48d5a80",
    "employeeNameRef": "5c1f6e7e09451e54980665eb",
    "title": "need to surf youtube for r& d",
    "description": "urgent need for development",
    "dated": "2018-12-23T11:40:48.358Z",
    "__v": 0
}
Response Codes: Success (200 OK), Bad Request (400), Unauthorized(401)

```
## update a ticket for authenticate user only 
```
Title : ticket create.
URL : http://localhost:3000/api/update/ticket/5c1f7440dd6ab840e48d5a80
Method : PATCH
Data Params : { title:[string],description:[string]}
Headers: x-auth eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzFmNmU3ZTA5NDUxZTU0OTgwNjY1ZWIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQ1NTYzNzc0fQ.rdm3ma956RmXK5UliTXROhBqcx66vALSVpRdVnXS3M0
Example: {
	"title":"updated ticket",
	"description":"updated description"
}
Success Response: 
Example: 
{
    "_id": "5c1f7440dd6ab840e48d5a80",
    "employeeNameRef": "5c1f6e7e09451e54980665eb",
    "title": "updated ticket",
    "description": "updated description",
    "dated": "2018-12-23T11:40:48.358Z",
    "__v": 0
}
Response Codes: Success (200 OK), Bad Request (400), Unauthorized(401)

```

## fetch a  ticket for authenticate user only 
```
Title : Decrypt the data.
URL : http://localhost:3000/api/ticket/5c1f7440dd6ab840e48d5a80
Method : GET
Success Response: 
Example: 
{
    "ticket": {
        "_id": "5c1f7440dd6ab840e48d5a80",
        "employeeNameRef": "5c1f6e7e09451e54980665eb",
        "title": "updated ticket",
        "description": "updated description",
        "dated": "2018-12-23T11:40:48.358Z",
        "__v": 0
    }
}
Response Codes: Success (200 OK), Bad Request (400), Not Found (404), Unauthorized(401)

```

## delete a ticket for authenticate user only 
```
Title : delete ticket.
URL : http://localhost:3000/api/delete/ticket/5c1f7440dd6ab840e48d5a80
Method : DELETE
Headers: x-auth eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzFmNmU3ZTA5NDUxZTU0OTgwNjY1ZWIiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTQ1NTYzNzc0fQ.rdm3ma956RmXK5UliTXROhBqcx66vALSVpRdVnXS3M0
Success Response: 
Example: 
{
    "_id": "5c1f7440dd6ab840e48d5a80",
    "employeeNameRef": "5c1f6e7e09451e54980665eb",
    "title": "updated ticket",
    "description": "updated description",
    "dated": "2018-12-23T11:40:48.358Z",
    "__v": 0
}
Response Codes: Success (200 OK), Bad Request (400),Not Found (404), Unauthorized(401)

```