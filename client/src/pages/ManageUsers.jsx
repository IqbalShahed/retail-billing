import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { deleteUser, fetchUsers } from '../service/UserService';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import UserForm from '../componants/UserForm';
import UserList from '../componants/UserList';

const ManageUsers = () => {
    const { setLoading } = useContext(AppContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const loadUser = async () => {
            try {
                setLoading(true);
                const response = await fetchUsers();
                setUsers(response);
            } catch (e) {
                console.log(e);
                toast.error("Unable to fetch users");
            } finally {
                setLoading(false);
            }
        }
        loadUser();
    }, [])

    // Delete User
    const handleDeleteUser = async (userId, email) => {
        const token = localStorage.getItem("token");
        const decoded = jwtDecode(token);
        const currentUserEmail = decoded.sub;

        if (email === currentUserEmail) {
            toast.error("You cannot delete your own account!");
            return;
        }

        if (!window.confirm("Are you sure you want to delete this user?")) return;

        try {
            await deleteUser(userId);
            setUsers(users.filter((user) => user.userId !== userId));
        } catch (err) {
            console.error("Error deleting user:", err);
            toast.error(err.response?.data?.message || "Failed to delete user. Please try again.");
        }
    };


    return (
        <div className="flex w-full">
            <div className="w-[70%] mx-auto my-8 text-gray-600 text-base">
                <UserForm setUsers={setUsers} />
            </div>
            <div className="w-[30%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                <UserList users={users} handleDeleteUser={handleDeleteUser} />
            </div>
        </div>
    );
};

export default ManageUsers;