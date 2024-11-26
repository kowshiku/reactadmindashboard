// services/mockApi.js

let users = [
    { id: 1, name: "John Doe", role: "Admin", status: "Active" },
    { id: 2, name: "Jane Smith", role: "Editor", status: "Inactive" },
  ];
  
  export const mockGetUsers = () => Promise.resolve(users);
  
  export const mockAddUser = (user) => {
    user.id = users.length + 1;
    users.push(user);
    return Promise.resolve(user);
  };
  
  export const mockEditUser = (updatedUser) => {
    users = users.map((user) => (user.id === updatedUser.id ? updatedUser : user));
    return Promise.resolve(updatedUser);
  };
  
  export const mockDeleteUser = (id) => {
    users = users.filter((user) => user.id !== id);
    return Promise.resolve();
  };
  
  