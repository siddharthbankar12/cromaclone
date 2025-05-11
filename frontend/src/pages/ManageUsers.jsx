import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdDelete } from "react-icons/md";
import axiosInstance from "../utils/axiosConfig";
import { toast } from "react-toastify";
import "../style/ManageUsersAndSellers.css";

const ManageUsers = () => {
  const userData = useSelector((state) => state.user.user);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsersDetails = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/admin/all-users0", {
        action: "get",
      });
      setUsers(response.data.usersData);
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirmDelete) return;

    try {
      const response = await axiosInstance.post("/admin/all-users0", {
        userId,
        action: "delete",
      });
      toast.success(response.data.message);
      setUsers(response.data.usersData);
    } catch (error) {
      console.log(error.response?.data?.message);
      toast.error("Failed to delete user.");
    }
  };

  useEffect(() => {
    if (userData?.role === "admin") {
      getUsersDetails();
    }
  }, [userData]);

  return (
    <div className="admin-container-manage">
      <h2>Manage Users</h2>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>ID</th>
                <th>Role</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center" }}>
                    No users available
                  </td>
                </tr>
              ) : (
                users
                  .filter((user) => user.role === "user")
                  .map((user) => (
                    <tr key={user._id}>
                      <td>
                        {user.firstName} {user.lastName}
                      </td>
                      <td>{user.email}</td>
                      <td>{user._id}</td>
                      <td>{user.role}</td>
                      <td>{user.phoneNo}</td>
                      <td>{user.address}</td>
                      <td className="delete-user-btn-admin">
                        <button
                          className="admin-delete-btn"
                          onClick={() => deleteUser(user._id)}
                          title="Delete User"
                        >
                          <MdDelete size={20} />
                        </button>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
