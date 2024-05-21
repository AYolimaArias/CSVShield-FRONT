# CSV Shield FRONTEND

This is the frontend part of a web application that allows users to sign up, log in, and upload CSV files. The backend API used in this project was created by me.

DEMO :  you can see the application in action https://upload-file-csv.netlify.app

API repo: https://github.com/AYolimaArias/CSVShield-BACKEND


https://github.com/AYolimaArias/CSVShield-FRONT/assets/125715473/f66b39f6-fa54-4f69-bda7-58b424ddb09b


## Technologies Used

- React
- React Router Dom
- Tailwind CSS
- JavaScript
- HTML
- Vite

## Routers: 

- Home: "/"
- User Sign Up: "/signup"
- User Log In: "/login"
- CSV File Upload: "/upload"


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installing

1. Clone the repository:

    ```bash
    git clone git@github.com:AYolimaArias/CSVShield-FRONT.git

2. Navigate to the project directory:

    ```bash
    cd CSVShield-FRONT
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

### Running the Application

To start the development server, run:

```bash
npm run dev
```
## The Project
This project challenges you to complete the implementation of various React components, including:

### Signup (Signup Component)
The signup component allows users to create an account. It uses the login function from the authContext. Upon successful signup, the user is recorded in a data base with password encryted and the user can login the account.

Key Features:

- Name, email, password  and role input fields.
- role options: `user | admin`. Only the Admin role can upload a CSV file.
- Display of loading state during authentication.
- Error message display if the email already is registered.

![image](https://github.com/AYolimaArias/CSVShield-FRONT/assets/125715473/f2a09ea2-6606-4abc-b330-e8921107fd1d)

### Login (Unauthenticated Component)
The Login component allows users to log in to their accounts. It uses the login function from the authContext to authenticate the user. Upon successful login, a token is stored in local storage to keep the user authenticated.

Key Features:

- Email and password input fields.
- Form submission to authenticate the user.
- Display of loading state during authentication.
- Error message display if authentication fails.

  ![image](https://github.com/AYolimaArias/CSVShield-FRONT/assets/125715473/29d36ed1-e33c-4a35-a2ae-c852614e03ac)


### Upload (Authenticated Component)
The Upload component allows authenticated users to upload CSV files. It uses the uploadCSVFile function to send the file to the backend API. The component displays the number of successfully uploaded records and the errors encountered.

Key Features:

- File input for selecting a CSV file.
- Form submission to upload the selected file.
- Display of upload progress and results.
- Error message display for any upload issues.

 ![image](https://github.com/AYolimaArias/CSVShield-FRONT/assets/125715473/f29c6e73-5fc4-4ffa-87f5-274d50b87997)


![image](https://github.com/AYolimaArias/CSVShield-FRONT/assets/125715473/f7e5797c-6348-47ac-b99b-b7d57e8b5f5c)






## Testing
Testing has been implemented for some React components in this project.

- Command to run the test:

```
$ npm run test
```


