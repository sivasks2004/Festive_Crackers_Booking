import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Account from './pages/Account';
import ScrollToTop from './ScrollToTop';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Users from './pages/Users';
import Admins from './pages/Admins';
import Dashboard from './pages/dashboard';

const Engine = () => {
    const [component, setComponent] = useState("Dashboard");

    const render = () => {
        switch (component) {
            case "Products":
                return <Products />;
            case "Orders":
                return <Orders />;
            case "Users":
                return <Users />;
            case "Admins":
                return <Admins />;
            case "Profile":
                return <Account />;
            case "Dashboard": // Render the Dashboard component when selected
                return <Dashboard />;
        }
    };

    const componentrender = (componentName) => {
        setComponent(componentName);
    };

    return (
        <div className='container-fluid z'>

            <div className='row'>
                <div className='col-12 col-lg-2 d-lg-block d-none'>
                    <div>
                        <Navbar componentrender={componentrender} component={component} />
                    </div>

                </div>

                <div className='col-12 col-lg-10'>
                    <div className='mt-lg-4 container mt-5 pt-3'>
                        {render()}
                    </div>
                </div>

                <div className="d-lg-none d-block">


                    <nav className="navbar text-bg-white fixed-top">
                        <div className="container-fluid">
                            <div>
                                <img className="" src="Images/logo2.png" width="150px" alt="Logo" />
                            </div>
                            <div className='d-flex flex-row justify-content-center'>
                                <h5 className="text-coral" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </h5>
                            </div>

                            <div className="offcanvas offcanvas-end text-bg-white w-100" tabIndex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                                <div className="offcanvas-header">
                                    <img className="" src="Images/logo2.png" width="150px" alt="Logo" />
                                    <button type="button" className="btn-close btn-close-dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                </div>
                                <div className="offcanvas-body">
                                    <ul className="navbar-nav justify-content-end gap-3 flex-grow-1 pe-3">

                                        <h5 data-bs-dismiss="offcanvas" className={` ${component === 'Dashboard' ? 'text-coral' : ''}`} onClick={() => componentrender('Dashboard')}>
                                            Dashboard
                                        </h5>
                                        <h5 data-bs-dismiss="offcanvas" className={`nav-item ${component === 'Products' ? 'text-coral' : ''}`} onClick={() => componentrender('Products')}>
                                            Products
                                        </h5>
                                        <h5 data-bs-dismiss="offcanvas" className={` ${component === 'Orders' ? 'text-coral' : ''}`} onClick={() => componentrender('Orders')}>
                                            Orders
                                        </h5>
                                        <h5 data-bs-dismiss="offcanvas" className={` ${component === 'Users' ? 'text-coral' : ''}`} onClick={() => componentrender('Users')}>
                                            Users
                                        </h5>
                                        <h5 data-bs-dismiss="offcanvas" className={` ${component === 'Admins' ? 'text-coral' : ''}`} onClick={() => componentrender('Admins')}>
                                            Admins
                                        </h5>
                                        <h5 data-bs-dismiss="offcanvas" className={` ${component === 'Profile' ? 'text-coral' : ''}`} onClick={() => componentrender('Profile')}>
                                            Profile
                                        </h5>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Engine;
