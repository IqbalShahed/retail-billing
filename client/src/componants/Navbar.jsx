import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import assets from '../assets/assets';
import { AppContext } from "../context/AppContext";

const Navbar = () => {
    const navigate = useNavigate();
    const { setAuthData, auth } = useContext(AppContext);
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setAuthData(null, null);
        navigate("/login");
    }

    const isAdmin = auth.role === "ROLE_ADMIN";

    return (
        // Top navigation
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to='/'><img src={assets.logo} className='w-36' alt="ForeverBuy Logo" /></Link>

            {/* Desktop navigation */}
            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to="/" className="flex flex-col items-center gap-1">
                    {({ isActive }) => (
                        <>
                            <p>DASHBOARD</p>
                            <hr
                                className={`${isActive ? 'w-2/4 border-none h-[1.5px] bg-gray-700' : 'hidden'}`}
                            />
                        </>
                    )}
                </NavLink>
                <NavLink to="/explore" className="flex flex-col items-center gap-1">
                    {({ isActive }) => (
                        <>
                            <p>EXPLORE</p>
                            <hr
                                className={`${isActive ? 'w-2/4 border-none h-[1.5px] bg-gray-700' : 'hidden'}`}
                            />
                        </>
                    )}
                </NavLink>
                {
                    isAdmin && (
                        <>
                            <NavLink to="/manage-items" className="flex flex-col items-center gap-1">
                                {({ isActive }) => (
                                    <>
                                        <p>MANAGE ITEMS</p>
                                        <hr
                                            className={`${isActive ? 'w-2/4 border-none h-[1.5px] bg-gray-700' : 'hidden'}`}
                                        />
                                    </>
                                )}
                            </NavLink>
                            <NavLink to="/manage-categories" className="flex flex-col items-center gap-1">
                                {({ isActive }) => (
                                    <>
                                        <p>MANAGE CATEGORIES</p>
                                        <hr
                                            className={`${isActive ? 'w-2/4 border-none h-[1.5px] bg-gray-700' : 'hidden'}`}
                                        />
                                    </>
                                )}
                            </NavLink>
                            <NavLink to="/manage-users" className="flex flex-col items-center gap-1">
                                {({ isActive }) => (
                                    <>
                                        <p>MANAGE USERS</p>
                                        <hr
                                            className={`${isActive ? 'w-2/4 border-none h-[1.5px] bg-gray-700' : 'hidden'}`}
                                        />
                                    </>
                                )}
                            </NavLink>
                        </>
                    )
                }
                <NavLink to="/orders-history" className="flex flex-col items-center gap-1">
                    {({ isActive }) => (
                        <>
                            <p>ORDER HISTORY</p>
                            <hr
                                className={`${isActive ? 'w-2/4 border-none h-[1.5px] bg-gray-700' : 'hidden'}`}
                            />
                        </>
                    )}
                </NavLink>
            </ul>
            {/* Icons - Search, Profile, Cart, Hamburger */}
            <div className='flex items-center gap-6'>
                <div className='group relative'>
                    <img
                        className='w-5 cursor-pointer'
                        src={assets.profile_icon}
                        alt="profile icon"
                    />
                    {/** Drop down */}
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                            <p className="cursor-pointer hover:text-black">Settings</p>
                            <p className="cursor-pointer hover:text-black">Activity Log</p>
                            <p onClick={handleLogout} className="cursor-pointer hover:text-black">Logout</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navbar;