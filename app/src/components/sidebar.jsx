import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';

const Sidebar = () => {
  return (
    <div className="container-fill">
      <div className="row">
        <div className="col-auto col-sm-2 bg-dark d-flex flex-column justify-content-between min-vh-100">
          <div className="mt-2">
            <a className="text-decoration-none d-flex align-items-center text-white d-none d-sm-inline" role="button">
              <span>Product Categories</span>
            </a>
            <hr className='text-white d-none d-sm-block'></hr>
            
            <ul className="nav nav-pills flex-column" id="parentM">

              <li className="nav-item my-1">
                <a href="#submenu1" className="nav-link text-white" data-bs-toggle="collapse" aria-current="page">
                  <span className='d-none d-sm-inline'>Aerial Fireworks</span>
                  <i className='bi bi-arrow-down-short ms-5'></i>
                </a>
                <ul className="nav collapse ms-2 flex-column" id="submenu1" data-bs-parent="#parentM">
                  <li className="nav-item">
                    <a className="nav-link  text-white" href="#" aria-current="page">Multi-Color Bursts</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#">Flying Fountains</a>
                  </li>
                </ul>
              </li>

              <li className="nav-item my-1">
                <a href="#submenu2" className="nav-link text-white" data-bs-toggle="collapse" aria-current="page">
                  <span className='d-none d-sm-inline'>Fancy Crackers</span>
                  <i className='bi bi-arrow-down-short ms-5'></i>
                </a>
                <ul className="nav collapse ms-2 flex-column dropup" id="submenu2" data-bs-parent="#parentM">
                  <li className="nav-item">
                    <a className="nav-link  text-white" href="#" aria-current="page">Glittering Fountains</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#">Colored Sparklers</a>
                  </li>
                </ul>
              </li>

              <li className="nav-item my-1">
                <a href="#submenu3" className="nav-link text-white" data-bs-toggle="collapse" aria-current="page">
                  <span className='d-none d-sm-inline'>Ground Crackers</span>
                  <i className='bi bi-arrow-down-short ms-5'></i>
                </a>
                <ul className="nav collapse ms-2 flex-column dropup" id="submenu3" data-bs-parent="#parentM">
                  <li className="nav-item">
                    <a className="nav-link  text-white" href="#" aria-current="page">Ground Chakkars</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#">Flower Pots</a>
                  </li>
                </ul>
              </li>

              <li className="nav-item my-1">
                <a href="#submenu4" className="nav-link text-white" data-bs-toggle="collapse" aria-current="page">
                  <span className='d-none d-sm-inline'>DayTime FireWorks</span>
                  <i className='bi bi-arrow-down-short ms-5'></i>
                </a>
                <ul className="nav collapse ms-2 flex-column dropup" id="submenu4" data-bs-parent="#parentM">
                  <li className="nav-item">
                    <a className="nav-link  text-white" href="#" aria-current="page">Confetti Cannons</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#">Smoke Bombs</a>
                  </li>
                </ul>
              </li>

              <li className="nav-item my-1">
                <a href="#submenu5" className="nav-link text-white" data-bs-toggle="collapse" aria-current="page">
                  <span className='d-none d-sm-inline'>Combo Boxes</span>
                  <i className='bi bi-arrow-down-short ms-5'></i>
                </a>
                <ul className="nav collapse ms-2 flex-column dropup" id="submenu5" data-bs-parent="#parentM">
                  <li className="nav-item">
                    <a className="nav-link  text-white" href="#" aria-current="page">Family Pack</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#">Party Starter Kit</a>
                  </li>
                </ul>
              </li>

              <li className="nav-item my-1">
                <a href="#submenu6" className="nav-link text-white" data-bs-toggle="collapse" aria-current="page">
                  <span className='d-none d-sm-inline'>Kid's Special Crackers</span>
                  <i className='bi bi-arrow-down-short ms-5'></i>
                </a>
                <ul className="nav collapse ms-2 flex-column dropup" id="submenu6" data-bs-parent="#parentM">
                  <li className="nav-item">
                    <a className="nav-link  text-white" href="#" aria-current="page">Magic Pencils</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="#">Crackling Sparklers</a>
                  </li>
                </ul>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
