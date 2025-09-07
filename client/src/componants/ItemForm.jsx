import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import assets from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { addItem } from "../service/ItemService";

const MAX_IMAGE_SIZE_MB = 2;

const ItemForm = () => {
    const { categories, setCategories, setItems } = useContext(AppContext);
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

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

        if (!category) {
            toast.error("Please select a category!");
            return;
        }

        setLoading(true);

        try {
            // Build the request
            const ItemRequest = {
                name,
                price: parseFloat(price), // ensure number
                description,
                categoryId: category,
            };

            // Build FormData
            const formData = new FormData();
            formData.append("item", JSON.stringify(ItemRequest));
            if (file) {
                formData.append("file", file);
            }

            // Send request
            const res = await addItem(formData);
            if (res?.data) {
                setItems((prev) => [...prev, res.data]);
                setCategories((prevCategories) =>
                    prevCategories.map((cat) =>
                        cat.categoryId === category
                            ? { ...cat, items: (cat.items || 0) + 1 }
                            : cat
                    )
                );
                toast.success("Item added successfully!");
            }

            // Reset form
            setFile(null);
            setName("");
            setDescription("");
            setPrice("");
            setCategory("");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to add item.");
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

            {/* Item Name */}
            <div className="w-full">
                <p className="mb-2">Item Name</p>
                <input
                    type="text"
                    className="w-full max-w-[500px] px-3 py-2 border border-gray-300"
                    placeholder="Type here"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            {/* Item Price */}
            <div className="w-full">
                <p className="mb-2">Price</p>
                <input
                    type="number"
                    className="w-full max-w-[500px] px-3 py-2 border border-gray-300"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                />
            </div>

            {/* Category Dropdown */}
            <div className="w-full">
                <p className="mb-2">Category</p>
                <select
                    className="w-full max-w-[500px] px-3 py-2 border border-gray-300"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                >
                    <option value="">-- Select Category --</option>
                    {categories.map((cat) => (
                        <option key={cat.categoryId} value={cat.categoryId}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Item Description */}
            <div className="w-full">
                <p className="mb-2">Item Description</p>
                <textarea
                    className="w-full max-w-[500px] px-3 py-2 border border-gray-300"
                    placeholder="Write content here"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>

            {/* Submit Button */}
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

export default ItemForm;
