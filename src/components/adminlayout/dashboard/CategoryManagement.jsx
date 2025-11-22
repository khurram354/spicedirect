"use client";
import React, { useState, useEffect } from "react";
import {FiPlus, FiEdit, FiTrash2, FiChevronDown, FiTag, FiSave, FiCheck, FiFolder, FiGrid} from "react-icons/fi";
import { HiMenu } from "react-icons/hi";
import { useRouter } from "next/navigation";
import call_api from "@/helper/Api";
import { toggleSidebar } from "@/lib/redux/features/sidebarSlice";
import { useDispatch } from "react-redux";

const CategoryManagement = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const [categories, setCategories] = useState([]);
    const [expandedCategories, setExpandedCategories] = useState([]);
    const [expandedSubcategories, setExpandedSubcategories] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const [editName, setEditName] = useState("");
    const [newItemType, setNewItemType] = useState(null);
    const [newItemParentId, setNewItemParentId] = useState(null);
    const [newItemName, setNewItemName] = useState("");
    const [newItemFParentId, setNewItemFParentId] = useState(null);

    const toggleCategory = (categoryId) => {
        setExpandedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const toggleSubcategory = (subcategoryId) => {
        setExpandedSubcategories(prev =>
            prev.includes(subcategoryId)
                ? prev.filter(id => id !== subcategoryId)
                : [...prev, subcategoryId]
        );
    };

    const startEditing = (item, level) => {
        setEditingItem({ ...item, level });
        setEditName(item.name);
    };

    const saveEdit = async () => {
        if (!editingItem || !editName.trim()) return;
        if (editingItem.level === "category") {
            await call_api.updatecategory({ name: editName.trim(), _id: editingItem._id });
            getallcategoriesdata();
        }
        if (editingItem.level === "subcategory") {
            await call_api.updatesubcategory({ name: editName.trim(), _id: editingItem._id });
            getallcategoriesdata();
        }
        if (editingItem.level === "subsubcategory") {
            await call_api.updatebrand({ name: editName.trim(), _id: editingItem._id });
            getallcategoriesdata()
        }
        setEditingItem(null);
        setEditName("");
    };

    const deleteItem = async (item, level) => {
        if (!confirm(`Are you sure you want to delete this ${level}?`)) return;
        if (level === "category") {
            await call_api.deletecategory(item._id);
            getallcategoriesdata();
        }
        if (level === "subcategory") {
            await call_api.deletesubcategory(item._id);
            getallcategoriesdata()
        }
        if (level === "subsubcategory") {
            await call_api.deletebrand(item._id);
            getallcategoriesdata();
        }
    };

    const startAdding = (type, parentId = null, fparentId = null) => {
        setNewItemType(type);
        setNewItemParentId(parentId);
        setNewItemFParentId(fparentId);
        setNewItemName("");
    };

    const saveNewItem = async () => {
        if (!newItemName.trim()) return;
        const newName = newItemName.trim();
        if (newItemType === "category") {
            const addcategory = await call_api.newcategory({ name: newName });
            getallcategoriesdata();
        }
        if (newItemType === "subcategory") {
            const addsubcategory = await call_api.createsubcategory({ subCategory: newName, categoryId: newItemParentId });
            getallcategoriesdata();
        }
        if (newItemType === "subsubcategory") {
            const addbrand = await call_api.createsubsubcategory({ subSubCategory: newName, subCategoryId: newItemFParentId });
            getallcategoriesdata();
        }
        setNewItemType(null);
        setNewItemName("");
    };

    const getallcategoriesdata = async () => {
        const resp = await call_api.getallmenucategories();
        if (resp.success) { setCategories(resp.categories) }
    }
    useEffect(() => { getallcategoriesdata() }, []);
   
    return (
        <div className="flex h-screen bg-gray-100">
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between bg-white shadow px-6 py-4">
                    <div className="flex items-center gap-4">
                        <button className="hidden md:block" onClick={() => dispatch(toggleSidebar())}>
                            <HiMenu className="w-10 h-10 text-gray-600" />
                        </button>
                        <h1 className="text-2xl font-bold text-gray-800">SpiceDirect Category Management</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.push("/admin/dashboard/order_management")}
                            className="px-5 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 cursor-pointer"
                        >
                            Back to Orders
                        </button>
                    </div>
                </header>
                <main className="flex-1 overflow-auto p-6 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        {/* Header with stats */}
                        <div className="mb-8 bg-white rounded-xl shadow p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-800">Product Categories</h2>
                                    <p className="text-gray-600">Manage your Product categories, subcategories, and subsubCategories</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="text-center px-4 py-2 bg-blue-50 rounded-lg">
                                        <p className="text-sm text-gray-600">Categories</p>
                                        <p className="text-2xl font-bold">{categories?.length}</p>
                                    </div>
                                    <div className="text-center px-4 py-2 bg-green-50 rounded-lg">
                                        <p className="text-sm text-gray-600">Subcategories</p>
                                        <p className="text-2xl font-bold">
                                            {categories.reduce((sum, cat) => sum + cat.subcategories?.length, 0)}
                                        </p>
                                    </div>
                                    <div className="text-center px-4 py-2 bg-purple-50 rounded-lg">
                                        <p className="text-sm text-gray-600">subsubcategories</p>
                                        <p className="text-2xl font-bold">
                                            {categories.reduce((sum, cat) =>
                                                sum + cat.subcategories.reduce((subSum, sub) => subSum + sub.subsubcategories.length, 0)
                                                , 0)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6 flex justify-end">
                            <button
                                onClick={() => startAdding("category")}
                                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
                            >
                                <FiPlus className="w-4 h-4" />
                                <span>Add New Category</span>
                            </button>
                        </div>
                        {newItemType && (
                            <div className="mb-6 bg-white rounded-xl shadow p-6">
                                <h3 className="text-lg font-semibold mb-4">
                                    Add New {newItemType.charAt(0).toUpperCase() + newItemType.slice(1)}
                                </h3>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="text"
                                        value={newItemName}
                                        onChange={(e) => setNewItemName(e.target.value)}
                                        className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        placeholder={`Enter ${newItemType} name`}
                                        autoFocus
                                    />
                                    <button
                                        onClick={saveNewItem}
                                        className="cursor-pointer px-4 py-2.5 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700"
                                    >
                                        <FiSave className="w-4 h-4" />
                                        <span>Save</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setNewItemType(null);
                                            setNewItemParentId(null);
                                        }}
                                        className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="bg-white rounded-xl shadow overflow-hidden">
                            <div className="grid grid-cols-12 gap-4 bg-gray-50 p-4 border-b border-gray-200">
                                <div className="col-span-5 font-medium text-gray-700">Name</div>
                                <div className="col-span-3 font-medium text-gray-700">Subcategories</div>
                                <div className="col-span-3 font-medium text-gray-700">SubSubCategories</div>
                                <div className="col-span-1 font-medium text-gray-700 text-center">Actions</div>
                            </div>
                            {categories.length === 0 ? (
                                <div className="p-12 text-center text-gray-500">
                                    <FiFolder className="mx-auto w-12 h-12 mb-4 text-gray-300" />
                                    <p>No categories found</p>
                                    <button
                                        onClick={() => startAdding("category")}
                                        className="mt-4 text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-2"
                                    >
                                        <FiPlus className="w-4 h-4" />
                                        Add your first category
                                    </button>
                                </div>
                            ) : (
                                categories.map(category => (
                                    <React.Fragment key={category._id}>
                                        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-100 hover:bg-gray-50">
                                            <div className="col-span-5 flex items-center">
                                                <button
                                                    onClick={() => toggleCategory(category._id)}
                                                    className="mr-2 text-gray-500 hover:text-gray-700"
                                                >
                                                    <FiChevronDown
                                                        className={`transform transition-transform ${expandedCategories.includes(category._id) ? '' : '-rotate-90'}`}
                                                    />
                                                </button>
                                                <FiFolder className="text-blue-500 mr-2 flex-shrink-0" />
                                                {editingItem?._id === category._id && editingItem?.level === "category" ? (
                                                    <input
                                                        type="text"
                                                        value={editName}
                                                        onChange={(e) => setEditName(e.target.value)}
                                                        className="px-3 py-1 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                        autoFocus
                                                        onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                                                    />
                                                ) : (
                                                    <span className="font-medium">{category.name}</span>
                                                )}
                                            </div>
                                            <div className="col-span-3 flex items-center">
                                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                    {category.subcategories.length} subcategories
                                                </span>
                                            </div>
                                            <div className="col-span-3 flex items-center">
                                                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                    {category.subcategories.reduce((sum, sub) => sum + sub.subsubcategories?.length, 0)} subsubcategories
                                                </span>
                                            </div>
                                            <div className="col-span-1 flex items-center justify-center gap-2">
                                                {editingItem?.id === category.id && editingItem?.level === "category" ? (
                                                    <button
                                                        onClick={saveEdit}
                                                        className="text-green-600 hover:text-green-800"
                                                        title="Save"
                                                    >
                                                        <FiCheck className="w-5 h-5" />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => startEditing(category, "category")}
                                                        className="text-blue-600 hover:text-blue-800"
                                                        title="Edit"
                                                    >
                                                        <FiEdit className="w-5 h-5" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteItem(category, "category")}
                                                    className="text-red-600 hover:text-red-800"
                                                    title="Delete"
                                                >
                                                    <FiTrash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                        {expandedCategories.includes(category._id) && category.subcategories.map(subcategory => (
                                            <React.Fragment key={subcategory._id}>
                                                <div className="grid grid-cols-12 gap-4 p-4 pl-12 bg-gray-50 border-b border-gray-100 hover:bg-gray-100">
                                                    <div className="col-span-5 flex items-center">
                                                        <button
                                                            onClick={() => toggleSubcategory(subcategory._id)}
                                                            className="mr-2 text-gray-500 hover:text-gray-700"
                                                        >
                                                            <FiChevronDown
                                                                className={`transform transition-transform ${expandedSubcategories.includes(subcategory._id) ? '' : '-rotate-90'}`}
                                                            />
                                                        </button>
                                                        <FiGrid className="text-green-500 mr-2 flex-shrink-0" />
                                                        {editingItem?._id === subcategory._id && editingItem?.level === "subcategory" ? (
                                                            <input
                                                                type="text"
                                                                value={editName}
                                                                onChange={(e) => setEditName(e.target.value)}
                                                                className="px-3 py-1 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                autoFocus
                                                                onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                                                            />
                                                        ) : (
                                                            <span className="font-medium">{subcategory.name}</span>
                                                        )}
                                                    </div>
                                                    <div className="col-span-3 flex items-center">
                                                        <span className="text-gray-500 text-sm">Subcategory</span>
                                                    </div>
                                                    <div className="col-span-3 flex items-center">
                                                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                                            {subcategory.subsubcategories.length} subsubcategory
                                                        </span>
                                                    </div>
                                                    <div className="col-span-1 flex items-center justify-center gap-2">
                                                        {editingItem?._id === subcategory._id && editingItem?.level === "subcategory" ? (
                                                            <button
                                                                onClick={saveEdit}
                                                                className="text-green-600 hover:text-green-800"
                                                                title="Save"
                                                            >
                                                                <FiCheck className="w-5 h-5" />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => startEditing(subcategory, "subcategory")}
                                                                className="text-blue-600 hover:text-blue-800"
                                                                title="Edit"
                                                            >
                                                                <FiEdit className="w-5 h-5" />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => deleteItem(subcategory, "subcategory")}
                                                            className="text-red-600 hover:text-red-800"
                                                            title="Delete"
                                                        >
                                                            <FiTrash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </div>
                                                {expandedSubcategories.includes(subcategory._id) && subcategory.subsubcategories.map(ele => (
                                                    <div key={ele._id} className="grid grid-cols-12 gap-4 p-4 pl-24 bg-white border-b border-gray-100 hover:bg-gray-50">
                                                        <div className="col-span-5 flex items-center">
                                                            <FiTag className="text-purple-500 mr-2 flex-shrink-0" />
                                                            {editingItem?._id === ele._id && editingItem?.level === "subsubcategory" ? (
                                                                <input
                                                                    type="text"
                                                                    value={editName}
                                                                    onChange={(e) => setEditName(e.target.value)}
                                                                    className="px-3 py-1 border border-blue-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                    autoFocus
                                                                    onKeyDown={(e) => e.key === 'Enter' && saveEdit()}
                                                                />
                                                            ) : (
                                                                <span>{ele.name}</span>
                                                            )}
                                                        </div>
                                                        <div className="col-span-3 flex items-center">
                                                            <span className="text-gray-500 text-sm">SubSubCategories</span>
                                                        </div>
                                                        <div className="col-span-3 flex items-center">
                                                            <span className="text-gray-500 text-sm">-</span>
                                                        </div>
                                                        <div className="col-span-1 flex items-center justify-center gap-2">
                                                            {editingItem?._id === ele._id && editingItem?.level === "subsubcategory" ? (
                                                                <button
                                                                    onClick={saveEdit}
                                                                    className="text-green-600 hover:text-green-800"
                                                                    title="Save"
                                                                >
                                                                    <FiCheck className="w-5 h-5" />
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => startEditing(ele, "subsubcategory")}
                                                                    className="text-blue-600 hover:text-blue-800"
                                                                    title="Edit"
                                                                >
                                                                    <FiEdit className="w-5 h-5" />
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => deleteItem(ele, "subsubcategory")}
                                                                className="text-red-600 hover:text-red-800"
                                                                title="Delete"
                                                            >
                                                                <FiTrash2 className="w-5 h-5" />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))}
                                                {expandedSubcategories.includes(subcategory._id) && (
                                                    <div className="pl-24 p-4 bg-white border-b border-gray-100">
                                                        
                                                        <button
                                                            onClick={() => startAdding("subsubcategory", subcategory.category, subcategory._id)}
                                                            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                                                        >
                                                            <FiPlus className="w-4 h-4" />
                                                            <span>Add SubsubCategory to {subcategory.name}</span>
                                                        </button>
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        ))}
                                        {expandedCategories.includes(category._id) && (
                                            <div className="pl-12 p-4 bg-gray-50 border-b border-gray-100">
                                                <button
                                                    onClick={() => startAdding("subcategory", category._id)}
                                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    <FiPlus className="w-4 h-4" />
                                                    <span>Add Subcategory to {category.name}</span>
                                                </button>
                                            </div>
                                        )}
                                    </React.Fragment>
                                ))
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
export default CategoryManagement 