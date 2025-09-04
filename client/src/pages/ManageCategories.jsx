import React from "react";
import CategoryForm from "../componants/CategoryForm";
import CategoryList from "../componants/CategoryList";

const ManageCategories = () => {
    return (
        <div className="flex w-full">
            <div className="w-[70%] mx-auto my-8 text-gray-600 text-base">
                <CategoryForm />
            </div>
            <div className="w-[30%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                <CategoryList />
            </div>
        </div>
    )
}

export default ManageCategories;