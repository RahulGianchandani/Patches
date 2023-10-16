import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { RxHamburgerMenu } from 'react-icons/rx'
import logo  from '../images/logo-2.png'


const Header = () => {

    const [navBg, setNavBg] = useState(false);
  
    const changeNavBg = () => {
     window.scrollY >= 20 ||  document.body.clientWidth < 978? setNavBg(true) : setNavBg(false);
    }
    
    useEffect(() => {
        window.addEventListener('resize', changeNavBg);
      window.addEventListener('scroll', changeNavBg);
      return () => {
        window.removeEventListener('scroll', changeNavBg);
      }

    
    }, [])



    return (
        <nav class={`navbar navbar-expand-lg header ${navBg ? "sticky" : ""} max-sm:py-0 bg-white py-0 `}>
            <div class="container-fluid px-64 py-0">
            <div id='imgDiv' className='navbar-brand py-0'>
                    <NavLink
                        to="/"
                        className={" text-decoration-none "}
                    >
                        <img src={logo} className='inline w-16'   />
                    </NavLink>

                </div>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <RxHamburgerMenu color='#3385d7' />
                </button>
                <div class="collapse navbar-collapse justify-end " id="navbarSupportedContent">
                    <ul class="navbar-nav  mb-2 mb-lg-0 ">
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
                        <NavLink
                            to="/dashboard"
                            className={" text-decoration-none ms-lg-5 fw-bold"}
                        >
                            Dashboard
                        </NavLink>
                      
                    </ul>
                </div>
            
            </div>
        </nav>

    )
}

export default Header