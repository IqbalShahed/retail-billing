import React, { useState } from 'react';
import ItemForm from '../componants/ItemForm';
import ItemList from '../componants/ItemList';

const ManageItems = () => {
    const [items, setItems] = useState([]);

    //Delete Item
    
    return (
        <div className="flex w-full">
            <div className="w-[70%] mx-auto my-8 text-gray-600 text-base">
                <ItemForm setItems={setItems} />
            </div>
            <div className="w-[30%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
                <ItemList items={items} handleDeleteItem={1} />
            </div>
        </div>
    );
};

export default ManageItems;