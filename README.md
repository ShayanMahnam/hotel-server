# Shayan Hotel Server
This is a sample Next.js application built with TypeScript and styled with Tailwind CSS, with Lottie animations used to add some flair. This app also communicates with a server to manage hotel bookings.

---
## Demo
<a href="https://cyf-shayanmahnam-hotel-server.vercel.app/" target="_blank">Vercel</a>

---

## Getting Started
### Prerequisites
Before you can run this app, you need to have the following software installed on your computer:

- Node.js (v14 or higher)
- npm (v7 or higher) or Yarn (v1 or higher)
## Installation
**Clone the repository:**
```html
git clone https://github.com/ShayanMahnam/hotel-server.git
```
**Install dependencies:**
```bash
npm install
```
**Run the application:**
```bash
npm run dev
```
>Open the application in your browser at http://localhost:3000.

---

## Contributing
If you would like to contribute to this project, please follow these steps:

1. Fork the repository
2. Create a new branch: git checkout -b feature/your-feature-name
3. Make your changes and commit them: git commit -m 'Your commit message'
4. Push your changes to your fork: git push origin feature/your-feature-name
5. Submit a pull request

---
# CYF Hotel Booking Server
This is a Node.js server that provides REST API endpoints to manage hotel bookings. It uses the Express framework for handling requests and responses, the cors middleware for enabling cross-origin resource sharing, the moment library for validating and formatting date inputs, and the validator library for validating email addresses.

---
## Demo
<a href="https://glitch.com/edit/#!/shayanmahnam-hotel-server" target="_blank">Glitch Code</a>

---
## API Endpoints


### GET /
Returns a plain text message indicating that the server is running.


### POST /bookings
Creates a new booking record in the data store. Expects a JSON payload in the request body with the following properties:

- title (string): the title of the customer (e.g., "Mr", "Ms", "Dr").
- firstName (string): the first name of the customer.
- surname (string): the last name of the customer.
- email (string): the email address of the customer.
- checkInDate (string): the check-in date in YYYY-MM-DD format.
- checkOutDate (string): the check-out date in YYYY-MM-DD format.

Returns a plain text message indicating that the booking was created or an error message with a status code of 400 if the input is invalid.

### GET /bookings
Returns an array of all booking records in the data store.

### GET /bookings/search
Searches for booking records that match a given date and/or search term. Expects query parameters in the URL:

- date (string, required): the date to search for in YYYY-MM-DD format.
- term (string, optional): the search term to look for in the customer's name or email.

Returns an array of matching booking records or an error message with a status code of 400 if the input is invalid.

### GET /bookings/:id
Returns a single booking record with the given ID. Expects a URL parameter id (integer).

Returns the matching booking record or an error message with a status code of 404 if the booking is not found.

### DELETE /bookings/:id
Deletes a single booking record with the given ID. Expects a URL parameter id (integer).

Returns a plain text message indicating that the booking was deleted or an error message with a status code of 404 if the booking is not found.

---
## Helper Functions
The server also includes several helper functions for managing bookings:

- findBookingById(id): finds a booking record with the given ID in the data store.
- generateBookingId(): generates a new unique ID for a booking record.
- generateBookingroomId(): generates a new unique ID for a room in the booking record.

---
## Credits
<a href="https://codeyourfuture.io/" target="_blank">Code Your Future</a><br>