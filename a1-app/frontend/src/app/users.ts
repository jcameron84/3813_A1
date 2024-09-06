import { Role } from "./roles";


function getParsedUsers(): Array<{ email: string; password: string; role: Role }> {
    const usersFromStorage = localStorage.getItem('users');
    return usersFromStorage ? JSON.parse(usersFromStorage) : [];  // Check for null
  }

  function initUsers(): void {
    let users = getParsedUsers();  // Use the safe function
  
    if (users.length === 0) {
      const defaultUser = {
        email: 'super@user.com',
        password: 'superUserPassword',
        role: Role.superUser
      };
  
      users.push(defaultUser);
      localStorage.setItem('users', JSON.stringify(users));
      console.log('Default user added');
    } else {
      console.log('Users already populated');
    }
  }

function addUser(email: string, password: string, role: Role): void {
    let users = getParsedUsers();  // Reuse the safe function
  
    if (users.some(user => user.email === email)) {
      console.log('User already exists!');
      return;
    }
  
    const newUser = {
      email: email,
      password: password,
      role: role
    };
  
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    console.log('User added successfully!');
  }
  


// Check if a user exists by email
function userExists(email: string): boolean {
  let users = getParsedUsers(); 
  return users.some(user => user.email === email);
}

// Retrieve all users
function getUsers(): Array<{ email: string; password: string; role: Role }> {
    return getParsedUsers();  
  }

  export const users = [
    {
      email: 'superuser@example.com',
      password: 'superpassword',
      role: 'superUser' 
    }
  ];