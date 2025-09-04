import { createContext, useEffect, useState } from "react";
import { deleteCategory, fetchCategories } from "../service/CategoryService";
import { toast } from "react-toastify";


export const AppContext = createContext({});

export const AppContextProvider = ({children}) =>{

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch categories from backend
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                const res = await fetchCategories();

                if (Array.isArray(res.data)) {
                    setCategories(res.data);
                }
            } catch (err) {
                console.error("Error fetching categories:", err);
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

        // Handle delete category
        const handleDelete = async (categoryId) => {
            if (!window.confirm("Are you sure you want to delete this category?")) return;
    
            try {
                await deleteCategory(categoryId);
                // Update state after delete
                const updated = categories.filter((cat) => cat.categoryId !== categoryId);
                setCategories(updated);
            } catch (err) {
                console.error("Error deleting category:", err);
                toast.error(err.response?.data?.message || "Failed to delete category. Please try again.");
            }
        };

    const contextValue = {
        categories,
        setCategories,
        loading,
        handleDelete
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}