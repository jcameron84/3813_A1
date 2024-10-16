<h1>3813 A1 Chat Platform</h1>
<h2>Joel Cameron - s5220233</h2>

<h3>Git Organisation</h3>
Since I am the only developer on this project, I will use the main branch as my development branch this also makes it slightly more convinient for pushing and pulling changes. I will post a commit either at the end of a coding session or when I complete a significant chunk of work. During the middle stage of the project I forgot to commit since no one else is relying on me pushing my changes. 

<h3>Data Structures</h3>
<h4>Users</h4>
There are three categories of users: normal users (user), group admins (admin), and super users (superUser).
Super users are the only users who can create and remove users.
Admins can create new groups and add exisiting users to those groups. They can also add and remove chanells from a group, remove users from a group, or completely remove a group.
Users have no permissions other than being able to interact within the groups/channels created by the admins.

<h4>Groups</h4>
Groups are created and manged by admins. A group may contain many channels for different topics and each group can contain many users. Groups are stored in browser local storage. They are given an ID which allows its channels to identify with it despite being stored in mongo DB seperately.

<h4>Channels</h4>
Channels exist within a group. Each channel will have a name set by the admin which will usially reflect the intended use for that channel. For example there may be a music channel for dicussing music or a movie channel for discussing movies. Channels are stored in mongo DB. They identify with a group using an ID which is stored both in mongo and in local storage.

<h3>Division of responsibilites between client and server</h3>
<h4>Client</h4>
The frontend is responsible for handling the user interface, gathering user input, and displaying data to the user. It communicates with the backend via HTTP requests to send or receive data. Specifically, it performs the following functions:

User Interface and Interaction:

Provides a responsive UI using Angular to allow users to navigate the application, interact with chat rooms, and manage groups.
Handles dynamic routing (e.g., navigating to chat rooms or user management pages).
Uses Angular components, such as DashboardComponent, to manage individual screens.
Local Storage Management:

Stores user session details and group data in localStorage to maintain state across page reloads.
Manages channels and groups by retrieving, displaying, and updating data stored locally on the client side.
Authentication Management:

Collects login credentials and forwards them to the backend for verification.
Stores user role and session information locally for access control (e.g., ensuring only admins can access certain pages).
Real-time Chat Communication:

Uses Socket.IO to interact with the backend for real-time messaging and notifications when users join or leave chat channels.
Error Handling and Navigation:

Handles frontend-level errors (e.g., form validation failures).
Provides navigation between pages (e.g., login, dashboard, group management) using Angular’s router.

<h4>Server</h4>
The backend handles the core business logic, manages data, and provides the necessary endpoints for the frontend to interact with. It also ensures secure communication and persistent data management. The server performs the following functions:

API Routes:

Exposes RESTful endpoints (e.g., /api/groups, /api/messages) for the frontend to manage groups, channels, and messages.
Handles CRUD operations for groups and messages.
Manages routes related to user management (e.g., creating, deleting users).
Authentication and Authorization:

Validates user credentials received from the frontend.
Assigns roles to users (e.g., admin, superUser) and enforces access control by validating roles when interacting with protected routes or actions.
Database Management:

Connects to the MongoDB database to store and retrieve group, user, and message data.
Ensures the backend remains the single source of truth for all persistent data.
Real-time Communication with Socket.IO:

Listens for and processes Socket.IO events from the frontend, such as joining or leaving chat channels.
Broadcasts real-time notifications (e.g., a user joining or leaving a channel) to all clients connected to a channel.
Session Management and Logout:

Clears sessions and user roles when the user logs out.
Removes users from channels in real-time when they disconnect from the frontend.
Middleware and Security:

Uses CORS to allow secure communication between the backend and frontend hosted on different origins.
Handles JSON parsing for incoming requests to ensure smooth data exchange.

<h3>Angular Architecture</h3>
<h4>Login</h4>
The login component is a form that an existing user can fill out with their email and password to log in with.

<h4>Dashboard</h4>
The dashboard is the main screen of the application. It shows the groups that a user is a part of along the left side of the screen along with a logout button. For admins, there is also a button to manage groups and for super users there is a button for adding a user, and deleting a user.

<h4>Chat Window</h4>
The chat window exist inside the dashboard and displays the group which is currently selected in the side panel.

<h4>Delete Users</h4>
This page is only accessible to super users. It displays a list of users and has a button next to each which allows the super user to delete a user.

<h4>Manage Users</h4>
This page has a form which a super user can fill out and submit to create a new user.

<h4>Manage Groups</h4>
This page is only accessible to admins. It allows an admin to create, modift and delete groups. It also allows them to add and remove individual users from groups. 

<h4>Services</h4>

1.1. AuthService
  File: auth.service.ts
  Purpose: Manages user authentication, session handling, and role management.
  Key Methods:

  login(email: string, password: string): Observable<boolean>: Authenticates a user based on their credentials.
  logout(): Ends the user session and clears any stored session data.
  isLoggedIn(): boolean: Returns whether a user is currently logged in.
  getRole(): Role: Retrieves the role of the currently logged-in user.
  createUser(email: string, password: string, role: Role): Observable<any>: Creates a new user in the system (accessible by super users).
  deleteUser(email: string): Observable<boolean>: Deletes a user from the system (accessible by super users).

  
1.2. RoleGuard
  File: role.guard.ts
  Purpose: Protects specific routes based on the user's role (e.g., superUser, admin).
  Key Methods:
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean: Checks whether the current user has the required role to access a specific route.
  
1.3. AuthGuard
  File: auth.guard.ts
  Purpose: Ensures that only authenticated users can access specific routes.
  Key Methods:
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean: Returns true if the user is logged in; otherwise, redirects the user to the login page.
  
1.4. GroupService
  File: group.service.ts (example)
  Purpose: Manages groups and their members, channels, and related operations.
  Key Methods:
  
  createGroup(group: Group): Observable<any>: Creates a new group with members and channels.
  deleteGroup(groupId: number): Observable<boolean>: Deletes a group by its ID.
  getGroups(): Observable<Group[]>: Fetches all existing groups.

<h4>Modules</h4>

<h3>Node Server Architecture</h3>
The server has not yet been integrated and will be added in phase 2 of the project.

<h3>Routes, Parameters and Return Values</h3>
<h4>1. /login</h4>
Method: POST
Purpose: Authenticates a user and starts a session.
Parameters:

email (string): The user's email address.
password (string): The user's password.
Return Value:
On success: Returns a JSON object containing user details and session data.
On failure: Returns an error message indicating invalid credentials.

<h4>2. /createUser</h4>
Method: POST
Purpose: Creates a new user. Only accessible by authorized roles (e.g., superUser).
Parameters:

email (string): Email address of the new user.
password (string): Password for the new user.
role (string): The role assigned to the user (user, admin, or superUser).
Return Value:

On success: Returns a success message confirming the creation of the user.
On failure: Returns an error message if the user already exists or if there are validation issues.

<h4>3. /deleteUser</h4>
Method: DELETE
Purpose: Deletes an existing user. Accessible only by authorized roles (e.g., superUser).
Parameters:

email (string): The email of the user to be deleted.
Return Value:

On success: Returns a success message confirming that the user has been deleted.
On failure: Returns an error message if the user is not found or if the deletion failed.

<h4>4. /dashboard</h4>
Method: GET
Purpose: Provides access to the dashboard based on the logged-in user's role.
Parameters: None

Return Value:

On success: Returns relevant data for the dashboard, customized according to the user's role.
On failure: Returns an error if the user is unauthorized or not logged in.

<h4>5. /createGroup</h4>
Method: POST
Purpose: Allows admins or superUsers to create a new group.
Parameters:

name (string): The name of the group.
members (Array<string>): A list of user emails to add to the group.
channels (Array<string>): A list of channels to be associated with the group.
Return Value:

On success: Returns a success message and the details of the newly created group.
On failure: Returns an error if the group creation fails (e.g., invalid data or unauthorized access).

<h4>6. /manageGroups</h4>
Method: GET
Purpose: Retrieves a list of all groups, including their members and channels. Accessible only by admins or superUsers.
Parameters: None

Return Value:

On success: Returns a list of all groups along with their details (name, members, channels).
On failure: Returns an error if the user is unauthorized.

<h3>Client / Server Interaction</h3>
<h4>Authentication:</h4>

Backend: AuthService updates loggedInUser and userRole. </br>
Frontend: User state is stored locally and in the component state.

<h4>Group Management:/<h4>

Backend: MongoDB stores and retrieves group data. </br>
Frontend: Dashboard updates dynamically with new or modified group data.

<h4>Chat Communication:</h4>

Backend: Socket.IO manages real-time events. </br>
Frontend: Chat messages are displayed without refreshing the page.

<h4>Session Management:</h4>

Backend: Sessions are created and destroyed on login and logout. </br>
Frontend: User is redirected appropriately based on session state.
