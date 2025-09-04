import React from 'react';
import { Link, NavLink } from 'react-router';
import assets from '../assets/assets';

const Navbar = () => {

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
            </ul>
        </div>
    );
}

export default Navbar;