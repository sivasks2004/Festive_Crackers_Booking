import React, { useEffect, useState } from 'react';
import ProductInfo from './ProductInfo';
import { db } from '../firebase';
import { ref, get } from 'firebase/database';

const Products = () => {
    const [selectedProduct, setSelectedProduct] = useState("Bijili");
    const [tableData, setTableData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const uniqueProductTypes = [...new Set(tableData.map(product => product.type))];

    const handleProductClick = (productName) => { 
        setSelectedProduct(productName);
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    const fetchProducts = () => {
        const dataRef = ref(db, '/products');
        get(dataRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const dataObject = snapshot.val();
                    const dataKeys = Object.keys(dataObject);
                    const dataEntries = dataKeys.map((key) => ({
                        key,
                        ...dataObject[key],
                    }));
                    dataEntries.sort((a, b) => a.rank - b.rank);
                    setTableData(dataEntries);
                    setFilteredData(dataEntries);
                }
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleSearch = (searchQuery, selectedType) => {
        let filteredItems = tableData;

        if (searchQuery) {
            filteredItems = filteredItems.filter((item) =>
                item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedType) {
            filteredItems = filteredItems.filter((item) =>
                item.type.toLowerCase() === selectedType.toLowerCase()
            );
        }

        setFilteredData(filteredItems);
    };


    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-auto col-sm-2 bg-white d-flex flex-column justify-content-between min-vh-100">
                    <div className="mt-2">
                        <div className='text-center'>
                            <a className="text-decoration-none d-flex align-items-center text-black d-none d-sm-inline" role="button">
                                <span>Product Categories</span>
                            </a>
                            <hr className='mx-auto d-none d-sm-block'></hr>
                        </div>

                        <ul className="nav nav-pills flex-column" id="parentM">
                            <li className="nav-item my-1">
                                <a href="#submenu1" className="nav-link text-black d-flex justify-content-between align-items-center" data-bs-toggle="collapse" aria-current="page">
                                    <span className='d-none d-sm-inline'>FiestalFlare</span>
                                    <i className='bi bi-arrow-down-short'></i>
                                </a>

                                <ul className="nav collapse ms-2 flex-column" id="submenu1" data-bs-parent="#parentM">
                                    <li className="nav-item">
                                        <button className="nav-link text-black btn" onClick={() => handleProductClick("color")}>Colourful Smoke Bombs</button>
                                    </li>
                                    <li className="nav-item mt-2">
                                        <button className="nav-link text-black btn" onClick={() => handleProductClick("rocket")}>Parachute Rockets</button>
                                    </li>
                                    <li className="nav-item mt-2">
                                        <button className="nav-link text-black btn" onClick={() => handleProductClick("cellebrite")}>Confetti Crackers</button>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item my-1">
                                <a href="#submenu2" className="nav-link text-black d-flex justify-content-between align-items-center" data-bs-toggle="collapse" aria-current="page">
                                    <span className='d-none d-sm-inline'>GlowNova</span>
                                    <i className='bi bi-arrow-down-short'></i>
                                </a>
                                <ul className="nav collapse ms-2 flex-column dropup" id="submenu2" data-bs-parent="#parentM">
                                    <li className="nav-item">
                                        <button className="nav-link text-black btn" onClick={() => handleProductClick("box")}>Combo Boxes</button>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item my-1">
                                <a href="#submenu3" className="nav-link text-black d-flex justify-content-between align-items-center" data-bs-toggle="collapse" aria-current="page">
                                    <span className='d-none d-sm-inline'>ThunderGlitz</span>
                                    <i className='bi bi-arrow-down-short'></i>
                                </a>
                                <ul className="nav collapse ms-2 flex-column dropup" id="submenu3" data-bs-parent="#parentM">
                                    <li className="nav-item">
                                        <button className="nav-link text-black btn" onClick={() => handleProductClick("family")}>Family Packs</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link text-black btn" onClick={() => handleProductClick("sky")}>Sky Show Packs</button>
                                    </li>
                                    <li className="nav-item">
                                        <button className="nav-link text-black btn" onClick={() => handleProductClick("color")}>Color smoke Bombs</button>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item my-1">
                                <a href="#submenu4" className="nav-link text-black d-flex justify-content-between align-items-center" data-bs-toggle="collapse" aria-current="page">
                                    <span className='d-none d-sm-inline'>Sparktastic</span>
                                    <i className='bi bi-arrow-down-short'></i>
                                </a>
                                <ul className="nav collapse ms-2 flex-column dropup" id="submenu4" data-bs-parent="#parentM">
                                    <li className="nav-item">
                                        <button className="nav-link text-black btn" onClick={() => handleProductClick("fancy")}>Fancy Crackers</button>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item my-1">
                                <a href="#submenu5" className="nav-link text-black d-flex justify-content-between align-items-center" data-bs-toggle="collapse" aria-current="page">
                                    <span className='d-none d-sm-inline'>GlowEco</span>
                                    <i className='bi bi-arrow-down-short'></i>
                                </a>
                                <ul className="nav collapse ms-2 flex-column dropup" id="submenu5" data-bs-parent="#parentM">
                                    <li className="nav-item">
                                        <button className="nav-link text-black btn" onClick={() => handleProductClick("eco")}>Eco-Friendly Crackers</button>
                                    </li>
                                </ul>
                            </li>

                            <li className="nav-item my-1">
                                <a href="#submenu6" className="nav-link text-black d-flex justify-content-between align-items-center" data-bs-toggle="collapse" aria-current="page">
                                    <span className='d-none d-sm-inline'>BlazeBright</span>
                                    <i className='bi bi-arrow-down-short'></i>
                                </a>
                                <ul className="nav collapse ms-2 flex-column dropup" id="submenu6" data-bs-parent="#parentM">
                                    <li className="nav-item">
                                        <button className="nav-link text-black btn" onClick={() => handleProductClick("kid")}>Kid's Special Crackers</button>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>

                <main role="main" className="col-md-10 px-md-4 col-sm-10 col-9">

                    {/* <div className="container text-center py-2">
                        <div className="container mt-4 mb-2">
                            <div className='row'>
                                <div className='col-md-6'>
                                    <div className='input-group'>
                                        <input
                                            type="text"
                                            placeholder="Search product name..."
                                            className='form-control'
                                            value={searchText}
                                            onChange={(e) => {
                                                setSearchText(e.target.value);
                                                handleSearch(e.target.value, selectedType);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='col-md-6 m-lg-0 my-3'>
                                    <select
                                        value={selectedType}
                                        onChange={(e) => {
                                            setSelectedType(e.target.value);
                                            handleSearch(searchText, e.target.value);
                                        }}
                                        className='form-select'
                                    >
                                        <option value="">All Types</option>
                                        {uniqueProductTypes.map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <h3 className='pt-5'>Our Featured Products</h3>
                        <hr className="mx-auto" />
                        <p>Here you can check our new products with fair prices</p>
                    </div> */}

                    {/* Render Products based on selectedProduct or filteredData */}
                    {selectedProduct ? (
                        <ProductInfo productType={selectedProduct} />
                    ) : (
                        filteredData.map(product => (
                            <ProductInfo key={product.key} productType={product.type} />
                        ))
                    )}

                </main>

            </div>
        </div>
    );
};

export default Products;
