# SkillExx

## Description

SkillEx is a skill exchange platform designed to empower users by trading services without the need for money. Users can list their skills, offer services in exchange for tokens, and request services from others. The platform is geared toward low-income individuals and those looking to build their portfolios while practicing their skills in a community-driven environment.

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start exchanging skills.
-  **Login:** As a user I can login to the platform so that I can see all the offerred skills.
-  **Logout:** As a user I can logout from the platform so no one else can use it.
-  **Add Skills** As a user I can add a skill so that I can exchange it with the community.
-  **Delete Skills**As a user I can delete skills that I no longer wish to offer so that my skill list remains current and accurate.
-  **List Skills** As a user I want to see the skills so that I can choose one.
-  **Search Skills** As a user I want to search for skills by skill name or user so that I can find specific skills offered by the community.
-  **Request Skill** As a user I can request a skill from another user so that I can acquire the skill I need.
-  **Outgoing Request** As a user I can view my skill requests and their statuses (pending, accepted, finished, or denied) so that I can track the progress of my requests.
-  **Manage Requests** As a user I can view and update the status of the skill requests I receive (e.g., accept, deny) so that I can manage my offers effectively.
-  **View Profiles** As a user I can visit other users' profiles and see the skills they are offering.
-  **User Reviews** As a user I can view reviews for specific skills so that I can assess the quality and credibility of the skills offered.
-  **Leave Reviews** As a user I can leave reviews for skills I have used so that I can share my experience and help others make informed decisions.

## Backlog

User Reviews
- Add Reviews: Implement functionality for users to leave reviews for skills they have used.
- View Reviews: Enable users to view reviews for specific skills to assess their quality and credibility.

Personal Dashboard
- Manage Skill Requests Users can manage incoming skill requests, including updating the status of requests (e.g., pending, accepted, denied, finished).
- Update Requests: Users can update the status of skill requests they have received or sent.

Search Functionality
- Search Skills: Users can search for skills by skill name.
- Search by User: Users can search for skills based on the user offering them.

# Client / Frontend

## Routes

| Path                      | Component                   | Permissions                  | Behavior                                                        |
| ------------------------- | ---------------------------- | ---------------------------- | ---------------------------------------------------------------- |
| `/`                       | LandingPage                  | public `<Route>`             | Landing page for non-users                                      |
| `/signup`                 | SignupPage                   | anon only `<IsAnon>`         | Signup form, link to login, navigate to homepage after signup    |
| `/login`                  | LoginPage                    | anon only `<IsAnon>`         | Login form, link to signup, navigate to homepage after login     |
| `/home`                   | Homepage                     | user only `<IsPrivate>`      | User's homepage with personalized content                        |
| `/dashboard`              | UserDashboard                | user only `<IsPrivate>`      | User's personal dashboard to manage skill requests and more      |
| `/skills`                 | AllSkills                    | user only `<IsPrivate>`      | List of all skills                                               |
| `/skills/:skillId`        | SkillDetails                 | user only `<IsPrivate>`      | Details of a specific skill                                     |
| `/users`                  | AllUsers                     | user only `<IsPrivate>`      | List of all users                                                |
| `/users/:userId`          | UserProfile                  | user only `<IsPrivate>`      | Profile of a specific user                                      |

## Pages

- Landing Page
- Sign Up
- Login
- Home Page
- All Skills
- All Users
- Skill Details
- User Profile
- User Dashboard

## Components

- Add Review
- Add Skills
- Edit Profile
- Footer
- Header
- Incoming Requests
- Is Anon
- Is Private
- My Skills
- Navbar
- Outgoing Requests
- Preview Container
- Reviews
- Search

## Services
- Auth Service
  - auth.authenticateUser(): Verifies the user’s authentication status and sets the user state.
  - auth.logOutUser(): Logs out the user by removing the authentication token and redirects to the login page.
  - auth.updateUser(updatedUserData): Updates the user’s state with new data.
- User Service
  - user.getUser(userId): Retrieves user details for a specific user ID.
  - user.getUserSkills(userId): Retrieves all skills associated with a specific user ID.
- Skill Service
  - skill.createSkill(newSkill): Creates a new skill entry with the provided data.
- File Service
  - file.uploadImage(file): Uploads an image file to the server.

# Server / Backend

## Models

User model
```javascript
{
    fullName:{ type: String, required: true},
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    profilePic: {type: String},
    city: {type: String},
    country: {type: String},
    aboutMe: {type: String},
    tokenBalance: {type: Number, default: 10}
  }
```

Skill model
```javascript
{
  image: {type: String},
  skillName: {type:String, required: true},
  description: {type: String, requiredd: true},
  user:{ type: Schema.Types.ObjectId, ref: "User"},
  location: {type: String, enum:["remote", "in-person"]},
  tokenRate: {type: Number, required: true}
}
```

Skill Request model
```javascript
{
  requester: {type: Schema.Types.ObjectId, ref: "User", required: true},
  offerer: {type: Schema.Types.ObjectId, ref:"User", required:true},
  skill: {type: Schema.Types.ObjectId, ref:"Skill", required: true},
  tokens: {type: Number, required: true},
  status: {type: String, enum:["pending", "accepted", "completed", "rejected"], default: "pending"}
}
```

Review model
```javascript
{
  reviewer: {type: Schema.Types.ObjectId, ref: "User"},
  reviewee: {type: Schema.Types.ObjectId, ref: "User"},
  rating: {type: Number, min: 1, max: 5, required: true},
  comment: {type: String},
  createdAt: {type: Date, default: Date.now}
}
```

## API Endpoints (backend routes)

| HTTP Method | URL                                 | Request Body                                  | Success Status | Error Status | Description                                                                                           |
|-------------|-------------------------------------|-----------------------------------------------|----------------|--------------|-------------------------------------------------------------------------------------------------------|
| POST        | `/auth/signup`                      | `{email, password, fullName}`                 | 201            | 400, 500     | Creates a new user with encrypted password; returns user details if successful, error messages otherwise. |
| POST        | `/auth/login`                       | `{email, password}`                           | 200            | 400, 401, 500 | Authenticates user and returns a JWT token if successful; error messages otherwise.                    |
| GET         | `/auth/verify`                      | (none)                                        | 200            | 401, 500     | Verifies if the user is authenticated and returns user details.                                        |
| GET         | `/api/users`                        | (none)                                        | 200            | 500          | Retrieves a list of all users.                                                                        |
| GET         | `/api/users/:userId`                | (none)                                        | 200            | 404, 500     | Retrieves details for a specific user by userId.                                                      |
| PUT         | `/api/users/:userId`                | `{email, password, fullName}`                  | 200            | 400, 404, 500 | Updates user information based on userId.                                                             |
| DELETE      | `/api/users/:userId`                | (none)                                        | 204            | 404, 500     | Deletes a user by userId.                                                                            |
| GET         | `/api/skills/user/:userId`          | (none)                                        | 200            | 500          | Retrieves all skills associated with a specific user by userId.                                        |
| POST        | `/api/skills`                       | `{skillName, description, user}`              | 201            | 400, 500     | Creates a new skill entry.                                                                           |
| GET         | `/api/skills`                       | `q` (query parameter for searching)            | 200            | 500          | Retrieves all skills, optionally filtered by a query string.                                          |
| GET         | `/api/skills/:skillId`              | (none)                                        | 200            | 404, 500     | Retrieves details for a specific skill by skillId.                                                     |
| PUT         | `/api/skills/:skillId`              | `{skillName, description}`                     | 200            | 400, 404, 500 | Updates skill information based on skillId.                                                           |
| DELETE      | `/api/skills/:skillId`              | (none)                                        | 204            | 404, 500     | Deletes a skill by skillId.                                                                          |
| POST        | `/api/skillRequest`                 | `{requester, offerer, skill, status}`          | 201            | 500          | Creates a new skill request.                                                                         |
| GET         | `/api/skillRequest`                 | (none)                                        | 200            | 500          | Retrieves all skill requests.                                                                        |
| GET         | `/api/skillRequest/outgoing/:userId`| (none)                                        | 200            | 500          | Retrieves all outgoing skill requests for a specific user by userId.                                  |
| GET         | `/api/skillRequest/incoming/:userId`| (none)                                        | 200            | 500          | Retrieves all incoming skill requests for a specific user by userId.                                  |
| GET         | `/api/skillRequest/:skillRequestId` | (none)                                        | 200            | 404, 500     | Retrieves details for a specific skill request by skillRequestId.                                      |
| PUT         | `/api/skillRequest/:skillRequestId` | `{status}`                                    | 200            | 400, 404, 500 | Updates the status of a specific skill request by skillRequestId.                                      |
| DELETE      | `/api/skillRequest/:skillRequestId` | (none)                                        | 204            | 404, 500     | Deletes a skill request by skillRequestId.                                                            |
| POST        | `/api/reviews`                      | `{reviewer, reviewee, skill, content}`         | 201            | 500          | Creates a new review.                                                                              |
| GET         | `/api/reviews/user/:userId`         | (none)                                        | 200            | 500          | Retrieves all reviews for a specific user by userId.                                                   |
| PUT         | `/api/reviews/:reviewId`            | `{content}`                                   | 200            | 400, 404, 500 | Updates a review based on reviewId.                                                                   |
| DELETE      | `/api/reviews/:reviewId`            | (none)                                        | 204            | 404, 500     | Deletes a review by reviewId.                                                                         |
| POST        | `/api/upload`                       | `{file}` (multipart/form-data)                 | 200            | 400, 500     | Uploads an image file and returns the file URL.                                                        |

## Links
### Git

[Client repository Link](https://github.com/mimmy307/Skill-Exchange-frontend)

[Server repository Link](https://github.com/mimmy307/Skill-Exchange-backend)

[Deployed App Link](https://skillexx.netlify.app/)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1WYs6uU9drT-JhkypviaP3h6sbY9j64IF7wzYLMYCRVU/edit?usp=sharing)





