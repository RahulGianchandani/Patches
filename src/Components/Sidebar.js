import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import { HiExternalLink } from "react-icons/hi";
import { RiDashboardLine } from "react-icons/ri";
import { BiHeart } from "react-icons/bi";
import { FiUserCheck, FiCreditCard, FiSettings, FiBarChart, FiLogOut } from "react-icons/fi";
import { AiOutlineYoutube } from "react-icons/ai";


const Sidebar = () => {
    let location = useLocation();

    const logout = () => {
        localStorage.clear();
        window.location.href = "/"
    }


    return (
        <div className=" sticky top-24 z-20" >
            <ul className="  py-4 mt-2 pl-0  " style={{ backgroundColor: "#fff" }}>

                <h2 id="menu-header" className="font-bold text-lg mb-2 mx-2.5">
                    Royal Patches
                </h2>
                <hr className="m-2" />
                <li
                    className={` transition duration-500 ease-out ${location.pathname === "/dashboard" ? "active" : ""
                        }`}
                >
                    <NavLink className="transition duration-500 ease-out" to="/dashboard">
                        <button className="flex items-center  p-3">
                            <RiDashboardLine size={20} className="mr-2" />
                            Dashboard
                        </button>
                    </NavLink>
                </li>

                <li
                    className={` transition duration-500 ease-out ${location.pathname === "/all-quotes" ? "active" : ""
                        }`}
                >
                    <NavLink className="transition duration-500 ease-out" to="/all-quotes">
                        <button className="flex items-center  p-3">
                            <BiHeart size={20} className="mr-2" />
                            All Quotes
                        </button>
                    </NavLink>
                </li>
                <li
                    className={` transition duration-500 ease-out ${location.pathname === "/my-team" ? "active" : ""
                        }`}
                >
                    <NavLink className="transition duration-500 ease-out" to="/my-team">
                        <button className="flex items-center  p-3">
                            <FiUserCheck size={20} className="mr-2" />
                            Orders
                        </button>
                    </NavLink>
                </li>
                <li
                    className={` transition duration-500 ease-out ${location.pathname === "/media-manager" ? "active" : ""
                        }`}
                >
                    <NavLink
                        className="transition duration-500 ease-out"
                        to="/media-manager"
                    >
                        <button className="flex items-center  p-3">
                            <AiOutlineYoutube size={20} className="mr-2" />
                            Pay Slips
                        </button>
                    </NavLink>
                </li>
                <li
                    className={` transition duration-500 ease-out ${location.pathname === "/my-profile" ? "active" : ""
                        }`}
                >
                    <NavLink
                        className="transition duration-500 ease-out"
                        to="/my-profile"
                    >
                        <button className="flex items-center  p-3">
                            <FiCreditCard size={20} className="mr-2" />
                            Profile
                        </button>
                    </NavLink>
                </li>
                <li
                    className={` transition duration-500 ease-out ${location.pathname === "/manage-storefront" ? "active" : ""
                        }`}
                >
                    <NavLink
                        className="transition duration-500 ease-out"
                        to="/manage-storefront"
                    >
                        <button className="flex items-center  p-3">
                            <FiSettings size={20} className="mr-2" />
                            Manage Storefront
                        </button>
                    </NavLink>
                </li>
                <li
                    className={` transition duration-500 ease-out ${location.pathname === "/sales-and-payments" ? "active" : ""
                        }`}
                >
                    <NavLink
                        className="transition duration-500 ease-out"
                        to="/sales-and-payments"
                    >
                        <button className="flex items-center  p-3">
                            <FiBarChart size={20} className="mr-2" />
                            Sales and Payments
                        </button>
                    </NavLink>
                </li>
                <h2 id="menu-header" className="font-bold text-lg mb-2 mt-2 mx-2.5">
                    Account
                </h2>
                <hr className="m-2" />
                <li className={` transition duration-500 ease-out cursor-pointer`} onClick={() => logout()}>
                    <button className="flex items-center  p-3 ">
                        <FiLogOut size={20} className="mr-2" />
                        Logout
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;