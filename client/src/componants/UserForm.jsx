import React, { useState } from "react";
import { toast } from "react-toastify";
import assets from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { addUser } from "../service/UserService";

const MAX_IMAGE_SIZE_MB = 2;

const UserForm = ({ setUsers }) => {
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const isValidImage = (f) =>
        f && f.type.startsWith("image/") && f.size <= MAX_IMAGE_SIZE_MB * 1024 * 1024;

    const handleImageChange = (f) => {
        if (!isValidImage(f)) {
            toast.error(`Invalid file: Must be image and < ${MAX_IMAGE_SIZE_MB}MB`);
            return;
        }
        setFile(f);
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Build the user request
            const userRequest = {
                name,
                email,
                password,
                role: "ROLE_USER"
            };

            // Build FormData
            const formData = new FormData();
            formData.append("user", JSON.stringify(userRequest));
            if (file) {
                formData.append("file", file);
            }

            // Send request
            const res = await addUser(formData);
            if (res) {
                setUsers((prev) => [...prev, res]);
                toast.success("User added successfully!");
            }
            // Reset form
            setFile(null);
            setName("");
            setEmail("");
            setPassword("");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to create user.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={onSubmitHandler}
            className="flex flex-col w-full items-start gap-3 bg-white shadow-md rounded-2xl p-4"
        >
            {/* Upload Image */}
            <div>
                <p className="mb-2">Upload Image</p>
                <label htmlFor="image">
                    <img
                        className="w-20 h-20 object-cover border border-gray-300"
                        src={file ? URL.createObjectURL(file) : assets.upload_area}
                        alt="Preview"
                    />
                    <input
                        type="file"
                        id="image"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleImageChange(e.target.files[0])}
                    />
                </label>
            </div>

            {/* User Name */}
            <div className="w-full">
                <p className="mb-2">User Name</p>
                <input
                    type="text"
                    className="w-full max-w-[500px] px-3 py-2 border border-gray-300"
                    placeholder="Type here"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            {/* User Email */}
            <div className="w-full">
                <p className="mb-2">User Email</p>
                <input
                    type="email"
                    className="w-full max-w-[500px] px-3 py-2 border border-gray-300"
                    placeholder="Enter user email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>

            {/* User Email */}
            <div className="w-full">
                <p className="mb-2">User Email</p>
                <input
                    type="password"
                    className="w-full max-w-[500px] px-3 py-2 border border-gray-300"
                    placeholder="Enter user password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <button
                type="submit"
                className="w-28 py-3 mt-4 bg-black text-white rounded-lg"
                disabled={loading}
            >
                {loading ? "ADDING..." : "ADD"}
            </button>
        </form>
    );
};

export default UserForm;
