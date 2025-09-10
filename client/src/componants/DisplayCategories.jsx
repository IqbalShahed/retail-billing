import React from "react";
import Category from "./Category";
import assets from "../assets/assets";

const DisplayCategories = ({ categories, selectedCategory, setSelectedCategory }) => {
    return (
        <div>
            {categories.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    <Category
                        image={assets.all_items}
                        name={"All Items"}
                        items={categories.reduce((acc, cur) => acc + cur.items, 0)}
                        isSelected={selectedCategory === ""}
                        setSelectedCategory={() => setSelectedCategory("")}
                    />
                    {categories.map((cat) => (
                        <Category
                            key={cat.categoryId}
                            image={cat.imgUrl}
                            name={cat.name}
                            description={cat.description}
                            items={cat.items}
                            isSelected={selectedCategory === cat.categoryId}
                            setSelectedCategory={() => setSelectedCategory(cat.categoryId)}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center text-gray-600 py-10">
                    No category found.
                </div>
            )}
        </div>
    );
};

export default DisplayCategories;
