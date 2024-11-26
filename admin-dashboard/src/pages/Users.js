import React, { useState, useEffect } from "react";
import { mockGetUsers, mockAddUser, mockEditUser, mockDeleteUser } from "../services/mockApi";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faTrash, faSearch } from '@fortawesome/free-solid-svg-icons';


const Users = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false); // Controls modal visibility
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    role: "",
    status: "Active",
  });

  useEffect(() => {
    refreshUsers();
  }, []);

  const refreshUsers = () => {
    mockGetUsers().then((data) => {
      setUsers(data);
      setFilteredUsers(data); // Initialize filtered users
    });
  };

  const handleSearch = (query) => {
    setSearchQuery(query);

    // Filter users based on name, role, or status
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.role.toLowerCase().includes(query.toLowerCase()) ||
        user.status.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleEdit = (user) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleSave = () => {
    if (currentUser.id) {
      mockEditUser(currentUser).then(() => {
        refreshUsers();
        setOpen(false);
      });
    } else {
      mockAddUser(currentUser).then(() => {
        refreshUsers();
        setOpen(false);
      });
    }
  };

  const handleChange = (field, value) => {
    setCurrentUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="container">
        <div><h4 style={{textAlign:'center'}}>Welcome to User Management</h4></div>
      {/* Search Bar */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-30 form-controlss"
          placeholder="Search by name, role, or status"
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        /><FontAwesomeIcon icon={faSearch} className="search" />
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
            <FontAwesomeIcon icon={faPlus} /> Add User
        </button>

      </div>

      {/* Users Table */}
      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>{user.status}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(user)}
                >
                  <FontAwesomeIcon icon={faEdit} />Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    mockDeleteUser(user.id).then(() => refreshUsers());
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Adding/Editing Users */}
      {open && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{currentUser.id ? "Edit User" : "Add User"}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Name"
                  value={currentUser.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Role"
                  value={currentUser.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                />
                <select
                  className="form-control"
                  value={currentUser.status}
                  onChange={(e) => handleChange("status", e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
