import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RxHamburgerMenu } from 'react-icons/rx'
import logo from '../images/logo-2.png'
import { FiMenu } from "react-icons/fi";
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const Header = ({ show }) => {

    const [navBg, setNavBg] = useState(false);

    const changeNavBg = () => {
        window.scrollY >= 20 || document.body.clientWidth < 978 ? setNavBg(true) : setNavBg(false);
    }
    const logout = () => {
        localStorage.clear();
        window.location.href = "/"
    }

    useEffect(() => {
        window.addEventListener('resize', changeNavBg);
        window.addEventListener('scroll', changeNavBg);
        return () => {
            window.removeEventListener('scroll', changeNavBg);
        }


    }, [])



    return (
        <nav class={`navbar navbar-expand-lg header shadow-sm ${navBg ? "sticky" : ""} max-sm:py-0 bg-white py-0 `}>
            <div class={`container-fluid px-10 py-0 ${!token ? "px-32" : ""}`}>
                <div id='imgDiv' className='navbar-brand py-0 flex items-center'>
                    {token &&
                        <FiMenu size={40} color={"black"} className="p-2   hamburgerIcon cursor-pointer hover:text-white duration-200 align" onClick={() => show()} />
                    }

                    <NavLink
                        to="/"
                        className={" text-decoration-none ml-4 "}
                    >
                        <img src={logo} className='inline w-16' />
                    </NavLink>

                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <RxHamburgerMenu color='#3385d7' />
                </button>
                <div class="collapse navbar-collapse justify-end " id="navbarSupportedContent">
                    <ul class="navbar-nav  mb-2 mb-lg-0 ">

                        {
                            !token &&
                            <>
                                <NavLink
                                    to="/login"
                                    className={" text-decoration-none fw-bold"}
                                >
                                    Sign In
                                </NavLink>
                                <NavLink
                                    to="/register"
                                    className={" text-decoration-none ms-lg-5 fw-bold"}
                                >
                                    Sign Up
                                </NavLink>
                            </>
                        }

                    </ul>
                </div>

            </div>
        </nav>

    )
}

export default Header