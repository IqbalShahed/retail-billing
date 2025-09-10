import { createContext, useEffect, useState } from "react";
import { deleteCategory, fetchCategories } from "../service/CategoryService";
import { deleteItem, fetchItems } from "../service/ItemService";
import { toast } from "react-toastify";

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState(() => ({
        token: localStorage.getItem("token"),
        role: localStorage.getItem("role"),
    }));

    // Fetch categories + items
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const responseCategories = await fetchCategories();
                if (Array.isArray(responseCategories.data)) {
                    setCategories(responseCategories.data);
                }

                const responseItems = await fetchItems();
                if (Array.isArray(responseItems.data)) {
                    setItems(responseItems.data);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                toast.error("Failed to fetch categories or items.");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    // Delete category
    const handleDeleteCategory = async (categoryId) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;

        try {
            await deleteCategory(categoryId);

            setCategories((prev) =>
                prev.filter((cat) => cat.categoryId !== categoryId)
            );
            setItems((prev) =>
                prev.filter((item) => item.categoryId !== categoryId)
            );

            toast.success("Category and its items deleted successfully!");
        } catch (err) {
            console.error("Error deleting category:", err);
            toast.error(err.response?.data?.message || "Failed to delete category.");
        }
    };

    // Delete item
    const handleDeleteItem = async (itemId) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;

        try {
            await deleteItem(itemId);

            // find deleted item
            const deletedItem = items.find((item) => item.itemId === itemId);

            // update items
            setItems((prev) => prev.filter((item) => item.itemId !== itemId));

            // update category item count
            if (deletedItem) {
                setCategories((prevCategories) =>
                    prevCategories.map((cat) =>
                        cat.categoryId === deletedItem.categoryId
                            ? { ...cat, items: Math.max((cat.items || 0) - 1, 0) }
                            : cat
                    )
                );
            }

            toast.success("Item deleted successfully!");
        } catch (err) {
            console.error("Error deleting item:", err);
            toast.error(err.response?.data?.message || "Failed to delete item.");
        }
    };

    // Auth handling
    const setAuthData = (token, role) => {
        setAuth({ token, role });
        if (token && role) {
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        }
    };

    // Add to Cart
    const [cartItems, setCartItems] = useState([]);
    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.itemId === item.itemId);
        if (existingItem) {
            setCartItems(prev =>
                prev.map(cartItem =>
                    cartItem.itemId === item.itemId
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                )
            );
        } else {
            setCartItems([...cartItems, { ...item, quantity: 1 }]);
        }
    }

    return (
        <AppContext.Provider
            value={{
                categories,
                setCategories,
                items,
                setItems,
                loading,
                setLoading,
                handleDeleteCategory,
                handleDeleteItem,
                auth,
                setAuthData,
                cartItems,
                setCartItems,
                addToCart
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
