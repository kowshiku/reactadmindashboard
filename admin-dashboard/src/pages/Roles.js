import React, { useState, useEffect } from "react";
import { getRoles, updateRolePermissions } from "../services/mockApi";

const RoleManagement = () => {
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        getRoles().then(setRoles);
    }, []);

    const handlePermissionChange = (roleId, permissionType, value) => {
        const updatedRoles = roles.map(role =>
            role.id === roleId
                ? {
                      ...role,
                      permissions: { ...role.permissions, [permissionType]: value },
                  }
                : role
        );
        setRoles(updatedRoles);

        // Update the mock API
        const updatedRole = updatedRoles.find(role => role.id === roleId);
        updateRolePermissions(roleId, updatedRole.permissions).then(response => {
            if (!response.success) {
                alert("Failed to update permissions");
            }
        });
    };

    return (
        <div>
            <h1>Role Management</h1>
            <table>
                <thead>
                    <tr>
                        <th>Role Name</th>
                        <th>Read</th>
                        <th>Write</th>
                        <th>Update</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map(role => (
                        <tr key={role.id}>
                            <td>{role.name}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={role.permissions.read}
                                    onChange={(e) =>
                                        handlePermissionChange(role.id, "read", e.target.checked)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={role.permissions.write}
                                    onChange={(e) =>
                                        handlePermissionChange(role.id, "write", e.target.checked)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={role.permissions.update}
                                    onChange={(e) =>
                                        handlePermissionChange(role.id, "update", e.target.checked)
                                    }
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default RoleManagement;
