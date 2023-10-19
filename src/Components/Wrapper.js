import { React, useState, useEffect } from 'react'



import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Sidebar from './Sidebar';
import AdminSidebar from './AdminSidebar';
// import Sidebar from '../Sidebar'
// import AdminSidebar from '../AdminSidebar'

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");


const Wrapper = (props) => {

    // const [token, setToken] = useState()
    // const [url, setUrl] = useState()


    // const [admin, setAdmin] = useState(true);

    // console.log(login?.payload[0]?.message?.account_type);

    // const acc_type = login?.payload[0]?.message?.account_type;

    const [show, setShow] = useState(true);
    const [winSize, setWinSize] = useState(window.innerWidth);


    const showSideBar = () => {
        show ? setShow(false) : setShow(true)
    }
    useEffect(() => {
        setWinSize(window.innerWidth);
        winSize < 768 ? setShow(false) : setShow(true)
        window.addEventListener("resize", () => {
            setWinSize(window.innerWidth);
        })



    }, [winSize])






    return (
        <>
            <Header show={showSideBar}  />
            <div id="wrapper" className="min-h-screen">
                <div id="sidebar" className={`shadow-sm z-20 mx-sm:-mr-56 bg-white   ${show ? "ml-0" : "-ml-60  "} `}>
                    {(role === "customer") ? <Sidebar /> : <AdminSidebar />}

                </div>
                <div id="content" className=' duration-300'>
                    {props.children}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Wrapper