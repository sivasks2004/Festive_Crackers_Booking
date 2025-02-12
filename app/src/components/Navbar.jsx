import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { auth } from '../firebase';

const Navbar = ({ componentrender, component, userData }) => {
    const [loginstate, setloginstate] = useState(false)
    const [username, setusername] = useState('')


    const logout = async () => {
        Swal.fire({
            html: `
                <div className="p-5">
                    <div className="spinner-border text-dark" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            `,
            showConfirmButton: false,
            background: 'transparent',
        });

        try {
            await auth.signOut();

            Swal.fire({
                icon: 'success',
                title: 'Logout Successful',
                showConfirmButton: true,
                confirmButtonColor: '#212529',

            });
        } catch (error) {

        }
    }


    useEffect(() => {
        if (userData) {
            setloginstate(true)
            setusername(userData.profile.firstname);
        }
        else {
            setloginstate(false)
        }

    }, [userData]);

    const scrollToAboutSection = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [navtoggleicon, setNavToggleIcon] = useState(false);

    return (
        <div>

            <nav class="navbar navbar-expand-lg bg-white shadow fixed-top d-lg-none d-block">
                <div class="container " >
                    <img className='d-flex' src="https://firebasestorage.googleapis.com/v0/b/sivaraj-stores.appspot.com/o/productimages%2FFCB_Logo_2.png?alt=media&token=a2df2f8f-0505-4030-bfda-53744aa3a3b9" width="50px" alt="Logo" />
                    <a className='text-dark navbar-toggler border-0' data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#navbar" aria-controls="navbar" onClick={() => setNavToggleIcon(!navtoggleicon)}>
                        {navtoggleicon ? (
                            <i className='bi bi-x-lg'></i>
                        ) : (
                            <i className='bi bi-justify'></i>
                        )}
                    </a>
                    <div class="collapse navbar-collapse" id="navbar">

                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item my-3 my-lg-0" aria-expanded="false" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" onClick={() => setNavToggleIcon(!navtoggleicon)}>
                                <a className={`navigation p-2  fw-regular mx-2 ${component === "Home" ? "text-coral" : ""}`} onClick={() => componentrender("Home")}>Home</a>
                            </li>
                            <li class="nav-item my-3 my-lg-0" aria-expanded="false" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" onClick={() => setNavToggleIcon(!navtoggleicon)}>
                                <a className={`navigation p-2 fw-regular mx-2 ${component === "Products" ? "text-coral" : ""}`} onClick={() => componentrender("Products")} >Products</a>
                            </li>
                            <li class="nav-item my-3 my-lg-0" aria-expanded="false" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" onClick={() => setNavToggleIcon(!navtoggleicon)}>
                                <a className={`navigation p-2 fw-regular mx-2 ${component === "About" ? "text-coral" : ""}`} onClick={()=> CompositionEvent(scrollToAboutSection)} >About</a>
                            </li>
                            <li class="nav-item my-3 my-lg-0" aria-expanded="false" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" onClick={() => setNavToggleIcon(!navtoggleicon)}>
                                <a className={`navigation p-2 fw-regular mx-2 ${component === "Contact" ? "text-coral" : ""}`} onClick={() => componentrender("Contact")} >Contact Us</a>
                            </li>


                            {!loginstate && (
                                <li class="nav-item my-3 my-lg-0" aria-expanded="false" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" onClick={() => setNavToggleIcon(!navtoggleicon)}>
                                    <a className={`navigation p-2 fw-regular mx-2  ${component === "Login" ? "text-coral" : ""}`} onClick={() => componentrender("Login")} >Login</a>
                                </li>
                            )}
                            {!loginstate && (
                                <li class="nav-item my-3 my-lg-0" aria-expanded="false" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" onClick={() => setNavToggleIcon(!navtoggleicon)}>
                                    <a className={`navigation p-2 fw-regular mx-2 ${component === "Register" ? "text-coral" : ""}`} onClick={() => componentrender("Register")} >Register</a>
                                </li>
                            )}

                            {loginstate && (
                                <li class="nav-item my-3 my-lg-0" aria-expanded="false" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" onClick={() => setNavToggleIcon(!navtoggleicon)}>
                                    <a className={`navigation p-2 fw-regular mx-2 ${component === "Account" ? "text-coral" : ""}`} onClick={() => componentrender("Account")}>Account</a>
                                </li>
                            )}
                            {loginstate && (
                                <li class="nav-item my-3 ps-2 my-lg-0" aria-expanded="false" data-bs-target="#navbar" aria-controls="navbar" >
                                    <a className="navigation  fw-regular mx-2 d-flex">Hi {username}</a>
                                </li>
                            )}
                            {loginstate && (
                                <li class="nav-item my-3 pt-1 my-lg-0" aria-expanded="false" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" onClick={() => setNavToggleIcon(!navtoggleicon)}>
                                    <a className={`navigation  fw-regular mx-2 d-flex ${component === "Cart" ? "text-coral" : ""}`} onClick={() => componentrender("Cart")}><i class="fa fa-shopping-cart ps-1 pb-1" aria-hidden="true"></i><span className='d-lg-none d-block'>Cart</span></a>
                                </li>
                            )}
                            {loginstate && (
                                <li class="nav-item my-3 pt-1 my-lg-0" aria-expanded="false" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" onClick={() => setNavToggleIcon(!navtoggleicon)}>
                                    <a className="navigation fw-regular mx-2 d-flex" onClick={() => logout()}><i class="fa fa-sign-out" aria-hidden="true"></i><span className='d-lg-none d-block ps-1 pb-1'>Logout</span></a>
                                </li>
                            )}

                        </ul>

                    </div>
                </div>
            </nav>

            <nav class="navbar navbar-expand-lg bg-white shadow fixed-top d-lg-block d-none">
                <div class="container" >
                <img className='d-flex' src="https://firebasestorage.googleapis.com/v0/b/sivaraj-stores.appspot.com/o/productimages%2FFCB_Logo.png?alt=media&token=6e559136-9766-4122-a7e8-24727c6479a8" width="50px" />
                    <a className='text-dark navbar-toggler border-0' data-bs-toggle="collapse" aria-expanded="false" data-bs-target="#navbar" aria-controls="navbar" onClick={() => setNavToggleIcon(!navtoggleicon)}>
                        {navtoggleicon ? (
                            <i className='bi bi-x-lg'></i>
                        ) : (
                            <i className='bi bi-list'></i>
                        )}
                    </a>
                    <div class="collapse navbar-collapse" id="navbar">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li class="nav-item my-3 my-lg-0" aria-expanded="false" data-bs-target="#navbar" aria-controls="navbar">
                                <a className={`navigation p-2  fw-regular mx-2 ${component === "Home" ? "text-coral" : ""}`} onClick={() => componentrender("Home")}>Home</a>
                            </li>
                            <li class="nav-item my-3 my-lg-0" aria-expanded="false" data-bs-target="#navbar" aria-controls="navbar">
                                <a className={`navigation p-2 fw-regular mx-2 ${component === "Products" ? "text-coral" : ""}`} onClick={() => componentrender("Products")} >Products</a>
                            </li>
                            <li class="nav-item my-3 my-lg-0" aria-expanded="false" data-bs-target="#navbar" aria-controls="navbar">
                                <a className={`navigation p-2 fw-regular mx-2 ${component === "About" ? "text-coral" : ""}`} onClick={scrollToAboutSection} >About</a>
                            </li>
                            <li class="nav-item my-3 my-lg-0" aria-expanded="false" data-bs-target="#navbar" aria-controls="navbar">
                                <a className={`navigation p-2 fw-regular mx-2 ${component === "Contact" ? "text-coral" : ""}`} onClick={() => componentrender("Contact")} >Contact Us</a>
                            </li>

                            {!loginstate && (
                                <li class="nav-item my-3 my-lg-0" aria-expanded="false" data-bs-target="#navbar" aria-controls="navbar">
                                    <a className={`navigation p-2 fw-regular mx-2  ${component === "Login" ? "text-coral" : ""}`} onClick={() => componentrender("Login")} >Login</a>
                                </li>
                            )}
                            {!loginstate && (
                                <li class="nav-item my-3 my-lg-0 " aria-expanded="false" data-bs-target="#navbar" aria-controls="navbar">
                                    <a className={`navigation p-2 fw-regular mx-2 ${component === "Register" ? "text-coral" : ""}`} onClick={() => componentrender("Register")} >Register</a>
                                </li>
                            )}

                            {loginstate && (
                                <li class="nav-item my-3 my-lg-0" aria-expanded="false" data-bs-target="#navbar" aria-controls="navbar" >
                                    <a className={`navigation p-2 fw-regular mx-2 ${component === "Account" ? "text-coral" : ""}`} onClick={() => componentrender("Account")}>Account</a>
                                </li>
                            )}
                            {loginstate && (
                                <li class="nav-item my-3  my-lg-0" aria-expanded="false" data-bs-target="#navbar" aria-controls="navbar" >
                                    <a className="navigation  fw-regular mx-2 d-flex">Hi {username}</a>
                                </li>
                            )}
                            {loginstate && (
                                <li class="nav-item my-3 pt-1 my-lg-0" aria-expanded="false" data-bs-target="#navbar" aria-controls="navbar">
                                    <a className={`navigation fw-regular mx-2 d-flex ${component === "Cart" ? "text-coral" : ""}`} onClick={() => componentrender("Cart")}><i class="fa fa-shopping-cart ps-1 pb-1" aria-hidden="true"></i><span className='d-lg-none d-block'>Cart</span></a>
                                </li>
                            )}
                            {loginstate && (
                                <li class="nav-item my-3 pt-1 my-lg-0" aria-expanded="false" data-bs-target="#navbar" aria-controls="navbar" >
                                    <a className="navigation fw-regular mx-2 d-flex" onClick={() => logout()}><i class="fa fa-sign-out" aria-hidden="true"></i><span className='d-lg-none d-block ps-1 pb-1'>Logout</span></a>
                                </li>
                            )}

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar