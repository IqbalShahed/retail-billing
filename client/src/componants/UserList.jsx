import { Search, Trash2 } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';

const UserList = ({ users, handleDeleteUser }) => {
    const {loading} = useContext(AppContext);
    const [filterdUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter when searchTerm changes
    useEffect(() => {
        if (searchTerm.trim() === "") {
            setFilteredUsers(users);
        } else {
            const lower = searchTerm.toLowerCase();
            setFilteredUsers(
                users.filter(
                    (user) =>
                        user.name.toLowerCase().includes(lower) ||
                        user.email.toLowerCase().includes(lower)
                )
            );
        }
    }, [searchTerm, users]);

    return (
        <div className="flex flex-col w-full gap-4">
            {/* Search Bar */}
            <div className="flex items-center w-full border border-gray-300 rounded-xl px-3 py-2 bg-white">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full ml-2 outline-none text-gray-700"
                />
            </div>

            {/* Category List */}
            <div className="bg-white shadow-md rounded-2xl p-4 max-h-[70vh] overflow-y-auto">
                {loading ? (
                    <p className="text-center text-gray-500">Loading users...</p>
                ) : filterdUsers.length === 0 ? (
                    <p className="text-center text-gray-500">No user found.</p>
                ) : (
                    <ul className="flex flex-col gap-3">
                        {filterdUsers.map((user) => (
                            <li
                                key={user.userId}
                                className="flex items-center justify-between gap-3 p-3 border border-gray-200 rounded-xl hover:shadow-sm transition"
                            >
                                {/* Left: Category image + info */}
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-12 h-12 flex-shrink-0 rounded-lg border border-gray-200 overflow-hidden flex items-center justify-center"
                                    >
                                        {user.imgUrl ? (
                                            <img
                                                src={user.imgUrl}
                                                alt={user.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="text-xs text-gray-500">No Img</span>
                                        )}
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-800">{user.name}</span>
                                        <span className="text-sm text-gray-500 line-clamp-1">
                                            {user.email}
                                        </span>
                                    </div>
                                </div>

                                {/* Right: Delete Icon */}
                                <button
                                    onClick={() => handleDeleteUser(user.userId, user.email)}
                                    className="p-2 rounded-full hover:bg-red-100 text-red-500 transition"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default UserList;