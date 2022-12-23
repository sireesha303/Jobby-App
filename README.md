# Jobby App

## About
### Functional
* Basic clone version of jop portals like Glassdoor.
* Jobby app where users can login and can see list of available jobs by
searching with job title and filter them with salary range & employment type.
* Authentication is manadatory to see the list of available jobs.
* After successful login user will redirected to home page.from where can go to jobs page.
* In jobs page will have the list of avalaible jobs and can select the filters based on user abilities and potential.
* OnClick of job user can get more info about that specified job.

### Technical
* Heroku Deployed Single page responsive web application.
* Implemented different routes like login, home, jobs, job details using react
components, lists, hooks,event handlers.
* Persisted user login in system by storing the jwt token in one of client side storage mechanisam cookies.
* Added protected routes to ensure authenticated user is only can access the app and doing
authorized HTTP Api calls.
* Added loaders to indicate network call is in progress.
* Onclick of logout removed JWT Token from cookie and navigated user to login page.


## Key Learnings
* Routing in React app using react-router-dom
* JWT authentication handling in frontend.
* Local storage Cookies usage.
* Media Queries for responsiveness.
* Spinner Implementation on network calls.
* Sending HTTP Request to get backend data as response using Fetch API Js.
* Adding React Icons for Attractive UI.
* Based on User Selected Filter updating the query parameters of API and fetching data from backend with updated inputs.


## Technologies Used
* React Js
* CSS
* react-router-dom
* js-cookies
* CSS - Media queries
* 


## Checkout URL
* [Jobby App](https://sireesha-jobby-app.vercel.app/login)

## Credentials
UserName : rahul

Password  : rahul@2021
