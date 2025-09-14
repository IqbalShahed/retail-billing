import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import assets from "../assets/assets";
import { addCategory } from "../service/CategoryService";
import { AppContext } from "../context/AppContext";

const MAX_IMAGE_SIZE_MB = 2;

const CategoryForm = () => {
    const { setCategories, auth } = useContext(AppContext);
    const [file, setFile] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
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
            // Message for DEMO
            if (auth.role === "ROLE_DEMO") {
                toast.error("Demo users cannot perform this action.");
                return;
            }


            // Build the category request
            const categoryRequest = {
                name,
                description,
            };

            // Build FormData
            const formData = new FormData();
            formData.append("category", JSON.stringify(categoryRequest));
            if (file) {
                formData.append("file", file);
            }

            // Send request
            const res = await addCategory(formData);
            if (res?.data) {
                setCategories((prev) => [...prev, res.data]);
                toast.success("Category added successfully!");
            }
            // Reset form
            setFile(null);
            setName("");
            setDescription("");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to create category.");
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

            {/* Category Name */}
            <div className="w-full">
                <p className="mb-2">Category Name</p>
                <input
                    type="text"
                    className="w-full max-w-[500px] px-3 py-2 border border-gray-300"
                    placeholder="Type here"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            {/* Category Description */}
            <div className="w-full">
                <p className="mb-2">Category Description</p>
                <textarea
                    className="w-full max-w-[500px] px-3 py-2 border border-gray-300"
                    placeholder="Write content here"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
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

export default CategoryForm;
